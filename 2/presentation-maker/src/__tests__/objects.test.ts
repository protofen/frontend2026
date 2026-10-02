import { describe, it, expect } from 'vitest';
import { createPresentation } from '../functions/presentation.js';
import { addTextObject, addImageObject, removeObject, moveObject, resizeObject, updateTextObjectStyle } from '../functions/objects.js';

describe('addTextObject', () => {
  it('должна добавить текстовый объект на слайд', () => {
    const presentation = createPresentation('Test');
    const slide = presentation.slides[0];
    const updated = addTextObject(slide, 'Testik', 10, 20, 100, 50, 'Arial', 24, '#000');
    expect(updated.objects.length).toBe(1);
    const obj = updated.objects[0];
    if (obj.type === 'text') {
      expect(obj.content).toBe('Testik');
      expect(obj.x).toBe(10);
      expect(obj.y).toBe(20);
    }
    expect(slide.objects.length).toBe(0);
  });
});

describe('addImageObject', () => {
  it('должна добавить изображение на слайд', () => {
    const presentation = createPresentation('Test');
    const slide = presentation.slides[0];
    const updated = addImageObject(slide, '../img.png', 10, 20, 200, 150);
    expect(updated.objects.length).toBe(1);
    const obj = updated.objects[0];
    if (obj.type === 'image') {
      expect(obj.url).toBe('../img.png');
      expect(obj.width).toBe(200);
    }
    expect(slide.objects.length).toBe(0);
  });
});

describe('moveObject', () => {
  it('должна переместить объект на новые координаты', () => {
    const presentation = createPresentation('Test');
    const slide = addTextObject(presentation.slides[0], 'Testik', 0, 0, 100, 50, 'Arial', 24, '#000');
    const objectId = slide.objects[0].id;
    const updated = moveObject(slide, objectId, 100, 200);
    const obj = updated.objects.find((o) => o.id === objectId);
    expect(obj?.x).toBe(100);
    expect(obj?.y).toBe(200);
    const originalObj = slide.objects.find((o) => o.id === objectId);
    expect(originalObj?.x).toBe(0);
    expect(originalObj?.y).toBe(0);
  });
});

describe('resizeObject', () => {
  it('должна изменить размеры объекта', () => {
    const presentation = createPresentation('Test');
    const slide = addTextObject(presentation.slides[0], 'Testik', 0, 0, 100, 50, 'Arial', 24, '#000');
    const objectId = slide.objects[0].id;
    const updated = resizeObject(slide, objectId, 300, 150);
    const obj = updated.objects.find((o) => o.id === objectId);
    expect(obj?.width).toBe(300);
    expect(obj?.height).toBe(150);
    const originalObj = slide.objects.find((o) => o.id === objectId);
    expect(originalObj?.width).toBe(100);
    expect(originalObj?.height).toBe(50);
  });
});

describe('updateTextObjectStyle', () => {
  it('должна изменить стиль текста', () => {
    const presentation = createPresentation('Test');
    const slide = addTextObject(presentation.slides[0], 'Testik', 0, 0, 100, 50, 'Arial', 24, '#000');
    const objectId = slide.objects[0].id;
    const updated = updateTextObjectStyle(slide, objectId, 'Times', 32, '#001265');

    const obj = updated.objects.find((o) => o.id === objectId);
    if (obj?.type === 'text') {
      expect(obj.fontFamily).toBe('Times');
      expect(obj.fontSize).toBe(32);
      expect(obj.fontColor).toBe('#001265');
    }
    
    const originalObj = slide.objects.find((o) => o.id === objectId);
    if (originalObj?.type === 'text') {
      expect(originalObj.fontFamily).toBe('Arial');
      expect(originalObj.fontSize).toBe(24);
      expect(originalObj.fontColor).toBe('#000');
    }
  });
});

describe('removeObject', () => {
  it('должна удалить объект по id', () => {
    const presentation = createPresentation('Test');
    const slide = addTextObject(presentation.slides[0], 'Testik', 0, 0, 100, 50, 'Arial', 24, '#000');
    const objectId = slide.objects[0].id;
    const updated = removeObject(slide, objectId);
    expect(updated.objects.length).toBe(0);
    expect(slide.objects.length).toBe(1);
  });
});