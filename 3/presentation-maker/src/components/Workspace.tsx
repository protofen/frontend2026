import { useEffect, useRef, useState } from 'react';
import type { MouseEvent } from 'react';
import type { Presentation } from '../types/presentation.js';
import type { TextObject } from '../types/objects.js';
import { dispatch } from '../editor.js';
import { removeObjects, moveObjects, resizeObjects } from '../functions/objects.js';
import { SlidePreview } from './SlidePreview.js';
import { SlideProperties } from './SlideProperties.js';
import { TextStylePanel } from './TextStylePanel.js';
import styles from './Workspace.module.css';

type WorkspaceProps = {
  presentation: Presentation;
};

type DragState = {
  slideId: string;
  startClientX: number;
  startClientY: number;
  startPositions: Map<string, { x: number; y: number }>;
  moved: boolean;
};

type ResizeState = {
  slideId: string;
  objectId: string;
  startClientX: number;
  startClientY: number;
  startWidth: number;
  startHeight: number;
  moved: boolean;
};

const MIN_SIZE = 30;

function Workspace({ presentation }: WorkspaceProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const resizeStateRef = useRef<ResizeState | null>(null);
  const suppressClickRef = useRef(false);

  const activeSlideId = presentation.activeSlideId;

  useEffect(() => {
    setSelectedIds([]);
  }, [activeSlideId]);

  const activeSlide = presentation.slides.find((s) => s.id === activeSlideId);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Delete' && event.key !== 'Backspace') return;
      if (selectedIds.length === 0) return;
      if (!activeSlide) return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;

      event.preventDefault();
      dispatch(removeObjects, {
        slideId: activeSlide.id,
        objectIds: selectedIds,
      });
      setSelectedIds([]);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedIds, activeSlide]);

  const handleObjectClick = (objectId: string, event: MouseEvent<HTMLElement>) => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }

    if (event.shiftKey) {
      setSelectedIds((prev) =>
        prev.includes(objectId)
          ? prev.filter((id) => id !== objectId)
          : [...prev, objectId]
      );
    } else {
      setSelectedIds([objectId]);
    }
  };

  const handleContainerClick = () => {
    if (suppressClickRef.current) {
      suppressClickRef.current = false;
      return;
    }
    setSelectedIds([]);
  };

  const handleObjectMouseDown = (objectId: string, event: MouseEvent<HTMLElement>) => {
    if (event.button !== 0) return;
    if (!activeSlide) return;

    event.preventDefault();

    let idsForDrag = selectedIds;
    if (!selectedIds.includes(objectId)) {
      idsForDrag = event.shiftKey ? [...selectedIds, objectId] : [objectId];
      setSelectedIds(idsForDrag);
    }

    const startPositions = new Map<string, { x: number; y: number }>();
    activeSlide.objects.forEach((obj) => {
      if (idsForDrag.includes(obj.id)) {
        startPositions.set(obj.id, { x: obj.x, y: obj.y });
      }
    });

    dragStateRef.current = {
      slideId: activeSlide.id,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startPositions,
      moved: false,
    };

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const drag = dragStateRef.current;
      if (!drag) return;

      const rect = containerRef.current?.getBoundingClientRect();
      const scale = rect && rect.width > 0 ? rect.width / 800 : 1;

      const dx = (moveEvent.clientX - drag.startClientX) / scale;
      const dy = (moveEvent.clientY - drag.startClientY) / scale;

      if (!drag.moved && Math.abs(dx) < 2 && Math.abs(dy) < 2) return;
      drag.moved = true;

      const moves = Array.from(drag.startPositions.entries()).map(([id, pos]) => ({
        id,
        x: pos.x + dx,
        y: pos.y + dy,
      }));

      dispatch(moveObjects, { slideId: drag.slideId, moves });
    };

    const handleMouseUp = () => {
      const drag = dragStateRef.current;
      dragStateRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (drag?.moved) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleObjectResizeMouseDown = (
    objectId: string,
    event: MouseEvent<HTMLElement>
  ) => {
    if (event.button !== 0) return;
    if (!activeSlide) return;

    const obj = activeSlide.objects.find((o) => o.id === objectId);
    if (!obj) return;

    event.preventDefault();

    resizeStateRef.current = {
      slideId: activeSlide.id,
      objectId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startWidth: obj.width,
      startHeight: obj.height,
      moved: false,
    };

    const handleMouseMove = (moveEvent: globalThis.MouseEvent) => {
      const resize = resizeStateRef.current;
      if (!resize) return;

      const rect = containerRef.current?.getBoundingClientRect();
      const scale = rect && rect.width > 0 ? rect.width / 800 : 1;

      const dx = (moveEvent.clientX - resize.startClientX) / scale;
      const dy = (moveEvent.clientY - resize.startClientY) / scale;

      if (!resize.moved && Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
      resize.moved = true;

      const width = Math.max(MIN_SIZE, resize.startWidth + dx);
      const height = Math.max(MIN_SIZE, resize.startHeight + dy);

      dispatch(resizeObjects, {
        slideId: resize.slideId,
        resizes: [{ id: resize.objectId, width, height }],
      });
    };

    const handleMouseUp = () => {
      const resize = resizeStateRef.current;
      resizeStateRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (resize?.moved) {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 0);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  if (!activeSlide) {
    return <div className={styles.workspace}>Нет активного слайда</div>;
  }

  const selectedObject =
    selectedIds.length === 1
      ? activeSlide.objects.find((obj) => obj.id === selectedIds[0])
      : undefined;

  const textObject: TextObject | null =
    selectedObject && selectedObject.type === 'text' ? selectedObject : null;

  const hasSelection = selectedIds.length > 0;

  return (
    <div className={styles.workspace}>
      <div className={styles.canvas}>
        <SlidePreview
          slide={activeSlide}
          selectedIds={selectedIds}
          containerRef={containerRef}
          onObjectClick={handleObjectClick}
          onObjectMouseDown={handleObjectMouseDown}
          onObjectResizeMouseDown={handleObjectResizeMouseDown}
          onContainerClick={handleContainerClick}
        />
      </div>
      {textObject ? (
        <TextStylePanel slideId={activeSlide.id} object={textObject} />
      ) : (
        <SlideProperties slide={activeSlide} hasSelection={hasSelection} />
      )}
    </div>
  );
}

export { Workspace };