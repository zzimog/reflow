type DragEventCallback = (props: {
  posX: number;
  posY: number;
  event: Event;
}) => void;

type UseDraggableProps = {
  target?: HTMLElement;
  posX?: number;
  posY?: number;
  //onDragStart(): void;
  //onDrag(): void;
  onDragEnd?: DragEventCallback;
};

export function useDraggable(node: HTMLElement, props?: UseDraggableProps) {
  let offsetX = props?.posX || 0;
  let offsetY = props?.posY || 0;
  let tempX = 0;
  let tempY = 0;

  function setPosition(x: number, y: number) {
    const target = props?.target ?? node;
    target.style.translate = `${x}px ${y}px`;
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
    props?.onDragEnd?.({
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
    event.stopPropagation();
  });

  setPosition(offsetX, offsetY);
  return node;
}
