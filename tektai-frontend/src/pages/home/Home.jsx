import React from 'react';

import Header from '../../layout/Header';
import HeroHome from './partials/HeroHome';
import FeaturesHome from './partials/Features';
import FeaturesBlocks from './partials/FeaturesBlocks';
import Testimonials from './partials/Testimonials';
import Newsletter from './partials/Newsletter';
import Footer from '../../layout/Footer';
import PopupAd from '../../components/premium/premium';

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
      name: "Atef Badreddine",
      title: "Back-end Dev",
      imageUrl: "https://trello.com/1/cards/65c34b55faef21b8807b11bf/attachments/65d5bd6d49ab77dc5af123e0/previews/65d5bd6e49ab77dc5af125a1/download/118951202_2649730878463391_7352345839204004750_n.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"Atef.Badreddine@gmail.com"
    },{
      name: "Bouzid Baha Eddine",
      title: "Front-end Dev",
      imageUrl: "https://trello.com/1/cards/65c34b676054d85b998739e0/attachments/65d5bf2a8cac790c16d68d81/previews/65d5bf2a8cac790c16d68da7/download/274357747_4947664045310460_1322506536536677399_n.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"bahaa2000lol@gmail.com"

    },{
      name: "Ala Eddine Ibrahim",
      title: "Back-end Dev",
      imageUrl: "https://trello.com/1/cards/65c34b5910a3ad385c849028/attachments/65d5bd7f74fbf9732f994f69/previews/65d5bd8074fbf9732f99500e/download/ala.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"alaEddine.ibrahim@gmail.com"

    },{
      name: "Balkis Hmidi",
      title: "Front-end Dev",
      imageUrl: "https://trello.com/1/cards/65c34b6c50e0797f944cf5be/attachments/65d5bdf0659270ba080c42a2/previews/65d5bdf1659270ba080c4403/download/balkis.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"Balkis.Hmidi@gmail.com"

    },
    {
      name: "Sirine Ben younes",
      title: "CTO",
      imageUrl: "https://trello.com/1/cards/65c34b6a1553bb4894dd194a/attachments/65d5bf9e8f4058846b0d72cc/previews/65d5bf9f8f4058846b0d72fe/download/429094553_418669120622068_4113013209749843978_n.jpg",
      flagImageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Flag_of_Tunisia.svg/1200px-Flag_of_Tunisia.svg.png",
      email:"sirine.benyounes@esprit.tn"

    

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
        <Transition show appear>

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