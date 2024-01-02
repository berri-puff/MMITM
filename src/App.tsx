import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Navigation from "./components/NavBar";
import MeetingPage from "./components/MeetPage";
function App() {
  return (
    <>
      <Header />
      <Navigation/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Meeting" element={<MeetingPage/>}/>
      </Routes>
    </>
  );
}

export default App;
