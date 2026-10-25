import type { Presentation } from '../types/presentation.js';
import type { Slide } from '../types/slide.js';
import { generateId } from './presentation.js';

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
    activeSlideId: newSlide.id,
  };
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
  const newSlides = presentation.slides.filter((slide) => !slideIds.includes(slide.id));
  let newActiveSlideId = presentation.activeSlideId;
  if (slideIds.includes(presentation.activeSlideId)) {
    newActiveSlideId = newSlides.length > 0 ? newSlides[0].id : '';
  }
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
  const clampedIndex = Math.max(0, Math.min(newIndex, newSlides.length));
  newSlides.splice(clampedIndex, 0, movedSlide);
  return {
    ...presentation,
    slides: newSlides,
  };
}

function setActiveSlide(presentation: Presentation, slideId: string): Presentation {
  const exists = presentation.slides.some((s) => s.id === slideId);
  if (!exists) return presentation;
  return {
    ...presentation,
    activeSlideId: slideId,
  };
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
  const originalIndex = presentation.slides.findIndex((s) => s.id === slideId);
  if (originalIndex === -1) return presentation;
  const originalSlide = presentation.slides[originalIndex];
  const duplicatedObjects = originalSlide.objects.map((obj) => ({
    ...obj,
    id: generateId(),
  }));
  const newSlide: Slide = {
    ...originalSlide,
    id: generateId(),
    name: `${originalSlide.name} (копия)`,
    objects: duplicatedObjects,
  };
  const newSlides = [...presentation.slides];
  newSlides.splice(originalIndex + 1, 0, newSlide);
  return {
    ...presentation,
    slides: newSlides,
    activeSlideId: newSlide.id,
  };
}

function setSlideBackgroundColor(slide: Slide, color: string): Slide {
  return {
    ...slide,
    background: { type: 'color', color },
  };
}

function setSlideBackgroundImage(slide: Slide, src: string): Slide {
  return {
    ...slide,
    background: { type: 'image', src },
  };
}

function setSlideBackgroundGradient(
  slide: Slide,
  colors: string[],
  angle?: number,
  mode: 'linear' | 'radial' = 'linear'
): Slide {
  return {
    ...slide,
    background: { type: 'gradient', mode, colors, angle },
  };
}

function clearSlideBackground(slide: Slide): Slide {
  return {
    ...slide,
    background: { type: 'none' },
  };
}

function setBackgroundColor(
  presentation: Presentation,
  params: { slideId: string; color: string }
): Presentation {
  const { slideId, color } = params;
  return {
    ...presentation,
    slides: presentation.slides.map((slide) =>
      slide.id === slideId ? setSlideBackgroundColor(slide, color) : slide
    ),
  };
}

function setBackgroundImage(
  presentation: Presentation,
  params: { slideId: string; src: string }
): Presentation {
  const { slideId, src } = params;
  return {
    ...presentation,
    slides: presentation.slides.map((slide) =>
      slide.id === slideId ? setSlideBackgroundImage(slide, src) : slide
    ),
  };
}

function setBackgroundGradient(
  presentation: Presentation,
  params: {
    slideId: string;
    colors: string[];
    angle: number;
    mode: 'linear' | 'radial';
  }
): Presentation {
  const { slideId, colors, angle, mode } = params;
  return {
    ...presentation,
    slides: presentation.slides.map((slide) =>
      slide.id === slideId
        ? setSlideBackgroundGradient(slide, colors, angle, mode)
        : slide
    ),
  };
}

function clearBackground(
  presentation: Presentation,
  params: { slideId: string }
): Presentation {
  const { slideId } = params;
  return {
    ...presentation,
    slides: presentation.slides.map((slide) =>
      slide.id === slideId ? clearSlideBackground(slide) : slide
    ),
  };
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
  setBackgroundColor,
  setBackgroundImage,
  setBackgroundGradient,
  clearBackground,
};