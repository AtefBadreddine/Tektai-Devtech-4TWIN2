import React, { useState, useRef, useEffect } from 'react';
import Modal from '../../../utils/Modal';

import HeroImage from '../../../images/hero-image.png';
import { MacbookScroll } from './mac';
import { TypeAnimation } from 'react-type-animation';

function HeroHome() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const video = useRef(null);

  useEffect(() => {
    videoModalOpen ? video.current.play() : video.current.pause();
  }, [videoModalOpen]);

  return (
      <section className="relative">
         {/* <BackgroundBeams/> */}

        {/* Illustration behind hero content */}
        
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none" aria-hidden="true">
          <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                <stop stopColor="#FFF" offset="0%" />
                <stop stopColor="#EAEAEA" offset="77.402%" />
                <stop stopColor="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fillRule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Hero content */}
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}
            <div className="text-center pb-12 md:pb-16">
            <h1 className="text-4xl xl:text-6xl font-extrabold leading-tight md:leading-tighter tracking-tighter md:text-2xl sm:text-xl mb-4" data-aos="zoom-y-out">

            <div className="flex justify-center items-center gap-x-2 text-[32px] sm:text-[64px] lg:text-[72px]">For
                <TypeAnimation

                    sequence={[
                        // Same substring at the start will only be typed once, initially
                        ' Developers',
                        2000,
                        ' Companies',
                        2000,

                    ]}
                    speed={50}
                    style={{ fontSize: '1.5em' }}
                    repeat={Infinity}
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400"
                />
            </div>


                {/* Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">TektAI</span> */}
              </h1>
              <MacbookScroll></MacbookScroll>


            </div>

            {/* Hero image */}
            <div>
              

              {/* Modal */}
              <Modal id="modal" ariaLabel="modal-headline" show={videoModalOpen} handleClose={() => setVideoModalOpen(false)}>
                <div className="relative pb-9/16">
                  <video ref={video} className="absolute w-full h-full" width="1920" height="1080" loop autoPlay controls>
                    <source src="/videos/video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </section>
  );
}

export default HeroHome;
