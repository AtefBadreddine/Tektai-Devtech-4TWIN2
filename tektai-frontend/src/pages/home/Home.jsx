import React, {useEffect, useState} from 'react';

import Header from '../../layout/Header';
import HeroHome from './partials/HeroHome';
import FeaturesHome from './partials/Features';
import FeaturesBlocks from './partials/FeaturesBlocks';
import Testimonials from './partials/Testimonials';
import Newsletter from './partials/Newsletter';
import Footer from '../../layout/Footer';
import PopupAd from '../../components/premium/premium';
import { HeroParallax } from './partials/whyus';
import { LampContainer, LampDemo } from './partials/lamp';
import { InfiniteMovingCards } from './partials/team';
import ContactUs from '../../components/ContactUs/ContactUs';
import { Slider } from '@chakra-ui/slider';
import { Tabs } from '@chakra-ui/tabs';
import Transition from '../../utils/Transition'; // Assuming Transition component file location
import StatsCompare from '../../components/stats/statsCompare';
import {Alert} from "@chakra-ui/react";
import AlertMsg from "../../sections/AlertMsg";
import Chatbotco from '../../components/ChatBotComponents/chatbot/Chatbot';

function Home() {
  const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://tektai-backend.vercel.app';

  const data = [
    {
      name: "Atef Badreddine",
      title: "Back-end Dev",
      imageUrl: "/atef.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"atef.Badreddine@gmail.com"
    },{
      name: "Bouzid Baha Eddine",
      title: "Front-end Dev",
      imageUrl: "/baha.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"bahaa2000lol@gmail.com"

    },{
      name: "Ala Eddine Ibrahim",
      title: "Back-end Dev",
      imageUrl: "/ala.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"alaEddine.ibrahim@gmail.com"

    },{
      name: "Balkis Hmidi",
      title: "Front-end Dev",
      imageUrl: "/balkis.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"Balkis.Hmidi@gmail.com"

    },
    {
      name: "Sirine Ben younes",
      title: "CTO",
      imageUrl: "sirine.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"sirine.benyounes@esprit.tn"


    },
    // Add more data objects as needed
  ];
  const [alert,setAlert] = useState({
    title : '',
    desc : '',
    status : ''
  })
    // Add more items as needed
  const searchParams = new URLSearchParams(window.location.search);
  const localStorageData = localStorage.getItem('user');
  useEffect(() => {
    const alert = searchParams.get("mail-confirmed");

    if (alert) {
      if (alert === 'true') {
        setAlert({
          title : 'Email Confirmed succesfully',
          desc : 'Welcome to TEKTAI',
          status : "success"
        })
      }
      else  setAlert({
        title : 'Error confirming your Email',
        desc : 'please retry again in few minutes',
        status : "error"
      })
    }

  }, []);
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />
      {/*<PopupAd />*/}

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
        <Transition show appear>
          { alert.title.length ?  <AlertMsg title={alert.title} desc={alert.desc} status={alert.status} /> : '' }
        <HeroHome />
        </Transition>
        <FeaturesHome/>


       <FeaturesBlocks />

        {/* <HeroParallax products={products} /> */}
        <Slider userData={data} />
        <div className="container">
    </div>

 {/* <Testimonials /> */}
        {/* <Newsletter /> */}
        <Transition show appear>

        <div className="py-32 max-w-3xl mx-auto text-center pb-12 md:pb-20">
          <div className=''></div>
              <h2 className="h2 mb-4">About <span className="px-2 text-white bg-blue-600 rounded ">Us</span> </h2>
              <p className="text-xl text-gray-600"><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">TektAI</span> is a collaborative platform for data science enthusiasts. Companies submit challenges, developers innovate. With transparent processes and community engagement, TektAI is a hub for pushing the boundaries of data. Join us to revolutionize data science, one challenge at a time.</p>
            </div>
            </Transition>

       <InfiniteMovingCards items={data} />

        <ContactUs></ContactUs>

      </main>



      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;