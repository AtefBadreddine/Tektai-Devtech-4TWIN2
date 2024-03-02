  import React, { useEffect, useState } from 'react';
  import {
    Routes,
    Route,
    useLocation
  } from 'react-router-dom';

  import 'aos/dist/aos.css';
  import './css/style.css';
  import './css/additional-styles/satoshi.css'; // Import the CSS file


  import AOS from 'aos';

  import Home from './pages/home/Home';
  import SignIn from './pages/signin/SignIn';
  import SignUp from './pages/signup/SignUp';
  import ResetPassword from './pages/resetPassword/ResetPassword';
  import AuthProvider from "./auth/AuthProvider";
  import ListChallenges from "./pages/challenges/listChallenges/listChallenges";
  import ChallengeDetails from "./pages/challenges/challengeDetails/challengeDetails";
  import Ranking from "./pages/ranking/ranking ";
  import CreateChallenge from "./pages/challenges/createChallenge/CreateChallenge";
  import DefaultLayout from './layout/DefaultLayout';
  import Dashhome from './pages/dashboard/dashhome';
  import Profile from './components/Profile';
  import Settings from './components/Settings';
import TermsAndConditions from './components/terms/terms';
import Spinner from './components/spinner/spinner';
import SpinnerWithBackground from './components/spinner/spinner';
  import ProtectedRoute from "./ProtectedRoute";
import NotFound from './components/notfound/notfound';
import NotAdmin from './components/NotAdmin/NotAdmin';
import Forgetpassword from './pages/forgotpwd/forgetpassword';




  function App() {

    const location = useLocation();
    const [loading, setLoading] = useState(true); // State to track loading status

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

      const timeout = setTimeout(() => setLoading(false), 3000); // Simulate 2 seconds loading time
    return () => clearTimeout(timeout);
    }, [location.pathname]); // triggered on route change

    return (
        <AuthProvider>
        {loading ? (
          <SpinnerWithBackground />
        ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/challenges" element={<ListChallenges />} />
          <Route path="/challenges/new" element={<CreateChallenge />} />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/NotAdmin" element={<NotAdmin />} />
          <Route path="/forgetpawd" element={<Forgetpassword />} />
          
          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/pages/settings" element={<Settings />} />
          </Route>

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<Dashhome />}    />
          </Route>

        </Routes>)

        }
        </AuthProvider>
    );
  }

  export default App;
