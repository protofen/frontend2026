import type { Slide } from '../types/slide.js';
import { dispatch } from '../editor.js';
import { setSlideBackgroundColor, setSlideBackgroundImage } from '../functions/slide.js';
import { addTextObject } from '../functions/objects.js';
import { Button } from './Button.js';
import { TextInput } from './TextInput.js';
import styles from './SlideProperties.module.css';

type SlidePropertiesProps = {
  slide: Slide;
};

function SlideProperties({ slide }: SlidePropertiesProps) {
  const handleColorChange = (value: string) => {
    dispatch(setSlideBackgroundColor, { slideId: slide.id, color: value });
  };

  const handleAddText = () => {
    const content = prompt('Введите текст:');
    if (!content) return;

    dispatch(addTextObject, {
      slideId: slide.id,
      content,
      x: 50,
      y: 50,
      width: 300,
      height: 40,
      fontFamily: 'Arial',
      fontSize: 24,
      fontColor: '#000000',
    });
  };

  const handleAddImage = () => {
    const url = prompt('Введите URL изображения:');
    if (!url) return;

    dispatch(setSlideBackgroundImage, { slideId: slide.id, imageUrl: url });
  };

  return (
    <div className={styles.panel}>
      <h3>Свойства слайда</h3>
      <label>
        Цвет фона:
        <TextInput
          type="color"
          value={slide.background.type === 'color' ? slide.background.color : '#ffffff'}
          onChange={handleColorChange}
        />
      </label>
      <Button text="Добавить текст" onClick={handleAddText} />
      <Button text="Фоновое изображение" onClick={handleAddImage} />
    </div>
  );
}

export { SlideProperties };