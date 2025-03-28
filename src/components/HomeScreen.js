// frontend/src/components/HomeScreen.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const navigate = useNavigate();
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the Biology Department!");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
      .then(res => res.json())
      .then(data => {
        if (data.welcomeMessage) setWelcomeMessage(data.welcomeMessage);
      })
      .catch(err => console.error("Failed to load config:", err));
  }, []);

  const handleRequestHelp = () => {
    // Create an Audio object and play the 'ding' sound.
    const audio = new Audio('/ding.mp3'); // Place "ding.mp3" in your public folder.
    audio.play().catch(error => {
      console.error("Error playing sound:", error);
    });
    // Optionally, you can provide feedback.
    // alert("Help request triggered (ding sound played)!");
  };

  return (
    <div className="home-container">
      <h1>{welcomeMessage}</h1>
      <div className="buttons">
        <button className="main-button" onClick={handleRequestHelp}>
          Request Help
        </button>
        <button className="main-button" onClick={() => navigate('/directory')}>
          View Directory
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;

