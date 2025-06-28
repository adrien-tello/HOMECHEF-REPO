import React, { useState, useEffect } from 'react';
import { CalendarDays, Loader2 } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../context/ThemeContext';
import { Sparkles, CalendarCheck, Gift, PartyPopper } from 'lucide-react';

const EventPage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const cuisineImages = [
        'https://cameroonnewsagency.com/wp-content/uploads/2023/12/WhatsApp-Image-2023-12-03-at-14.05.29_e80fd8c7.jpg',
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.jeuneafrique.com%2F1428410%2Fculture%2Fau-cameroun-le-festival-diaspora-kitchen-revisite-le-patrimoine-culinaire%2F&psig=AOvVaw0zg_rNpycZLMllVVoVQ5L1&ust=1751196189276000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJC2psCAlI4DFQAAAAAdAAAAABAE',
        'https://newswatchcameroon.com/wp-content/uploads/2025/02/Mouanko-4.jpg'
    ];

    const pastEvents = [
        { id: 1, title: 'Ndolé Festival', date: 'March 12, 2024', location: 'Douala, Cameroon', description: 'Celebrating the famous Ndolé dish with live cooking and music.' },
        { id: 2, title: 'Jollof Cook-Off', date: 'January 20, 2024', location: 'Yaoundé, Cameroon', description: 'Top chefs compete to prepare the best Jollof rice.' },
    ];

    const testimonials = [
        { id: 1, name: 'Emmanuel N.', text: 'The Ndolé Festival was amazing! Great food, wonderful people, unforgettable experience.' },
        { id: 2, name: 'Clarisse T.', text: 'The Jollof Cook-Off brought the community together. So much fun and delicious food everywhere!' }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    // Theme-based colors
    const isLight = theme === 'light';
    const bgColor = isLight ? 'bg-[#FFF8F0]' : 'bg-[#111827]';
    const textColor = isLight ? 'text-[#FFFFFF]' : 'text-[#F5F5F5]';
    const primaryColor = isLight ? '#622A0F' : '#622A0F';
    const cardBg = isLight ? 'bg-white' : 'bg-[#374151]';
    const secondaryText = isLight ? 'text-[#A0522D]' : 'text-[#FFFFFF]';
    const borderColor = isLight ? 'border-[#622A0F]' : 'border-[#FFB347]';

    if (loading) {
        return (
            <div className={`flex items-center justify-center h-screen ${bgColor}`}>
                <Loader2 className={`animate-spin`} size={60} color={primaryColor} />
            </div>
        );
    }

    return (
        <div className={`${bgColor} min-h-screen ${textColor} p-6 transition-colors duration-500`}>
            <h1 className={`text-4xl font-bold text-center mb-8 ${secondaryText}`}>HomeChef Events</h1>

            {/* Tabs */}
            <div className="flex justify-center mb-8">
                <button
                    className={`px-6 py-3 mx-2 rounded-full text-lg font-semibold transition-all ${activeTab === 'upcoming' ? `bg-[${primaryColor}] text-white` : `bg-white ${borderColor} border text-[${primaryColor}]`}`}
                    style={activeTab !== 'upcoming' ? { borderColor: primaryColor, color: primaryColor } : {}}
                    onClick={() => setActiveTab('upcoming')}
                >
                    Upcoming Events
                </button>
                <button
                    className={`px-6 py-3 mx-2 rounded-full text-lg font-semibold transition-all ${activeTab === 'past' ? `bg-[${primaryColor}] text-white` : `bg-white ${borderColor} border orange900-[${primaryColor}]`}`}
                    style={activeTab !== 'past' ? { borderColor: primaryColor, color: primaryColor } : {}}
                    onClick={() => setActiveTab('past')}
                >
                    Past Events
                </button>
            </div>

            {/* Content */}
            {activeTab === 'upcoming' ? (
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <CalendarDays size={80} color={primaryColor} />
                    </div>
                    <h2 className="text-2xl font-semibold mb-4 text-orange-700">Stay Tuned for Upcoming Events! </h2> 
                    <p className="mb-8 text-orange-700">Exciting Cameroonian food competitions and culinary adventures are on the way. Prepare your kitchen!</p>
                    <div className="max-w-3xl mx-auto">
                        <Slider {...sliderSettings}>
                            {cuisineImages.map((src, index) => (
                                <div key={index} className="p-2">
                                    <img src={src} alt={`Cuisine ${index}`} className="rounded-xl w-full h-80 object-cover shadow-md" />
                                </div>
                            ))}
                        </Slider>
                    </div>
                <div className="mt-12 text-center">
                    <h3 className="text-2xl font-semibold mb-4 flex justify-center items-center gap-2 text-orange-700">
                        <CalendarCheck size={28} /> Upcoming Sneak Peek
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-[#622A0F] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold mb-2">Recipe Battles</h4>
                            <p>Compete against fellow chefs to create the best version of Cameroonian classics. Win prizes and earn bragging rights!</p>
                        </div>
                        <div className="bg-[#622A0F] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold mb-2">Live Cooking Challenges</h4>
                            <p>Join live events where surprise ingredients are revealed, and contestants create magic on the spot — streamed for all to see!</p>
                        </div>
                        <div className="bg-[#622A0F] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold mb-2">Community Votes</h4>
                            <p>Let the HomeChef community vote for their favorite recipes, presentation, and creativity — your fans will help you win!</p>
                        </div>
                        <div className="bg-[#622A0F] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <h4 className="text-xl font-semibold mb-2">Mystery Box</h4>
                            <p>Take part in mystery box challenges where you must prepare unique dishes from surprise ingredient combinations!</p>
                        </div>
                    </div>
                </div>

                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pastEvents.map(event => (
                            <div key={event.id} className={`${cardBg} rounded-xl shadow-lg hover:shadow-xl p-6 transition-shadow`}>
                                <h3 className={`text-2xl font-bold mb-2`} style={{ color: primaryColor }}>{event.title}</h3>
                                <p className="mb-1 font-semibold">{event.date} - {event.location}</p>
                                <p>{event.description}</p>
                            </div>
                        ))}
                    </div>

                        

                    {/* Testimonials */}
                    <div className="mt-16">
                        <h3 className={`text-3xl font-semibold text-center mb-6 ${secondaryText}`}>What Participants Say</h3>
                        <div className="max-w-3xl mx-auto">
                            <Slider {...sliderSettings}>
                                {testimonials.map(testimonial => (
                                    <div key={testimonial.id} className={`${cardBg} p-6 rounded-xl shadow-lg text-center`}>
                                        <p className="italic mb-4">"{testimonial.text}"</p>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            )}

            {/* Call to Action */}
            <div className={`mt-20 bg-[${primaryColor}] text-white rounded-xl p-8 text-center`}>
                <h3 className="text-3xl font-bold mb-4">Partner with HomeChef Events</h3>
                <p className="mb-6">Are you a sponsor, chef, or event organizer? Join us to host Cameroon’s biggest food festivals and competitions.</p>
                <button className="bg-white text-[#622A0F] font-bold px-8 py-3 rounded-full text-lg hover:scale-105 transition-transform">
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default EventPage;
