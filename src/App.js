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
import ProductPage from './pages/ProductPage';
import Profile from './pages/ProfilePage';
import StockPage from './pages/StockPage';
import StockOPage from './pages/StokOPage';
import ProdoEditPage from './pages/ProdoEditPage';
import ProdoAddPage from './pages/ProdoAddPage';
import Signup from './pages/SignupPage';
import PostavPage from './pages/PostavPage';
import RevPage from './pages/RevPage';
import PayPage from './pages/PayPage';
import PaymentsPage from './pages/PaymentsPage';
import SecPage from './pages/SecPage';

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
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/search" element={<SearchPage />} />
        <Route exact path="/stocks" element={<StockPage />} />
        <Route exact path="/stock" element={<StockOPage />} />
        <Route exact path="/postavs" element={<PostavPage />} />
        <Route exact path="/postavs/edit" element={<ProdoEditPage />} />
        <Route exact path="/postavs/add" element={<ProdoAddPage />} />
        <Route exact path="/postavs/comment" element={<RevPage />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/pay" element={<PaymentsPage />} />
        <Route exact path="/banan" element={<SecPage />} />
        <Route exact path="/product" element={<ProductPage />} />
        <Route exact path="/pay/success" element={<PayPage />} />
        <Route exact path="/basket" element={<BasketPage />} />
        <Route exact path="/application" element={<ApplicationPage />} />
        <Route path="*" element={<E404Page />} />
      </Routes>
    </Router>
  );
}

export default App;
