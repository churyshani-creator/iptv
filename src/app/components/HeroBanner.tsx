// components/HeroBanner.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export const HeroBanner = () => {
  // Admin WhatsApp number (same as contact and pricing sections)
  const ADMIN_WHATSAPP = "+447472958379";

  const scrollToPricing = () => {
    const pricingSection = document.querySelector("#pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${ADMIN_WHATSAPP.replace("+", "")}`, "_blank");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1920&q=80"
          alt="Streaming entertainment on TV"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-20 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1 rounded-full glass text-xs font-medium text-purple-300 mb-6"
          >
            ⚡ Limited Time Offer
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
          >
            Premium Nexus Stream Subscription –{" "}
            <span className="gradient-text">Watch Everything</span> in One Place
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-gray-300 mt-6 max-w-2xl"
          >
            Live TV | Sports | Movies | 4K Streaming | Worldwide • 10,000+ channels
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <button
              onClick={scrollToPricing}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold text-white transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              Buy Now →
            </button>
            <button
              onClick={openWhatsApp}
              className="px-8 py-3 glass hover:bg-white/10 rounded-full font-semibold text-white transition-all duration-200 border border-white/20"
            >
              Chat on WhatsApp
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="flex flex-wrap gap-6 mt-12 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full" />
              Instant Activation
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full" />
              24/7 Support
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-green-500 rounded-full" />
              7-Day Money Back
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-white/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
};