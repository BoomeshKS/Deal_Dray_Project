import React, { useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import './navbar.css'
import { useState } from 'react';
import { FaHome, FaListAlt, FaUser, FaSignOutAlt, FaSignInAlt, FaPlus } from 'react-icons/fa'; // Import FontAwesome icons
import { useLocation } from 'react-router-dom';
import logo from '../assets/dealsdray_logo.jpeg'

const Navbar = () => {
    const location = useLocation();
    const user = localStorage.getItem("username")
    const navigate = useNavigate()
    const [cross,setCross] = useState(false)

    const [open, setOpen] = useState(false);
    useEffect(()=>{
        if(!user){
            const showAlert = () => {
                alert("Login to Continue!");
                navigate('/login');
            };
        
            if (location.pathname !== '/login') {
              const alertInterval = setInterval(() => {
                showAlert();
              }, 1000);
        
              return () => clearInterval(alertInterval);
            }
        
            return () => {};
        }
    })

    const SideOpen = () => {
        setOpen(!open);
        if(cross){
            setCross(false)
        }
        else{
            setCross(true)
        }
    };

    const HandleLogout=()=>{
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        alert("Logout Sucessfully");
        navigate('/login')
    }


  return (
        <div className='navbar-container'>
            <nav className='nav-bar'>
                {!cross &&<div className="nav-side" onClick={SideOpen}>
                    <div className="line-1"></div>
                    <div className="line-1"></div>
                    <div className="line-1"></div>
                </div>}
                {cross &&<div className="nav-side-2" onClick={SideOpen}>
                    <div className="line-2"></div>
                    <div className="line-2"></div>
                </div>}
                <div className="img">
                    <img src={logo} alt="Logo" width='50px'  style={{position:"relative", right:"140px", borderRadius:"50px"}}/>
                </div>
                <div className="nav-home">
                    <Link to="/" className='link-1'>
                        <FaHome style={{ marginRight: '8px' }} /> Home
                    </Link>
                </div>
                <div className="nav-home">
                    <Link to="/employeelist" className='link-1'>
                        <FaListAlt style={{ marginRight: '8px' }} /> Employee List
                    </Link>
                </div>
                <div className="nav-home">
                    <p className='user-home'><FaUser style={{ marginRight: '8px' }} /> Username: {user}</p>
                </div>
                {!user && (
                    <div className="nav-home">
                        <Link to="/login" className='link-1' style={{position:"relative", right:"40px"}}>
                            <FaSignInAlt style={{ marginRight: '8px' }} /> Login
                        </Link>
                    </div>
                )}
                {user && (
                    <div className="nav-home" style={{position:"relative", right:"40px"}}>
                        <Link onClick={HandleLogout} className='link-1'>
                            <FaSignOutAlt style={{ marginRight: '8px' }} /> Logout
                        </Link>
                    </div>
                )}
            </nav>
            {open && (
            <section className={`left-side ${open ? 'open' : ''}`}>
                <Link className='left-1' to="/registeremployee">
                    <FaPlus style={{ marginRight: '8px' }} /> Create Employee
                </Link>
                <Link className='left-1' to="/employeelist">
                    <FaListAlt style={{ marginRight: '8px' }} /> Employee List
                </Link>
            </section>
            )}
        </div>
    );
};

export default Navbar