  import React, { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  useLocation
} from 'react-router-dom';

  import { library } from '@fortawesome/fontawesome-svg-core';
import 'aos/dist/aos.css';
import './css/additional-styles/satoshi.css'; // Import the CSS file
import './css/style.css';

  // import your icons
  import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

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
  import ProfileAll from './components/ProfileAll';
  import FileUploadForm from './pages/SubmitSolution/FileUploadForm';
  import SubmissionList from './pages/SubmitSolution/SubmissionList';

  import CompanySubmissions from './pages/SubmitSolution/CompanySubmissions';

  import Settings from './components/Settings';
import TermsAndConditions from './components/terms/terms';
import Spinner from './components/spinner/spinner';
import SpinnerWithBackground from './components/spinner/spinner';
  import ProtectedRoute from "./ProtectedRoute";
import NotAdmin from './components/NotAdmin/NotAdmin';
import Profile from './components/Profile';

import NotFound from './components/notfound/notfound';
import Forgetpassword from "./pages/resetPassword/ForgetPassword";
import AuthSuccessRedirect from "./pages/signin/AuthSuccessRedirect";

import Challengerprofile from './components/Challengerprofile';
import MapComponent from './pages/Localisation/MapComponent';

import Settingsadmin from './components/Settingsadmin';
import UserList from './components/User/Userlist';
import MyTeams from './pages/Teams/Myteams';
import Teams from './pages/Teams/Teams';
import CrmForm from './pages/crm/crmpage';
import SearchResult from './pages/usersearch/SearchResult';
import SearchResultF from './pages/usersearch/SearchResultF';
import UserSearch from './pages/usersearch/UserSearch';
import UserSearchF from './pages/usersearch/UsersearchF';

import HistoryChallenges from './pages/challenges/ChallengesHistory/HistoryChallenges';
import FavoriteChallenges from './pages/challenges/listChallenges/favoriteChallenges';

import CompanyProfile from './components/companyprofile';



// import HistoryChallenges from './pages/challenges/ChallengesHistory/HistoryChallenges';
// import UpdateChallenge from '../src/pages/challenges/updateChallenge';
import ModifySubmissionForm from './pages/SubmitSolution/ModifySubmissionForm';

  import MailConfirmation from "./pages/signup/MailConfirmation";
  import CompanyHome from "./pages/home/CompanyHome";

import Create from './pages/challenges/createChallenge/create';

import Homechallenger from './pages/home/Homechallenger';
import Evaluate from './pages/evaluate/evaluate';
import CompanySubmissionsn from './pages/evaluate/evaluate';
  import ApproveChallenges from "./pages/dashboard/challenges/ApproveChallenges";






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
          <Route path="/company" element={<CompanyHome />} />
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
          <Route path="/confirm-mail" element={<MailConfirmation />} />
          <Route path="/profile/:id" element={<ProfileAll/>} />
          <Route path="/UserSearchF" element={<UserSearchF/>} />
          <Route path="/Teams" element={<Teams/>} />
          <Route path="/MyTeams" element={<MyTeams/>} />
          <Route path="/favoriteChallenges" element={<FavoriteChallenges/>} />

          <Route path="/companyprofile" element={<CompanyProfile/>} />
          <Route path="/challenges/create" element={<Create />} />

          <Route path="/results" element={<SearchResult />} />
          <Route path="/resultsf" element={<SearchResultF />} />
          <Route path="/homechallenger" element={<Homechallenger />} />

          <Route path="*" element={<NotFound />} />

          <Route element={<ProtectedRoute/>}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/Challengerprofile" element={<Challengerprofile />} />
            <Route path="/pages/settings" element={<Settings />} />
            <Route path="/historychallenges" element={<HistoryChallenges/>} /> 
            <Route path="/evaluate" element={<CompanySubmissionsn/>} /> 
          
          </Route>
          

          <Route element={<ProtectedRoute adminOnly />}>
            <Route path="/admin" element={<Dashhome />}    />
            <Route path="/crm" element={<CrmForm/>} />
            <Route path="/search" element={<UserSearch />} />
            <Route path="/adminuser" element={<UserList />} />
            <Route path="/approve-challenges" element={<ApproveChallenges />} />
            <Route path="/profileadmin" element={<Settingsadmin/>} />

          </Route>

        </Routes>)

        }
        </AuthProvider>
    );
  }

  export default App;
  library.add(fab,fas,far);