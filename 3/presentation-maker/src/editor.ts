import type { Presentation } from './types/presentation.js';

type Modifier<P = any> = (model: Presentation, params: P) => Presentation;

let currentPresentation: Presentation | null = null;
let past: Presentation[] = [];
let future: Presentation[] = [];
const editorChangeHandlers = new Set<() => void>();
let modifierParams: any = null;
let isPreviewMode = false;

function notify(): void {
  editorChangeHandlers.forEach((handler) => handler());
}

function setInitialState(presentation: Presentation): void {
  currentPresentation = presentation;
  past = [];
  future = [];
  notify();
}

function getState(): Presentation | null {
  return currentPresentation;
}

function getHistoryState(): { canUndo: boolean; canRedo: boolean } {
  return {
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}

function getCanUndo(): boolean {
  return past.length > 0;
}

function getCanRedo(): boolean {
  return future.length > 0;
}

function dispatch(modifier: Modifier, params: any = null): void {
  if (!currentPresentation) {
    console.error('State is not initialized! Call setInitialState first.');
    return;
  }

  past = [...past, currentPresentation];
  future = [];
  modifierParams = params;
  currentPresentation = modifier(currentPresentation, params);

  notify();
}

function undo(): void {
  if (past.length === 0 || !currentPresentation) return;
  future = [currentPresentation, ...future];
  const previous = past[past.length - 1];
  past = past.slice(0, -1);
  currentPresentation = previous;
  notify();
}

function redo(): void {
  if (future.length === 0 || !currentPresentation) return;
  past = [...past, currentPresentation];
  const next = future[0];
  future = future.slice(1);
  currentPresentation = next;
  notify();
}

function addEditorChangeHandler(handler: () => void): () => void {
  editorChangeHandlers.add(handler);
  return () => {
    editorChangeHandlers.delete(handler);
  };
}

function setPreviewMode(mode: boolean): void {
  isPreviewMode = mode;
  notify();
}

function getPreviewMode(): boolean {
  return isPreviewMode;
}

export {
  setInitialState,
  getState,
  getHistoryState,
  getCanUndo,
  getCanRedo,
  dispatch,
  undo,
  redo,
  addEditorChangeHandler,
  setPreviewMode,
  getPreviewMode,
};