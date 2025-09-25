import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ModelViewer from './pages/ModelViewer';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/model/:placeId" element={<ModelViewer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;