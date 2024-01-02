import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { SetUpMeeting } from "./components/SetUpMeeting";
import { Suggestions } from "./components/Suggestions";
import { InviteUser } from "./components/InviteUser";
import { LogIn } from "./components/LogIn";
import { Invitations } from "./components/Invitations";


function App() {
  return (
    <>
      <Header />
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup_meeting" element={<SetUpMeeting />} />
        <Route path="/setup_meeting/suggestions" element={<Suggestions />} />
        <Route path="/setup_meeting/invite" element={<InviteUser />} />
        <Route path="/setup_meeting/:username/invitations" element={<Invitations />} />
        <Route path="/log_in" element={<LogIn />} />
      </Routes>
    </>
  );
}

export default App;
