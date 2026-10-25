import { getPreviewMode, setPreviewMode, getState } from '../editor.js';
import { useHistoryUI } from '../hooks/useHistoryUI.js';
import { Toolbar } from './Toolbar.js';
import { SlideList } from './SlideList.js';
import { Workspace } from './Workspace.js';
import { PreviewOverlay } from './PreviewOverlay.js';
import styles from './App.module.css';

function App() {
  const presentation = getState();
  const { canUndo, canRedo, onUndo, onRedo } = useHistoryUI();

  if (!presentation) return null;

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
      <Toolbar
        presentation={presentation}
        canUndo={canUndo}
        canRedo={canRedo}
        onUndo={onUndo}
        onRedo={onRedo}
      />
      <div className={styles.body}>
        <SlideList presentation={presentation} />
        <Workspace presentation={presentation} />
      </div>
    </div>
  );
}

export { App };