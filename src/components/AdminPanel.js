// // // // frontend/src/components/AdminPanel.js
// // // import React, { useState, useEffect } from 'react';

// // // function AdminPanel() {
// // //   // Hardcoded admin credentials
// // //   const ADMIN_USERNAME = "admin";
// // //   const ADMIN_PASSWORD = "password123";

// // //   const [loggedIn, setLoggedIn] = useState(false);
// // //   const [loginError, setLoginError] = useState("");

// // //   // State for configuration data (welcome message only)
// // //   const [welcomeMsg, setWelcomeMsg] = useState("");
  
// // //   // State for adding a new directory entry
// // //   const [newCategory, setNewCategory] = useState("Lab Personnel");
// // //   const [newEntry, setNewEntry] = useState({ name: "", lab: "", ext: "", room: "" });
// // //   const [statusMessage, setStatusMessage] = useState("");

// // //   useEffect(() => {
// // //     if (loggedIn) {
// // //       // Fetch current config (welcome message) when logged in
// // //       fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
// // //         .then(res => res.json())
// // //         .then(data => {
// // //           if (data.welcomeMessage) setWelcomeMsg(data.welcomeMessage);
// // //         })
// // //         .catch(err => console.error("Failed to load config for admin:", err));
// // //     }
// // //   }, [loggedIn]);

// // //   const handleLogin = (e) => {
// // //     e.preventDefault();
// // //     const username = e.target.username.value;
// // //     const password = e.target.password.value;
// // //     if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
// // //       setLoggedIn(true);
// // //       setLoginError("");
// // //     } else {
// // //       setLoginError("Incorrect username or password.");
// // //     }
// // //   };

// // //   const handleConfigSave = () => {
// // //     // Update only the welcome message now
// // //     fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ welcomeMessage: welcomeMsg })
// // //     })
// // //       .then(res => res.json())
// // //       .then(data => {
// // //         if (data.message) {
// // //           setStatusMessage("Configuration updated successfully.");
// // //         }
// // //       })
// // //       .catch(err => {
// // //         console.error("Failed to update config:", err);
// // //         setStatusMessage("Error: Could not update configuration.");
// // //       });
// // //   };

// // //   const handleAddEntry = () => {
// // //     // Construct the new entry based on the selected category
// // //     let entryObj = {};
// // //     if (newCategory === "Faculty" || newCategory === "Staff") {
// // //       entryObj = {
// // //         [newCategory === "Faculty" ? "Faculty" : "Department Staff"]: newEntry.name,
// // //         "EXT": newEntry.ext,
// // //         "Room Number": newEntry.room
// // //       };
// // //     } else if (newCategory === "Labs") {
// // //       entryObj = {
// // //         "Labs": newEntry.name,
// // //         "Room Number": newEntry.room
// // //       };
// // //     } else {
// // //       // For Lab Personnel or Grad Students
// // //       entryObj = {
// // //         [newCategory]: newEntry.name,
// // //         "Lab": newEntry.lab,
// // //         "Room Number": newEntry.room
// // //       };
// // //     }
// // //     fetch(`${process.env.REACT_APP_API_URL || ''}/api/directory`, {
// // //       method: 'POST',
// // //       headers: { 'Content-Type': 'application/json' },
// // //       body: JSON.stringify({ category: newCategory, entry: entryObj })
// // //     })
// // //       .then(res => res.json())
// // //       .then(data => {
// // //         if (data.message) {
// // //           setStatusMessage(`Added new entry to ${newCategory}.`);
// // //           // Clear the new entry inputs
// // //           setNewEntry({ name: "", lab: "", ext: "", room: "" });
// // //         } else {
// // //           setStatusMessage("Error: " + (data.error || "Failed to add entry."));
// // //         }
// // //       })
// // //       .catch(err => {
// // //         console.error("Failed to add entry:", err);
// // //         setStatusMessage("Error: Could not add entry.");
// // //       });
// // //   };

// // //   const handleLogout = () => {
// // //     setLoggedIn(false);
// // //     setWelcomeMsg("");
// // //     setNewEntry({ name: "", lab: "", ext: "", room: "" });
// // //     setStatusMessage("");
// // //   };

