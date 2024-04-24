import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../../utils/Transition';
import FeaturesBg from '../../../images/Google_Hero.jpg';
import notebooks from '../../../images/notebooks.png';
import discussion from '../../../images/discussion.jpg';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa'; // Import the arrow icon from FontAwesome


import FeaturesElement from '../../../images/features-element.png';


  function Featuresch() {
    const isLoggedIn = () => {
      const storedToken = localStorage.getItem('token');
      return !!storedToken;
    };
    
    const [tab, setTab] = useState(1);
    const tabs = useRef(null);
  
    const heightFix = () => {
      if (tabs.current.children[tab]) {
        tabs.current.style.height = tabs.current.children[tab - 1].offsetHeight + 'px';
      }
    };
  
    useEffect(() => {
      heightFix();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab]);
  
  return (
    <section className="relative bg-white">
      <div className="absolute inset-0 bg-gray-100 pointer-events-none mb-16" aria-hidden="true"></div>
      <div className="absolute left-0 right-0 m-auto w-px p-px h-20 bg-gray-200 transform -translate-y-1/2"></div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-12 md:pt-20">
      
 {/* Why Choose Us section */}
 
 {isLoggedIn() ? (
  // Why Choose Us section
  <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
    <h1 className="h2 mb-4">Latest Challenges</h1>
    <p className="text-xl text-gray-600">Explore our latest challenges and showcase your skills!</p>
    {/* Button */}
    <Link to="/challenges" className="btn-smm inline-flex items-center font-bold py-2 px-4 rounded-md mt-4 focus:outline-none">
      Explore Challenges <FaArrowRight className="ml-2" />
    </Link>
  </div>
) : (
  // Sign up section
  <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
    <h1 className="h2 mb-4">Join our community</h1>
    <p className="text-xl text-gray-600">Take the first step towards unleashing your potential – sign up now and embark on an exciting adventure in the world of data science.</p>
    {/* Button */}
    <Link to="/signup" className="btn-smm inline-flex items-center font-bold py-2 px-4 rounded-md mt-4 focus:outline-none">
      Get started <FaArrowRight className="ml-2" />
    </Link>
  </div>
)}


          <div className="md:grid md:grid-cols-12 md:gap-6">
           

            {/* Tabs items */}
            <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="zoom-y-out" ref={tabs}>
              <div className="relative flex flex-col text-center lg:text-right">
               
              </div>
            </div >

          </div >

        </div >
      </div >
    </section >
  );
  
}

export default Featuresch;
