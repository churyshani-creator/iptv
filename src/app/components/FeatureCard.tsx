// components/FeatureCard.tsx
"use client";

import { motion } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard = ({ feature, index }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="glass-card p-6"
    >
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};