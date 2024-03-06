import React from 'react';

import Header from '../../layout/Header';
import HeroHome from './partials/HeroHome';
import FeaturesHome from './partials/Features';
import FeaturesBlocks from './partials/FeaturesBlocks';
import Testimonials from './partials/Testimonials';
import Newsletter from './partials/Newsletter';
import Footer from '../../layout/Footer';
import ContactForm from '../../components/ContactUs/ContactUs';


function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <HeroHome />
        <FeaturesHome/>
        <FeaturesBlocks />
        <Testimonials />
        <Newsletter />

      </main>

<ContactForm></ContactForm>

      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;