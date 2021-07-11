import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Header from './components/Header'
import Footer from './components/Footer'
import "./App.css"

ReactDOM.render(
  <React.StrictMode>
    <div className="index">
      <Header />
      <App />
      <Footer />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
