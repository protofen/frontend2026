import { createRoot } from 'react-dom/client';
import { App } from './components/App.js';
import { addEditorChangeHandler, setInitialState } from './editor.js';
import { createTestPresentation } from './data.js';

const initialData = createTestPresentation();
setInitialState(initialData);

const root = createRoot(document.getElementById('root')!);

function renderApp(): void {
  root.render(<App />);
}

renderApp();

addEditorChangeHandler(() => {
  renderApp();
});