import { useState, useRef, useEffect } from 'react';

function useInView() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.unobserve(el); } },
            { threshold: 0.15 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return [ref, inView];
}

function FadeIn({ children, delay = 0, className = '' }) {
    const [ref, inView] = useInView();
    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

export default function ContactUs() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real app this would POST to an API
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="bg-[#f5f1e8] min-h-screen">
            {/* Hero */}
            <section className="py-20 sm:py-28 px-4 text-center">
                <FadeIn>
                    <span className="inline-block px-4 py-1.5 bg-[#354f52]/10 text-[#354f52] rounded-full text-sm font-semibold mb-6 tracking-wide">
                        Contact Us
                    </span>
                </FadeIn>
                <FadeIn delay={100}>
                    <h1 className="font-['Outfit',sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-[#354f52] leading-tight mb-6">
                        We'd Love to <span className="text-[#296200]">Hear</span><br />
                        From You
                    </h1>
                </FadeIn>
                <FadeIn delay={200}>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have questions, feedback, or need support? Reach out and our team will get back to you as soon as possible.
                    </p>
                </FadeIn>
            </section>

            {/* Content */}
            <section className="pb-20 sm:pb-28 px-4">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
                    {/* Contact Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <FadeIn>
                            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                                <h3 className="font-['Outfit',sans-serif] font-bold text-lg text-[#354f52] mb-4">Get in Touch</h3>
                                <div className="space-y-4">
                                    {[
                                        { icon: '📧', label: 'Email', value: 'support@safabin.com' },
                                        { icon: '📞', label: 'Phone', value: '+977 01-1234567' },
                                        { icon: '📍', label: 'Address', value: 'Kathmandu, Nepal' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex items-start gap-3">
                                            <span className="text-xl mt-0.5">{item.icon}</span>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                                                <p className="text-[#354f52] font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        <FadeIn delay={150}>
                            <div className="bg-[#354f52] rounded-2xl p-6 sm:p-8 text-white">
                                <h3 className="font-['Outfit',sans-serif] font-bold text-lg mb-3">Working Hours</h3>
                                <div className="space-y-2 text-white/80 text-sm">
                                    <div className="flex justify-between">
                                        <span>Sun – Fri</span>
                                        <span className="font-medium text-white">9:00 AM – 6:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-medium text-white">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Contact Form */}
                    <FadeIn delay={100} className="lg:col-span-3">
                        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-100 shadow-sm">
                            <h3 className="font-['Outfit',sans-serif] font-bold text-xl text-[#354f52] mb-6">Send a Message</h3>

                            {submitted && (
                                <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium animate-[fadeIn_0.3s_ease-out]">
                                    ✅ Message sent! We'll get back to you soon.
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:border-transparent transition placeholder:text-gray-400"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:border-transparent transition placeholder:text-gray-400"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="How can we help you?"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:border-transparent transition placeholder:text-gray-400"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-[#354f52] text-white font-semibold py-3 rounded-xl hover:bg-[#2a3f41] transition active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#354f52] focus:ring-offset-2"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
