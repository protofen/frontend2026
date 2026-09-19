import type { Presentation } from '../types/presentation.js';
import { generateId } from '../index.js';

//Работы с презентацией
function createPresentation(name: string): Presentation {
    const firstSlideId = generateId();
    return {
        id: generateId(),
        name: name,
        slides: [
            {
                id: firstSlideId,
                name: "Первай слайд",
                background: { type: 'none' },
                objects: [],
            }
        ],
        activeSlideId: firstSlideId,
    };
}

function updatePresentationName(presentation: Presentation, name: string): Presentation {
    return {
        ...presentation,
        name: name,
    };
}

function savePresentation(presentation: Presentation): string {
    return JSON.stringify(presentation)
}

function loadPresentation(json: string): Presentation {
    return JSON.parse(json) as Presentation
}

export { createPresentation, updatePresentationName, savePresentation, loadPresentation };