import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher, signal } from '@lit-labs/signals';
import { Kernel } from '../kernel/kernel';
import { EFS, Topic, TopicStore, TOPIC_ROOT } from '../libefs';
import { account, connectWallet } from '../kernel/wallet';
import './topic-tree.js';
import './topic-breadcrumb.js';
import '../apps/browser/browser.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';
// wa-page is not available in the npm package, replacing with custom layout
import '@awesome.me/webawesome/dist/components/button/button.js';

const DEFAULT_TOPIC: Topic = {
  uid: 'default',
  name: 'Loading...',
  parent: '',
};

export const currentTopic = signal<Topic>(DEFAULT_TOPIC);

@customElement('efs-shell')
export class EfsShell extends SignalWatcher(LitElement) {
  static styles = css`
    :host {
      display: block;
      height: 100vh;
      --sidebar-width: 250px;
    }

    .page {
      display: flex;
      flex-direction: column;
      height: 100%;
      background-color: var(--wa-color-surface-default);
      color: var(--wa-color-text-normal);
    }

    .header-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid var(--wa-color-surface-border);
      background-color: var(--wa-color-surface-default);
    }

    .main-body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .sidebar {
      width: var(--sidebar-width);
      border-right: 1px solid var(--wa-color-surface-border);
      overflow-y: auto;
      padding: 1rem;
      background-color: var(--wa-color-surface-lowered);
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .content-area {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .main-header {
      padding: 1rem;
      border-bottom: 1px solid var(--wa-color-surface-border);
      font-weight: bold;
    }

    main {
      flex: 1;
      padding: 1rem;
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

    wa-button.wallet-button[data-connected='true']::part(base) {
      color: #0066cc;
      border-color: #b3d9ff;
    }

    wa-button.wallet-button[data-connected='true']::part(base):hover {
      background-color: rgba(0, 102, 204, 0.05);
      border-color: #0066cc;
    }
  `;

  private isDarkScheme: boolean = false;
  private colorScheme: 'dark' | 'light' | 'auto' = 'auto';
  private systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  private efs: EFS;
  // private eas: EASx;
  private topicStore: TopicStore;

  constructor() {
    super();
    // Initial check
    this.systemDark.addEventListener('change', this.#applyDark.bind(this));
    this.#applyDark();

    this.efs = Kernel.EFS;
    // this.eas = this.efs.EAS;
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
      <div class="page">
        <header class="header-bar">
          <efs-topic-breadcrumb></efs-topic-breadcrumb>
          <div>
            <wa-switch ?checked=${this.isDarkScheme} @change=${this.#switchClick}
              >Dark mode</wa-switch
            >
            <wa-button
              class="wallet-button"
              size="small"
              variant="outline"
              data-connected=${walletAddress ? 'true' : 'false'}
              @click=${connectWallet}
            >
              ${walletAddress
                ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
                : 'Connect Wallet'}
            </wa-button>
          </div>
        </header>

        <div class="main-body">
          <nav class="sidebar">
            <div>Topic Tree (navigation)</div>
            <efs-topic-tree></efs-topic-tree>
          </nav>

          <div class="content-area">
            <header class="main-header">EFS Browser (main-header)</header>
            <main>
              <efs-browser></efs-browser>
            </main>
          </div>
        </div>
      </div>
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
