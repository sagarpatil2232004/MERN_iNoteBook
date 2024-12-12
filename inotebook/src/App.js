import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import Login from "./components/Login";
import SignUp from "./components/SignUp";



function App() {
  return (
    <NoteState>
      <div className="d-flex flex-column vh-100">
        
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/SignUp" element={<SignUp/>} />
          </Routes>
          <Footer />
        
      </div>
    </NoteState>


  );
}

export default App;
