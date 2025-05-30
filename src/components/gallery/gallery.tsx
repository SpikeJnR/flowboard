import { useEffect, useState } from 'react';

const Gallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    './public/images/login-slide1.svg',
    './public/images/login-slide2.svg',
    './public/images/login-slide3.svg'
  ];

  const titles = [
    'Turn chaos into a clear card',
    'See your work flow — clearly and beautifully',
    'Take control of your projects today'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='carousel'>
      <div className='carousel-slide'>
        <img
          className='carousel__img'
          key={currentSlide}
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
        />
      </div>

      <p key={currentSlide} className='carousel__title'>
        {titles[currentSlide]}
      </p>

      <div className='carousel-nav'>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`carousel__nav-button ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
