import { describe, it, expect } from 'vitest';
import { createPresentation, updatePresentationName, savePresentation, loadPresentation } from '../index.js';

describe('createPresentation', () => {
    it('Должен создавать презентацию с правильными значениями по умолчанию', () => {
        const presentation = createPresentation('Моя презентация');
        expect(presentation.name).toBe('Моя презентация');
        expect(presentation.slides).toHaveLength(1);
        expect(presentation.activeSlideId).toBe(presentation.slides[0].id);
        expect(presentation.slides[0].name).toBe('Слайд 1');
        expect(presentation.slides[0].objects).toHaveLength(0);
        expect(presentation.slides[0].background).toEqual({ type: 'none' });
        expect(presentation.id).toBeDefined();
    });
});

describe('updatePresentationName', () => {
    it('Должен изменять название презентации', () => {
        const presentation = createPresentation('Старое название');
        const updated = updatePresentationName(presentation, 'Новое название');
        expect(presentation.name).toBe('Старое название');
        expect(updated.name).toBe('Новое название');
        expect(updated.id).toBe(presentation.id);
    });
});

describe('savePresentation/loadPresentation', () => {
    it('Должен сохранять и загружать презентацию из JSON', () => {
        const presentation = createPresentation('Тестовая презентация');
        const json = savePresentation(presentation);
        expect(typeof json).toBe('string');
        const loaded = loadPresentation(json);
        expect(loaded.name).toBe(presentation.name);
        expect(loaded.id).toBe(presentation.id);
        expect(loaded.slides).toHaveLength(presentation.slides.length);
        expect(loaded.activeSlideId).toBe(presentation.activeSlideId);
    });
});