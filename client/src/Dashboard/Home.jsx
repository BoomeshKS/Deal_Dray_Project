import React, { useEffect } from 'react';
import './Home.css';
import { FaUserEdit, FaTrashAlt, FaUsers, FaDatabase, FaRegIdBadge, FaLaptopCode, FaCog } from 'react-icons/fa';

const Home = () => {
  const boxContent = [
    { icon: <FaUserEdit />, text: "Edit Employee Details: Add or update employee's personal info." },
    { icon: <FaTrashAlt />, text: "Delete Employee: Remove employee details securely." },
    { icon: <FaUsers />, text: "Employee Directory: View and search employee database." },
    { icon: <FaDatabase />, text: "Powerful Design: Store data with a sleek UI." },
    { icon: <FaRegIdBadge />, text: "Employee Profiles: Create profiles with images, names, emails." },
    { icon: <FaLaptopCode />, text: "Advanced Features: Build dynamic interactions." },
    { icon: <FaCog />, text: "Settings: Customize site for specific needs." }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const boxes = document.querySelectorAll('.dashboard-box');
      boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.9;

        if (boxTop < triggerBottom) {
          box.classList.add('show');
        } else {
          box.classList.remove('show');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <h1 className="dashboard-heading">Dashboard</h1>
      <div className="dashboard-grid">
        {boxContent.map((box, index) => (
          <div key={index} className={`dashboard-box ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className="icon">{box.icon}</div>
            <div className="text">{box.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
