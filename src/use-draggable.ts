type UseDraggableCallback = (props: {
  element: HTMLElement;
  posX: number;
  posY: number;
  event: Event;
}) => void;

type UseDraggableProps = {
  posX?: number;
  posY?: number;
  //onDragStart(): void;
  //onDrag(): void;
  onDragEnd: UseDraggableCallback;
};

export function useDraggable(node: HTMLElement, props?: UseDraggableProps) {
  const { posX = 0, posY = 0 } = props ?? {};
  let offsetX = posX;
  let offsetY = posY;
  let tempX = 0;
  let tempY = 0;

  function setPosition(x: number, y: number) {
    node.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

  function handlePointerMove(event: PointerEvent) {
    const { clientX, clientY } = event;
    offsetX -= tempX - clientX;
    offsetY -= tempY - clientY;
    tempX = clientX;
    tempY = clientY;

    setPosition(offsetX, offsetY);
  }

  function handlePointerUp(event: PointerEvent) {
    props?.onDragEnd({
      element: node,
      posX: offsetX,
      posY: offsetY,
      event,
    });

    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp);
  }

  node.addEventListener('pointerdown', (event: PointerEvent) => {
    const { clientX, clientY } = event;
    tempX = clientX;
    tempY = clientY;

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  });

  setPosition(offsetX, offsetY);
  return node;
}
