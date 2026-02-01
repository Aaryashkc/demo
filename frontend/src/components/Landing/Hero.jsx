import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
    const imgImage5 = 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  return (
    <section className="bg-[#f5f1e8] w-full py-16 md:py-24 px-8 md:px-16 lg:px-24">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h2 className="font-['Outfit'] font-bold leading-[1.2]">
            <span className="text-[#354f52] text-4xl md:text-5xl lg:text-6xl block mb-2">
              Manage waste collection
            </span>
            <span className="text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-[#57a521] to-[#213f0d] bg-clip-text" style={{ WebkitTextFillColor: 'transparent' }}>
              with precision and ease
            </span>
          </h2>
          <p className="text-[#296200] text-lg font-['Outfit'] leading-relaxed max-w-2xl">
            EcoWaste Dashboard streamlines your entire waste management operation. Track routes, assign drivers, and respond to requests in real time.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/customer-dashboard">
              <button className="bg-[#354f52] text-[#f5f1e8] px-10 py-5 rounded-[20px] font-['Inter'] font-medium text-xl flex items-center gap-3 hover:bg-opacity-90 transition-all">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <button className="border-2 border-[#354f52] text-[#354f52] px-10 py-5 rounded-[20px] font-['Inter'] font-medium text-xl hover:bg-[#354f52] hover:text-white transition-all">
              Learn More
            </button>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-full max-w-md">
            <img 
              src={imgImage5} 
              alt="Waste collection truck" 
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
