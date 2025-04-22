// // // frontend/src/components/HomeScreen.js
// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom";

// // function HomeScreen() {
// //   const navigate = useNavigate();
// //   const [welcomeMessage, setWelcomeMessage] = useState("Welcome to the Biology Department!");

// //   useEffect(() => {
// //     fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
// //       .then(res => res.json())
// //       .then(data => {
// //         if (data.welcomeMessage) setWelcomeMessage(data.welcomeMessage);
// //       })
// //       .catch(err => console.error("Failed to load config:", err));
// //   }, []);

// //   const handleRequestHelp = () => {
// //     // Create an Audio object and play the 'ding' sound.
// //     const audio = new Audio('/ding.mp3'); // Place "ding.mp3" in your public folder.
// //     audio.play().catch(error => {
// //       console.error("Error playing sound:", error);
// //     });
// //     // Optionally, you can provide feedback.
// //     // alert("Help request triggered (ding sound played)!");
// //   };

// //   return (
// //     <div className="home-container">
// //       <h1>{welcomeMessage}</h1>
// //       <div className="buttons">
// //         <button className="main-button" onClick={handleRequestHelp}>
// //           Request Help
// //         </button>
// //         <button className="main-button" onClick={() => navigate('/directory')}>
// //           View Directory
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default HomeScreen;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function HomeScreen() {
//   const navigate = useNavigate();
//   const [welcomeMessage, setWelcomeMessage] = useState("");
//   const [imageURL, setImageURL] = useState("");

//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.welcomeMessage) setWelcomeMessage(data.welcomeMessage);
//         if (data.imagePath) {
//           // If frontend and backend are same origin, relative path works:
//           setImageURL(data.imagePath);
//           // Otherwise prepend backend URL:
//           // setImageURL(`https://your-backend.com/${data.imagePath}`);
//         }
//       })
//       .catch(console.error);
//   }, []);

//   const handleRequestHelp = () => {
//     const audio = new Audio('/ding.mp3'); // put ding.mp3 in /public
//     audio.play().catch(console.error);
//   };

//   return (
//     <div className="home-container">
//       <h1>{welcomeMessage}</h1>
//       {imageURL && (
//         <img
//           src={imageURL}
//           alt="Welcome"
//           style={{ maxWidth: '80%', margin: '1rem 0' }}
//         />
//       )}
//       <div className="buttons">
//         <button className="main-button" onClick={handleRequestHelp}>
//           Request Help
//         </button>
//         <button className="main-button" onClick={() => navigate('/directory')}>
//           View Directory
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HomeScreen;

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
