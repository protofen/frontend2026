import type { SlideObject } from './objects.js';

type Background =
  | { type: 'none' }
  | { type: 'color'; color: string }
  | { type: 'image'; imageUrl: string }
  | { type: 'gradient'; colors: string[]; angle?: number };

type Slide = {
  id: string;
  name: string;
  background: Background;
  objects: SlideObject[];
};

export type { Background, Slide };