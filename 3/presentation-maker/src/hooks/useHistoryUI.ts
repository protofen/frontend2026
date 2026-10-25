import { useCallback, useEffect, useState } from 'react';
import {
  undo,
  redo,
  getCanUndo,
  getCanRedo,
  addEditorChangeHandler,
} from '../editor.js';

type HistoryUI = {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

function useHistoryUI(): HistoryUI {
  const [canUndo, setCanUndo] = useState<boolean>(getCanUndo());
  const [canRedo, setCanRedo] = useState<boolean>(getCanRedo());

  useEffect(() => {
    const sync = () => {
      setCanUndo(getCanUndo());
      setCanRedo(getCanRedo());
    };

    sync();
    const unsubscribe = addEditorChangeHandler(sync);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMod = event.ctrlKey || event.metaKey;
      if (!isMod) return;

      const key = event.key.toLowerCase();

      if (key === 'z' && !event.shiftKey) {
        event.preventDefault();
        undo();
        return;
      }

      if ((key === 'z' && event.shiftKey) || key === 'y') {
        event.preventDefault();
        redo();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onUndo = useCallback(() => {
    undo();
  }, []);

  const onRedo = useCallback(() => {
    redo();
  }, []);

  return { canUndo, canRedo, onUndo, onRedo };
}

export { useHistoryUI };