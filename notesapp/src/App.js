import "./App.css";
import "./index.css";
import "./bootstrap.min.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";
import LandingPage from "./screens/LandingPage/LandingPage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import MyNotes from "./screens/MyNotes/MyNotes";
import CreateNote from "./screens/MyNotes/CreateNote";
import Signup from "./screens/signup/Signup";
import Login from "./screens/login/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import EditNotes from "./screens/MyNotes/EditNotes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/createnote" element={<CreateNote />} />
        <Route path="/edit/:id" element={<EditNotes />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
