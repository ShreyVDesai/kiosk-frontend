// // frontend/src/components/AdminPanel.js
// import React, { useState, useEffect } from 'react';

// function AdminPanel() {
//   // Hardcoded admin credentials (in a real app, never hardcode secrets like this!)
//   const ADMIN_USERNAME = "admin";
//   const ADMIN_PASSWORD = "password123";

//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   // State for config data
//   const [welcomeMsg, setWelcomeMsg] = useState("");
//   const [emailList, setEmailList] = useState("");
//   // State for adding directory entry
//   const [newCategory, setNewCategory] = useState("Lab Personnel");
//   const [newEntry, setNewEntry] = useState({ name: "", lab: "", ext: "", room: "" });
//   const [statusMessage, setStatusMessage] = useState("");

//   useEffect(() => {
//     if (loggedIn) {
//       // Fetch current config when logged in
//       fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
//         .then(res => res.json())
//         .then(data => {
//           if (data.welcomeMessage) setWelcomeMsg(data.welcomeMessage);
//           if (data.helpRecipients) setEmailList(data.helpRecipients.join(", "));
//         })
//         .catch(err => console.error("Failed to load config for admin:", err));
//     }
//   }, [loggedIn]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     const username = e.target.username.value;
//     const password = e.target.password.value;
//     if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
//       setLoggedIn(true);
//       setLoginError("");
//     } else {
//       setLoginError("Incorrect username or password.");
//     }
//   };

//   const handleConfigSave = () => {
//     // Prepare data to save
//     const updatedWelcome = welcomeMsg;
//     const updatedRecipients = emailList.split(",").map(email => email.trim()).filter(email => email);
//     fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ welcomeMessage: updatedWelcome, helpRecipients: updatedRecipients })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.message) {
//           setStatusMessage("Configuration updated successfully.");
//         }
//       })
//       .catch(err => {
//         console.error("Failed to update config:", err);
//         setStatusMessage("Error: Could not update configuration.");
//       });
//   };

