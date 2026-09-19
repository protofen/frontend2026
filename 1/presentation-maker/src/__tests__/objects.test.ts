import { describe, it, expect } from 'vitest';
import { createPresentation, addTextObject, addImageObject, moveObject, 
    resizeObject, updateTextObjectStyle, removeObject} from '../index.js';

describe('addTextObject', () => {
    it('Должен добавлять текстовый объект на слайд', () => {
        const presentation = createPresentation('Моя презентация');
        expect(presentation.slides[0].objects.length).toBe(0);
        const addedTextObject = addTextObject(presentation.slides[0], 
            `Пепе шнеле`
            , 10, 20, 200, 100, 'Arial', 16, 'black');
        const textObject = addedTextObject.objects[0];
        expect(addedTextObject.objects).toHaveLength(1);
        expect(presentation.slides[0].objects).toHaveLength(0);
        expect(textObject).toBeDefined();
        expect(textObject.type).toBe('text');
    });
});

describe('addImageObject', () => {
    it('Должен добавлять изображение на слайд', () => {
        const presentation = createPresentation('Моя презентация');
        expect(presentation.slides[0].objects.length).toBe(0);
        const addedImageObject = addImageObject(presentation.slides[0], 
            '../../../versions.png', 10, 20, 200, 100);
        const imageObject = addedImageObject.objects[0];
        expect(addedImageObject.objects).toHaveLength(1);
        expect(presentation.slides[0].objects).toHaveLength(0);
        expect(imageObject).toBeDefined();
        expect(imageObject.type).toBe('image');
    });
});

describe('moveObject', () => {
    it('Должен перемещать объект в новую позицию на слайде', () => {
        const presentation = createPresentation('Моя презентация');
        const slideWithText = addTextObject(presentation.slides[0],
            'Пепе шнеле', 10, 20, 200, 100, 'Arial', 16, 'black');
        const textObject = slideWithText.objects[0];
        const movedObject = moveObject(slideWithText, textObject.id, 50, 60);
        expect(slideWithText.objects[0].x).toBe(10);
        expect(slideWithText.objects[0].y).toBe(20);
        expect(movedObject.objects[0].x).toBe(50);
        expect(movedObject.objects[0].y).toBe(60);
    });
});

describe('resizeObject', () => {
    it('Должен изменять размер объекта на слайде', () => {
        const presentation = createPresentation('Моя презентация');
        const slideWithText = addTextObject(presentation.slides[0],
            'Пепе шнеле', 10, 20, 200, 100, 'Arial', 16, 'black');
        const textObject = slideWithText.objects[0];
        const resizedObject = resizeObject(slideWithText, textObject.id, 250, 150);
        expect(slideWithText.objects[0].width).toBe(200);
        expect(slideWithText.objects[0].height).toBe(100);
        expect(resizedObject.objects[0].width).toBe(250);
        expect(resizedObject.objects[0].height).toBe(150);
    });
});

describe('updateTextObjectStyle', () => {
    it('Должен обновлять стиль текстового объекта на слайде', () => {
        const presentation = createPresentation('Моя презентация');
        const slideWithText = addTextObject(presentation.slides[0],
            'Пепе шнеле', 10, 20, 200, 100, 'Arial', 16, 'black');
        const textObject = slideWithText.objects[0];
        const updatedObject = updateTextObjectStyle(slideWithText, textObject.id, 'Times New Roman', 18, 'blue');
        if (slideWithText.objects[0].type !== 'text') {
            throw new Error('Объект не является текстовым объектом');
        }
        expect(slideWithText.objects[0].fontFamily).toBe('Arial');
        expect(slideWithText.objects[0].fontSize).toBe(16);
        expect(slideWithText.objects[0].fontColor).toBe('black');

        if (!updatedObject.objects[0] || updatedObject.objects[0].type !== 'text') {
            throw new Error('Объект не найден или не является текстовым объектом');
        }
        expect(updatedObject.objects[0].fontFamily).toBe('Times New Roman');
        expect(updatedObject.objects[0].fontSize).toBe(18);
        expect(updatedObject.objects[0].fontColor).toBe('blue');
    });
});

describe('removeObject', () => {
    it('Должен удалять объект со слайда', () => {
        const presentation = createPresentation('Моя презентация');
        const slideWithText = addTextObject(presentation.slides[0],
            'Пепе шнеле', 10, 20, 200, 100, 'Arial', 16, 'black');
        const textObject = slideWithText.objects[0];
        expect(slideWithText.objects).toHaveLength(1);
        const removedObject = removeObject(slideWithText, textObject.id);
        expect(removedObject.objects).toHaveLength(0);
        expect(slideWithText.objects).toHaveLength(1);
    });
});
