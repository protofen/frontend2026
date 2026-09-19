import type { Slide } from "./slide";

type Presentation = {
    id: string;
    name: string;
    slides: Slide[];
    activeSlideId: string | null;
}

export type { Presentation };