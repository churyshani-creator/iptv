// components/TestimonialsSection.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ThumbsUp, Award, TrendingUp, Users } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Michael Rodriguez",
    role: "Sports Enthusiast",
    content: "Best IPTV service I've ever used! The 4K streams are crystal clear and I never experience buffering during live games. The sports channels cover everything from NFL to soccer.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    location: "Texas, USA",
    date: "2 days ago",
    helpful: 124
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Movie Lover",
    content: "Amazing selection of movies and TV shows. The instant activation was super smooth. Highly recommended! The VOD library is massive with new content added weekly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    location: "London, UK",
    date: "5 days ago",
    helpful: 89
  },
  {
    id: 3,
    name: "David Chen",
    role: "Family User",
    content: "Having 5 devices simultaneously is perfect for my family. Everyone watches what they want without issues. Kids love the cartoon channels and my wife enjoys the drama series.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    location: "Toronto, Canada",
    date: "1 week ago",
    helpful: 203
  },
  {
    id: 4,
    name: "Emma Wilson",
    role: "Tech Reviewer",
    content: "The EPG is accurate, channels load instantly, and customer support is responsive. Worth every penny. The 4K streaming quality is exceptional on my LG OLED TV.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    location: "Sydney, Australia",
    date: "3 days ago",
    helpful: 67
  },
  {
    id: 5,
    name: "James Anderson",
    role: "Expat Viewer",
    content: "Being overseas, I was missing my local channels. This service has everything I need - live news, sports, and entertainment from back home. No VPN needed!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    location: "Dubai, UAE",
    date: "4 days ago",
    helpful: 156
  },
  {
    id: 6,
    name: "Maria Garcia",
    role: "Spanish Content Lover",
    content: "Incredible selection of Spanish and Latin American channels. My whole family can watch their favorite telenovelas and soccer matches. The quality is outstanding!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    location: "Madrid, Spain",
    date: "1 week ago",
    helpful: 92
  },
  {
    id: 7,
    name: "Robert Kim",
    role: "Tech Enthusiast",
    content: "The 4K streams are truly 4K - no upscaling tricks. Works perfectly on my Nvidia Shield and home theater setup. Zero buffering even during peak hours.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    location: "Seoul, South Korea",
    date: "6 days ago",
    helpful: 178
  },
  {
    id: 8,
    name: "Lisa Thompson",
    role: "Frequent Traveler",
    content: "I travel for work constantly and this service works everywhere - hotels, airports, different countries. As long as there's WiFi, I have my entertainment.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    location: "Singapore",
    date: "2 weeks ago",
    helpful: 112
  },
  {
    id: 9,
    name: "Ahmed Hassan",
    role: "Arabic Content Fan",
    content: "Best Arabic IPTV provider! All the major MBC channels, beIN Sports, and Arabic movies in HD quality. Customer support helped me set up on my Firestick quickly.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    location: "Cairo, Egypt",
    date: "3 days ago",
    helpful: 144
  },
  {
    id: 10,
    name: "Olivia Martinez",
    role: "Cord Cutter",
    content: "Finally cut the cord with my expensive cable company. Saving over $100/month and getting more channels. Easy setup on my Roku TV and iPad. Highly recommend!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&q=80",
    location: "Florida, USA",
    date: "1 day ago",
    helpful: 231
  },
  {
  id: 11,
  name: "Daniel Martinez",
  role: "Football Fan",
  content: "I mainly use IPTV for live football and it has been flawless. No lag, no buffering, and all major leagues are available in HD and 4K quality.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  location: "Barcelona, Spain",
  date: "3 days ago",
  helpful: 98
},
{
  id: 12,
  name: "Sophia Lee",
  role: "Entertainment Lover",
  content: "Amazing variety of channels and movies. Setup was very easy on my Smart TV and mobile. Everything works smoothly without interruptions.",
  rating: 5,
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  location: "Toronto, Canada",
  date: "2 days ago",
  helpful: 87
}
];

