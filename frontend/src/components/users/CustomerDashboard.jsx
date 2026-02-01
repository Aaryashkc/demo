
import { useNavigate } from 'react-router-dom';

function CustomerDashboard() {
  const navigate = useNavigate();

  const handleMyWastePickUp = () => {
    console.log('Navigate to My Waste Pick Up');
    // navigate('/customer/pickups')
  };

  const handlePickWaste = () => {
    console.log('Navigate to Pick Waste');
    // navigate('/customer/request-pickup')
  };

  const handleSeeMore = () => {
    console.log('See more services');
    // navigate('/customer/services')
  };

  const handleSchedule = () => {
    console.log('Navigate to Schedule page');
    navigate('/schedule')
  };

  const services = [
    {
      id: 1,
      title: 'Pick waste',
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 64 64" fill="none">
          <rect x="16" y="24" width="32" height="28" rx="2" stroke="#354f52" strokeWidth="2.5" fill="none"/>
          <path d="M20 24V20C20 18 21 16 24 16H40C43 16 44 18 44 20V24" stroke="#354f52" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="44" cy="16" r="6" fill="#296200"/>
          <path d="M41 16L43 18L47 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 2,
      title: 'Pick waste',
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 64 64" fill="none">
          <rect x="16" y="24" width="32" height="28" rx="2" stroke="#354f52" strokeWidth="2.5" fill="none"/>
          <path d="M20 24V20C20 18 21 16 24 16H40C43 16 44 18 44 20V24" stroke="#354f52" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="44" cy="16" r="6" fill="#296200"/>
          <path d="M41 16L43 18L47 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 3,
      title: 'Pick waste',
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 64 64" fill="none">
          <rect x="16" y="24" width="32" height="28" rx="2" stroke="#354f52" strokeWidth="2.5" fill="none"/>
          <path d="M20 24V20C20 18 21 16 24 16H40C43 16 44 18 44 20V24" stroke="#354f52" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="44" cy="16" r="6" fill="#296200"/>
          <path d="M41 16L43 18L47 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      id: 4,
      title: 'Pick waste',
      icon: (
        <svg className="w-16 h-16 sm:w-20 sm:h-20" viewBox="0 0 64 64" fill="none">
          <rect x="16" y="24" width="32" height="28" rx="2" stroke="#354f52" strokeWidth="2.5" fill="none"/>
          <path d="M20 24V20C20 18 21 16 24 16H40C43 16 44 18 44 20V24" stroke="#354f52" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="44" cy="16" r="6" fill="#296200"/>
          <path d="M41 16L43 18L47 14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-[#f5f1e8] min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        
        {/* Header Section with Schedule Icon */}
        <div className="flex justify-between items-start mb-12 sm:mb-16">
          <div className="flex-1">
            {/* Main Heading */}
            <h1 className="font-['Outfit',sans-serif] font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#354f52] mb-4 leading-tight">
              Manage waste collection with
              <br />
              precision and ease
            </h1>
            
            {/* Subtitle */}
            <p className="font-['Poppins',sans-serif] text-base sm:text-lg lg:text-xl text-[#296200] mb-8 sm:mb-10">
              With you we will help ecology
            </p>

            {/* My Waste Pick Up Button */}
            <button
              onClick={handleMyWastePickUp}
              className="bg-[#354f52] flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-[#2a3f41] transition-all active:scale-95 transform focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2 shadow-lg"
            >
              <span className="font-['Inter',sans-serif] font-medium text-[#f5f1e8] text-base sm:text-lg">
                My Waste Pick Up
              </span>
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" stroke="#f5f1e8" />
              </svg>
            </button>
          </div>

          {/* Schedule Icon Button */}
          <div className="ml-4">
            <button
              onClick={handleSchedule}
              className="bg-[#354f52] w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center hover:bg-[#2a3f41] transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2 active:scale-95 transform"
              aria-label="View schedule"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" viewBox="0 0 24 24" stroke="#f5f1e8" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </button>
          </div>
        </div>

        {/* More Services Section */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <div className="flex items-center gap-3">
              <h2 className="font-['Outfit',sans-serif] font-bold text-2xl sm:text-3xl lg:text-4xl text-[#354f52]">
                More services
              </h2>
              <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" fill="#354f52"/>
                <path d="M20 12v16M12 20h16" stroke="#f5f1e8" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            
            <button
              onClick={handleSeeMore}
              className="font-['Poppins',sans-serif] text-base sm:text-lg text-[#354f52] hover:text-[#296200] transition-colors underline focus:outline-none focus:ring-2 focus:ring-[#354f52] rounded-md px-2"
            >
              see more
            </button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={handlePickWaste}
                className="bg-white border-2 border-[#354f52] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center gap-4 hover:bg-[#354f52] hover:text-white group transition-all active:scale-95 transform focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2 shadow-md hover:shadow-xl"
              >
                <div className="group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <span className="font-['Poppins',sans-serif] font-medium text-base sm:text-lg text-[#354f52] group-hover:text-white transition-colors">
                  {service.title}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomerDashboard;