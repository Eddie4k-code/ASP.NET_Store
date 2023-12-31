import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/layout/App.tsx'
import './app/layout/App.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {RouterProvider} from 'react-router-dom';
import { router } from './app/router/Routes.tsx';
import { CartContextProvider } from './app/context/StoreContext.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore.ts';




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
    </Provider>
  </React.StrictMode>,
)
