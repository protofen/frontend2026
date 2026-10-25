import type { Presentation } from '../types/presentation.js';
import { dispatch } from '../editor.js';
import { setActiveSlide, removeSlides } from '../functions/slide.js';
import { SlidePreview } from './SlidePreview.js';
import styles from './SlideList.module.css';

type SlideListProps = {
  presentation: Presentation;
};

function SlideList({ presentation }: SlideListProps) {
  const handleSelect = (slideId: string) => {
    dispatch(setActiveSlide, slideId);
  };

  const handleContextMenu = (e: React.MouseEvent, slideId: string) => {
    e.preventDefault();
    if (confirm('Удалить слайд?')) {
      dispatch(removeSlides, [slideId]);
    }
  };

  return (
    <div className={styles.list}>
      {presentation.slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`${styles.item} ${
            slide.id === presentation.activeSlideId ? styles.active : ''
          }`}
          onClick={() => handleSelect(slide.id)}
          onContextMenu={(e) => handleContextMenu(e, slide.id)}
        >
          <div className={styles.number}>{index + 1}</div>
          <div className={styles.thumbnail}>
            <SlidePreview slide={slide} />
          </div>
          <div className={styles.name}>{slide.name}</div>
        </div>
      ))}
    </div>
  );
}

export { SlideList };