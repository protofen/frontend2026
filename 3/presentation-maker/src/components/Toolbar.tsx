import type { Presentation } from '../types/presentation.js';
import { dispatch, setPreviewMode } from '../editor.js';
import {
  updatePresentationName,
  savePresentation,
} from '../functions/presentation.js';
import { addSlide } from '../functions/slide.js';
import { usePdfExport } from '../hooks/usePdfExport.tsx';
import { Button } from './Button.js';
import { TextInput } from './TextInput.js';
import styles from './Toolbar.module.css';

type ToolbarProps = {
  presentation: Presentation;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

function Toolbar({
  presentation,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
}: ToolbarProps) {
  const { exportToPdf } = usePdfExport();

  const handleNameChange = (value: string) => {
    dispatch(updatePresentationName, value);
  };

  const handleAddSlide = () => {
    dispatch(addSlide, `Слайд ${presentation.slides.length + 1}`);
  };

  const handleSave = () => {
    const json = savePresentation(presentation);
    const blob = new Blob([json], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${presentation.name}.json`;
    link.click();
  };

  const handlePreview = () => {
    setPreviewMode(true);
  };

  const handleExportPdf = () => {
    void exportToPdf(presentation);
  };

  return (
    <div className={styles.toolbar}>
      <TextInput
        value={presentation.name}
        placeholder="Название презентации"
        onChange={handleNameChange}
        className={styles.nameInput}
      />
      <Button text="↩ Отменить" onClick={onUndo} disabled={!canUndo} />
      <Button text="↪ Повторить" onClick={onRedo} disabled={!canRedo} />
      <Button text="+ Слайд" onClick={handleAddSlide} />
      <Button text="Сохранить" onClick={handleSave} />
      <Button text="Экспорт PDF" onClick={handleExportPdf} />
      <Button text="Предпросмотр" onClick={handlePreview} />
    </div>
  );
}

export { Toolbar };