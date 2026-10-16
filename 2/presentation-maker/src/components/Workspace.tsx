import type { Presentation } from '../types/presentation.js';
import { SlidePreview } from './SlidePreview.js';
import { SlideProperties } from './SlideProperties.js';
import styles from './Workspace.module.css';

type WorkspaceProps = {
  presentation: Presentation;
};

function Workspace({ presentation }: WorkspaceProps) {
  const activeSlide = presentation.slides.find(
    (s) => s.id === presentation.activeSlideId
  );

  if (!activeSlide) {
    return <div className={styles.workspace}>Нет активного слайда</div>;
  }

  return (
    <div className={styles.workspace}>
      <div className={styles.canvas}>
        <SlidePreview slide={activeSlide} />
      </div>
      <SlideProperties slide={activeSlide} />
    </div>
  );
}

export { Workspace };