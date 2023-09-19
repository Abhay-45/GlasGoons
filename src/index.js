import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Goal from './components/goal';
import Login from './components/login';
import Leaderboard from './components/leaderboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <>
          <App />
          <Routes>
            <Route path="/" element={<Goal />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/LeaderBoard" element={<Leaderboard />} />
          </Routes>
        </>
      </ChakraProvider>
    </BrowserRouter>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
