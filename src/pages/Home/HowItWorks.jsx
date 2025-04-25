
const HowItWorks = () => {
  return (
    <div className="max-w-screen-2xl py-16 mx-auto px-4 rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-12">
        <div className="bg-white dark:bg-blue-gray-900 text-black dark:text-white shadow-md rounded-lg p-6 text-center">
          <div className="mb-4">
            <i className="fas fa-user-plus text-4xl text-blue-600"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Step 1: Sign Up</h3>
          <p>Create an account to access the platform and start reviewing services.</p>
        </div>
        <div className="bg-white dark:bg-blue-gray-900 text-black dark:text-white shadow-md rounded-lg p-6 text-center">
          <div className="mb-4">
            <i className="fas fa-plus-circle text-4xl text-green-600"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Step 2: Add Services</h3>
          <p>Share services you’ve experienced and help others find great options.</p>
        </div>
        <div className="bg-white dark:bg-blue-gray-900 text-black dark:text-white shadow-md rounded-lg p-6 text-center">
          <div className="mb-4">
            <i className="fas fa-comment-dots text-4xl text-yellow-600"></i>
          </div>
          <h3 className="text-xl font-semibold mb-2">Step 3: Leave Reviews</h3>
          <p>Rate and review services you’ve tried to help others make informed decisions.</p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;