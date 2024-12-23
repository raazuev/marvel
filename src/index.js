import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import styles from "./style/main.module.sass";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className={styles.container}>
    <App />
  </div>
);

