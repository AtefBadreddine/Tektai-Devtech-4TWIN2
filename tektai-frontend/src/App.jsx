  import React, { useEffect, useState } from 'react';
  import {
    Routes,
    Route,
    useLocation
  } from 'react-router-dom';

  import 'aos/dist/aos.css';
  import './css/style.css';
  import './css/additional-styles/satoshi.css'; // Import the CSS file
  import { library } from '@fortawesome/fontawesome-svg-core'

  // import your icons
  import { fab } from '@fortawesome/free-brands-svg-icons'
  import { fas } from '@fortawesome/free-solid-svg-icons'
  import { far } from '@fortawesome/free-regular-svg-icons'

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
  import ProfileAll from './components/ProfileAll';
  import FileUploadForm from './pages/SubmitSolution/FileUploadForm';
  import SubmissionList from './pages/SubmitSolution/SubmissionList';

  import CompanySubmissions from './pages/SubmitSolution/CompanySubmissions';

  import Settings from './components/Settings';
import TermsAndConditions from './components/terms/terms';
import Spinner from './components/spinner/spinner';
import SpinnerWithBackground from './components/spinner/spinner';
  import ProtectedRoute from "./ProtectedRoute";
import NotFound from './components/notfound/notfound';
import NotAdmin from './components/NotAdmin/NotAdmin';
  import Forgetpassword from "./pages/resetPassword/ForgetPassword";
  import AuthSuccessRedirect from "./pages/signin/AuthSuccessRedirect";

import ProfileCompany from './components/profileCompany';

import MapComponent from './pages/Localisation/MapComponent'; 

import CrmForm from './pages/crm/crmpage';
import Settingsadmin from './components/Settingsadmin';
import SearchResult from './pages/usersearch/SearchResult';
import UserSearch from './pages/usersearch/UserSearch';
import UserSearchF from './pages/usersearch/UsersearchF';
import SearchResultF from './pages/usersearch/SearchResultF';
import UserList from './components/User/Userlist';
import Teams from './pages/Teams/Teams';
import MyTeams from './pages/Teams/Myteams';
import HistoryChallenges from './pages/challenges/ChallengesHistory/HistoryChallenges';

import CompanyProfile from './components/companyprofile';



// import HistoryChallenges from './pages/challenges/ChallengesHistory/HistoryChallenges';
import UpdateChallenge from './pages/challenges/updateChallenge';
import ModifySubmissionForm from './pages/SubmitSolution/ModifySubmissionForm';





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
        <Route path="/companysubmissions" element={<CompanySubmissions />} />
 
      

        <Route path="/modify-submission/:submissionId" element={<ModifySubmissionForm />} />
          <Route path="/Map" element={<MapComponent />} />
          <Route path="/file-upload/:id" element={<FileUploadForm />} />
          <Route path="/submissionslist" element={<SubmissionList/>} />
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/auth/success-redirect" element={<AuthSuccessRedirect />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forget-password" element={<Forgetpassword />} />
          <Route path="/challenges" element={<ListChallenges />} />
          <Route path="/challenges/new" element={<CreateChallenge />} />
          <Route path="/challenges/:id" element={<ChallengeDetails />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
          <Route path="/NotAdmin" element={<NotAdmin />} />
          <Route path="/forgetpawd" element={<Forgetpassword />} />
          <Route path="/profile/:id" element={<ProfileAll/>} />
          <Route path="/UserSearchF" element={<UserSearchF/>} />
          <Route path="/Teams" element={<Teams/>} />
          <Route path="/MyTeams" element={<MyTeams/>} />
          <Route path="/companyprofile" element={<CompanyProfile/>} />

          <Route path="/results" element={<SearchResult />} />
          <Route path="/resultsf" element={<SearchResultF />} />

          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="profileCompany" element={<ProfileCompany />} />
            <Route path="/pages/settings" element={<Settings />} />
            <Route path="/historychallenges" element={<HistoryChallenges/>} /> 
          </Route>
          

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<Dashhome />}    />
            <Route path="/crm" element={<CrmForm/>} />
            <Route path="/search" element={<UserSearch />} />
            <Route path="/adminuser" element={<UserList />} />

            <Route path="/profileadmin" element={<Settingsadmin/>} />

          </Route>

        </Routes>)

        }
        </AuthProvider>
    );
  }

  export default App;
  library.add(fab,fas,far);