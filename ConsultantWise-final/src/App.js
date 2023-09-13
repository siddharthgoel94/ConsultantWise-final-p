import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Test from "./components/Test";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Finddoctor from "./components/Finddoctor";
import Contact from "./components/Contact";
import Login from "./components/login_signup/Login";
import Contextprovider from "./components/ContextProvider";
import Register from "./components/login_signup/Register";
import { useContext, useState } from "react";
import RegisterDoctor from "./components/login_signup/RegisterDoctor";
import LoginDoctor from "./components/login_signup/LoginDoctor";
import ScheduleAppointments from "./components/ScheduleAppointments";
function App() {



  return (
    <>
    <Router>
      <Contextprovider>
    <Navbar/>
    {/* <Test /> */}
    
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/finddoctor" element={<Finddoctor/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/registerDoctor" element={<RegisterDoctor/>} />
      <Route path="/loginDoctor" element={<LoginDoctor/>} />
      <Route path="/scheduleAppointments" element={<ScheduleAppointments/>} />
    </Routes>
    </Contextprovider>
    </Router>
    
    <Footer/>
    </>
    
    
    
    
    
  );
}

export default App;
