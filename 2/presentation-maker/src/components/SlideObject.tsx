import type { SlideObject as SlideObjectType } from '../types/objects.js';

type SlideObjectProps = {
  object: SlideObjectType;
};

function SlideObject({ object }: SlideObjectProps) {
  if (object.type === 'text') {
    return (
      <div
        style={{
          position: 'absolute',
          left: `${object.x}px`,
          top: `${object.y}px`,
          width: `${object.width}px`,
          height: `${object.height}px`,
          fontFamily: object.fontFamily,
          fontSize: `${object.fontSize}px`,
          color: object.fontColor,
        }}
      >
        {object.content}
      </div>
    );
  }

  if (object.type === 'image') {
    return (
      <img
        src={object.url}
        alt=""
        style={{
          position: 'absolute',
          left: `${object.x}px`,
          top: `${object.y}px`,
          width: `${object.width}px`,
          height: `${object.height}px`,
        }}
      />
    );
  }

  return null;
}

export { SlideObject };