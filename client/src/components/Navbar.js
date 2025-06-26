import React from 'react'
import navbar from '../css/Navbar.module.css';
import logo from '../assets/logo1.png'
const Navbar = ({createjob}) => {
  return (
    <div>
        <nav className={navbar.navbar_head}>
            <ul>
                <img src={logo} width={70} height={50} alt="company logo" />
                <li>Home</li>
                <li>Find Jobs</li>
                <li>Find Talents</li>
                <li>About us</li>
                <li>Testimonials</li>
                <li><button onClick={createjob}>Create jobs</button></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar