import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    title: "Welcome to Our Service",
    description: "Discover services that fit your needs.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    title: "Find Trusted Reviews",
    description: "Read honest reviews before making decisions.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    title: "Get Started Today",
    description: "Join now and start reviewing services!",
  },
];

const h2Variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } },
};

const pVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.4 } },
};

const btnVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut", delay: 0.2 } },
};

const Banner = () => {
  const navigate = useNavigate();


  return (
    <div className="w-full h-[600px] md:h-[500px] sm:h-[400px] mt-[76px]">
      <div className="w-full max-w-screen-2xl mx-auto h-full relative">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          className="w-full h-full"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative w-full h-full">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                  <motion.h2
                    className="lg:text-5xl text-4xl font-semibold"
                    variants={h2Variants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {slide.title}
                  </motion.h2>
                  <motion.p
                    className="lg:text-xl text-lg mt-4"
                    variants={pVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {slide.description}
                  </motion.p>
                  <motion.button
                    onClick={() => navigate('/services')}
                    className="mt-6 px-4 py-2 md:px-6 md:py-3 bg-light-blue-500 hover:bg-light-blue-600 transition rounded-lg text-white font-semibold"
                    variants={btnVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    Get Started
                  </motion.button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="custom-prev absolute top-1/2 left-2 -translate-y-1/2 z-10 bg-white/30 p-3 rounded-full hover:bg-white/50 transition">
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <button className="custom-next absolute top-1/2 right-2 -translate-y-1/2 z-10 bg-white/30 p-3 rounded-full hover:bg-white/50 transition">
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
