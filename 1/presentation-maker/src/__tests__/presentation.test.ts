import { describe, it, expect } from 'vitest';
import {
  createPresentation,
  updatePresentationName,
  savePresentation,
  loadPresentation,
} from '../functions/presentation.js';
import { addSlide } from '../functions/slide.js';

describe('Presentation Functions', () => {
  it('createPresentation: создает презентацию с правильными значениями по умолчанию', () => {
    const presentation = createPresentation('My Presentation');
    expect(presentation.name).toBe('My Presentation');
    expect(presentation.slides.length).toBe(1);
    expect(presentation.activeSlideId).toBe(presentation.slides[0].id);
  });

  it('updatePresentationName: изменяет название иммутабельно', () => {
    const p = createPresentation('Old Name');
    const newP = updatePresentationName(p, 'New Name');
    expect(p.name).toBe('Old Name');
    expect(newP.name).toBe('New Name');
    expect(p).not.toBe(newP);
  });

  it('savePresentation / loadPresentation: корректная сериализация и десериализация', () => {
    const p = createPresentation('Serialize Test');
    const json = savePresentation(p);
    const loaded = loadPresentation(json);
    expect(loaded.name).toBe('Serialize Test');
    expect(loaded.slides.length).toBe(1);
  });

  it('addSlide: добавляет слайд, активный слайд остается первым', () => {
    const p = createPresentation('Test');
    const newP = addSlide(p, 'Slide 2');
    expect(newP.slides.length).toBe(2);
    expect(newP.activeSlideId).toBe(p.slides[0].id);
    expect(p.slides.length).toBe(1); // Иммутабельность
  });
});