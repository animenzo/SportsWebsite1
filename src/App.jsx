import React from 'react';

import { AboutUs,  FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu, MainForm } from './container';
import { Navbar } from './components';

import './App.css';

const App = () => (
  <div>
    <Navbar />
   
    <Header />
    <AboutUs />
    <SpecialMenu />
   
    <Intro />
    <Laurels />
    <Gallery />
    <FindUs />
    <section className="form-wrapper">
      <MainForm />
    </section>
    <Footer />
    
    
   
  </div>
);

export default App;
