import './index.css'; 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from './App.jsx'
import { store } from "./store";
import { Provider } from "react-redux";
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
   <Provider store={store}>
     <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
   </Provider>
)
