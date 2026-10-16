import type { Presentation } from '../types/presentation.js';
import { dispatch, setPreviewMode } from '../editor.js';
import {
  updatePresentationName,
  savePresentation,
} from '../functions/presentation.js';
import { addSlide } from '../functions/slide.js';
import { Button } from './Button.js';
import { TextInput } from './TextInput.js';
import styles from './Toolbar.module.css';

type ToolbarProps = {
  presentation: Presentation;
};

function Toolbar({ presentation }: ToolbarProps) {
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

  return (
    <div className={styles.toolbar}>
      <TextInput
        value={presentation.name}
        placeholder="Название презентации"
        onChange={handleNameChange}
        className={styles.nameInput}
      />
      <Button text="+ Слайд" onClick={handleAddSlide} />
      <Button text="Сохранить" onClick={handleSave} />
      <Button text="Предпросмотр" onClick={handlePreview} />
    </div>
  );
}

export { Toolbar };