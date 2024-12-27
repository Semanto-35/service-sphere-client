

const OurPartners = () => {
  return (
    <div className="my-16 max-w-7xl mx-auto">
      <h2 className="text-center text-4xl font-bold mb-6">Meet Our Partners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-12 rounded-lg bg-blue-gray-100">
        <div className="text-center p-4">
          <img src="https://i.ibb.co.com/V3gJNVh/img-2.png" alt="TechSolutions Logo" className="w-16 h-16 mx-auto mb-4" />
          <p className="font-semibold text-lg">TechSolutions Inc.</p>
          <p className="text-gray-600">Leading provider of IT services, helping businesses integrate cutting-edge technologies.</p>
        </div>
        <div className="text-center p-4">
          <img src="https://i.ibb.co.com/MpddvmS/im3-3.jpg" className="w-16 h-16 mx-auto mb-4" />
          <p className="font-semibold">DesignHub Studio</p>
          <p className="text-gray-600">Creative agency known for innovative designs and branding solutions.</p>
        </div>
        <div className="text-center p-4">
          <img src="https://i.ibb.co.com/TYyrct3/img-4.jpg" alt="GreenTech Logo" className="w-16 h-16 mx-auto mb-4" />
          <p className="font-semibold">GreenTech Solutions</p>
          <p className="text-gray-600">Sustainable technology solutions to reduce carbon footprint and improve energy efficiency.</p>
        </div>
        <div className="text-center p-4">
          <img src="https://i.ibb.co.com/h1WtjbF/img-1.png" alt="HealthPlus Logo" className="w-16 h-16 mx-auto mb-4" />
          <p className="font-semibold">HealthPlus</p>
          <p className="text-gray-600">HealthPlus partners with healthcare providers to focus on telemedicine and healthcare data analytics.</p>
        </div>
      </div>
    </div>
  );
};

export default OurPartners;