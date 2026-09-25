export type { Presentation } from './types/presentation.js';
export type { Slide, Background } from './types/slide.js';
export type { TextObject, ImageObject, SlideObject } from './types/objects.js';

export { createPresentation, updatePresentationName, savePresentation, loadPresentation, generateId } from './functions/presentation.js';
export { addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide, setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground } from './functions/slide.js';
export { addTextObject, addImageObject, removeObject, moveObject, resizeObject,  updateTextObjectStyle, } from './functions/objects.js';