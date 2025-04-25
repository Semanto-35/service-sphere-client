import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const OurPartners = () => {
  const partners = [
    {
      id: 1,
      name: "TechVision",
      logo: "https://i.ibb.co.com/V3gJNVh/img-2.png",
      description: "Leading technology solutions provider",
    },
    {
      id: 2,
      name: "HealthPlus",
      logo: "https://i.ibb.co.com/h1WtjbF/img-1.png",
      description: "Premium healthcare services",
    },
    {
      id: 3,
      name: "EduExpert",
      logo: "https://i.ibb.co.com/MpddvmS/im3-3.jpg",
      description: "Quality education and training",
    },
    {
      id: 4,
      name: "HomeServices",
      logo: "https://i.ibb.co.com/TYyrct3/img-4.jpg",
      description: "Professional home maintenance",
    },
  ];

  return (
    <section className="pb-12 bg-blue-gray-50 dark:bg-blue-gray-800 text-gray-800 dark:text-gray-50">
      <div className="w-full max-w-screen-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <Typography variant="h2" className="mb-2">
            Meet Our Partners
          </Typography>
          <Typography className="max-w-2xl mx-auto">
            We collaborate with industry leaders who share our commitment to excellence and customer satisfaction.
          </Typography>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full bg-white dark:bg-blue-gray-900 rounded-lg"
            >
              <div className="bg- rounded-lg shadow-md p-6 text-center h-full flex flex-col items-center justify-center">
                <div className="mb-4 rounded-full overflow-hidden w-20 h-20 flex items-center justify-center">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <Typography variant="h6" className="mb-1">
                  {partner.name}
                </Typography>
                <Typography variant="small" color="gray">
                  {partner.description}
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;