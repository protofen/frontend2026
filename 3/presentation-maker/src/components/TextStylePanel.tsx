import { useEffect, useState } from 'react';
import type { TextObject } from '../types/objects.js';
import { dispatch } from '../editor.js';
import { updateTextStyle } from '../functions/objects.js';
import { Button } from './Button.js';
import styles from './TextStylePanel.module.css';

type TextStylePanelProps = {
  slideId: string;
  object: TextObject;
};

const FONTS = [
  'Arial',
  'Times New Roman',
  'Georgia',
  'Verdana',
  'Courier New',
  'Tahoma',
  'Trebuchet MS',
  'Comic Sans MS',
];

const MIN_FONT_SIZE = 8;
const MAX_FONT_SIZE = 200;

function clampFontSize(value: number): number {
  if (Number.isNaN(value)) return MIN_FONT_SIZE;
  const rounded = Math.round(value);
  return Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, rounded));
}

function TextStylePanel({ slideId, object }: TextStylePanelProps) {
  const [fontFamily, setFontFamily] = useState(object.fontFamily);
  const [fontSize, setFontSize] = useState(object.fontSize);
  const [fontColor, setFontColor] = useState(object.fontColor);

  useEffect(() => {
    setFontFamily(object.fontFamily);
    setFontSize(object.fontSize);
    setFontColor(object.fontColor);
  }, [object.id, object.fontFamily, object.fontSize, object.fontColor]);

  const apply = (
    nextFontFamily: string,
    nextFontSize: number,
    nextFontColor: string
  ) => {
    dispatch(updateTextStyle, {
      slideId,
      objectId: object.id,
      fontFamily: nextFontFamily,
      fontSize: nextFontSize,
      fontColor: nextFontColor,
    });
  };

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    apply(value, fontSize, fontColor);
  };

  const handleFontSizeChange = (value: number) => {
    const clamped = clampFontSize(value);
    setFontSize(clamped);
    apply(fontFamily, clamped, fontColor);
  };

  const handleFontColorChange = (value: string) => {
    setFontColor(value);
    apply(fontFamily, fontSize, value);
  };

  const fontsToShow = FONTS.includes(fontFamily)
    ? FONTS
    : [fontFamily, ...FONTS];

  return (
    <div className={styles.panel}>
      <h3>Свойства текста</h3>
      <label>
        Шрифт:
        <select
          className={styles.select}
          value={fontFamily}
          onChange={(e) => handleFontFamilyChange(e.target.value)}
        >
          {fontsToShow.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
      </label>
      <label>
        Размер шрифта:
        <div className={styles.sizeRow}>
          <Button
            text="-"
            onClick={() => handleFontSizeChange(fontSize - 1)}
          />
          <input
            className={styles.number}
            type="number"
            min={MIN_FONT_SIZE}
            max={MAX_FONT_SIZE}
            value={fontSize}
            onChange={(e) => handleFontSizeChange(Number(e.target.value))}
          />
          <Button
            text="+"
            onClick={() => handleFontSizeChange(fontSize + 1)}
          />
        </div>
      </label>
      <label>
        Цвет шрифта:
        <input
          className={styles.color}
          type="color"
          value={fontColor}
          onChange={(e) => handleFontColorChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export { TextStylePanel };