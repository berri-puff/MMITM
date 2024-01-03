import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { SetUpMeeting } from './components/SetUpMeeting';
import { Suggestions } from './components/Suggestions';
import { InviteUser } from './components/InviteUser';
import { LogIn } from './components/Header/LogIn';
import { Invitations } from './components/Invitations';
import { UserProvider } from './contexts/UserContext';

function App() {
  return (
    <>
      <UserProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup_meeting" element={<SetUpMeeting />} />
          <Route path="/setup_meeting/suggestions" element={<Suggestions />} />
          <Route path="/setup_meeting/invite" element={<InviteUser />} />
          <Route path="/invitations/:username" element={<Invitations />} />
          <Route path="/log_in" element={<LogIn />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
