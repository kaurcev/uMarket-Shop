import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import E404Page from './pages/E404Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route path="*" element={<E404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
