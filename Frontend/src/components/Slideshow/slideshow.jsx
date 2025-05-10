import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import slide1 from '../../assets/S1.png'; // Import local image
import slide2 from '../../assets/slide2.png';
import Man1 from '../../assets/man.png';

const ImageCarousel = () => {
  // Array of image URLs
  const images = [
    Man1,
    slide2,
    // Use imported local image
  ];

  return (
    <div className="w-250 mx-auto  pt-20">
      <Carousel
        autoPlay={true} // Enable auto-play
        infiniteLoop={true} // Loop the carousel
        interval={3000} // Change slide every 3 seconds
        showThumbs={false} // Hide thumbnail navigation
        showStatus={false} // Hide status indicator
        showArrows={false}>

        <div className=' items-center justify-center mb-10 flex pt-5 '>
          <img  src={slide1}  />
          <p className="text-xl transform -translate-x-10 "></p>
        </div>

      </Carousel>
    </div>
  );
};

export default ImageCarousel;