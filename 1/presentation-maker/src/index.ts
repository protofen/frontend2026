import type { Slide, Background } from './types/slide.js';
import type { Presentation } from './types/presentation.js';
import type { TextObject, ImageObject, SlideObject} from './types/object.js';

import { addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide, 
    setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, 
    clearSlideBackground } from './functions/slide.js';
import { addTextObject, addImageObject, removeObject, moveObject, resizeObject, updateTextObjectStyle } from './functions/objects.js';
import { createPresentation, updatePresentationName, savePresentation, loadPresentation } from './functions/presentation.js';


function generateId():string {
    const id = Date.now().toString().substring(4, 12)+Math.random().toString().substring(2, 8);
    return id;
}

export type { Slide, Background, Presentation, TextObject, ImageObject, SlideObject };
export { addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide, 
    setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, 
    clearSlideBackground, addTextObject, addImageObject, removeObject, moveObject, 
    resizeObject, updateTextObjectStyle, createPresentation, updatePresentationName, 
    savePresentation, loadPresentation, generateId };