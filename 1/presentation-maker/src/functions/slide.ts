import type { Presentation } from '../types/presentation.js';
import type { Slide } from '../types/slide.js';

function generateId(): string {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomPart}`;
}

function addSlide(presentation: Presentation, slideName?: string): Presentation {
  const newSlide: Slide = {
    id: generateId(),
    name: slideName || `Слайд ${presentation.slides.length + 1}`,
    background: { type: 'none' },
    objects: [],
  };
  return {
    ...presentation,
    slides: [...presentation.slides, newSlide],
  };
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
  const newSlides = presentation.slides.filter((s) => !slideIds.includes(s.id));
  const newActiveSlideId =
    newSlides.length > 0
      ? newSlides.some((s) => s.id === presentation.activeSlideId)
        ? presentation.activeSlideId
        : newSlides[0].id
      : '';

  return {
    ...presentation,
    slides: newSlides,
    activeSlideId: newActiveSlideId,
  };
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
  const currentIndex = presentation.slides.findIndex((s) => s.id === slideId);
  if (currentIndex === -1 || currentIndex === newIndex) return presentation;

  const newSlides = [...presentation.slides];
  const [movedSlide] = newSlides.splice(currentIndex, 1);
  newSlides.splice(newIndex, 0, movedSlide);

  return { ...presentation, slides: newSlides };
}

function setActiveSlide(presentation: Presentation, slideId: string): Presentation {
  const slideExists = presentation.slides.some((s) => s.id === slideId);
  if (!slideExists) return presentation;
  
  return { ...presentation, activeSlideId: slideId };
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
  const currentIndex = presentation.slides.findIndex((s) => s.id === slideId);
  if (currentIndex === -1) return presentation;

  const slideToDuplicate = presentation.slides[currentIndex];
  const newSlide: Slide = {
    ...slideToDuplicate,
    id: generateId(),
    name: `${slideToDuplicate.name} (копия)`,
    objects: slideToDuplicate.objects.map((obj) => ({ ...obj, id: generateId() })),
  };

  const newSlides = [...presentation.slides];
  newSlides.splice(currentIndex + 1, 0, newSlide);

  return { ...presentation, slides: newSlides };
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
  return { ...slide, background: { type: 'color', color } };
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
  return { ...slide, background: { type: 'image', imageUrl } };
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {
  return { ...slide, background: { type: 'gradient', colors, angle } };
}

function clearSlideBackground(slide: Slide): Slide {
  return { ...slide, background: { type: 'none' } };
}

export {
  addSlide,
  removeSlides,
  moveSlide,
  setActiveSlide,
  duplicateSlide,
  setSlideBackgroundColor,
  setSlideBackgroundImage,
  setSlideBackgroundGradient,
  clearSlideBackground,
};