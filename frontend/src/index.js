import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; 
import App from './App';  

// Рендерим компонент App в элемент с id 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
