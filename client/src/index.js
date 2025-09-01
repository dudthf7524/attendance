import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LoadScript } from '@react-google-maps/api';
const store = configureStore();
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const GMAP_LIBRARIES = ['places'];

window.addEventListener("unhandledrejection", (event) => {
  console.log("🔥 Uncaught (in promise):", event.reason);
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Toaster position='top-right' />
      <LoadScript
        id="google-map-script"                // ✅ 고정된 id
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={GMAP_LIBRARIES}           // ✅ 모듈 밖 상수
      >
        <App />
      </LoadScript>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
