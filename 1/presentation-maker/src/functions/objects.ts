import type { TextObject, ImageObject } from '../types/object.js';
import type { Slide } from '../types/slide.js';
import { generateId } from '../index.js';

//Работа с объектами на слайде
function addTextObject(slide: Slide, content: string, x: number, y: number, width: number, height: number, fontFamily: string, fontSize: number, fontColor: string): Slide {
    return {
        ...slide,
        objects: [
            ...slide.objects,
            {
                id: generateId(),
                type: 'text',
                content: content,
                x: x,
                y: y,
                width: width,
                height: height,
                fontFamily: fontFamily,
                fontSize: fontSize,
                fontColor: fontColor
            }
        ]
    }
}

function addImageObject(slide: Slide, imageUrl: string, x: number, y: number, width: number, height: number): Slide {
    return {
        ...slide,
        objects: [
            ...slide.objects,
            {
                id: generateId(),
                type: 'image',
                imageUrl: imageUrl,
                x: x,
                y: y,
                width: width,
                height: height
            }
        ]
    }
}

function removeObject(slide: Slide, objectId: string): Slide {
    return {
        ...slide,
        objects: slide.objects.filter((object) => object.id !== objectId)
    }
}

function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide {
    const necesaryObjectIndex = slide.objects.findIndex((object) => object.id === objectId);
    if (necesaryObjectIndex === -1) {
        throw new Error("Объект с таким id не найден");
    }
    const objects = [...slide.objects];
    const object = objects[necesaryObjectIndex];
    objects[necesaryObjectIndex] = {
        ...object,
        x: newX,
        y: newY
    };

    return {
        ...slide,
        objects,
    }
}    

function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide {
    const necesaryObjectIndex = slide.objects.findIndex((object) => object.id === objectId);
    if (necesaryObjectIndex === -1) {
        throw new Error("Объект с таким id не найден");
    }
    const objects = [...slide.objects];
    const object = objects[necesaryObjectIndex];
    objects[necesaryObjectIndex] = {
        ...object,
        width: newWidth,
        height: newHeight
    };
    return {
        ...slide,
        objects
    }
}

function updateTextObjectStyle(slide: Slide, objectId: string, fontFamily: string, fontSize: number, fontColor: string): Slide {
    const necesaryObjectIndex = slide.objects.findIndex((object) => object.id === objectId);
    if (necesaryObjectIndex === -1) {
        throw new Error("Объект с таким id не найден");
    }
    const objects = [...slide.objects];
    const object = objects[necesaryObjectIndex];
    if (object.type !== 'text') {
        throw new Error("Объект с таким id не является текстовым объектом");
    }
    objects[necesaryObjectIndex] = {
        ...object,
        fontFamily: fontFamily,
        fontSize: fontSize,
        fontColor: fontColor
    };
    return {
        ...slide,
        objects
    }
}

export { addTextObject, addImageObject, removeObject, moveObject, resizeObject, updateTextObjectStyle };