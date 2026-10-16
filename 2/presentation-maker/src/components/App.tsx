import type { Presentation } from '../types/presentation.js';
import { getPreviewMode, setPreviewMode } from '../editor.js';
import { Toolbar } from './Toolbar.js';
import { SlideList } from './SlideList.js';
import { Workspace } from './Workspace.js';
import { PreviewOverlay } from './PreviewOverlay.js';
import styles from './App.module.css';

type AppProps = {
  presentation: Presentation;
};

function App({ presentation }: AppProps) {
  if (getPreviewMode()) {
    return (
      <PreviewOverlay
        presentation={presentation}
        onClose={() => setPreviewMode(false)}
      />
    );
  }

  return (
    <div className={styles.app}>
      <Toolbar presentation={presentation} />
      <div className={styles.body}>
        <SlideList presentation={presentation} />
        <Workspace presentation={presentation} />
      </div>
    </div>
  );
}

export { App };