import React from "react";
import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section className="w-full max-w-screen-2xl mx-auto py-16 px-4 mt-20 ">
      <div className="text-center mb-12">
        <Typography variant="h2" className="font-bold mb-4">
          About Us
        </Typography>
        <Typography variant="lead" className="max-w-3xl mx-auto">
          Welcome to <strong>ServiceSphere</strong>, your trusted platform for reviewing and discovering services based on honest user feedback.
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md border border-blue-gray-100">
          <CardBody>
            <Typography variant="h4" className="mb-2">
              🎯 Our Vision
            </Typography>
            <Typography variant="paragraph" >
              To build a transparent, community-driven space where users can share experiences and improve services collectively.
            </Typography>
          </CardBody>
        </Card>

        <Card className="shadow-md border border-blue-gray-100">
          <CardBody>
            <Typography variant="h4" className="mb-2">
              💡 What We Offer
            </Typography>
            <ul className="list-disc list-inside text-blue-gray-700 space-y-1">
              <li>Secure user authentication</li>
              <li>Service creation & review system</li>
              <li>Smart filtering & searching</li>
              <li>Full control for service providers</li>
              <li>Transparent feedback culture</li>
            </ul>
          </CardBody>
        </Card>

        <Card className="shadow-md border border-blue-gray-100">
          <CardBody>
            <Typography variant="h4" className="mb-2">
              🤝 Our Mission
            </Typography>
            <Typography variant="paragraph">
              To empower users to share genuine service experiences and help others make informed decisions with confidence.
            </Typography>
          </CardBody>
        </Card>

        <Card className="shadow-md border border-blue-gray-100">
          <CardBody>
            <Typography variant="h4" className="mb-2">
              📈 Our Goals
            </Typography>
            <Typography variant="paragraph">
              Enhance transparency in the service sector, support quality improvement, and foster a trustworthy user ecosystem.
            </Typography>
          </CardBody>
        </Card>
      </div>

      <div className="text-center mt-12">
        <Link to={'/services'}>
          <Button size="lg" color="blue">
            Explore Services
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default About;
