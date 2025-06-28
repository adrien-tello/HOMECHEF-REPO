import React, { useState, useEffect } from 'react';
import { CalendarDays, Loader2 } from 'lucide-react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTheme } from '../context/ThemeContext';
import { Sparkles, CalendarCheck, Gift, PartyPopper } from 'lucide-react';
import { color } from 'framer-motion';

const EventPage = () => {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [loading, setLoading] = useState(true);
    const { theme } = useTheme();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const cuisineImages = [
        'https://www.foodandhome.co.za/wp-content/uploads/2023/02/diaspora-kitchen-cameroon.jpg',
        'https://scontent-los2-1.xx.fbcdn.net/v/t39.30808-6/485907402_4065401413695531_1320465653724101861_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_ohc=-Yegx6dA72MQ7kNvwHfXR_Z&_nc_oc=AdmsZmnLAbQ4r-f09NFZzOt2MD5Z3FVMZlu-9X5QZPxpw6nXiHVtNQEztB1yQQnDsZZjj6KD5kcO6vJ4Lb6e9b_w&_nc_zt=23&_nc_ht=scontent-los2-1.xx&_nc_gid=pHgyV04TAu9n-Y6xtVltxQ&oh=00_AfOi96nF_k2btI2GUsnVrfrQ_EaoqipwPTXCvf1EtWJvsA&oe=6865BFDD',
        'https://newswatchcameroon.com/wp-content/uploads/2025/02/Mouanko-4.jpg'
    ];

    const pastEvents = [
        { id: 1, title: '𝗦𝗘𝗠𝗘 𝗕𝗘𝗔𝗖𝗛 𝗛𝗢𝗧𝗘𝗟 𝗛𝗢𝗦𝗧𝗦 "𝗖𝗛𝗘𝗙 𝗜𝗡 𝗧𝗛𝗘 𝗕𝗘𝗔𝗖𝗛" 𝗖𝗨𝗟𝗜𝗡𝗔𝗥𝗬 𝗖𝗢𝗠𝗣𝗘𝗧𝗜𝗧𝗜𝗢𝗡', date: 'March 12, 2024', location: 'Douala, Cameroon', description: 'Culinary art gurus in Cameroon will join chefs the world over on October 20th' },
        { id: 2, title: 'MOUANKO Culinary Event Édition', date: 'January 20, 2024', location: 'Yaoundé, Cameroon', description: 'Top chefs compete to prepare the best Jollof rice.' },
    ];

    const testimonials = [
        { id: 1, name: 'Emmanuel N.', text: ' Great food, wonderful people, unforgettable experience.' },
        { id: 2, name: 'Clarisse T.', text: ' So much fun and delicious food everywhere!' }
    ];

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };


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
                            <div key={event.id} className="mb-6 p-4 rounded-lg bg-orange-50 shadow">
                                <h3 className="text-xl font-bold text-orange-700 mb-1">{event.title}</h3>
                                <div className="text-sm text-green-700 mb-1">{event.date}</div>
                                <div className="text-sm text-gray-600 mb-1">{event.location}</div>
                                <p className="text-gray-800">{event.description}</p>
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
                                        <p className="italic mb-4 text-gray-600">"{testimonial.text}"</p>
                                        <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            )}

            {/* Call to Action */}
            <div className={`mt-20 bg-[${primaryColor}] text-white rounded-xl p-8 text-center`}>
                <h3 className="text-3xl font-bold mb-4 ">Partner with HomeChef Events</h3>
                <p className="mb-6">Are you a sponsor, chef, or event organizer? Join us to host Cameroon’s biggest food festivals and competitions.</p>
                <button className="bg-white text-[#622A0F] font-bold px-8 py-3 rounded-full text-lg hover:scale-105 transition-transform">
                    Contact Us
                </button>
            </div>
        </div>
    );
};

export default EventPage;
