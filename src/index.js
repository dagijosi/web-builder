// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store';
import { loadProjectFromStorage } from './utils/storage';
import { loadProject, addElement } from './features/elements/elementsSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

const project = loadProjectFromStorage();
if (Array.isArray(project)) {
  project.forEach(element => store.dispatch(addElement(element)));
} else {
  console.error('Loaded project is not an array:', project);
}

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
