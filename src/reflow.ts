import { StateMap } from './state-map';
import { useDraggable } from './use-draggable';

const ATTRIBUTE_NAME = 'data-reflow';

type NodeProps = {
  title?: string;
  content: string | HTMLElement;
  posX?: number;
  posY?: number;
  data?: unknown;
};

function createElement(tag: string, name: string) {
  const el = document.createElement(tag ?? 'div');
  el.setAttribute(ATTRIBUTE_NAME, name);
  return el;
}

export class Reflow {
  viewport: HTMLElement;
  nodes: StateMap<Element, NodeProps>;

  constructor(root: HTMLElement) {
    const viewport = createElement('div', 'viewport');
    viewport.tabIndex = -1;
    this.viewport = viewport;
    this.nodes = new StateMap();

    root.setAttribute(ATTRIBUTE_NAME, 'root');
    root.appendChild(viewport);
  }

  export() {
    const nodes = [...this.viewport.children];
    const allProps = nodes.reduce((prev, node) => {
      const props = this.nodes.get(node);
      return props ? [...prev, props] : prev;
    }, [] as object[]);

    return JSON.stringify(allProps);
  }

  import(data: string) {
    const allProps = JSON.parse(data);
    for (const props of allProps) {
      this.addNode(props);
    }
  }

  addNode(props: NodeProps) {
    const { title, content, posX, posY } = props;
    const node = createElement('div', 'node');
    node.tabIndex = 0;

    if (title) {
      const nodeTitle = createElement('div', 'node-title');
      nodeTitle.innerText = title;
      node.appendChild(nodeTitle);
    }

    if (typeof content === 'string') {
      const nodeBody = createElement('div', 'node-body');
      nodeBody.innerText = content;
      node.appendChild(nodeBody);
    } else {
      node.appendChild(content);
    }

    node.addEventListener('pointerdown', (event) => {
      const parent = node.parentNode;
      if (node !== parent?.lastChild) {
        parent?.appendChild(node);
      }

      node.focus({ preventScroll: true });
      event.preventDefault();
    });

    useDraggable(node, {
      posX,
      posY,
      onDragEnd: ({ posX, posY }) => {
        this.nodes.update(node, {
          posX,
          posY,
        });
      },
    });

    this.viewport.appendChild(node);
    this.nodes.set(node, props);
  }
}
