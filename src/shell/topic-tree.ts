import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/tree/tree.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/tree-item/tree-item.js';

import { currentTopic } from './shell.js';
import { Kernel } from '../kernel/kernel.js';
import { Topic, TOPIC_ROOT } from '../libefs';

@customElement('efs-topic-tree')
export class EfsTopicTree extends SignalWatcher(LitElement) {
  static styles = css`
    wa-tree {
      width: 100%;
      overflow-y: auto;
    }
  `;

  @state()
  private rootTopic: Topic | null = null;

  @state()
  private childTopics: Map<string, Topic[]> = new Map();

  @query('wa-tree')
  private treeElement!: HTMLElement & { selection: HTMLElement[] };
  
  constructor() {
    super();
    this.initializeTopicTree();
  }

  // Using willUpdate which is called before rendering and has access to changes
  // SignalWatcher will trigger this whenever a used signal changes
  willUpdate() {
    const topic = currentTopic.get();
    if (topic && topic.uid !== 'default' && this.shadowRoot) {
      // Schedule selection for after render when DOM is ready
      setTimeout(() => this.selectTopicInTree(topic.uid), 0);
    }
  }

  async initializeTopicTree() {
    console.log("topic-tree.initializeTopicTree");
    try {
      if (!Kernel.EFS?.TopicStore) {
        console.log("TopicStore not available yet, waiting...");
        setTimeout(() => this.initializeTopicTree(), 500);
        return;
      }

      // Start with the root topic
      const rootTopic = await Kernel.EFS.TopicStore.getById(TOPIC_ROOT);
      if (!rootTopic) {
        console.error("Root topic not found!");
        return;
      }

      this.rootTopic = rootTopic;
      console.log("Root topic loaded:", rootTopic);

      // Load children of the root topic
      await this.loadChildTopics(rootTopic.uid);
      
      // If there's already a current topic, select it
      const topic = currentTopic.get();
      if (topic && topic.uid !== 'default') {
        setTimeout(() => this.selectTopicInTree(topic.uid), 100);
      }
    } catch (error) {
      console.error("Error initializing topic tree:", error);
    }
  }

  async loadChildTopics(topicId: string) {
    if (!Kernel.EFS?.TopicStore) return;

    try {
      const children = await Kernel.EFS.TopicStore.getChildrenById(topicId);
      console.log(`Loaded ${children.length} children for topic ${topicId}`);
      
      // Store the children in our map
      this.childTopics.set(topicId, children);
      
      // Force a re-render
      this.requestUpdate();
    } catch (error) {
      console.error(`Error loading children for topic ${topicId}:`, error);
    }
  }

  // Find the tree item element for a topic ID
  private findTreeItemElement(topicId: string): HTMLElement | null {
    if (!this.shadowRoot) return null;
    return this.shadowRoot.querySelector(`wa-tree-item[data-topic-id="${topicId}"]`);
  }

  // Ensure the topic is visible in the tree and selected
  async selectTopicInTree(topicId: string) {
    console.log('Selecting topic in tree:', topicId);
    
    // First ensure all parent topics are loaded and expanded
    await this.ensureTopicIsVisible(topicId);
    
    // After ensuring visibility, find the tree item element
    const treeItem = this.findTreeItemElement(topicId);
    
    if (treeItem) {
      console.log('Found tree item:', treeItem);
      
      // Clear any previous selections
      if (this.shadowRoot) {
        const allItems = this.shadowRoot.querySelectorAll('wa-tree-item');
        allItems.forEach(item => {
          item.removeAttribute('selected');
        });
      }
      
      // Set the selected attribute on this item
      treeItem.setAttribute('selected', '');
      
      // If we have access to the tree's selection API, use that too
      if (this.treeElement) {
        this.treeElement.selection = [treeItem];
      }
      
      // Ensure the item is visible by scrolling to it if needed
      treeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      console.warn('Could not find tree item for topic:', topicId);
    }
  }
  
  // Make sure the topic and all its parents are loaded and visible
  async ensureTopicIsVisible(topicId: string) {
    // Get the topic
    if (!Kernel.EFS?.TopicStore) return;
    const topic = await Kernel.EFS.TopicStore.getById(topicId);
    if (!topic) return;
    
    // If it has a parent, ensure the parent is visible first (recursive)
    if (topic.parent && topic.parent !== TOPIC_ROOT) {
      await this.ensureTopicIsVisible(topic.parent);
    }
    
    // Load this topic's children if not already loaded
    if (!this.childTopics.has(topicId)) {
      await this.loadChildTopics(topicId);
    }
    
    // Expand the parent topic in the tree
    if (topic.parent) {
      const parentTreeItem = this.findTreeItemElement(topic.parent);
      if (parentTreeItem && parentTreeItem.hasAttribute('expandable')) {
        parentTreeItem.setAttribute('expanded', '');
      }
    }
  }

