import type { CSSProperties, MouseEvent, RefObject } from 'react';
import type { Slide } from '../types/slide.js';
import { SlideObject } from './SlideObject.js';
import styles from './SlidePreview.module.css';

type SlidePreviewProps = {
  slide: Slide;
  selectedIds?: string[];
  containerRef?: RefObject<HTMLDivElement | null>;
  onObjectClick?: (objectId: string, event: MouseEvent<HTMLElement>) => void;
  onObjectMouseDown?: (objectId: string, event: MouseEvent<HTMLElement>) => void;
  onObjectResizeMouseDown?: (objectId: string, event: MouseEvent<HTMLElement>) => void;
  onContainerClick?: () => void;
};

function getBackgroundStyle(slide: Slide): CSSProperties {
  const bg = slide.background;

  switch (bg.type) {
    case 'color':
      return { backgroundColor: bg.color };
    case 'image':
      return {
        backgroundImage: `url(${bg.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    case 'gradient':
      return {
        backgroundImage: `linear-gradient(${bg.angle ?? 0}deg, ${bg.colors.join(', ')})`,
      };
    case 'none':
    default:
      return {};
  }
}

function SlidePreview({
  slide,
  selectedIds = [],
  containerRef,
  onObjectClick,
  onObjectMouseDown,
  onObjectResizeMouseDown,
  onContainerClick,
}: SlidePreviewProps) {
  const handleContainerClick = () => {
    onContainerClick?.();
  };

  return (
    <div
      ref={containerRef}
      className={styles.slide}
      style={getBackgroundStyle(slide)}
      onClick={handleContainerClick}
    >
      {slide.objects.map((obj) => (
        <SlideObject
          key={obj.id}
          object={obj}
          selected={selectedIds.includes(obj.id)}
          onClick={onObjectClick}
          onMouseDown={onObjectMouseDown}
          onResizeMouseDown={onObjectResizeMouseDown}
        />
      ))}
    </div>
  );
}

export { SlidePreview };