// // //   if (!loggedIn) {
// // //     return (
// // //       <div className="admin-container">
// // //         <h2>Admin Login</h2>
// // //         <form onSubmit={handleLogin}>
// // //           <div>
// // //             <label>
// // //               Username: <input type="text" name="username" required />
// // //             </label>
// // //           </div>
// // //           <div>
// // //             <label>
// // //               Password: <input type="password" name="password" required />
// // //             </label>
// // //           </div>
// // //           <button type="submit">Login</button>
// // //         </form>
// // //         {loginError && <p className="error">{loginError}</p>}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="admin-container">
// // //       <h2>Admin Panel</h2>
// // //       <button className="logout-button" onClick={handleLogout}>Log Out</button>

// // //       <div className="admin-section">
// // //         <h3>Edit Welcome Message</h3>
// // //         <textarea 
// // //           rows="2" 
// // //           value={welcomeMsg} 
// // //           onChange={e => setWelcomeMsg(e.target.value)} 
// // //         />
// // //       </div>

// // //       <div className="admin-section">
// // //         <h3>Add New Directory Entry</h3>
// // //         <label>
// // //           Category: 
// // //           <select value={newCategory} onChange={e => setNewCategory(e.target.value)}>
// // //             <option>Lab Personnel</option>
// // //             <option>Grad Students</option>
// // //             <option>Faculty</option>
// // //             <option>Labs</option>
// // //             <option>Staff</option>
// // //           </select>
// // //         </label>
// // //         <div className="new-entry-form">
// // //           <input 
// // //             type="text" 
// // //             placeholder={newCategory === "Labs" ? "Lab Name" : "Name"} 
// // //             value={newEntry.name} 
// // //             onChange={e => setNewEntry({ ...newEntry, name: e.target.value })} 
// // //           />
// // //           {(newCategory === "Lab Personnel" || newCategory === "Grad Students") && (
// // //             <input 
// // //               type="text" 
// // //               placeholder="Lab" 
// // //               value={newEntry.lab} 
// // //               onChange={e => setNewEntry({ ...newEntry, lab: e.target.value })} 
// // //             />
// // //           )}
// // //           {(newCategory === "Faculty" || newCategory === "Staff") && (
// // //             <input 
// // //               type="text" 
// // //               placeholder="Extension (EXT)" 
// // //               value={newEntry.ext} 
// // //               onChange={e => setNewEntry({ ...newEntry, ext: e.target.value })} 
// // //             />
// // //           )}
// // //           <input 
// // //             type="text" 
// // //             placeholder="Room Number" 
// // //             value={newEntry.room} 
// // //             onChange={e => setNewEntry({ ...newEntry, room: e.target.value })} 
// // //           />
// // //         </div>
// // //         <button onClick={handleAddEntry}>Add Entry</button>
// // //       </div>

// // //       <button className="save-button" onClick={handleConfigSave}>Save Changes</button>
// // //       {statusMessage && <p className="status-msg">{statusMessage}</p>}
// // //     </div>
// // //   );
// // // }

// // // export default AdminPanel;

// // import React, { useState, useEffect } from 'react';

// // function AdminPanel() {
// //   // login state omitted for brevity; assume protected route or logic as before

// //   // --- Edit / Delete states ---
// //   const [editData,   setEditData]   = useState({ category: '', name: '', lab: '', room: '' });
// //   const [deleteData, setDeleteData] = useState({ category: '', name: '', lab: '', room: '' });

// //   // --- Image upload state ---
// //   const [selectedFile, setSelectedFile] = useState(null);

// //   // Handlers for form inputs
// //   const handleEditChange =   e => setEditData({   ...editData,   [e.target.name]: e.target.value });
// //   const handleDeleteChange = e => setDeleteData({ ...deleteData, [e.target.name]: e.target.value });
// //   const handleFileChange =   e => e.target.files[0] && setSelectedFile(e.target.files[0]);

// //   // Update entry
// //   const handleUpdateSubmit = async e => {
// //     e.preventDefault();
// //     const res = await fetch('/api/directory', {
// //       method: 'PUT',
// //       headers: { 'Content-Type': 'application/json' },
// //       body: JSON.stringify(editData)
// //     });
// //     const json = await res.json();
// //     alert(res.ok ? 'Entry updated.' : `Error: ${json.error}`);
// //   };

// //   // Delete entry
// //   const handleDeleteSubmit = async e => {
// //     e.preventDefault();
// //     const params = new URLSearchParams(deleteData).toString();
// //     const res = await fetch(`/api/directory?${params}`, { method: 'DELETE' });
// //     const json = await res.json();
// //     alert(res.ok ? 'Entry deleted.' : `Error: ${json.error}`);
// //   };

