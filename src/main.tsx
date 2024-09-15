import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// Redux-toolkit
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { ToastContainer } from 'react-toastify'; // lib: всплывающие сообщения (например: "успешная регистрация")
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    {/* <React.StrictMode> */}
      <App />
      <ToastContainer position='bottom-left' autoClose={5000}/> 
    {/* </React.StrictMode> */}
  </Provider>
  ,
);
