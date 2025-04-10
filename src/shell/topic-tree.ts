import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/tree/tree.js';

import { currentTopic } from './shell.js';
import { Kernel } from '../kernel/kernel.js';
import { Topic, TOPIC_ROOT } from '../libefs';

@customElement('efs-topic-tree')
export class EfsTopicTree extends SignalWatcher(LitElement) {
  static styles = css`
    wa-tree {
      width: 100%;
      max-height: 400px;
      overflow-y: auto;
    }
  `;

  @state()
  private rootTopic: Topic | null = null;

  @state()
  private childTopics: Map<string, Topic[]> = new Map();

  constructor() {
    super();
    this.initializeTopicTree();
  }

  async initializeTopicTree() {
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

  #handleSelect(event: CustomEvent) {
    const selectedItem = event.detail.selection[0];
    if (!selectedItem || !selectedItem.dataset.topicId) return;
    
    const topicId = selectedItem.dataset.topicId;
    console.log('Selected topic ID:', topicId);
    
    // Load the selected topic if not already loaded
    if (topicId && !this.childTopics.has(topicId)) {
      this.loadChildTopics(topicId);
    }
    
    // Set as current topic
    if (topicId && Kernel.EFS?.TopicStore) {
      Kernel.EFS.TopicStore.getById(topicId).then(topic => {
        if (topic) currentTopic.set(topic);
      });
    }
  }

  // Recursively render a topic and its children
  renderTopicTree(topicId: string, depth: number = 0): any {
    const topic = this.findTopic(topicId);
    if (!topic) return null;
    
    const children = this.childTopics.get(topicId) || [];
    
    return html`
      <wa-tree-item data-topic-id="${topic.uid}">
        ${topic.name}
        ${children.map(child => this.renderTopicTree(child.uid, depth + 1))}
      </wa-tree-item>
    `;
  }
  
  // Helper to find a topic by ID
  findTopic(topicId: string): Topic | null {
    if (this.rootTopic?.uid === topicId) return this.rootTopic;
    
    for (const [_, children] of this.childTopics.entries()) {
      const found = children.find(child => child.uid === topicId);
      if (found) return found;
    }
    
    return null;
  }

  render() {
    if (!this.rootTopic) {
      return html`<div>Loading topic tree...</div>`;
    }

    return html`
      <wa-tree @wa-selection-change=${this.#handleSelect}>
        ${this.renderTopicTree(this.rootTopic.uid)}
      </wa-tree>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'efs-topic-tree': EfsTopicTree;
  }
}