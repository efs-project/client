import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/signals';
import { Kernel } from '../../kernel/kernel';
import { currentTopic } from '../../shell/shell';

// Import Web Awesome components
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/card/card.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/spinner/spinner.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/divider/divider.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/tab-group/tab-group.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/tab/tab.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/tab-panel/tab-panel.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/button/button.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/avatar/avatar.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.12/dist/components/format-date/format-date.js';

import { 
  EFS, 
  Topic, 
  TopicStore, 
  isAttestationIndexed, 
  getReferencingAttestationUIDs, 
  getAttestationItems 
} from '../../libefs';

// Schema UID for messages
const MESSAGE_SCHEMA = "0x3969bb076acfb992af54d51274c5c868641ca5344e1aacd0b1f5e4f80ac0822f";

// Interface for message data structure
interface Message {
  uid: string;
  content: string;
  author: string;
  timestamp: number;
  parent?: string; // Parent message ID for replies/threads
  referencedTopic?: string; // Topic being referenced
  children: Message[]; // Child messages (replies)
}

// Current state signal
const count = signal(0);

@customElement('efs-browser')
export class EfsBrowser extends SignalWatcher(LitElement) {
  static styles = css`
    .card-image {
      max-width: 200px;
    }
    
    .messages-container {
      padding: 1rem;
    }
    
    .message-card {
      margin-bottom: 1rem;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .message-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    
    .message-author {
      font-weight: bold;
    }
    
    .message-time {
      color: var(--wa-color-neutral-500);
      font-size: 0.8rem;
    }
    
    .message-content {
      margin-bottom: 1rem;
    }
    
    .message-actions {
      display: flex;
      gap: 0.5rem;
    }
    
    .message-replies {
      margin-left: 2rem;
      border-left: 2px solid var(--wa-color-neutral-200);
      padding-left: 1rem;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      padding: 2rem;
    }
    
    .empty-state {
      text-align: center;
      padding: 2rem;
      color: var(--wa-color-neutral-500);
    }
  `;

  private efs: EFS;
  
  @state()
  private loading: boolean = false;
  
  @state()
  private messages: Message[] = [];
  
  @state()
  private activeTab: string = 'messages';
  
  // Track the last loaded topic to prevent infinite loops
  private lastLoadedTopicUid: string = '';

  constructor() {
    super();
    // Initialize EFS with the appropriate address
    this.efs = Kernel.EFS;
  }

  // Called after first update and on each signal update
  protected willUpdate(): void {
    const topic = currentTopic.get();
    if (topic && topic.uid !== 'default' && topic.uid !== this.lastLoadedTopicUid) {
      this.lastLoadedTopicUid = topic.uid;
      this.loadMessagesForTopic(topic.uid);
    }
  }

  render() {
    const topic = currentTopic.get();
    
    return html`
      <div class="messages-container">
        <wa-tab-group>
          <wa-tab ?active=${this.activeTab === 'messages'} @click=${() => this.activeTab = 'messages'}>Messages</wa-tab>
          <wa-tab ?active=${this.activeTab === 'info'} @click=${() => this.activeTab = 'info'}>Topic Info</wa-tab>
        </wa-tab-group>
        
        ${this.activeTab === 'messages' ? html`
          <div class="messages-panel">
            
            ${this.loading ? html`
              <div class="loading-container">
                <wa-spinner></wa-spinner>
              </div>
            ` : this.messages.length === 0 ? html`
              <div class="empty-state">
                <p>No messages found for this topic.</p>
              </div>
            ` : html`
              ${this.messages.map(message => this.renderMessage(message))}
            `}
          </div>
        ` : html`
          <div class="info-panel">
            <h2>Topic Information</h2>
            <p>UID: ${topic?.uid || 'Unknown'}</p>
            <p>Name: ${topic?.name || 'Unknown'}</p>
            <p>Parent: ${topic?.parent || 'None'}</p>
          </div>
        `}
      </div>
    `;
  }
  
