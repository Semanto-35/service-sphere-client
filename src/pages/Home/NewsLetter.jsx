// import { useState } from "react";
// import { Input, Button, Typography } from "@material-tailwind/react";
// import { toast } from "react-toastify";

// const Newsletter = () => {
//   const [email, setEmail] = useState("");

//   const handleSubscribe = () => {
//     if (!email) return toast.error("Please enter a valid email.");
//     toast.success(`Subscribed with: ${email}`);
//     setEmail("");
//   };

//   return (
//     <section className="w-full max-w-screen-2xl mx-auto pb-16 lg:pb-24 px-8 text-center">
//       <div className="max-w-3xl mx-auto">
//         <Typography variant="h3" className="mb-4 text-blue-300">
//           Stay Updated!
//         </Typography>
//         <Typography className="mb-6">
//           Subscribe to our newsletter to get the latest updates and offers.
//         </Typography>
//         <div className="flex flex-col md:flex-row justify-center items-center gap-4">
//           <Input
//             type="email"
//             label="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <Button onClick={handleSubscribe} color="blue" className="px-6">
//             Subscribe
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Newsletter;


import { useState, useEffect } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Validate email on change
  useEffect(() => {
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValid(emailRegex.test(email));
    } else {
      setIsValid(true); // Empty state is not invalid
    }
  }, [email]);

  const handleSubscribe = () => {
    if (!email || !isValid) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(`Successfully subscribed: ${email}`);
      setEmail("");
      setIsSubmitting(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && isValid && email) {
      handleSubscribe();
    }
  };

  return (
    <section className="w-full max-w-screen-2xl mx-auto py-16 lg:py-24 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 md:p-12 rounded-2xl shadow-lg dark:shadow-blue-900/5"
      >
        <div className="text-center">
          <Typography variant="h3" className="mb-2 text-blue-500 dark:text-blue-300 font-bold">
            Stay Updated
          </Typography>
          <Typography className="mb-8 text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
            Join our newsletter for exclusive content, industry insights, and special offers delivered straight to your inbox.
          </Typography>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
            <div className="relative w-full">
              <Input
                type="email"
                label="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                color={!isValid && email ? "red" : "blue"}
                className="pr-4 bg-white dark:bg-gray-800"
                error={!isValid && email.length > 0}
                success={isValid && email.length > 0}
                containerProps={{ className: "min-w-[100px]" }}
              />
              {!isValid && email && (
                <Typography variant="small" color="red" className="absolute -bottom-5 left-0 text-xs">
                  Please enter a valid email
                </Typography>
              )}
            </div>
            
            <Button 
              onClick={handleSubscribe}
              disabled={isSubmitting || !isValid || !email}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 shadow-md hover:shadow-lg transition-all duration-300 normal-case font-medium tracking-wide disabled:opacity-70"
              fullWidth={false}
              loading={isSubmitting}
            >
              Subscribe
            </Button>
          </div>
          
          <Typography variant="small" className="mt-8 text-gray-500 dark:text-gray-400">
            We respect your privacy. Unsubscribe at any time.
          </Typography>
        </div>
      </motion.div>
    </section>
  );
};

export default Newsletter;
