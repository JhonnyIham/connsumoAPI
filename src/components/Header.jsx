import React from 'react';
import './styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src="/assets/logoDark.png" alt="UNCP Logo" className="logo" />
      </div>
      <div className="header-text">
        <h1>UNIVERSIDAD NACIONAL DEL CENTRO DEL PERÚ</h1>
        <h2>FACULTAD DE INGENIERÍA DE SISTEMAS</h2>
        <h2>DESARROLLO DE APLICACIONES WEB</h2>
      </div>
      <div className="logo-container">
        <img src="/assets/Logofis.png" alt="Facultad Logo" className="logo" />
      </div>
    </header>
  );
};

export default Header;
