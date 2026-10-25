import type { MouseEvent } from 'react';
import type { SlideObject as SlideObjectType } from '../types/objects.js';
import styles from './SlideObject.module.css';

type SlideObjectProps = {
  object: SlideObjectType;
  selected?: boolean;
  onClick?: (objectId: string, event: MouseEvent<HTMLElement>) => void;
  onMouseDown?: (objectId: string, event: MouseEvent<HTMLElement>) => void;
  onResizeMouseDown?: (objectId: string, event: MouseEvent<HTMLElement>) => void;
};

function SlideObject({
  object,
  selected = false,
  onClick,
  onMouseDown,
  onResizeMouseDown,
}: SlideObjectProps) {
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onClick?.(object.id, event);
  };

  const handleMouseDown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    onMouseDown?.(object.id, event);
  };

  const handleResizeMouseDown = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onResizeMouseDown?.(object.id, event);
  };

  return (
    <div
      className={`${styles.wrapper} ${selected ? styles.selected : ''}`}
      style={{
        left: `${object.x}px`,
        top: `${object.y}px`,
        width: `${object.width}px`,
        height: `${object.height}px`,
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
    >
      {object.type === 'text' ? (
        <div
          className={styles.text}
          style={{
            fontFamily: object.fontFamily,
            fontSize: `${object.fontSize}px`,
            color: object.fontColor,
          }}
        >
          {object.content}
        </div>
      ) : (
        <img
          src={object.url}
          alt=""
          draggable={false}
          className={styles.image}
        />
      )}
      {selected && (
        <div
          className={styles.handle}
          onMouseDown={handleResizeMouseDown}
        />
      )}
    </div>
  );
}

export { SlideObject };