// //   // Upload image
// //   const handleUploadSubmit = async e => {
// //     e.preventDefault();
// //     if (!selectedFile) return alert('Select an image first.');
// //     const formData = new FormData();
// //     formData.append('image', selectedFile);
// //     const res = await fetch('/api/upload-image', { method: 'POST', body: formData });
// //     const json = await res.json();
// //     alert(res.ok ? 'Image uploaded.' : `Error: ${json.error}`);
// //     setSelectedFile(null);
// //   };

// //   return (
// //     <div className="admin-container">
// //       <h2>Admin Panel</h2>

// //       {/* Edit */}
// //       <div className="admin-section">
// //         <h3>Edit Directory Entry</h3>
// //         <form onSubmit={handleUpdateSubmit}>
// //           <input name="category" onChange={handleEditChange} placeholder="Category" required />
// //           <input name="name"     onChange={handleEditChange} placeholder="Name"     required />
// //           <input name="lab"      onChange={handleEditChange} placeholder="Lab" />
// //           <input name="room"     onChange={handleEditChange} placeholder="Room" />
// //           <button type="submit">Update Entry</button>
// //         </form>
// //       </div>

// //       {/* Delete */}
// //       <div className="admin-section">
// //         <h3>Delete Directory Entry</h3>
// //         <form onSubmit={handleDeleteSubmit}>
// //           <input name="category" onChange={handleDeleteChange} placeholder="Category" required />
// //           <input name="name"     onChange={handleDeleteChange} placeholder="Name"     required />
// //           <input name="lab"      onChange={handleDeleteChange} placeholder="Lab (opt)" />
// //           <input name="room"     onChange={handleDeleteChange} placeholder="Room (opt)" />
// //           <button type="submit">Delete Entry</button>
// //         </form>
// //       </div>

// //       {/* Image Upload */}
// //       <div className="admin-section">
// //         <h3>Upload Welcome Image</h3>
// //         <form onSubmit={handleUploadSubmit}>
// //           <input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
// //           <button type="submit">Upload Image</button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // export default AdminPanel;

// import React, { useState, useEffect } from 'react';

// export default function AdminPanel() {
//   const CATS = [
//     'Lab Personnel',
//     'Grad Students',
//     'Faculty',
//     'Labs',
//     'Staff'
//   ];

//   // Config
//   const [welcomeMsg, setWelcomeMsg] = useState('');
//   const [status, setStatus]         = useState('');

//   // Add form
//   const [addCat, setAddCat] = useState(CATS[0]);
//   const [add, setAdd]       = useState({ name:'', lab:'', ext:'', room:'' });

//   // Edit form
//   const [editCat, setEditCat]     = useState(CATS[0]);
//   const [find, setFind]           = useState({ name:'', lab:'', ext:'', room:'' });
//   const [update, setUpdate]       = useState({ name:'', lab:'', ext:'', room:'' });

//   // Delete form
//   const [delCat, setDelCat] = useState(CATS[0]);
//   const [del, setDel]       = useState({ name:'', lab:'', ext:'', room:'' });

//   // Image upload
//   const [file, setFile] = useState(null);

//   // Load config at mount
//   useEffect(() => {
//     fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`)
//       .then(r => r.json())
//       .then(cfg => {
//         if (cfg.welcomeMessage) setWelcomeMsg(cfg.welcomeMessage);
//       })
//       .catch(console.error);
//   }, []);

//   // Save welcome message
//   const saveConfig = async () => {
//     const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/config`, {
//       method:'POST',
//       headers:{'Content-Type':'application/json'},
//       body: JSON.stringify({ welcomeMessage: welcomeMsg })
//     });
//     setStatus(res.ok ? 'Welcome message saved.' : 'Save failed.');
//   };

//   // Add entry
//   const handleAdd = async e => {
//     e.preventDefault();
//     const entry = {};
//     if (addCat === 'Labs') {
//       entry.Labs = add.name;
//       entry['Room Number'] = add.room;
//     } else if (addCat==='Faculty' || addCat==='Staff') {
//       entry[ addCat === 'Faculty' ? 'Faculty' : 'Department Staff'] = add.name;
//       entry.EXT = add.ext;
//       entry['Room Number'] = add.room;
//     } else {
//       entry[addCat] = add.name;
//       entry.Lab = add.lab;
//       entry['Room Number'] = add.room;
//     }
//     const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/directory`, {
//       method:'POST',
//       headers:{'Content-Type':'application/json'},
//       body: JSON.stringify({ category:addCat, entry })
//     });
//     setStatus(res.ok? 'Added.' : 'Add failed.');
//   };

