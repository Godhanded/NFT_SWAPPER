import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
import './index.css';
import RainbowAppWrapper from './RainbowAppWrapper';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <div>
      <RainbowAppWrapper />
    </div>
);