//   const handleAddEntry = () => {
//     // Construct the entry object based on category
//     let entryObj = {};
//     if (newCategory === "Faculty" || newCategory === "Staff") {
//       // Use ext (extension) field
//       entryObj = {
//         [newCategory === "Faculty" ? "Faculty" : "Department Staff"]: newEntry.name,
//         "EXT": newEntry.ext,
//         "Room Number": newEntry.room
//       };
//     } else if (newCategory === "Labs") {
//       entryObj = {
//         "Labs": newEntry.name,
//         "Room Number": newEntry.room
//       };
//     } else {
//       // Lab Personnel or Grad Students
//       entryObj = {
//         [newCategory]: newEntry.name,
//         "Lab": newEntry.lab,
//         "Room Number": newEntry.room
//       };
//     }
//     fetch(`${process.env.REACT_APP_API_URL || ''}/api/directory`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ category: newCategory, entry: entryObj })
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.message) {
//           setStatusMessage(`Added new entry to ${newCategory}.`);
//           // Clear the input fields
//           setNewEntry({ name: "", lab: "", ext: "", room: "" });
//         } else {
//           setStatusMessage("Error: " + (data.error || "Failed to add entry."));
//         }
//       })
//       .catch(err => {
//         console.error("Failed to add entry:", err);
//         setStatusMessage("Error: Could not add entry.");
//       });
//   };

//   const handleLogout = () => {
//     setLoggedIn(false);
//     // Clear sensitive data from state
//     setWelcomeMsg("");
//     setEmailList("");
//     setNewEntry({ name: "", lab: "", ext: "", room: "" });
//     setStatusMessage("");
//   };

//   if (!loggedIn) {
//     // Render login form
//     return (
//       <div className="admin-container">
//         <h2>Admin Login</h2>
//         <form onSubmit={handleLogin}>
//           <div>
//             <label>Username: <input type="text" name="username" required /></label>
//           </div>
//           <div>
//             <label>Password: <input type="password" name="password" required /></label>
//           </div>
//           <button type="submit">Login</button>
//         </form>
//         {loginError && <p className="error">{loginError}</p>}
//       </div>
//     );
//   }

//   // Render admin panel (if logged in)
//   return (
//     <div className="admin-container">
//       <h2>Admin Panel</h2>
//       <button className="logout-button" onClick={handleLogout}>Log Out</button>

//       <div className="admin-section">
//         <h3>Edit Welcome Message</h3>
//         <textarea 
//           rows="2" 
//           value={welcomeMsg} 
//           onChange={e => setWelcomeMsg(e.target.value)} 
//         />
//       </div>

//       <div className="admin-section">
//         <h3>Edit Help Notification Email List</h3>
//         <p>Enter comma-separated emails:</p>
//         <textarea 
//           rows="2" 
//           value={emailList} 
//           onChange={e => setEmailList(e.target.value)} 
//         />
//       </div>

//       <div className="admin-section">
//         <h3>Add New Directory Entry</h3>
//         <label>
//           Category: 
//           <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
//             <option>Lab Personnel</option>
//             <option>Grad Students</option>
//             <option>Faculty</option>
//             <option>Labs</option>
//             <option>Staff</option>
//           </select>
//         </label>
//         <div className="new-entry-form">
//           <input 
//             type="text" 
//             placeholder={newCategory === "Labs" ? "Lab Name" : "Name"} 
//             value={newEntry.name} 
//             onChange={e => setNewEntry({ ...newEntry, name: e.target.value })} 
//           />
//           {(newCategory === "Lab Personnel" || newCategory === "Grad Students") && (
//             <input 
//               type="text" 
//               placeholder="Lab" 
//               value={newEntry.lab} 
//               onChange={e => setNewEntry({ ...newEntry, lab: e.target.value })} 
//             />
//           )}
//           {(newCategory === "Faculty" || newCategory === "Staff") && (
//             <input 
//               type="text" 
//               placeholder="Extension (EXT)" 
//               value={newEntry.ext} 
//               onChange={e => setNewEntry({ ...newEntry, ext: e.target.value })} 
//             />
//           )}
//           <input 
//             type="text" 
//             placeholder="Room Number" 
//             value={newEntry.room} 
//             onChange={e => setNewEntry({ ...newEntry, room: e.target.value })} 
//           />
//         </div>
//         <button onClick={handleAddEntry}>Add Entry</button>
//       </div>

//       <button className="save-button" onClick={handleConfigSave}>Save Changes</button>
//       {statusMessage && <p className="status-msg">{statusMessage}</p>}
//     </div>
//   );
// }

// export default AdminPanel;

// frontend/src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';

function AdminPanel() {
  // Hardcoded admin credentials
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123";

  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // State for configuration data (welcome message only)
  const [welcomeMsg, setWelcomeMsg] = useState("");
  
  // State for adding a new directory entry
  const [newCategory, setNewCategory] = useState("Lab Personnel");
  const [newEntry, setNewEntry] = useState({ name: "", lab: "", ext: "", room: "" });
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (loggedIn) {
      // Fetch current config (welcome message) when logged in
      fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
        .then(res => res.json())
        .then(data => {
          if (data.welcomeMessage) setWelcomeMsg(data.welcomeMessage);
        })
        .catch(err => console.error("Failed to load config for admin:", err));
    }
  }, [loggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect username or password.");
    }
  };

  const handleConfigSave = () => {
    // Update only the welcome message now
    fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ welcomeMessage: welcomeMsg })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setStatusMessage("Configuration updated successfully.");
        }
      })
      .catch(err => {
        console.error("Failed to update config:", err);
        setStatusMessage("Error: Could not update configuration.");
      });
  };

  const handleAddEntry = () => {
    // Construct the new entry based on the selected category
    let entryObj = {};
    if (newCategory === "Faculty" || newCategory === "Staff") {
      entryObj = {
        [newCategory === "Faculty" ? "Faculty" : "Department Staff"]: newEntry.name,
        "EXT": newEntry.ext,
        "Room Number": newEntry.room
      };
    } else if (newCategory === "Labs") {
      entryObj = {
        "Labs": newEntry.name,
        "Room Number": newEntry.room
      };
    } else {
      // For Lab Personnel or Grad Students
      entryObj = {
        [newCategory]: newEntry.name,
        "Lab": newEntry.lab,
        "Room Number": newEntry.room
      };
    }
    fetch(`${process.env.REACT_APP_API_URL || ''}/api/directory`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category: newCategory, entry: entryObj })
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          setStatusMessage(`Added new entry to ${newCategory}.`);
          // Clear the new entry inputs
          setNewEntry({ name: "", lab: "", ext: "", room: "" });
        } else {
          setStatusMessage("Error: " + (data.error || "Failed to add entry."));
        }
      })
      .catch(err => {
        console.error("Failed to add entry:", err);
        setStatusMessage("Error: Could not add entry.");
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setWelcomeMsg("");
    setNewEntry({ name: "", lab: "", ext: "", room: "" });
    setStatusMessage("");
  };

  if (!loggedIn) {
    return (
      <div className="admin-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username: <input type="text" name="username" required />
            </label>
          </div>
          <div>
            <label>
              Password: <input type="password" name="password" required />
            </label>
          </div>
          <button type="submit">Login</button>
        </form>
        {loginError && <p className="error">{loginError}</p>}
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      <button className="logout-button" onClick={handleLogout}>Log Out</button>

      <div className="admin-section">
        <h3>Edit Welcome Message</h3>
        <textarea 
          rows="2" 
          value={welcomeMsg} 
          onChange={e => setWelcomeMsg(e.target.value)} 
        />
      </div>

      <div className="admin-section">
        <h3>Add New Directory Entry</h3>
        <label>
          Category: 
          <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
            <option>Lab Personnel</option>
            <option>Grad Students</option>
            <option>Faculty</option>
            <option>Labs</option>
            <option>Staff</option>
          </select>
        </label>
        <div className="new-entry-form">
          <input 
            type="text" 
            placeholder={newCategory === "Labs" ? "Lab Name" : "Name"} 
            value={newEntry.name} 
            onChange={e => setNewEntry({ ...newEntry, name: e.target.value })} 
          />
          {(newCategory === "Lab Personnel" || newCategory === "Grad Students") && (
            <input 
              type="text" 
              placeholder="Lab" 
              value={newEntry.lab} 
              onChange={e => setNewEntry({ ...newEntry, lab: e.target.value })} 
            />
          )}
          {(newCategory === "Faculty" || newCategory === "Staff") && (
            <input 
              type="text" 
              placeholder="Extension (EXT)" 
              value={newEntry.ext} 
              onChange={e => setNewEntry({ ...newEntry, ext: e.target.value })} 
            />
          )}
          <input 
            type="text" 
            placeholder="Room Number" 
            value={newEntry.room} 
            onChange={e => setNewEntry({ ...newEntry, room: e.target.value })} 
          />
        </div>
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      <button className="save-button" onClick={handleConfigSave}>Save Changes</button>
      {statusMessage && <p className="status-msg">{statusMessage}</p>}
    </div>
  );
}

export default AdminPanel;
