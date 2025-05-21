import {LitElement, html, css} from 'lit';
import {customElement} from 'lit/decorators.js';
import {SignalWatcher, signal} from '@lit-labs/signals';
import {SignalArray,} from 'signal-utils/array';
import {Kernel} from '../kernel/kernel';
import {EFS, EASx} from '../libefs';
import {Topic, TopicStore} from '../libefs';
import './topic-tree.js';
import './topic-breadcrumb.js';
import '../apps/browser/browser.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/switch/switch.js';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.13/dist/components/page/page.js';

const DEFAULT_TOPIC: Topic = {
  uid: 'default',
  name: 'Loading...',
  parent: ''
};

export const currentTopic = signal<Topic>(DEFAULT_TOPIC);

//const ROOT_TOPIC_UID = "0x6e4851b1ee4ee826a06a4514895640816b4143bf2408c33e5c1263275daf53ce";
const ROOT_TOPIC_UID = "0x829a700e3f58635a529eeda388abddf1fc9f3a201c0614d1fb44a8002b2cb2f6";

@customElement('efs-shell')
export class EfsShell extends SignalWatcher(LitElement) {
  static styles = css`
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
    this.topicStore.getById(ROOT_TOPIC_UID).then((topic) => {
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
    return html`
      <wa-page mobile-breakpoint="50ch">
        <header slot=header>
          <!-- Topic breadcrumbs (Header) -->
          <efs-topic-breadcrumb></efs-topic-breadcrumb>
          <wa-switch ?checked=${this.isDarkScheme} @change=${this.#switchClick}>Dark mode</wa-switch>
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