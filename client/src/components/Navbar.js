import React, { useState } from 'react';
import styles from '../css/Navbar.module.css';
import logo from '../assets/logo1.png';

const Navbar = ({ createjob }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Company Logo" className={styles.logo} />
      </div>

      <button className={styles.menuButton} onClick={toggleNav} aria-label="Menu">
        {isOpen ? '✖' : '☰'}
      </button>

      <ul className={`${styles.navLinks} ${isOpen ? styles.showMenu : ''}`}>
        <li>Home</li>
        <li>Find Jobs</li>
        <li>Find Talents</li>
        <li>About Us</li>
        <li>Testimonials</li>
        <li>
          <button onClick={createjob} className={styles.createButton}>Create Jobs</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
