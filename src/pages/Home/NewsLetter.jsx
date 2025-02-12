import { useState } from "react";
import { Input, Button, Typography } from "@material-tailwind/react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) return alert("Please enter a valid email.");
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <section className="w-full max-w-screen-2xl mx-auto pb-16 lg:pb-24 px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <Typography variant="h3" className="mb-4 text-blue-300">
          Stay Updated!
        </Typography>
        <Typography className="mb-6">
          Subscribe to our newsletter to get the latest updates and offers.
        </Typography>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <Input
            type="email"
            label="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSubscribe} color="blue" className="px-6">
            Subscribe
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
