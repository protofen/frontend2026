import type { Slide } from '../types/slide.js';
import type { TextObject, ImageObject } from '../types/objects.js';
import { generateId } from './presentation.js';

function addTextObject(
  slide: Slide,
  content: string,
  x: number,
  y: number,
  width: number,
  height: number,
  fontFamily: string,
  fontSize: number,
  fontColor: string
): Slide {
  const newTextObject: TextObject = {
    id: generateId(),
    type: 'text',
    content,
    x,
    y,
    width,
    height,
    fontFamily,
    fontSize,
    fontColor,
  };

  return {
    ...slide,
    objects: [...slide.objects, newTextObject],
  };
}

function addImageObject(
  slide: Slide,
  imageUrl: string,
  x: number,
  y: number,
  width: number,
  height: number
): Slide {
  const newImageObject: ImageObject = {
    id: generateId(),
    type: 'image',
    url: imageUrl,
    x,
    y,
    width,
    height,
  };

  return {
    ...slide,
    objects: [...slide.objects, newImageObject],
  };
}

function removeObject(slide: Slide, objectId: string): Slide {
  return {
    ...slide,
    objects: slide.objects.filter((obj) => obj.id !== objectId),
  };
}

function moveObject(slide: Slide, objectId: string, newX: number, newY: number): Slide {
  return {
    ...slide,
    objects: slide.objects.map((obj) => {
      if (obj.id === objectId) {
        return { ...obj, x: newX, y: newY };
      }
      return obj;
    }),
  };
}

function resizeObject(slide: Slide, objectId: string, newWidth: number, newHeight: number): Slide {
  return {
    ...slide,
    objects: slide.objects.map((obj) => {
      if (obj.id === objectId) {
        return { ...obj, width: newWidth, height: newHeight };
      }
      return obj;
    }),
  };
}

function updateTextObjectStyle(
  slide: Slide,
  objectId: string,
  fontFamily: string,
  fontSize: number,
  fontColor: string
): Slide {
  return {
    ...slide,
    objects: slide.objects.map((obj) => {
      if (obj.id === objectId && obj.type === 'text') {
        return {
          ...obj,
          fontFamily,
          fontSize,
          fontColor,
        };
      }
      return obj;
    }),
  };
}

export { addTextObject, addImageObject, removeObject, moveObject, resizeObject, updateTextObjectStyle };