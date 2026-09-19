import { describe, it, expect } from 'vitest';
import { createPresentation, loadPresentation, savePresentation, 
    updatePresentationName, addSlide } from '../index.js';

describe('createPresentation', () => {
    it('Должен создавать презентацию со слайдом по умолчанию', () => {
        const presentation = createPresentation('Моя презентация');
        expect(presentation.name).toBe('Моя презентация');
        expect(presentation.slides.length).toBe(1);
    });
});

describe('updatePresentationName', () => {
    it('Должен обновлять имя презентации', () => {
        const presentation = createPresentation('Моя презентация');
        expect(presentation.name).toBe('Моя презентация');
        const updatedPresentation = updatePresentationName(presentation, 'Обновленная презентация');
        expect(updatedPresentation.name).toBe('Обновленная презентация');
    });
});

describe('savePresentation/loadPresentation', () => {
    it('Должен сохранять и загружать презентацию правильно', () => {
        const presentation = createPresentation('Моя презентация');
        const savedPresentation = savePresentation(presentation);
        const loadedPresentation = loadPresentation(savedPresentation);
        expect(loadedPresentation).toEqual(presentation);
    });
});

describe('addSlide', () => {
    it('Должен добавлять новый слайд в презентацию', () => {
        const presentation = createPresentation('Моя презентация');
        const firstSlideId = presentation.slides[0].id;
        const updatedPresentation = addSlide(presentation);
        expect(presentation.slides).toHaveLength(1);
        expect(updatedPresentation.slides).toHaveLength(2);
        expect(updatedPresentation.slides[1]).toBeDefined();
        expect(updatedPresentation.activeSlideId).toBe(firstSlideId);
    });
});
