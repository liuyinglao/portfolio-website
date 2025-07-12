import { FC, useState, useEffect, CSSProperties } from 'react';

const images: string[] = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80',  // Beautiful landscape
  'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=600&q=80',  // Modern architecture
  'https://images.unsplash.com/photo-1682687218147-9806132dc697?w=600&q=80',  // Nature scene
];

interface CarouselProps {
  interval?: number;
}

const Carousel: FC<CarouselProps> = ({ interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // Automatically go to the next slide at specified intervals
  useEffect(() => {
    const timer = setInterval(() => {
      goToNextSlide();
    }, interval);

    // Clear interval on component unmount
    return () => {clearInterval(timer)};
  }, [currentIndex, interval]);

  // Go to the next slide
  const goToNextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Go to the previous slide
  const goToPrevSlide = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Go to a specific slide
  const goToSlide = (index: number): void => {
    setCurrentIndex(index);
  };

  return (
    <div style={styles['carouselContainer']}>
      <div style={styles['imageContainer']}>
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} style={styles['image']} />
      </div>
      
      {/* Previous and Next buttons */}
      <button 
        onClick={goToPrevSlide} 
        style={{ 
          ...styles['navButton'], 
          left: '10px',
          background: isHovering ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >❮</button>
      <button 
        onClick={goToNextSlide} 
        style={{ 
          ...styles['navButton'], 
          right: '10px',
          background: isHovering ? 'rgba(0,0,0,0.6)' : 'rgba(0,0,0,0.4)'
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >❯</button>

      {/* Indicators */}
      <div style={styles['indicatorContainer']}>
        {images.map((_, index) => (
          <div
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...styles['indicator'],
              backgroundColor: index === currentIndex ? '#333' : '#bbb',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Styles for the carousel
const styles: Record<string, CSSProperties> = {
  carouselContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '600px',
    margin: 'auto',
    overflow: 'hidden',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    width: '100%',
    height: '400px',
    backgroundColor: '#f8fbff',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s ease-in-out',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '2rem',
    color: 'white',
    background: 'rgba(0,0,0,0.4)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 15px',
    borderRadius: '50%',
    zIndex: 1,
    transition: 'background-color 0.2s ease-in-out',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '8px',
    padding: '5px 10px',
    borderRadius: '15px',
    background: 'rgba(0,0,0,0.3)',
  },
  indicator: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
  },
};

export default Carousel; 