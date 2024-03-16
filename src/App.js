import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import E404Page from './pages/E404Page';
import StartProvidePage from './pages/StartProvidePage';
import PrivacyPage from './pages/PrivacyPage';
import UseTermsPage from './pages/UseTermsPage';
import ApplicationPage from './pages/ApplicationPage';
import MainPage from './pages/MainPage';
import Logout from './pages/Logout';
import SearchPage from './pages/SearchPage';
import BasketPage from './pages/BasketPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/auth" element={<AuthPage />} />
        <Route exact path="/main" element={<MainPage />} />
        <Route exact path="/start" element={<StartProvidePage />} />
        <Route exact path="/privacy" element={<PrivacyPage />} />
        <Route exact path="/terms" element={<UseTermsPage />} />
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/basket" element={<BasketPage />} />
        <Route exact path="/application" element={<ApplicationPage />} />
        <Route path="*" element={<E404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