// Component 1: Stats Overview Card
const StatsOverviewCard = () => {
  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: <Users className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { label: "5-Star Reviews", value: "2,450+", icon: <Star className="w-5 h-5" />, color: "from-yellow-500 to-orange-500" },
    { label: "Avg Rating", value: "4.8/5", icon: <Award className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { label: "Active Users", value: "1,280", icon: <TrendingUp className="w-5 h-5" />, color: "from-green-500 to-emerald-500" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Trusted Worldwide</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`text-center p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 bg-clip-padding backdrop-filter backdrop-blur-sm`}
          >
            <div className="inline-flex p-2 rounded-full bg-white/10 mb-2">
              {stat.icon}
            </div>
            <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-300">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Component 2: Platform Distribution Card
const PlatformDistributionCard = () => {
  const platforms = [
    { name: "Firestick", percentage: 35, users: "3,500", icon: "🔥" },
    { name: "Android TV", percentage: 28, users: "2,800", icon: "📱" },
    { name: "iPhone/iPad", percentage: 18, users: "2,500", icon: "🍎" },
    { name: "Smart TV", percentage: 12, users: "2,200", icon: "📺" },
    { name: "Windows/Mac", percentage: 7, users: "1000", icon: "💻" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <h3 className="text-lg font-semibold text-white mb-4 text-center">Platform Distribution</h3>
      <div className="space-y-3">
        {platforms.map((platform, idx) => (
          <motion.div
            key={platform.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <div className="flex justify-between text-sm mb-1">
              <div className="flex items-center gap-2">
                <span>{platform.icon}</span>
                <span className="text-gray-300">{platform.name}</span>
              </div>
              <div className="flex gap-3">
                <span className="text-purple-400">{platform.percentage}%</span>
                <span className="text-gray-500 text-xs">{platform.users} users</span>
              </div>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${platform.percentage}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10 text-center">
        <div className="inline-flex items-center gap-2 text-xs text-gray-400">
          <Users className="w-3 h-3" />
          <span>Based on 10,000+ active subscribers</span>
        </div>
      </div>
    </motion.div>
  );
};

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [helpfulCounts, setHelpfulCounts] = useState<Record<number, number>>(() => {
    const initial: Record<number, number> = {};
    testimonials.forEach(t => { initial[t.id] = t.helpful; });
    return initial;
  });
  const [helpfulClicked, setHelpfulClicked] = useState<Record<number, boolean>>({});

  // Handle responsive slides to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(4);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, slidesToShow]);

  const totalSlides = Math.ceil(testimonials.length / slidesToShow);
  const maxIndex = totalSlides - 1;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleHelpful = (id: number) => {
    if (!helpfulClicked[id]) {
      setHelpfulCounts(prev => ({ ...prev, [id]: prev[id] + 1 }));
      setHelpfulClicked(prev => ({ ...prev, [id]: true }));
    }
  };

  const getVisibleTestimonials = () => {
    const start = currentIndex * slidesToShow;
    return testimonials.slice(start, start + slidesToShow);
  };

  return (
    <section id="testimonials" className="py-20 md:py-5 px-4 md:px-6 bg-gradient-to-b from-black via-purple-900/5 to-black overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            What Our{" "}
            <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Join 10,000+ happy streamers worldwide
          </p>
        </motion.div>

        {/* Two New Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <StatsOverviewCard />
          <PlatformDistributionCard />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 glass p-2 rounded-full hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 glass p-2 rounded-full hover:bg-white/10 transition-all duration-200 disabled:opacity-50"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>

          {/* Carousel Slides */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <TestimonialCard 
                    key={testimonial.id} 
                    testimonial={testimonial} 
                    index={index}
                    helpfulCount={helpfulCounts[testimonial.id]}
                    isHelpfulClicked={helpfulClicked[testimonial.id]}
                    onHelpful={() => handleHelpful(testimonial.id)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                    : "w-2 h-2 bg-gray-600 rounded-full hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div className="flex text-yellow-400">
              {"★".repeat(5)}
            </div>
            <span className="text-sm text-gray-300">4.8/5 based on 10,000+ reviews</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Updated Testimonial Card Component
const TestimonialCard = ({ 
  testimonial, 
  index, 
  helpfulCount,
  isHelpfulClicked,
  onHelpful
}: { 
  testimonial: typeof testimonials[0]; 
  index: number;
  helpfulCount: number;
  isHelpfulClicked: boolean;
  onHelpful: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="glass-card p-6 flex flex-col h-full hover:scale-105 transition-transform duration-300"
    >
      {/* Avatar and Name */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black" />
        </div>
        <div>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-xs text-gray-400">{testimonial.role}</p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
            }`}
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-gray-300 text-sm leading-relaxed flex-1">
        "{testimonial.content}"
      </p>

      {/* Location, Date and Helpful Button */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-gray-500">{testimonial.location}</span>
          <span className="text-xs text-purple-400">{testimonial.date}</span>
        </div>
        
        {/* Helpful Button */}
        <button
          onClick={onHelpful}
          disabled={isHelpfulClicked}
          className={`flex items-center gap-1 text-xs transition-all duration-200 ${
            isHelpfulClicked 
              ? "text-green-400 cursor-default" 
              : "text-gray-500 hover:text-green-400"
          }`}
        >
          <ThumbsUp className={`w-3.5 h-3.5 ${isHelpfulClicked ? "fill-green-400" : ""}`} />
          <span>Helpful ({helpfulCount})</span>
        </button>
      </div>

      {/* Verified Badge */}
      <div className="absolute top-4 right-4">
        <div className="bg-green-500/10 rounded-full p-1">
          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};