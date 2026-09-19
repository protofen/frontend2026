import type { SlideObject } from "./object";

type Background = 
    { type: 'none'} 
    | { type: 'color'; color: string } 
    | {type: 'image'; imageUrl: string } 
    | {type: 'gradient'; colors: string[]; angle?: number};

type Slide = {
    id: string;
    name: string;
    background: Background;
    objects: SlideObject[];
};

export type { Slide, Background };