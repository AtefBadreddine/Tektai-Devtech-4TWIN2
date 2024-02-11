import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import 'aos/dist/aos.css';
import './css/style.css';

import AOS from 'aos';

import Home from './pages/home/Home';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';
import ResetPassword from './pages/resetPassword/ResetPassword';
import AuthProvider from "./auth/AuthProvider";
import ListChallenges from "./pages/challenges/listChallenges/listChallenges";
import ChallengeDetails from "./pages/challenges/challengeDetails/challengeDetails";


function App() {

  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <AuthProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/challenges" element={<ListChallenges />} />
        <Route path="/challenges/detail/1" element={<ChallengeDetails />} />
      </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
