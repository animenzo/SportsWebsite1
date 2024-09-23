import React from 'react';
import { SubHeading } from '../../components'
import {images} from '../../constants'
import './Header.css';

const Header = () => (

  


  <div className='app__header app__wrapper section__padding' id='home'>
    <div className='app__wrapper_info'>
     <SubHeading title="Boundaries to Victory!"/>
     <h1 className='app__header-h1'>Unleash Your Potential</h1>
     <p className='p__opensans mb-3 mt-3 mr-0 ml-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi obcaecati iure illo et assumenda dolorum!lorem Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo, aperiam?</p>
     <button type='button' className='custom__button '>Register Now</button>
    </div>
   
    <div className='app__wrapper_img'>
      <img src={images.welcome} alt="welcome"/>
    </div>
  </div>
);

export default Header;
