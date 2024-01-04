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
import { Playground } from './components/ak-stuff/playground';

function App() {
  return (
    <>
      <UserProvider>
        <div className="container mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup_meeting" element={<SetUpMeeting />} />
            <Route
              path="/setup_meeting/suggestions"
              element={<Suggestions />}
            />
            <Route path="/setup_meeting/invite" element={<InviteUser />} />
            <Route path="/invitations/:username" element={<Invitations />} />
            <Route path="/log_in" element={<LogIn />} />
            <Route path="/playground" element={<Playground />} />
          </Routes>
        </div>
      </UserProvider>
    </>
  );
}

export default App;