  #handleSelect(event: CustomEvent) {
    // This handler might now primarily be for keyboard navigation
    // or clicks outside the span if those occur.
    const selectedItem = event.detail.selection[0];
    if (!selectedItem || !selectedItem.dataset.topicId) return;
    
    const topicId = selectedItem.dataset.topicId;
    console.log('Selection Change Event (wa-tree):', topicId);
    
    // Load children if needed (might be redundant if span click already triggered load)
    if (topicId && !this.childTopics.has(topicId)) {
      this.loadChildTopics(topicId);
    }
    
    // Set as current topic if different
    if (topicId && topicId !== currentTopic.get().uid && Kernel.EFS?.TopicStore) {
      Kernel.EFS.TopicStore.getById(topicId).then(topic => {
        if (topic) currentTopic.set(topic);
      });
    }
  }

  #handleSpanClick(event: Event, topicId: string) {
    event.stopPropagation(); // Prevent event from bubbling to wa-tree-item/wa-tree
    console.log('Span Clicked:', topicId);

    // Load children if needed when the span is clicked
    if (topicId && !this.childTopics.has(topicId)) {
      // Check if it *should* have children before attempting load
      const topic = this.findTopic(topicId); 
      // Use the same logic as isExpandable or fetch topic if needed to check
      // For simplicity, let's try loading unconditionally for now, 
      // but ideally, check if it's potentially expandable first.
      this.loadChildTopics(topicId); 
    }

    // Set as current topic if different
    if (topicId && topicId !== currentTopic.get().uid && Kernel.EFS?.TopicStore) {
      Kernel.EFS.TopicStore.getById(topicId).then(topic => {
        if (topic) {
          console.log('Setting current topic from span click:', topic.uid);
          currentTopic.set(topic);
          // The willUpdate -> selectTopicInTree flow should handle visual selection
        }
      });
    } else {
       // If clicking the already current topic, ensure it's visually selected
       // This might be needed if the wa-selection-change event was suppressed
       this.selectTopicInTree(topicId);
    }
  }

  render() {
    // Using the signal value in render makes this component
    // reactive to the currentTopic signal changes
    const topic = currentTopic.get();
    
    if (!this.rootTopic) {
      return html`<div>Loading topic tree...</div>`;
    }

    return html`
      <wa-tree @wa-selection-change=${this.#handleSelect}>
        ${this.renderTopicTree(this.rootTopic.uid)}
      </wa-tree>
    `;
  }

  // Rest of the component remains unchanged
  // Recursively render a topic and its children
  renderTopicTree(topicId: string, depth: number = 0): any {
    const topic = this.findTopic(topicId);
    // If the topic isn't found locally, we can't render it yet.
    // This might happen if ensureTopicIsVisible hasn't completed or found the topic.
    if (!topic) {
        // Optionally, fetch the topic here if it's expected but not found
        // Kernel.EFS.TopicStore.getById(topicId).then(fetchedTopic => {
        //  if (fetchedTopic) { /* Add to local state or re-render */ }
        // });
        console.warn(`Topic ${topicId} not found in local cache during render.`);
        return null; 
    }
    
    const children = this.childTopics.get(topicId) || [];
    const childrenLoaded = this.childTopics.has(topicId);
    
    // Assume Topic might have a 'hasChildren' property or similar indicator.
    // Adjust 'topic.hasChildren' if the actual property name is different (e.g., childCount > 0).
    // If no such property exists, remove `|| (!childrenLoaded && topic.hasChildren)` 
    // and the expander will only appear after loading children.
    const isExpandable = (childrenLoaded && children.length > 0) || (!childrenLoaded && (topic as any).hasChildren); 

    return html`
      <wa-tree-item 
        data-topic-id="${topic.uid}"
        ?expandable=${isExpandable}
        @wa-expand=${() => this.loadChildTopics(topicId)} 
        @wa-collapse=${() => { /* Optional: handle collapse if needed */ }}
      >
        <span @click=${(e: Event) => this.#handleSpanClick(e, topic.uid)}>${topic.name}</span>
        ${childrenLoaded && children.length > 0 ? children.map(child => this.renderTopicTree(child.uid, depth + 1)) : ''}
      </wa-tree-item>
    `;
  }
  
  // Helper to find a topic by ID
  findTopic(topicId: string): Topic | null {
    if (this.rootTopic?.uid === topicId) return this.rootTopic;
    
    // Search within the loaded children
    for (const children of this.childTopics.values()) {
      const found = children.find(child => child.uid === topicId);
      if (found) return found;
    }

    // Topic not found in the current map (root or loaded children).
    // It might exist in the store but hasn't been loaded into the map via its parent yet.
    // Returning null here is correct based on current logic.
    return null; 
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'efs-topic-tree': EfsTopicTree;
  }
}