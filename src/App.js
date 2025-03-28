// frontend/src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import DirectoryScreen from './components/DirectoryScreen';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/directory" element={<DirectoryScreen />} />
      <Route path="/admin" element={<AdminPanel />} />
      {/* Redirect any unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
