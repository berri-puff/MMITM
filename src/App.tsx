import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { SetUpMeeting } from './components/SetUpMeeting';
import { LogIn } from './components/Header/LogIn';
import { Invitations } from './components/Invitations';
import { UserProvider } from './contexts/UserContext';
import { Footer } from './components/Footer/Footer';
import { CreateAccount } from './components/CreateAccount';
import { Error } from './components/Error';

function App() {
  return (
    <>
      <UserProvider>
        <div className="container mx-auto min-h-screen">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/setup_meeting" element={<SetUpMeeting />} />
            <Route path="/invitations/:username" element={<Invitations />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/sign-up" element={<CreateAccount />} />
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
        <Footer />
      </UserProvider>
    </>
  );
}

export default App;
