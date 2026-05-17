// components/TrustSignals.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, CreditCard, Clock, Headphones, Zap, Trophy } from "lucide-react";

const trustBadges = [
  { icon: Shield, label: "SSL Secure", description: "256-bit encryption" },
  { icon: CreditCard, label: "Secure Payment", description: "Visa, Mastercard, Crypto" },
  { icon: Clock, label: "24/7 Support", description: "Instant responses" },
  { icon: Zap, label: "Instant Activation", description: "< 2 minutes" },
];

const stats = [
  { value: "15,000+", label: "Happy Customers", suffix: "" },
  { value: "4.8", label: "Trustpilot Rating", suffix: "/5" },
  { value: "99.9", label: "Uptime Guarantee", suffix: "%" },
  { value: "500+", label: "5-Star Reviews", suffix: "" },
];

export const TrustSignals = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-12 px-4 md:px-6 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20">
      <div className="container mx-auto">
        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 glass px-4 py-2 rounded-full"
            >
              <badge.icon className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-sm font-semibold text-white">{badge.label}</p>
                <p className="text-xs text-gray-400">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Counter */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, type: "spring" }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="text-3xl md:text-4xl font-bold gradient-text"
              >
                {stat.value}
                <span className="text-sm text-gray-400">{stat.suffix}</span>
              </motion.div>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Real-time notification banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-300">
              🏆 <span className="text-white font-semibold">Trusted by 10,000+ customers</span> worldwide
            </span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper component for stars
const Star = ({ className }: { className: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);