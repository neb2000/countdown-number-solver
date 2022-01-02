import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
serviceWorkerRegistration.register();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
