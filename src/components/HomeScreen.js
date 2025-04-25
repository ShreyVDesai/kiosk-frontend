import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomeScreen() {
  const [msg, setMsg]       = useState('');
  const [img, setImg]       = useState('');
  const navigate            = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
      .then(r => r.json())
      .then(cfg => {
        if (cfg.welcomeMessage) setMsg(cfg.welcomeMessage);
        if (cfg.imagePath) {
          // If same origin, relative path works:
          const base = process.env.REACT_APP_API_URL || 'http://localhost:3001';
          setImg(`${base}${cfg.imagePath}`);
          // Otherwise:
          // setImg(`https://your-backend.com/${cfg.imagePath}`);
        }
      })
      .catch(console.error);
  }, []);

  const requestHelp = () => {
    const ding = new Audio('/ding.mp3');
    ding.play().catch(console.error);
  };

  return (
    <div className="home-container">
      <h1>{msg}</h1>
      {img && <img src={img} alt="Welcome" />}
      <div className="buttons">
        <button className="main-button" onClick={requestHelp}>
          Request Help
        </button>
        <button className="main-button" onClick={() => navigate('/directory')}>
          View Directory
        </button>
      </div>
    </div>
  );
}
