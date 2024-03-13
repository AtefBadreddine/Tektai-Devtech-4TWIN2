import React from 'react';

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

function Home() {
  const products = [
    {
      title: "T-shirt",
      link: "/t-shirt",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },
    {
      title: "Sneakers",
      link: "/sneakers",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },
    {
      title: "Watch",
      link: "/watch",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },
    {
      title: "Handbag",
      link: "/handbag",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },{
      title: "Handbag",
      link: "/handbag",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },{
      title: "Handbag",
      link: "/handbag",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },{
      title: "Handbag",
      link: "/handbag",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },{
      title: "Handbag",
      link: "/handbag",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },{
      title: "Handbag",
      link: "/handbag",
      thumbnail: "https://i5.walmartimages.com/seo/New-Spring-Fashion-Fresh-Trends-Styles-POROPL-Plus-Size-Summer-Hawaiian-Print-Turndown-Button-Shirt-for-Men-Clearance-White-Size-16_8d50b036-9865-4634-b9cb-f91dd088c64a.753c606ee702969c6423fd18fa4d7601.jpeg",
    },
  ];
  const data = [
    {
      quote: "Bouzid Baha Eddine",
      name: "John Doe",
      title: "Front-end Dev",
      imageUrl: "https://preview.redd.it/qvgkzttwl8p61.jpg?width=640&crop=smart&auto=webp&s=ca8ac6e7a4eff2b4d6b27f00f126d9b2b64eae90",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png"
    },
    {
      quote: "Quote 2",
      name: "Jane Smith",
      title: "CTO",
      imageUrl: "https://preview.redd.it/qvgkzttwl8p61.jpg?width=640&crop=smart&auto=webp&s=ca8ac6e7a4eff2b4d6b27f00f126d9b2b64eae90",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png"
    },
    // Add more data objects as needed
  ];
    // Add more items as needed
  
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />
      <PopupAd />

      {/*  Page content */}
      <main className="flex-grow">

        {/*  Page sections */}
      
        <HeroHome />        
      
        <FeaturesHome/>
       <FeaturesBlocks />  
        {/* <HeroParallax products={products} /> */}
        <InfiniteMovingCards items={data} />
 {/* <Testimonials /> */}
        {/* <Newsletter /> */}
        <ContactUs></ContactUs>

      </main>



      {/*  Site footer */}
      <Footer />

    </div>
  );
}

export default Home;