import type { Presentation } from '../types/presentation.js';
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

function removeObjects(
  presentation: Presentation,
  params: { slideId: string; objectIds: string[] }
): Presentation {
  const { slideId, objectIds } = params;
  const idsSet = new Set(objectIds);
  return {
    ...presentation,
    slides: presentation.slides.map((slide) => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        objects: slide.objects.filter((obj) => !idsSet.has(obj.id)),
      };
    }),
  };
}

function moveObjects(
  presentation: Presentation,
  params: { slideId: string; moves: { id: string; x: number; y: number }[] }
): Presentation {
  const { slideId, moves } = params;
  const movesMap = new Map(moves.map((m) => [m.id, m]));
  return {
    ...presentation,
    slides: presentation.slides.map((slide) => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        objects: slide.objects.map((obj) => {
          const target = movesMap.get(obj.id);
          if (!target) return obj;
          return { ...obj, x: target.x, y: target.y };
        }),
      };
    }),
  };
}

function resizeObjects(
  presentation: Presentation,
  params: { slideId: string; resizes: { id: string; width: number; height: number }[] }
): Presentation {
  const { slideId, resizes } = params;
  const resizesMap = new Map(resizes.map((r) => [r.id, r]));
  return {
    ...presentation,
    slides: presentation.slides.map((slide) => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        objects: slide.objects.map((obj) => {
          const target = resizesMap.get(obj.id);
          if (!target) return obj;
          return { ...obj, width: target.width, height: target.height };
        }),
      };
    }),
  };
}

function updateTextStyle(
  presentation: Presentation,
  params: {
    slideId: string;
    objectId: string;
    fontFamily: string;
    fontSize: number;
    fontColor: string;
  }
): Presentation {
  const { slideId, objectId, fontFamily, fontSize, fontColor } = params;
  return {
    ...presentation,
    slides: presentation.slides.map((slide) => {
      if (slide.id !== slideId) return slide;
      return {
        ...slide,
        objects: slide.objects.map((obj) => {
          if (obj.id === objectId && obj.type === 'text') {
            return { ...obj, fontFamily, fontSize, fontColor };
          }
          return obj;
        }),
      };
    }),
  };
}

function addText(
  presentation: Presentation,
  params: {
    slideId: string;
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    fontFamily: string;
    fontSize: number;
    fontColor: string;
  }
): Presentation {
  const { slideId, content, x, y, width, height, fontFamily, fontSize, fontColor } = params;
  return {
    ...presentation,
    slides: presentation.slides.map((slide) => {
      if (slide.id !== slideId) return slide;
      return addTextObject(
        slide,
        content,
        x,
        y,
        width,
        height,
        fontFamily,
        fontSize,
        fontColor
      );
    }),
  };
}

function addImage(
  presentation: Presentation,
  params: {
    slideId: string;
    imageUrl: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }
): Presentation {
  const { slideId, imageUrl, x, y, width, height } = params;
  return {
    ...presentation,
    slides: presentation.slides.map((slide) => {
      if (slide.id !== slideId) return slide;
      return addImageObject(slide, imageUrl, x, y, width, height);
    }),
  };
}

export {
  addTextObject,
  addImageObject,
  removeObject,
  moveObject,
  resizeObject,
  updateTextObjectStyle,
  removeObjects,
  moveObjects,
  resizeObjects,
  updateTextStyle,
  addText,
  addImage,
};