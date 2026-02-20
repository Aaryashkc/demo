import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CustomerLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStarted = () => {
    navigate('/customer-dashboard');
  };

  const handleLearnMore = () => {
    navigate('/about-us');
  };

  const handleCustomerDashboard = () => {
    console.log('Navigate to customer dashboard');
    navigate('/customer-dashboard')
  };

  const handleRequestPickup = () => {
    console.log('Navigate to request pickup');
    // navigate('/customer/request-pickup')
  };

  return (
    <div className="bg-[#f5f1e8] min-h-screen relative overflow-hidden">
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* Left Side - Content */}
            <div className="w-full max-w-2xl mx-auto lg:mx-0">
              {/* Main Heading */}
              <h1 className="font-['Outfit',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#354f52] mb-4 sm:mb-6 leading-tight">
                Manage waste collection
              </h1>

              <h2 className="font-['Outfit',sans-serif] font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#296200] mb-6 sm:mb-8 leading-tight">
                with precision and ease
              </h2>

              {/* Description */}
              <p className="font-['Poppins',sans-serif] text-base sm:text-lg lg:text-xl text-[#354f52] mb-8 sm:mb-12 max-w-xl leading-relaxed">
                EcoWaste Dashboard streamlines your entire waste management operation. Track routes, assign drivers, and respond to requests in real time.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <button
                  onClick={handleGetStarted}
                  className="bg-[#354f52] flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-[#2a3f41] transition-all active:scale-95 transform focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2 shadow-lg"
                >
                  <span className="font-['Inter',sans-serif] font-medium text-[#f5f1e8] text-base sm:text-lg">
                    Dashboard
                  </span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="#f5f1e8" />
                  </svg>
                </button>

                <button
                  onClick={handleLearnMore}
                  className="bg-transparent border-2 border-[#354f52] flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-[#354f52] hover:text-white transition-all active:scale-95 transform focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2"
                >
                  <span className="font-['Inter',sans-serif] font-medium text-[#354f52] hover:text-white text-base sm:text-lg">
                    Learn More
                  </span>
                </button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0">
              <div
                className="relative w-full aspect-square"
                role="img"
                aria-label="Green waste bin with recycling symbol"
              >
                <div className="absolute inset-0 bg-[#84a98c] rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
                  <div className="relative w-full h-full bg-[#f5f1e8] rounded-xl overflow-hidden flex items-center justify-center p-4 sm:p-6">
                    <img
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                      alt="Green waste bin"
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Floating Action Menu */}
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        {/* Menu Options - Slide up when open */}
        <div
          className={`absolute bottom-16 right-0 mb-4 flex flex-col gap-3 transition-all duration-300 transform ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
        >
          <button
            onClick={handleCustomerDashboard}
            className="bg-[#296200] text-white px-5 sm:px-6 py-3 rounded-full font-['Poppins',sans-serif] font-medium text-sm sm:text-base hover:bg-[#1f4a00] transition-all shadow-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#296200] focus:ring-offset-2"
          >
            Customer Dashboard
          </button>

          <button
            onClick={handleRequestPickup}
            className="bg-[#296200] text-white px-5 sm:px-6 py-3 rounded-full font-['Poppins',sans-serif] font-medium text-sm sm:text-base hover:bg-[#1f4a00] transition-all shadow-lg whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-[#296200] focus:ring-offset-2"
          >
            Request For Pick Up
          </button>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleMenu}
          className={`bg-[#354f52] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center hover:bg-[#2a3f41] transition-all shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2 ${isMenuOpen ? 'rotate-45' : 'rotate-0'
            }`}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CustomerLandingPage;