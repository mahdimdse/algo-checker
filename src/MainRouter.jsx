import React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import CyclomaticComplexityAnalyzer from './components/homePage/CyclomaticComplexityAnalyzer';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' key="home" element={<CyclomaticComplexityAnalyzer />} />
        <Route path='*' element={<Navigate to='/home' />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;
