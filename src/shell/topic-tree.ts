import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { SignalWatcher } from '@lit-labs/signals';
import 'https://early.webawesome.com/webawesome@3.0.0-alpha.10/dist/components/tree/tree.js';

@customElement('efs-topic-tree')
export class EfsTopicTree extends SignalWatcher(LitElement) {
  static styles = css`
  `;

  private treeData = [
    {
      label: 'Root',
      value: 'root',
      children: [
        {
          label: 'Child 1',
          value: 'child1'
        },
        {
          label: 'Child 2',
          value: 'child2',
          children: [
            {
              label: 'Grandchild',
              value: 'grandchild'
            }
          ]
        }
      ]
    }
  ];

//   #handleSelect(event: Event) {
//     console.log('Selected:', event);
//   }

#handleSelect(event: CustomEvent) {
    const selectedItem = event.detail.selection[0];
    console.log('Selected tree item:', selectedItem.innerText);
}

  render() {
    return html`
      <wa-tree @wa-selection-change=${this.#handleSelect}>
  <wa-tree-item>
    Deciduous
    <wa-tree-item>Birch</wa-tree-item>
    <wa-tree-item>
      Maple
      <wa-tree-item>Field maple</wa-tree-item>
      <wa-tree-item>Red maple</wa-tree-item>
      <wa-tree-item>Sugar maple</wa-tree-item>
    </wa-tree-item>
    <wa-tree-item>Oak</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Coniferous
    <wa-tree-item>Cedar</wa-tree-item>
    <wa-tree-item>Pine</wa-tree-item>
    <wa-tree-item>Spruce</wa-tree-item>
  </wa-tree-item>

  <wa-tree-item>
    Non-trees
    <wa-tree-item>Bamboo</wa-tree-item>
    <wa-tree-item>Cactus</wa-tree-item>
    <wa-tree-item>Fern</wa-tree-item>
  </wa-tree-item>
</wa-tree>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'efs-topic-tree': EfsTopicTree;
  }
}