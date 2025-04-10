import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import { currentTopic } from './shell.js';
import { Kernel } from '../kernel/kernel.js';
import { Topic } from '../libefs';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/breadcrumb/breadcrumb.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/breadcrumb-item/breadcrumb-item.js';

@customElement('efs-topic-breadcrumb')
export class EfsTopicBreadcrumb extends SignalWatcher(LitElement) {
    static styles = css`
      wa-breadcrumb {
        padding: 4px 0;
      }
    `;

    @state()
    private topicPath: Topic[] = [];
    
    private lastUpdatedTopicId: string = '';

    constructor() {
      super();
      this.updateTopicPath();
    }

    // Only update when the current topic changes
    protected updated(changedProperties: Map<string, any>) {
      const topic = currentTopic.get();
      if (topic && topic.uid !== 'default' && topic.uid !== this.lastUpdatedTopicId) {
        this.lastUpdatedTopicId = topic.uid;
        this.updateTopicPath();
      }
    }

    async updateTopicPath() {
      try {
        const topic = currentTopic.get();
        if (!topic || topic.uid === 'default') return;
        
        if (Kernel.EFS && Kernel.EFS.TopicStore) {
          console.log('Fetching path for topic:', topic.name);
          const path = await Kernel.EFS.TopicStore.getPathById(topic.uid);
          console.log('Topic path:', path);
          this.topicPath = path;
        }
      } catch (error) {
        console.error('Error updating topic path:', error);
      }
    }

    handleTopicClick(topicUid: string) {
      console.log('Breadcrumb clicked for topic:', topicUid);
      if (Kernel.EFS && topicUid) {
        Kernel.EFS.TopicStore.getById(topicUid).then(topic => {
          if (topic) {
            currentTopic.set(topic);
          }
        });
      }
    }

    render() {
      const topic = currentTopic.get();
      
      return html`
        <wa-breadcrumb>
          <wa-breadcrumb-item @click=${() => this.handleTopicClick('root')}>EFS</wa-breadcrumb-item>
          
          ${this.topicPath.length > 0 ? 
            this.topicPath.map(pathTopic => html`
              <wa-breadcrumb-item @click=${() => this.handleTopicClick(pathTopic.uid)}>
                ${pathTopic.name}
              </wa-breadcrumb-item>
            `) : 
            html`<wa-breadcrumb-item>${topic.name}</wa-breadcrumb-item>`
          }
        </wa-breadcrumb>
      `;
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'efs-topic-breadcrumb': EfsTopicBreadcrumb;
  }
}