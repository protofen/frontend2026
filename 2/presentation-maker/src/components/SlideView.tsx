import type { Slide } from '../types/slide.js';
import type { Background } from '../types/slide.js';

type SlideViewProps = {
  slide: Slide;
};

function getBackgroundStyle(background: Background): React.CSSProperties {
  switch (background.type) {
    case 'color':
      return { backgroundColor: background.color };
    case 'image':
      return {
        backgroundImage: `url(${background.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    case 'gradient':
      return {
        backgroundImage: `linear-gradient(${background.angle ?? 0}deg, ${background.colors.join(', ')})`,
      };
    case 'none':
    default:
      return {};
  }
}

function SlideView({ slide }: SlideViewProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '800px',
        height: '600px',
        border: '1px solid #ccc',
        ...getBackgroundStyle(slide.background),
      }}
    >
      {slide.objects.map((obj) => {
        if (obj.type === 'text') {
          return (
            <div
              key={obj.id}
              style={{
                position: 'absolute',
                left: `${obj.x}px`,
                top: `${obj.y}px`,
                width: `${obj.width}px`,
                height: `${obj.height}px`,
                fontFamily: obj.fontFamily,
                fontSize: `${obj.fontSize}px`,
                color: obj.fontColor,
              }}
            >
              {obj.content}
            </div>
          );
        }

        if (obj.type === 'image') {
          return (
            <img
              key={obj.id}
              src={obj.url}
              alt=""
              style={{
                position: 'absolute',
                left: `${obj.x}px`,
                top: `${obj.y}px`,
                width: `${obj.width}px`,
                height: `${obj.height}px`,
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

export { SlideView };