//   // Edit entry
//   const handleEdit = async e => {
//     e.preventDefault();
//     const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/directory`, {
//       method:'PUT',
//       headers:{'Content-Type':'application/json'},
//       body: JSON.stringify({
//         category: editCat,
//         find:   find,
//         update: update
//       })
//     });
//     setStatus(res.ok? 'Updated.' : 'Update failed.');
//   };

//   // Delete entry
//   const handleDelete = async e => {
//     e.preventDefault();
//     const qs = new URLSearchParams({ category:delCat, ...del });
//     const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/directory?${qs}`, { method:'DELETE' });
//     setStatus(res.ok? 'Deleted.' : 'Delete failed.');
//   };

//   // Upload image
//   const handleUpload = async e => {
//     e.preventDefault();
//     if (!file) return setStatus('Pick a file first');
//     const fd = new FormData();
//     fd.append('image', file);
//     const res = await fetch(`${process.env.REACT_APP_API_URL || ''}/api/upload-image`, { method:'POST', body:fd });
//     setStatus(res.ok? 'Image uploaded.' : 'Upload failed.');
//   };

//   // Helpers to render dynamic fields
//   const renderFields = (cat, state, setter, includeName=true) => {
//     const fields = [];
//     if (includeName) {
//       fields.push(
//         <input
//           key="name"
//           placeholder={cat==='Labs'? 'Lab Name':'Name'}
//           value={state.name}
//           onChange={e => setter({...state, name:e.target.value})}
//           required
//         />
//       );
//     }
//     if (cat==='Lab Personnel' || cat==='Grad Students') {
//       fields.push(
//         <input
//           key="lab"
//           placeholder="Lab"
//           value={state.lab}
//           onChange={e => setter({...state, lab:e.target.value})}
//           required={includeName}
//         />
//       );
//     }
//     if (cat==='Faculty' || cat==='Staff') {
//       fields.push(
//         <input
//           key="ext"
//           placeholder="Extension (EXT)"
//           value={state.ext}
//           onChange={e => setter({...state, ext:e.target.value})}
//           required={includeName}
//         />
//       );
//     }
//     fields.push(
//       <input
//         key="room"
//         placeholder="Room Number"
//         value={state.room}
//         onChange={e => setter({...state, room:e.target.value})}
//         required={includeName}
//       />
//     );
//     return fields;
//   };

//   return (
//     <div className="admin-container">
//       <h2>Admin Panel</h2>

//       {/* Welcome Message */}
//       <div className="admin-section">
//         <h3>Edit Welcome Message</h3>
//         <textarea
//           rows="2"
//           value={welcomeMsg}
//           onChange={e => setWelcomeMsg(e.target.value)}
//         />
//         <button onClick={saveConfig}>Save Welcome</button>
//       </div>

//       {/* Add */}
//       <div className="admin-section">
//         <h3>Add Directory Entry</h3>
//         <form onSubmit={handleAdd}>
//           <select value={addCat} onChange={e => setAddCat(e.target.value)}>
//             {CATS.map(c => <option key={c}>{c}</option>)}
//           </select>
//           {renderFields(addCat, add, setAdd, true)}
//           <button type="submit">Add</button>
//         </form>
//       </div>

//       {/* Edit
//       <div className="admin-section">
//         <h3>Edit Directory Entry</h3>
//         <form onSubmit={handleEdit}>
//           <select value={editCat} onChange={e => setEditCat(e.target.value)}>
//             {CATS.map(c => <option key={c}>{c}</option>)}
//           </select>
//           <p><em>Find entry to edit:</em></p>
//           {renderFields(editCat, find, setFind, true)}
//           <p><em>New values (leave blank to keep):</em></p>
//           {renderFields(editCat, update, setUpdate, false)}
//           <button type="submit">Update</button>
//         </form>
//       </div> */}

//       {/* Delete */}
//       <div className="admin-section">
//         <h3>Delete Directory Entry</h3>
//         <form onSubmit={handleDelete}>
//           <select value={delCat} onChange={e => setDelCat(e.target.value)}>
//             {CATS.map(c => <option key={c}>{c}</option>)}
//           </select>
//           {renderFields(delCat, del, setDel, true)}
//           <button type="submit">Delete</button>
//         </form>
//       </div>

//       {/* Image Upload */}
//       <div className="admin-section">
//         <h3>Upload Welcome Image</h3>
//         <input
//           type="file"
//           accept="image/png, image/jpeg"
//           onChange={e => setFile(e.target.files[0])}
//         />
//         <button onClick={handleUpload}>Upload Image</button>
//       </div>

