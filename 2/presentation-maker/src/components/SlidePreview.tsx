import type { CSSProperties, MouseEvent } from 'react';
import type { Slide } from '../types/slide.js';
import { SlideObject } from './SlideObject.js';
import styles from './SlidePreview.module.css';

type SlidePreviewProps = {
  slide: Slide;
  selectedIds?: string[];
  onObjectClick?: (objectId: string, event: MouseEvent<HTMLElement>) => void;
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
  onObjectClick,
  onContainerClick,
}: SlidePreviewProps) {
  return (
    <div
      className={styles.slide}
      style={getBackgroundStyle(slide)}
      onClick={onContainerClick}
    >
      {slide.objects.map((obj) => (
        <SlideObject
          key={obj.id}
          object={obj}
          selected={selectedIds.includes(obj.id)}
          onClick={onObjectClick ?? (() => {})}
        />
      ))}
    </div>
  );
}

export { SlidePreview };