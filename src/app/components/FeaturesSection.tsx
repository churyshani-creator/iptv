// components/FeaturesSection.tsx
"use client";

import { motion } from "framer-motion";
import { FeatureCard } from "./FeatureCard";

const features = [
  {
    title: "10,000+ Channels",
    description: "Access to premium international channels including sports, news, and entertainment.",
    icon: "📺",
  },
  {
    title: "4K / HD Quality",
    description: "Crystal clear streaming with 4K and Full HD options for the best viewing experience.",
    icon: "✨",
  },
  {
    title: "No Buffering",
    description: "Premium servers ensure smooth playback with zero buffering, even during peak hours.",
    icon: "⚡",
  },
  {
    title: "Multi-Device Support",
    description: "Watch on Smart TV, Android, iOS, Firestick, PC, and more. Up to 5 devices simultaneously.",
    icon: "📱",
  },
  {
    title: "Instant Activation",
    description: "Get access immediately after payment. No waiting, no delays.",
    icon: "🚀",
  },
  {
    title: "24/7 Support",
    description: "Dedicated customer support available around the clock to help you.",
    icon: "💬",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-5 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Everything You Need for{" "}
            <span className="gradient-text">Premium Streaming</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Experience television like never before with our cutting-edge IPTV service
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};