import { describe, it, expect } from 'vitest';
import { createPresentation } from '../functions/presentation.js';
import {
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
} from '../functions/objects.js';

describe('Object Functions', () => {
  it('addTextObject: добавляет текстовый объект иммутабельно', () => {
    const p = createPresentation('Test');
    const slide = p.slides[0];
    const newSlide = addTextObject(slide, 'Hello', 10, 10, 100, 50, 'Arial', 16, '#000000');
    
    expect(newSlide.objects.length).toBe(1);
    expect(newSlide.objects[0].type).toBe('text');
    expect(slide.objects.length).toBe(0);
  });

  it('addImageObject: добавляет изображение иммутабельно', () => {
    const p = createPresentation('Test');
    const slide = p.slides[0];
    const newSlide = addImageObject(slide, 'img.png', 0, 0, 200, 200);
    
    expect(newSlide.objects.length).toBe(1);
    expect(newSlide.objects[0].type).toBe('image');
    expect(slide.objects.length).toBe(0);
  });

  it('moveObject: перемещает объект, не мутируя исходный', () => {
    const p = createPresentation('Test');
    let slide = addTextObject(p.slides[0], 'Hello', 10, 10, 100, 50, 'Arial', 16, '#000');
    const objId = slide.objects[0].id;

    const newSlide = moveObject(slide, objId, 50, 60);
    expect((newSlide.objects[0] as any).x).toBe(50);
    expect((newSlide.objects[0] as any).y).toBe(60);
    expect((slide.objects[0] as any).x).toBe(10);
  });

  it('resizeObject: изменяет размер объекта, не мутируя исходный', () => {
    const p = createPresentation('Test');
    let slide = addImageObject(p.slides[0], 'img.png', 0, 0, 100, 100);
    const objId = slide.objects[0].id;

    const newSlide = resizeObject(slide, objId, 200, 300);
    expect((newSlide.objects[0] as any).width).toBe(200);
    expect((newSlide.objects[0] as any).height).toBe(300);
    expect((slide.objects[0] as any).width).toBe(100);
  });

  it('updateTextObjectStyle: изменяет стиль текста, не мутируя исходный', () => {
    const p = createPresentation('Test');
    let slide = addTextObject(p.slides[0], 'Hello', 0, 0, 100, 50, 'Arial', 16, '#000');
    const objId = slide.objects[0].id;

    const newSlide = updateTextObjectStyle(slide, objId, 'Times New Roman', 24, '#ff0000');
    const updatedObj = newSlide.objects[0] as any;
    
    expect(updatedObj.fontFamily).toBe('Times New Roman');
    expect(updatedObj.fontSize).toBe(24);
    expect(updatedObj.fontColor).toBe('#ff0000');
    expect((slide.objects[0] as any).fontFamily).toBe('Arial');
  });

  it('removeObject: удаляет объект иммутабельно', () => {
    const p = createPresentation('Test');
    let slide = addTextObject(p.slides[0], 'Hello', 0, 0, 100, 50, 'Arial', 16, '#000');
    const objId = slide.objects[0].id;

    const newSlide = removeObject(slide, objId);
    expect(newSlide.objects.length).toBe(0);
    expect(slide.objects.length).toBe(1);
  });
});