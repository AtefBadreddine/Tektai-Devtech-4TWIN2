import React from 'react';

import Header from '../../layout/Header';
import HeroHome from '../home/partials/HeroHome';
import FeaturesHome from '../home/partials/Features';
import FeaturesBlocks from '../home/partials/FeaturesBlocks';
import Testimonials from '../home/partials/Testimonials';
import Newsletter from '../home/partials/Newsletter';
import Footer from '../../layout/Footer';
import RankingTable from './rankingtable';
import {useAuth} from "../../auth/useAuth";
function Home() {
    const auth = useAuth();
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow  pb-12  md:pb-20">

        <div className="pt-32  md:pt-40 ">
          <div className="text-center pb-12 md:pb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              User <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Rankings</span>
            </h1>
            
          </div>
        </div>

        <RankingTable/>



      </main>



      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;