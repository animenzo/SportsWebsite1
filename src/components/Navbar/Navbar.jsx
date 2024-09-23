import React from 'react';
import { GiCricketBat } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import images from '../../constants/images';
import './Navbar.css';



const Navbar = () => {

  const [toggleMenu, setToggleMenu] = React.useState(false);
  

  return (
  <nav className='app__navbar'>
    <div className='app__navbar-logo'>
      <img src={images.logo} alt="app logo" />
    </div>
    <ul className='app__navbar-links'>
      <li p__opensans>
        <a href="#home">Home</a>
      </li>
      <li p__opensans>
        <a href="#about">About Us</a>
      </li>
      <li p__opensans>
        <a href="#players">Players</a>
      </li>
      <li p__opensans>
        <a href="#awards">Tournament Teams</a>
      </li>
      <li p__opensans>
        <a href="#contact">Contact</a>
      </li>
      
    </ul>
    <div className='app__navbar-login'>
      <a className='p__opensans'  href='#login'> Application</a>
    </div>

    <div className='app__navbar-smallscreen'>
    <GiHamburgerMenu color='#fff' fontSize={26} onClick={()=>setToggleMenu(true)}/>

      {toggleMenu && (
      <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
      <BiSolidCricketBall  fontSize={26} className='overlay__close' onClick={()=>setToggleMenu(false)}/>
        <ul className='app__navbar-smallscreen-links'>
          <li p__opensans>
            <a href="#home">Home</a>
          </li>
          <li p__opensans>
            <a href="#about">About Us</a>
          </li>
          <li p__opensans>
            <a href="#players">Players</a>
          </li>
          <li p__opensans>
            <a href="#awards">Teams</a>
          </li>
          <li p__opensans>
            <a href="#contact">Contact</a>
          </li>
          <li p__opensans>
            <a href="#login">Application</a>
          </li>
      </ul>
      </div>
      )}



   
    </div>
  </nav>
  )
}

export default Navbar;