  // Helper function to render a single message with its replies
  renderMessage(message: Message, isReply: boolean = false): import('lit').TemplateResult {
    return html`
      <wa-card class="message-card">
        <div class="message-header">
          <wa-avatar name=${message.author} size="small"></wa-avatar>
          <span class="message-author">${message.author}</span>
          <span class="message-time">
            <wa-format-date date="${new Date(message.timestamp).toISOString()}" month="short" day="numeric" year="numeric"></wa-format-date>
          </span>
        </div>
        
        <div class="message-content">
          ${message.content}
        </div>
        
        <div class="message-actions">
          <wa-button size="small" variant="text" @click=${() => this.handleReply(message)}>
            Reply
          </wa-button>
          <wa-button size="small" variant="text" @click=${() => this.handleLike(message)}>
            Like
          </wa-button>
        </div>
      </wa-card>
      
      ${message.children.length > 0 ? html`
        <div class="message-replies">
          ${message.children
            .sort((a, b) => a.timestamp - b.timestamp)
            .map(reply => this.renderMessage(reply, true))}
        </div>
      ` : ''}
    `;
  }
  
  // Handle reply button click
  handleReply(message: Message) {
    console.log('Reply to message:', message);
    // In a real implementation, this would open a reply form
    // and ultimately create a new message attestation with parent = message.uid
  }
  
  // Handle like button click
  handleLike(message: Message) {
    console.log('Liked message:', message);
    // In a real implementation, this would create a 'like' attestation
    // referencing the message
  }

  async #onClick() {
    count.set(count.get() + 1);

    // TODO: Move me somewhere else
    // const uid = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";

    // const uid = "0x21792c13ed1e2b20c3827ec68c644dd8a79b9c137c6e2f21aa9ccc9cafc1b7a5"; // Bryce's attestation
    // const schema = "0xb96446c85ce538c1641a967f23ea11bbb4a390ef745fc5a9905689dbd48bac86"; // Schema of Dahk's attestation
    // getAttestation(uid);
    // const isIndexed = await eas.isAttestationIndexed(uid);
    // const refCount = await eas.getReferencingAttestationUIDCount(uid, schema);
    // const refUIDs = await eas.getReferencingAttestationUIDs(uid, schema);
    // console.log('isIndexed', isIndexed);
    // console.log('refCount', refCount);
    // console.log('refUIDs', refUIDs);

    // // foreach ref in refUIDs call getAttestation(ref)
    // refUIDs.forEach(async (ref) => {
    //   getAttestation(ref);
    // });


    //console.log('Attestation tree:', this.stringifyWithBigInt(attestationTree));
    //console.table(attestationTree);
  }

  private stringifyWithBigInt(obj: any): string {
    return JSON.stringify(obj, (key, value) => {
      if (typeof value === 'bigint') {
        return value.toString();
      }
      return value;
    }, 2);
  }


  // Load messages for the current topic
  async loadMessagesForTopic(topicUid: string) {
    try {
      this.loading = true;
      console.log(`Loading messages for topic: ${topicUid}`);
      
      // Get messages that reference this topic using the message schema
      const messageUIDs = await getReferencingAttestationUIDs(topicUid, MESSAGE_SCHEMA);
      console.log(`Found ${messageUIDs.length} messages for topic ${topicUid}`);
      
      // Process each message
      const topLevelMessages: Message[] = [];
      const messageMap = new Map<string, Message>();
      
      // First pass - create message objects
      for (const uid of messageUIDs) {
        const message = await this.processMessage(uid, topicUid);
        if (message) {
          messageMap.set(message.uid, message);
        }
      }
      
      // Second pass - build the message tree
      for (const message of messageMap.values()) {
        if (!message.parent) {
          // This is a top-level message (directly references the topic)
          topLevelMessages.push(message);
        } else if (messageMap.has(message.parent)) {
          // This is a reply to another message
          const parentMessage = messageMap.get(message.parent);
          if (parentMessage) {
            parentMessage.children.push(message);
          }
        }
      }
      
      // Sort by timestamp (newest first)
      topLevelMessages.sort((a, b) => b.timestamp - a.timestamp);
      
      // Update the component state
      this.messages = topLevelMessages;
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      this.loading = false;
    }
  }
  
  // Process a single message attestation
  async processMessage(uid: string, topicUid: string): Promise<Message | null> {
    try {
      const items = await getAttestationItems(uid);
      
      // Extract message data from attestation items
      const content = items.find(item => item.name === 'message')?.value?.toString() || '';
      const author = items.find(item => item.name === 'author')?.value?.toString() || 'Anonymous';
      const timestamp = Number(items.find(item => item.name === 'timestamp')?.value || Date.now());
      const parent = items.find(item => item.name === 'parent')?.value?.toString();
      
      return {
        uid,
        content,
        author,
        timestamp,
        parent,
        referencedTopic: topicUid,
        children: []
      };
    } catch (error) {
      console.error(`Error processing message ${uid}:`, error);
      return null;
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'efs-browser': EfsBrowser;
  }
}