import React, { useEffect, useState } from 'react';
import Header from '../../layout/Header';
import PopupAd from '../../components/premium/premium';
import Footer from '../../layout/Footer';

function AboutUs() {
  const [crmData, setCrmData] = useState({
    aboutUs: '',
    termsOfService: '',
    instagram: '',
    facebook: '',
    github: '',
    linkedin: '',
  });

  useEffect(() => {
    const aboutUsContent = 'Your about us content goes here.';
    setCrmData((prevData) => ({
      ...prevData,
      aboutUs: aboutUsContent,
    }));
  }, []);

  useEffect(() => {
    console.log('About Us Content:', crmData.aboutUs);
  }, [crmData.aboutUs]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/* Site header */}
      <Header />
      <PopupAd />

      {/* Page content */}
      <main className="flex-grow">
        {/* About Us content */}
        <section>
          <h1>About Us</h1>
          <p>{crmData.aboutUs}</p>
        </section>

        {/* Additional content can go here if needed */}

      </main>

      {/* Site footer */}
      <Footer/>

    </div>
  );
}

export default AboutUs;
