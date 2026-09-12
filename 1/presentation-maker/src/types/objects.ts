type TextObject = {
  id: string;
  type: 'text';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontFamily: string;
  fontSize: number;
  fontColor: string;
};

type ImageObject = {
  id: string;
  type: 'image';
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type SlideObject = TextObject | ImageObject;

export type { TextObject, ImageObject, SlideObject };