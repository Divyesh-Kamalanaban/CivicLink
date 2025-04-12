import { useEffect, useRef, useState } from "react";

function CarouselMove() {
  
  // Original slides data
  const slides = [
    { title: 'title1', desc: 'desc' },
    { title: 'title2', desc: 'desc' },
    { title: 'title3', desc: 'desc' },
    { title: 'title4', desc: 'desc' },
    { title: 'title5', desc: 'desc' },
  ];
  
  // Reference to carousel container
  const carouselRef = useRef(null);
  
  // Track current slide index
  const [slideIndex, setSlideIndex] = useState(0);
  
  // State to control transition animations
  const [enableTransition, setEnableTransition] = useState(true);
  
  // Ref to prevent multiple resets
  const isResetting = useRef(false);
  
  // Create duplicated slides for seamless looping
  const duplicatedSlides = [...slides, ...slides];

  // Set up automatic slide advancement
  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex(prevIndex => {
        // Simply increment - the reset logic is handled in another effect
        return prevIndex + 1;
      });
    }, 3000); // Change slide every second
    
    return () => clearInterval(interval);
  }, []);
  
  // Handle the seamless reset when reaching the end
  useEffect(() => {
    // Check if we've reached the duplicated section and not already resetting
    if (slideIndex >= slides.length && !isResetting.current) {
      // Mark that we're in the process of resetting
      isResetting.current = true;
      
      // Disable transitions
      setEnableTransition(false);
      
      // Use requestAnimationFrame to ensure the state updates are processed
      requestAnimationFrame(() => {
        // Reset to equivalent position in first set of slides
        setSlideIndex(slideIndex - slides.length);
        
        // Re-enable transitions after the DOM has updated
        requestAnimationFrame(() => {
          setEnableTransition(true);
          isResetting.current = false;
        });
      });
    }
  }, [slideIndex, slides.length]);

  return (
    <div className="relative w-full h-[50vh] overflow-hidden" ref={carouselRef}>
      <div className="inset-0">
        {duplicatedSlides.map((slide, index) => {
          // Calculate the visual position for this slide
          const position = index - slideIndex;
          
          // Calculate whether this slide is active
          // We use modulo to handle the wrapping correctly
          const isActive = index % slides.length === slideIndex % slides.length;
          
          return (
            <div 
              key={index}
              className="glass-card text-white p-[4rem] h-[10vh] mx-auto flex flex-col justify-center items-center my-[1rem]"
              style={{
                // Position each slide individually
                transform: `translateY(${position * 100}%) skewY(-5deg)`,
                // Toggle transition based on state
                transition: enableTransition ? 'transform 500ms ease-in-out' : 'none',
                // Center each slide
                width: '20vw',
                // Visual enhancements
                opacity: isActive ? 1 : 0.7,
                zIndex: isActive ? 10 : 5,
              }}
            >
              <h2 className="font-bold">{slide.title}</h2>
              <p>{slide.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarouselMove;