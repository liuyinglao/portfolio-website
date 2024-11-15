import React, { useState, useEffect } from 'react';

const images = [
  'https://via.placeholder.com/600x400?text=Slide+1',
  'https://via.placeholder.com/600x400?text=Slide+2',
  'https://via.placeholder.com/600x400?text=Slide+3',
];


const Carousel = ({interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically go to the next slide at specified intervals
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, interval);

    // Clear interval on component unmount
    return () => {clearInterval(timer)};
  }, [currentIndex, interval]);

  // Go to the next slide
  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Go to the previous slide
  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Go to a specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div style={styles.carouselContainer}>
      <div style={styles.imageContainer}>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} style={styles.image} />
      </div>
      
      {/* Previous and Next buttons */}
      <button onClick={goToPrevSlide} style={{ ...styles.navButton, left: '10px' }}>❮</button>
      <button onClick={goToNextSlide} style={{ ...styles.navButton, right: '10px' }}>❯</button>

      {/* Indicators */}
      <div style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...styles.indicator,
              backgroundColor: index === currentIndex ? '#333' : '#bbb',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Styles for the carousel
const styles = {
  carouselContainer: {
    position: 'relative',
    width: '600px',
    margin: 'auto',
    overflow: 'hidden',
    borderRadius: '8px',
  },
  imageContainer: {
    width: '100%',
    height: '400px',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '2rem',
    color: 'white',
    background: 'rgba(0,0,0,0.3)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    zIndex: 1,
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
  },
  indicator: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default Carousel;
