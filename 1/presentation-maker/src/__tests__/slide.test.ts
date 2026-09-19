import { describe, it, expect } from 'vitest';
import { createPresentation, addSlide, removeSlides, moveSlide, 
    setSlideBackgroundColor, clearSlideBackground, setActiveSlide, duplicateSlide, setSlideBackgroundImage, setSlideBackgroundGradient, 
    generateId} from '../index.js';

describe('removeSlides', () => {
    it('Должен удалять слайды с указанными id из презентации', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecondSlide = addSlide(presentation);
        const withThirdSlide = addSlide(withSecondSlide);
        const withForthSlide = addSlide(withThirdSlide);
        expect(withForthSlide.slides.length).toBe(4);
        const slideIdsToRemove = [withForthSlide.slides[1].id, withForthSlide.slides[3].id,];
        const pluralDeletedSlides = removeSlides(withForthSlide, slideIdsToRemove);
        expect(pluralDeletedSlides.slides.length).toBe(2);
        const singleDeletedSlide = removeSlides(pluralDeletedSlides, [pluralDeletedSlides.slides[0].id]);
        expect(singleDeletedSlide.slides.length).toBe(1);
    });
});

describe('moveSlide', () => {
    it('Должен перемещать слайд в новый индекс в презентации', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecondSlide = addSlide(presentation);
        const withThirdSlide = addSlide(withSecondSlide);
        const withForthSlide = addSlide(withThirdSlide);
        const withFifthSlide = addSlide(withForthSlide);
        expect(withFifthSlide.slides.length).toBe(5);
        const fifthSlideId = withFifthSlide.slides[4].id;
        const moveToBeginning = moveSlide(withFifthSlide, fifthSlideId, 0);
        expect(moveToBeginning.slides[0].id).toBe(fifthSlideId);
        const moveToEnd = moveSlide(withFifthSlide, fifthSlideId, 4);
        expect(moveToEnd.slides[4].id).toBe(fifthSlideId);
        const moveToMiddle = moveSlide(withFifthSlide, fifthSlideId, 2);
        expect(moveToMiddle.slides[2].id).toBe(fifthSlideId);
    });
});

describe('setSlideBackgroundColor', () => {
    it('Должен устанавливать цвет фона слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        expect(slide.background).toEqual({ type: 'none' });
        const updatedSlide = setSlideBackgroundColor(slide, 'blue');
        expect(updatedSlide.background).toEqual({
            type: 'color',
            color: 'blue',
        });
    });
});

describe('setSlideBackgroundImage', () => {
    it('Должен устанавливать изображение фона слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        const imagePath = '../../../versions.png';
        expect(slide.background).toEqual({ type: 'none' });
        const updatedSlide = setSlideBackgroundImage(slide, imagePath);
        expect(updatedSlide.background).toEqual({
            type: 'image',
            imageUrl: imagePath,
        });
    });
});

describe('setSlideBackgroundGradient', () => {
    it('Должен устанавливать градиент фона слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        expect(slide.background).toEqual({ type: 'none' });
        const updatedSlide = setSlideBackgroundGradient(slide, ['red', 'blue']);
        expect(updatedSlide.background).toEqual({
            type: 'gradient',
            colors: ['red', 'blue'],
        });
    });
});

describe('clearSlideBackground', () => {
    it('Должен очищать цвет фона слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slide = presentation.slides[0];
        const updatedSlide = setSlideBackgroundColor(slide, 'blue');
        expect(updatedSlide.background).toEqual({
            type: 'color',
            color: 'blue',
        });
        const finalSlide = clearSlideBackground(updatedSlide);
        expect(finalSlide.background).toEqual({ type: 'none' });
        expect(updatedSlide.background).toEqual({
            type: 'color',
            color: 'blue',
        });
    });
});

describe('SetActiveSlide', () => {
    it('Должен переключать активный слайд в презентации', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecondSlide = addSlide(presentation);
        const withThirdSlide = addSlide(withSecondSlide);
        expect(withThirdSlide.activeSlideId).toBe(withThirdSlide.slides[0].id);
        const updatedPresentation = setActiveSlide(withThirdSlide, withThirdSlide.slides[2].id);
        expect(updatedPresentation.activeSlideId).toBe(withThirdSlide.slides[2].id);
    });
});

describe('DuplicateSlide', () => {
    it('Должен дублировать слайд в презентации', () => {
        const presentation = createPresentation('Моя презентация');
        const withSecondSlide = addSlide(presentation);
        const secondSlideId = withSecondSlide.slides[1].id;
        const duplicatedPresentation = duplicateSlide(withSecondSlide, secondSlideId);
        expect(duplicatedPresentation.slides.length).toBe(3);
        expect(duplicatedPresentation.slides[1].id).toBe(secondSlideId);
        expect(duplicatedPresentation.slides[2].id).not.toBe(secondSlideId);
    });
});

describe('GenerateId', () => {
    it('Должен генерировать уникальный идентификатор', () => {
        const id1 = generateId();
        const id2 = generateId();
        expect(id1).not.toBe(id2);
    });
});
