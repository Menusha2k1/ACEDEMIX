import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import slide1 from '../../assets/slide1.png'; // Import local image
import slide2 from '../../assets/slide2.png';

const ImageCarousel = () => {
  // Array of image URLs
  const images = [
    slide1,
    slide2, // Use imported local image
  ];

  return (
    <div className="max-w-6xl mx-auto my-8 pt-15">
      <Carousel
        autoPlay={true} // Enable auto-play
        infiniteLoop={true} // Loop the carousel
        interval={3000} // Change slide every 3 seconds
        showThumbs={false} // Hide thumbnail navigation
        showStatus={false} // Hide status indicator
      >
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;