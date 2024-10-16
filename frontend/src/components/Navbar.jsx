import React from 'react';
import './Navbar.css'; 
import chatimg from '../assets/chat.png';
import notificationImg from '../assets/notification.png';
import settingImg from '../assets/setting.png';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">

                <div className="collapse navbar-collapse d-flex justify-content-between align-items-center">
                    {/* Left Side: Search Box */}
                    <div className="d-flex align-items-center col-3">
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                        />
                    </div>

                    {/* Center: Navigation Links */}
                    <div className="navbar-nav flex-grow-1 justify-content-center">
                        <a className="nav-link" href="/about">About</a>
                        <a className="nav-link" href="/tools">Tools</a>
                        <a className="nav-link" href="/help">Help</a>
                    </div>

                    {/* Icons Row */}
                    <div className="d-flex justify-content-end align-items-center mb-2">
                        {/* Icons */}
                        <a href="/notifications" className="me-3">
                            <img src={notificationImg} alt="Notification" style={{ width: '40px', height: '40px' }} />
                        </a>
                        <a href="/chat" className="me-3">
                            <img src={chatimg} alt="Chat" style={{ width: '40px', height: '40px' }} />
                        </a>
                        <a href="/settings" className="me-3">
                            <img src={settingImg} alt="Settings" style={{ width: '40px', height: '40px' }} />
                        </a>
                    </div>
                    {/* Right Side: Admin Profile */}
                    <div className="navbar-nav color rounded" style={{backgroundColor:'#2F4CDD'}}>
                        <a className="nav-link" style={{color:'#FFFFFF'}} href="/admin-profile">Admin Profile</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
