import { useState } from 'react';
import type { Presentation } from '../types/presentation.js';
import { SlidePreview } from './SlidePreview.js';
import { Button } from './Button.js';
import styles from './PreviewOverlay.module.css';

type PreviewOverlayProps = {
  presentation: Presentation;
  onClose: () => void;
};

function PreviewOverlay({ presentation, onClose }: PreviewOverlayProps) {
  const [index, setIndex] = useState(0);
  const slide = presentation.slides[index];
  const total = presentation.slides.length;

  const handlePrev = () => {
    setIndex((i) => Math.max(0, i - 1));
  };

  const handleNext = () => {
    setIndex((i) => Math.min(total - 1, i + 1));
  };

  if (!slide) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <SlidePreview slide={slide} />
      </div>
      <div className={styles.controls}>
        <Button
          text="Назад"
          onClick={handlePrev}
          className={index === 0 ? styles.disabled : ''}
        />
        <span className={styles.counter}>
          {index + 1} / {total}
        </span>
        <Button
          text="Далее"
          onClick={handleNext}
          className={index === total - 1 ? styles.disabled : ''}
        />
        <Button text="Закрыть" onClick={onClose} />
      </div>
    </div>
  );
}

export { PreviewOverlay };