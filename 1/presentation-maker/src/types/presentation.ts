import type { Slide } from "./slide";
//Создать типы данных Presentation и Slide

type Presentation = {
    id: string;
    name: string;
    slides: Slide[];
    activeSlideId: string | null;
}

export type { Presentation };