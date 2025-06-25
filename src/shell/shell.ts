import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher, signal} from '@lit-labs/signals';
import {Kernel} from '../kernel/kernel';
import {EFS, EASx, Topic, TopicStore, TOPIC_ROOT} from '../libefs';
import { account, connectWallet } from '../kernel/wallet';
import './topic-tree.js';
import './topic-breadcrumb.js';
import '../apps/browser/browser.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/switch/switch.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/page/page.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/button/button.js';


const DEFAULT_TOPIC: Topic = {
  uid: 'default',
  name: 'Loading...',
  parent: ''
};

export const currentTopic = signal<Topic>(DEFAULT_TOPIC);

@customElement('efs-shell')
export class EfsShell extends SignalWatcher(LitElement) {
  static styles = css`
    header[slot="header"] {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    wa-button.wallet-button {
      font-size: 0.8rem;
      font-weight: 400;
    }
    
    wa-button.wallet-button::part(base) {
      padding: 0.35rem 0.7rem;
      border-radius: 0.3rem;
      background-color: transparent;
      color: #6c757d;
      border: 1px solid #dee2e6;
      font-size: 0.8rem;
      transition: all 0.2s ease;
      font-weight: 400;
    }
    
    wa-button.wallet-button::part(base):hover {
      background-color: rgba(0, 0, 0, 0.04);
      border-color: #adb5bd;
      color: #495057;
    }
    
    wa-button.wallet-button[data-connected="true"]::part(base) {
      color: #0066cc;
      border-color: #b3d9ff;
    }
    
    wa-button.wallet-button[data-connected="true"]::part(base):hover {
      background-color: rgba(0, 102, 204, 0.05);
      border-color: #0066cc;
    }
  `;

  private isDarkScheme: boolean = false;
  private colorScheme: 'dark' | 'light' | 'auto' = 'auto';
  private systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  private efs: EFS;
  private eas: EASx;
  private topicStore: TopicStore;

  constructor() {
    super();
    // Initial check
    this.systemDark.addEventListener('change', this.#applyDark.bind(this));
    this.#applyDark();

    this.efs = Kernel.EFS;
    this.eas = this.efs.EAS;
    this.topicStore = this.efs.TopicStore;
    this.topicStore.getById(TOPIC_ROOT).then((topic) => {
      if (topic) {
        this.setCurrentTopic(topic);
      }
    });
  }

  setCurrentTopic(topic: Topic) {
    console.log('setCurrentTopic', topic.uid);
    currentTopic.set(topic);
  }

  render() {
    const walletAddress = account.get();

    return html`
      <wa-page mobile-breakpoint="50ch">
        <header slot="header">
          <efs-topic-breadcrumb></efs-topic-breadcrumb>
          <div>
            <wa-switch ?checked=${this.isDarkScheme} @change=${this.#switchClick}>Dark mode</wa-switch>
            <wa-button 
              class="wallet-button" 
              size="small" 
              variant="outline"
              data-connected=${walletAddress ? 'true' : 'false'}
              @click=${connectWallet}
            >
              ${walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : 'Connect Wallet'}
            </wa-button>
          </div>
        </header>
        <header slot=main-header>EFS Browser (main-header)</header>
        <div slot=navigation>
          Topic Tree (navigation)
          <efs-topic-tree></efs-topic-tree>
        </div>
        <main>
          <efs-browser></efs-browser>
        </main>
      </wa-page>
    `;
  }

  #applyDark(event?: MediaQueryListEvent) {
    const matches = event ? event.matches : this.systemDark.matches;
    const isDark = this.colorScheme === 'auto' ? matches : this.colorScheme === 'dark';
    document.documentElement.classList.toggle('wa-dark', isDark);
    this.isDarkScheme = isDark;
  }

  /* Theme handling */
  #setColorScheme(isDarkMode?: boolean) {
    if (isDarkMode === undefined) {
      isDarkMode = this.systemDark.matches;
    }
    this.colorScheme = isDarkMode ? 'dark' : 'light';
    this.#applyDark();
  }

  #switchClick(event: Event) {
    const target = event.target as HTMLInputElement;
    this.#setColorScheme(target.checked);
  }
}