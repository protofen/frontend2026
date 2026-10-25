export type { Presentation } from './types/presentation.js';
export type { Slide, Background } from './types/slide.js';
export type { TextObject, ImageObject, SlideObject } from './types/objects.js';

export { createPresentation, updatePresentationName, savePresentation, loadPresentation, generateId } from './functions/presentation.js';
export { addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide, setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, clearSlideBackground, setBackgroundColor, setBackgroundImage, setBackgroundGradient, clearBackground } from './functions/slide.js';
export { addTextObject, addImageObject, removeObject, moveObject, resizeObject, updateTextObjectStyle, removeObjects, moveObjects, resizeObjects, updateTextStyle, addText, addImage } from './functions/objects.js';