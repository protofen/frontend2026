import { useCallback, useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { Slide } from '../types/slide.js';
import { dispatch } from '../editor.js';
import {
  setBackgroundColor,
  setBackgroundImage,
  setBackgroundGradient,
  clearBackground,
} from '../functions/slide.js';
import { addText, addImage } from '../functions/objects.js';
import { Button } from './Button.js';
import styles from './SlideProperties.module.css';

type SlidePropertiesProps = {
  slide: Slide;
  hasSelection: boolean;
};

type BackgroundMode = 'color' | 'image' | 'gradient';

function SlideProperties({ slide, hasSelection }: SlidePropertiesProps) {
  const imageFileRef = useRef<HTMLInputElement | null>(null);
  const backgroundFileRef = useRef<HTMLInputElement | null>(null);

  const [bgMode, setBgMode] = useState<BackgroundMode>('color');
  const [solidColor, setSolidColor] = useState('#ffffff');
  const [gradientMode, setGradientMode] = useState<'linear' | 'radial'>('linear');
  const [gradientColor1, setGradientColor1] = useState('#ffffff');
  const [gradientColor2, setGradientColor2] = useState('#000000');
  const [gradientAngle, setGradientAngle] = useState(0);

  useEffect(() => {
    const bg = slide.background;
    if (bg.type === 'color') {
      setBgMode('color');
      setSolidColor(bg.color);
    } else if (bg.type === 'image') {
      setBgMode('image');
    } else if (bg.type === 'gradient') {
      setBgMode('gradient');
      setGradientMode(bg.mode);
      setGradientColor1(bg.colors[0] ?? '#ffffff');
      setGradientColor2(bg.colors[1] ?? '#000000');
      setGradientAngle(bg.angle ?? 0);
    } else {
      setBgMode('color');
    }
  }, [slide.id, slide.background]);

  const handleSolidColorChange = (value: string) => {
    setSolidColor(value);
    setBgMode('color');
    dispatch(setBackgroundColor, { slideId: slide.id, color: value });
  };

  const applyGradient = (
    c1: string,
    c2: string,
    angle: number,
    mode: 'linear' | 'radial'
  ) => {
    dispatch(setBackgroundGradient, {
      slideId: slide.id,
      colors: [c1, c2],
      angle,
      mode,
    });
  };

  const handleBackgroundFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const file = input.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== 'string') return;
        setBgMode('image');
        dispatch(setBackgroundImage, { slideId: slide.id, src: result });
      };
      reader.readAsDataURL(file);

      input.value = '';
    },
    [slide.id]
  );

  const handleClearBackground = () => {
    dispatch(clearBackground, { slideId: slide.id });
  };

  const handleAddText = () => {
    const content = prompt('Введите текст:');
    if (!content) return;

    dispatch(addText, {
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

  const handleAddImageClick = () => {
    imageFileRef.current?.click();
  };

  const handleImageFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target;
      const file = input.files?.[0];
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        input.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        if (typeof result !== 'string') return;
        dispatch(addImage, {
          slideId: slide.id,
          imageUrl: result,
          x: 200,
          y: 150,
          width: 300,
          height: 200,
        });
      };
      reader.readAsDataURL(file);

      input.value = '';
    },
    [slide.id]
  );

  return (
    <div className={styles.panel}>
      <h3>Свойства слайда</h3>

      <Button text="Добавить текст" onClick={handleAddText} />
      <Button text="Добавить изображение" onClick={handleAddImageClick} />
      <input
        ref={imageFileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageFileChange}
      />

      {!hasSelection && (
        <>
          <h3>Фон слайда</h3>

          <div className={styles.tabs}>
            <Button
              text="Цвет"
              onClick={() => setBgMode('color')}
              className={bgMode === 'color' ? styles.activeTab : ''}
            />
            <Button
              text="Картинка"
              onClick={() => setBgMode('image')}
              className={bgMode === 'image' ? styles.activeTab : ''}
            />
            <Button
              text="Градиент"
              onClick={() => setBgMode('gradient')}
              className={bgMode === 'gradient' ? styles.activeTab : ''}
            />
          </div>

          {bgMode === 'color' && (
            <label>
              Цвет:
              <input
                type="color"
                className={styles.color}
                value={solidColor}
                onChange={(e) => handleSolidColorChange(e.target.value)}
              />
            </label>
          )}

          {bgMode === 'image' && (
            <div className={styles.imageBlock}>
              <Button
                text="Выбрать файл"
                onClick={() => backgroundFileRef.current?.click()}
              />
              <input
                ref={backgroundFileRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleBackgroundFileChange}
              />
            </div>
          )}

          {bgMode === 'gradient' && (
            <div className={styles.gradientBlock}>
              <label>
                Тип:
                <select
                  className={styles.select}
                  value={gradientMode}
                  onChange={(e) => {
                    const mode = e.target.value as 'linear' | 'radial';
                    setGradientMode(mode);
                    applyGradient(gradientColor1, gradientColor2, gradientAngle, mode);
                  }}
                >
                  <option value="linear">Линейный</option>
                  <option value="radial">Радиальный</option>
                </select>
              </label>
              <label>
                Цвет 1:
                <input
                  type="color"
                  className={styles.color}
                  value={gradientColor1}
                  onChange={(e) => {
                    const value = e.target.value;
                    setGradientColor1(value);
                    applyGradient(value, gradientColor2, gradientAngle, gradientMode);
                  }}
                />
              </label>
              <label>
                Цвет 2:
                <input
                  type="color"
                  className={styles.color}
                  value={gradientColor2}
                  onChange={(e) => {
                    const value = e.target.value;
                    setGradientColor2(value);
                    applyGradient(gradientColor1, value, gradientAngle, gradientMode);
                  }}
                />
              </label>
              <label>
                Угол: {gradientAngle}°
                <input
                  className={styles.range}
                  type="range"
                  min={0}
                  max={360}
                  value={gradientAngle}
                  onChange={(e) => {
                    const angle = Number(e.target.value);
                    setGradientAngle(angle);
                    applyGradient(gradientColor1, gradientColor2, angle, gradientMode);
                  }}
                />
              </label>
            </div>
          )}

          <Button text="Убрать фон" onClick={handleClearBackground} />
        </>
      )}
    </div>
  );
}

export { SlideProperties };