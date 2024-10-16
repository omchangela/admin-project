import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Services from './components/Services'; 
import Dashboard from './components/Dashboard'; 
import './App.css'; 
import Banner from './components/Banner';
import Orders from './components/Orders';
import ServiceForm from './components/ServiceForm'; 

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Sidebar />
                <div className="content-container">
                    <Navbar />
                    <div className="main-content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/services/add" element={<ServiceForm />} /> 
                            <Route path="/services/edit/:id" element={<ServiceForm />} />
                            <Route path="/banner" element={<Banner />} />
                            <Route path="/order" element={<Orders />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
