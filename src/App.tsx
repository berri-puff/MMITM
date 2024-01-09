import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { SetUpMeeting } from './components/SetUpMeeting';
import { LogIn } from './components/Header/LogIn';
import { Invitations } from './components/Invitations';
import { UserProvider } from './contexts/UserContext';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <UserProvider>
        <div className="container mx-auto">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup_meeting" element={<SetUpMeeting />} />
            <Route path="/invitations/:username" element={<Invitations />} />
            <Route path="/log_in" element={<LogIn />} />
          </Routes>
        </div>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
