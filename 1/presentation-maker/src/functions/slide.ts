import { generateId } from '../index.js';
import type { Presentation } from '../types/presentation.js';
import type { Slide, Background} from '../types/slide.js';

//Работа со слайдами
function addSlide(presentation: Presentation, slideName?: string): Presentation {
    const newSlide: Slide = {
        id: generateId(),
        name: slideName || `Слайд ${presentation.slides.length + 1}`,
        background: { type: 'none' },
        objects: [],
    }
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide]
    }
}

function removeSlides(presentation: Presentation, slideIds: string[]): Presentation {
    const remainingSlides = presentation.slides.filter((slide) => !slideIds.includes(slide.id));

    const activeSlideWasDeleted = presentation.activeSlideId !== null && slideIds.includes(presentation.activeSlideId);

    if (activeSlideWasDeleted) {
        return {
            ...presentation,
            slides: remainingSlides,
            activeSlideId: remainingSlides[0]?.id || null
        };
    } else {
        return {
            ...presentation,
            slides: remainingSlides,
            activeSlideId: presentation.activeSlideId
        };
    }
}

function moveSlide(presentation: Presentation, slideId: string, newIndex: number): Presentation {
    if (newIndex < 0 || newIndex >= (presentation.slides.length + 1)) {
        throw new Error("Неправильный индекс для перемещения слайда");
    }
    const nessesarySlide = presentation.slides.find((slide) => slide.id === slideId);
    if (!nessesarySlide) {
        throw new Error("Слайд с таким id не найден");
    }
    const slides = [...presentation.slides];
    const currentIndex = slides.indexOf(nessesarySlide);
    slides.splice(currentIndex, 1);
    slides.splice(newIndex, 0, nessesarySlide);
    return {
        ...presentation,
        slides: slides
    }
}

function setActiveSlide(presentation: Presentation, slideId: string): Presentation {
    const activeSlide = presentation.slides.find((slide) => slide.id === slideId);
    if (!activeSlide) {
        throw new Error("Слайд с таким id не найден");
    }
    return {
        ...presentation,
        activeSlideId: slideId
    }
}

function duplicateSlide(presentation: Presentation, slideId: string): Presentation {
    const slideToDuplicate = presentation.slides.find((slide) => slide.id === slideId);
    if (!slideToDuplicate) {
        throw new Error("Слайд с таким id не найден");
    }
    const newSlide: Slide = {
        ...slideToDuplicate,
        id: generateId(),
        name: `${slideToDuplicate.name} (Копия)`
    };
    return {
        ...presentation,
        slides: [...presentation.slides, newSlide]
    }
}

//Работа с фоном слайда
function setSlideBackgroundColor(slide: Slide, color: string): Slide {
    const newBackground: Background = { type: 'color', color: color };
    return {
        ...slide,
        background: newBackground
    }
}

function setSlideBackgroundImage(slide: Slide, imageUrl: string): Slide {
    const newBackground: Background = { type: 'image', imageUrl: imageUrl };
    return {
        ...slide,
        background: newBackground
    }
}

function setSlideBackgroundGradient(slide: Slide, colors: string[], angle?: number): Slide {
    const newBackground: Background = { type: 'gradient', colors: colors, angle: angle };
    return {
        ...slide,
        background: newBackground
    }
}

function clearSlideBackground(slide: Slide): Slide {
    const newBackground: Background = { type: 'none' };
    return {
        ...slide,
        background: newBackground
    }
}

export { addSlide, removeSlides, moveSlide, setActiveSlide, duplicateSlide, 
    setSlideBackgroundColor, setSlideBackgroundImage, setSlideBackgroundGradient, 
    clearSlideBackground };