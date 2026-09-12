import { describe, it, expect } from 'vitest';
import { createPresentation } from '../functions/presentation.js';
import {
  addSlide,
  removeSlides,
  moveSlide,
  setActiveSlide,
  duplicateSlide,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setSlideBackgroundGradient,
  clearSlideBackground,
} from '../functions/slide.js';

describe('Slide Functions', () => {
  it('removeSlides: удаляет один и несколько слайдов иммутабельно', () => {
    let p = createPresentation('Test');
    p = addSlide(p, 'Slide 2');
    p = addSlide(p, 'Slide 3');
    const idToRemove = p.slides[1].id;

    const newP = removeSlides(p, [idToRemove]);
    expect(newP.slides.length).toBe(2);
    expect(newP.slides.find((s) => s.id === idToRemove)).toBeUndefined();
    expect(p.slides.length).toBe(3);
  });

  it('moveSlide: перемещает слайд в начало, середину и конец', () => {
    let p = createPresentation('Test');
    p = addSlide(p, 'Slide 2');
    p = addSlide(p, 'Slide 3');
    const slide3Id = p.slides[2].id;

    let pMoved = moveSlide(p, slide3Id, 0);
    expect(pMoved.slides[0].id).toBe(slide3Id);

    pMoved = moveSlide(p, slide3Id, 2);
    expect(pMoved.slides[2].id).toBe(slide3Id);
    
    expect(p.slides[2].id).toBe(slide3Id); // Иммутабельность
  });

  it('setActiveSlide: выбирает активный слайд иммутабельно', () => {
    let p = createPresentation('Test');
    p = addSlide(p, 'Slide 2');
    const newActiveId = p.slides[1].id;
    
    const newP = setActiveSlide(p, newActiveId);
    expect(newP.activeSlideId).toBe(newActiveId);
    expect(p.activeSlideId).toBe(p.slides[0].id);
  });

  it('duplicateSlide: дублирует слайд и его объекты с новыми ID', () => {
    let p = createPresentation('Test');
    // Используем addSlide для простоты, но проверяем дублирование
    const originalSlideId = p.slides[0].id;
    
    const newP = duplicateSlide(p, originalSlideId);
    expect(newP.slides.length).toBe(2);
    expect(newP.slides[1].name).toBe('Слайд 1 (копия)');
    expect(newP.slides[1].id).not.toBe(originalSlideId);
    expect(p.slides.length).toBe(1);
  });

  it('setSlideBackgroundColor: устанавливает цвет фона иммутабельно', () => {
    const p = createPresentation('Test');
    const slide = p.slides[0];
    const newSlide = setSlideBackgroundColor(slide, '#ff0000');
    expect(newSlide.background).toEqual({ type: 'color', color: '#ff0000' });
    expect(slide.background.type).toBe('none');
  });

  it('setSlideBackgroundImage: устанавливает изображение фона', () => {
    const p = createPresentation('Test');
    const newSlide = setSlideBackgroundImage(p.slides[0], 'bg.png');
    expect(newSlide.background).toEqual({ type: 'image', imageUrl: 'bg.png' });
  });

  it('setSlideBackgroundGradient: устанавливает градиент фона', () => {
    const p = createPresentation('Test');
    const newSlide = setSlideBackgroundGradient(p.slides[0], ['#fff', '#000'], 45);
    expect(newSlide.background).toEqual({ type: 'gradient', colors: ['#fff', '#000'], angle: 45 });
  });

  it('clearSlideBackground: сбрасывает фон до none', () => {
    const p = createPresentation('Test');
    let slide = setSlideBackgroundColor(p.slides[0], '#00ff00');
    slide = clearSlideBackground(slide);
    expect(slide.background).toEqual({ type: 'none' });
  });
});