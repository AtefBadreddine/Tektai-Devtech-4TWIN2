import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PopupAd = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false); // Initialize to false initially
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await openai.createImage({
            model: "dall-e-3",
            prompt: "a white siamese cat",
            n: 1,
            size: "1024x1024",
          });
          image_url = response.data.data[0].url;
          

        const data = await response.json();
        setImageUrl(data.image); // Assuming your API returns the image URL in 'image' property
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, []);

  useEffect(() => {
    // Randomly decide whether to show the pop-up ad
    const randomValue = Math.random();
    if (randomValue < 0.3 && location.pathname !== '/admin') {
      setShowPopup(true);
    }
  }, [location]);

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div> {/* Blurred background */}
          <div className="relative bg-white p-8 rounded-lg shadow-lg">
            <button
              className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
              onClick={handleClose}
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4">Upgrade To Premium</h2>
            {imageUrl && <img src={imageUrl} alt="Special Offer" className="mb-4" />} {/* Render image if imageUrl is available */}
            <p className="text-lg mb-6">Don't miss out on our premium features!</p>

            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Learn More
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PopupAd;
