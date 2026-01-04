import React from 'react';
import Navbar from '../components/common/Navbar';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="bg-white min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-10 bg-green-700 pattern-grid-lg"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8">
                            Cleaner Cities, <br />
                            <span className="text-green-700">Smarter Future</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                            Transform your garbage collection operations with real-time tracking, route optimization, and intelligent monitoring.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/login">
                                <Button variant="primary" className="!px-8 !py-4 !text-lg shadow-lg shadow-green-700/20">
                                    Get Started
                                </Button>
                            </Link>
                            <Button variant="outline" className="!px-8 !py-4 !text-lg">
                                View Demo
                            </Button>
                        </div>
                    </div>

                    <div className="mt-20 relative">
                        <div className="absolute inset-0 bg-green-700 blur-[100px] opacity-20 transform rotate-3"></div>
                        <img
                            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                            alt="Garbage Management Dashboard Preview"
                            className="relative rounded-2xl shadow-2xl border-4 border-white mx-auto transform hover:-translate-y-2 transition-transform duration-500 w-full max-w-5xl"
                        />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose EcoTrack?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Advanced technology meets environmental responsibility.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="🚛"
                            title="Fleet Tracking"
                            description="Monitor garbage trucks in real-time. Optimize routes to save fuel and time."
                        />
                        <FeatureCard
                            icon="📊"
                            title="Smart Analytics"
                            description="Get detailed reports on waste collection, zone coverage, and efficiency metrics."
                        />
                        <FeatureCard
                            icon="🌍"
                            title="Zone Monitoring"
                            description="Visualize city clean-up status zone by zone with intuitive map interfaces."
                        />
                    </div>
                </div>
            </section>

            {/* Visual Section */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-16">
                    <div className="w-full md:w-1/2">
                        <img
                            src="https://images.unsplash.com/photo-1547841243-eacb80d6e902?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                            alt="Clean City"
                            className="rounded-2xl shadow-xl"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Keeping Communities Clean</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Our system ensures that no corner is left unattended. We provide tools for administrators to effectively manage resources and ensure timely waste collection.
                        </p>
                        <ul className="space-y-4">
                            {['Real-time status updates', 'Driver performance tracking', 'Resource allocation optimization'].map((item) => (
                                <li key={item} className="flex items-center gap-3 text-gray-700">
                                    <span className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-green-700 text-white">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Ready to modernize your operations?</h2>
                    <Link to="/login">
                        <Button variant="secondary" className="!px-8 !py-3 !text-lg">Access Admin Portal</Button>
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <p>© 2026 Safabin Systems. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 group">
        <div className="text-4xl mb-6 bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
);

export default Landing;
