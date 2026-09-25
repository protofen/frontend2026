import { describe, it, expect } from 'vitest';
import { createPresentation, addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide, setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground } from '../index.js';

describe('addSlide', () => {
    it('Должен добавлять новый слайд в презентацию', () => {
        const presentation = createPresentation('Моя презентация');
        expect(presentation.slides).toHaveLength(1);
        const updated = addSlide(presentation, 'Второй слайд');
        expect(presentation.slides).toHaveLength(1);
        expect(updated.slides).toHaveLength(2);
        expect(updated.slides[1].name).toBe('Второй слайд');
        expect(updated.activeSlideId).toBe(updated.slides[1].id);
    });

    it('Должен добавлять слайд с именем по умолчанию', () => {
        const presentation = createPresentation('Моя презентация');
        const updated = addSlide(presentation);
        expect(updated.slides[1].name).toBe('Слайд 2');
    });
});

describe('removeSlides', () => {
    it('Должен удалять слайды по массиву id', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecond = addSlide(presentation, 'Второй слайд');
        const withThird = addSlide(withSecond, 'Третий слайд');
        expect(withThird.slides).toHaveLength(3);
        const idToRemove = withThird.slides[1].id;
        const updated = removeSlides(withThird, [idToRemove]);
        expect(withThird.slides).toHaveLength(3);
        expect(updated.slides).toHaveLength(2);
        expect(updated.slides.find(s => s.id === idToRemove)).toBeUndefined();
    });

    it('Должен переключать активный слайд, если удалён текущий активный', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecond = addSlide(presentation, 'Второй слайд');
        expect(withSecond.activeSlideId).toBe(withSecond.slides[1].id);
        const updated = removeSlides(withSecond, [withSecond.slides[1].id]);
        expect(updated.activeSlideId).toBe(updated.slides[0].id);
    });
});

describe('moveSlide', () => {
    it('Должен перемещать слайд на новую позицию', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecond = addSlide(presentation, 'Второй слайд');
        const withThird = addSlide(withSecond, 'Третий слайд');
        const firstId = withThird.slides[0].id;
        const updated = moveSlide(withThird, firstId, 2);
        expect(withThird.slides[0].id).toBe(firstId);
        expect(updated.slides[2].id).toBe(firstId);
    });
});

describe('setActiveSlide', () => {
    it('Должен устанавливать активный слайд', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecond = addSlide(presentation, 'Второй слайд');
        const updated = setActiveSlide(withSecond, withSecond.slides[0].id);
        expect(updated.activeSlideId).toBe(withSecond.slides[0].id);
        expect(withSecond.activeSlideId).toBe(withSecond.slides[1].id);
    });

    it('Не должен менять активный слайд, если ID не существует', () => {
        const presentation = createPresentation('Моя презентация');
        const updated = setActiveSlide(presentation, 'non-existent-id');
        expect(updated.activeSlideId).toBe(presentation.activeSlideId);
    });
});

describe('duplicateSlide', () => {
    it('Должен дублировать слайд и делать копию активной', () => {
        const presentation = createPresentation('Моя презентация');
        const updated = duplicateSlide(presentation, presentation.slides[0].id);
        expect(presentation.slides).toHaveLength(1);
        expect(updated.slides).toHaveLength(2);
        expect(updated.slides[1].name).toBe('Слайд 1 (копия)');
        expect(updated.activeSlideId).toBe(updated.slides[1].id);
        expect(updated.slides[0].id).not.toBe(updated.slides[1].id);
    });
});

describe('setSlideBackgroundColor', () => {
    it('Должен устанавливать цвет фона слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        const updated = setSlideBackgroundColor(slide, '#001488');
        expect(slide.background).toEqual({ type: 'none' });
        expect(updated.background).toEqual({ type: 'color', color: '#001488' });
    });
});

describe('setSlideBackgroundImage', () => {
    it('Должен устанавливать изображение как фон слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        const updated = setSlideBackgroundImage(slide, 'background.png');
        expect(slide.background).toEqual({ type: 'none' });
        expect(updated.background).toEqual({ type: 'image', imageUrl: 'background.png' });
    });
});

describe('setSlideBackgroundGradient', () => {
    it('Должен устанавливать градиент как фон слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        const updated = setSlideBackgroundGradient(slide, ['#001488', '#000000'], 45);
        expect(slide.background).toEqual({ type: 'none' });
        expect(updated.background).toEqual({ type: 'gradient', colors: ['#001488', '#000000'], angle: 45 });
    });

    it('Должен устанавливать градиент без угла', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        const updated = setSlideBackgroundGradient(slide, ['#001488', '#000000']);
        expect(updated.background).toEqual({ type: 'gradient', colors: ['#001488', '#000000'], angle: undefined });
    });
});

describe('clearSlideBackground', () => {
    it('Должен сбрасывать фон слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = setSlideBackgroundColor(presentation.slides[0], '#001488');
        const cleared = clearSlideBackground(slide);
        expect(slide.background).toEqual({ type: 'color', color: '#001488' });
        expect(cleared.background).toEqual({ type: 'none' });
    });
});