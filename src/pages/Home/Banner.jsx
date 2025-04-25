
import { useState, useEffect } from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Add Your Services & Grow",
      description: "List your services, receive feedback, and expand your customer base through genuine reviews.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1612103198005-b238154f4590?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Honest Reviews by Real Users",
      description: "Read authentic feedback from verified users to make informed decisions about services.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1493606278519-11aa9f86e40a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Find & Share the Best Services",
      description: "Discover top-rated services from trusted providers and share your experiences with the community.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <Carousel
      className="h-96 md:h-[500px] rounded-none mt-[76px]"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => {
                setActiveIndex(i);
                setCurrentSlide(i);
              }}
            />
          ))}
        </div>
      )}
    >
      {slides.map((slide) => (
        <div key={slide.id} className="relative h-full w-full">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
            <div className="w-3/4 text-center md:w-2/4">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                >
                  {slide.title}
                </Typography>
                <Typography
                  variant="lead"
                  color="white"
                  className="mb-8 opacity-80"
                >
                  {slide.description}
                </Typography>
                <div className="flex justify-center gap-2">
                  <Link to="/services">
                    <Button color="light-blue">
                      Explore Services
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;