//       {status && <p className="status-msg">{status}</p>}
//     </div>
//   );
// }

// frontend/src/components/AdminPanel.js

import React, { useState, useEffect } from 'react';

export default function AdminPanel() {
  // ── Hardcoded admin credentials ─────────────────────────────────────────────
  const ADMIN_USERNAME = "admin";
  const ADMIN_PASSWORD = "password123";

  // ── Login state ─────────────────────────────────────────────────────────────
  const [loggedIn, setLoggedIn]   = useState(false);
  const [loginError, setLoginError] = useState("");

  // ── Config (welcome message) state ──────────────────────────────────────────
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [statusMsg, setStatusMsg]   = useState("");

  // ── Categories ──────────────────────────────────────────────────────────────
  const CATS = [
    "Lab Personnel",
    "Grad Students",
    "Faculty",
    "Labs",
    "Staff",
  ];

  // ── Add Entry state ─────────────────────────────────────────────────────────
  const [addCat, setAddCat]   = useState(CATS[0]);
  const [addData, setAddData] = useState({
    name: "",
    lab: "",
    ext: "",
    room: "",
  });

  // ── Delete Entry state ──────────────────────────────────────────────────────
  const [delCat, setDelCat]   = useState(CATS[0]);
  const [delData, setDelData] = useState({
    name: "",
    lab: "",
    ext: "",
    room: "",
  });

  // ── Image Upload state ──────────────────────────────────────────────────────
  const [file, setFile] = useState(null);

  // ── Load config on login ────────────────────────────────────────────────────
  useEffect(() => {
    if (!loggedIn) return;
    fetch(`${process.env.REACT_APP_API_URL || ""}/api/config`)
      .then(res => res.json())
      .then(cfg => {
        if (cfg.welcomeMessage) setWelcomeMsg(cfg.welcomeMessage);
      })
      .catch(console.error);
  }, [loggedIn]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  // Login
  const handleLogin = e => {
    e.preventDefault();
    const u = e.target.username.value;
    const p = e.target.password.value;
    if (u === ADMIN_USERNAME && p === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("Incorrect username or password.");
    }
  };

  // Logout
  const handleLogout = () => {
    setLoggedIn(false);
    setWelcomeMsg("");
    setAddData({ name:"", lab:"", ext:"", room:"" });
    setDelData({ name:"", lab:"", ext:"", room:"" });
    setFile(null);
    setStatusMsg("");
  };

  // Save welcome message
  const handleSaveConfig = () => {
    fetch(`${process.env.REACT_APP_API_URL || ""}/api/config`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ welcomeMessage: welcomeMsg }),
    })
      .then(res => res.json())
      .then(json => setStatusMsg(json.message || "Saved."))
      .catch(() => setStatusMsg("Failed to save."));
  };

  // Add entry
  const handleAdd = e => {
    e.preventDefault();
    let entry = {};
    if (addCat === "Labs") {
      entry.Labs = addData.name;
      entry["Room Number"] = addData.room;
    } else if (addCat === "Faculty" || addCat === "Staff") {
      entry[addCat === "Faculty" ? "Faculty" : "Department Staff"] = addData.name;
      entry.EXT = addData.ext;
      entry["Room Number"] = addData.room;
    } else {
      entry[addCat] = addData.name;
      entry.Lab = addData.lab;
      entry["Room Number"] = addData.room;
    }
    fetch(`${process.env.REACT_APP_API_URL || ""}/api/directory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: addCat, entry }),
    })
      .then(res => res.json())
      .then(json => setStatusMsg(json.message || "Added."))
      .catch(() => setStatusMsg("Add failed."));
  };

  const handleDeleteChange = e => {
    const { name, value } = e.target;
    setDelData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Delete entry
  const handleDelete = e => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.append("category", delCat);
    params.append("name", delData.name.trim());
    if ((delCat === "Lab Personnel" || delCat === "Grad Students") && delData.lab.trim()) {
      params.append("lab", delData.lab.trim());
    }
    if ((delCat === "Faculty" || delCat === "Staff") && delData.ext.trim()) {
      params.append("ext", delData.ext.trim());
    }
    if (delData.room.trim()) {
      params.append("room", delData.room.trim());
    }

    fetch(`${process.env.REACT_APP_API_URL || ""}/api/directory?${params}`, {
      method: "DELETE",
    })
      .then(res => res.json().then(json => {
        if (res.ok) setStatusMsg(json.message);
        else setStatusMsg(`Error: ${json.error}`);
      }))
      .catch(() => setStatusMsg("Delete failed."));
  };

  // Upload image
  const handleUpload = e => {
    e.preventDefault();
    if (!file) {
      setStatusMsg("Select an image first.");
      return;
    }
    const fd = new FormData();
    fd.append("image", file);
    fetch(`${process.env.REACT_APP_API_URL || ""}/api/upload-image`, {
      method: "POST",
      body: fd,
    })
      .then(res => res.json().then(json => {
        if (res.ok) setStatusMsg(json.message);
        else setStatusMsg(`Error: ${json.error}`);
      }))
      .catch(() => setStatusMsg("Upload failed."));
  };

  // ── Render ──────────────────────────────────────────────────────────────────

  if (!loggedIn) {
    return (
      <div className="admin-container">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username: <input name="username" required />
            </label>
          </div>
          <div>
            <label>
              Password: <input name="password" type="password" required />
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
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>

      {/* Welcome Message */}
      <div className="admin-section">
        <h3>Edit Welcome Message</h3>
        <textarea
          rows="2"
          value={welcomeMsg}
          onChange={e => setWelcomeMsg(e.target.value)}
        />
        <button onClick={handleSaveConfig}>Save Welcome</button>
      </div>

      {/* Add Entry */}
      <div className="admin-section">
        <h3>Add Directory Entry</h3>
        <form onSubmit={handleAdd}>
          <select value={addCat} onChange={e => { setAddCat(e.target.value); setAddData({name:'',lab:'',ext:'',room:''}); }}>
            {CATS.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          {addCat !== "Labs" && (
            <input
              name="name"
              placeholder="Name"
              value={addData.name}
              onChange={e => setAddData({...addData, name: e.target.value})}
              required
            />
          )}
          {addCat === "Labs" && (
            <input
              name="name"
              placeholder="Lab Name"
              value={addData.name}
              onChange={e => setAddData({...addData, name: e.target.value})}
              required
            />
          )}
          {(addCat === "Lab Personnel" || addCat === "Grad Students") && (
            <input
              name="lab"
              placeholder="Lab"
              value={addData.lab}
              onChange={e => setAddData({...addData, lab: e.target.value})}
              required
            />
          )}
          {(addCat === "Faculty" || addCat === "Staff") && (
            <input
              name="ext"
              placeholder="Extension (EXT)"
              value={addData.ext}
              onChange={e => setAddData({...addData, ext: e.target.value})}
              required
            />
          )}
          <input
            name="room"
            placeholder="Room Number"
            value={addData.room}
            onChange={e => setAddData({...addData, room: e.target.value})}
            required
          />
          <button type="submit">Add Entry</button>
        </form>
      </div>

      {/* Delete Entry */}
      <div className="admin-section">
        <h3>Delete Directory Entry</h3>
        <form onSubmit={handleDelete}>
          <select
            value={delCat}
            onChange={e => {
              setDelCat(e.target.value);
              setDelData({ name: "", lab: "", ext: "", room: "" });
              setStatusMsg("");
            }}
          >
            {CATS.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
          {delCat !== "Labs" && (
            <input
              name="name"
              placeholder="Name"
              value={delData.name}
              onChange={handleDeleteChange}
              required
            />
          )}
          {delCat === "Labs" && (
            <input
              name="name"
              placeholder="Lab Name"
              value={delData.name}
              onChange={handleDeleteChange}
              required
            />
          )}
          {(delCat === "Lab Personnel" || delCat === "Grad Students") && (
            <input
              name="lab"
              placeholder="Lab"
              value={delData.lab}
              onChange={handleDeleteChange}
            />
          )}
          {(delCat === "Faculty" || delCat === "Staff") && (
            <input
              name="ext"
              placeholder="Extension (EXT)"
              value={delData.ext}
              onChange={handleDeleteChange}
            />
          )}
          <input
            name="room"
            placeholder="Room Number"
            value={delData.room}
            onChange={handleDeleteChange}
          />
          <button type="submit">Delete Entry</button>
        </form>
      </div>

      {/* Image Upload */}
      <div className="admin-section">
        <h3>Upload Welcome Image</h3>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={e => setFile(e.target.files[0])}
        />
        <button onClick={handleUpload}>Upload Image</button>
      </div>

      {statusMsg && <p className="status-msg">{statusMsg}</p>}
    </div>
  );
}
