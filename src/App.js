import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import DirectoryScreen from './components/DirectoryScreen';
import AdminPanel from './components/AdminPanel';

export default function App() {
  return (
    <Routes>
      <Route path="/"         element={<HomeScreen />} />
      <Route path="/directory" element={<DirectoryScreen />} />
      <Route path="/admin"     element={<AdminPanel />} />
      <Route path="*"         element={<Navigate to="/" replace />} />
    </Routes>
  );
}
