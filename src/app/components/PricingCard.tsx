// components/PricingCard.tsx
"use client";

import { motion } from "framer-motion";

interface Plan {
  name: string;
  price: string;
  originalPrice?: string;
  period: string;
  features: string[];
  popular: boolean;
  buttonText: string;
  savings?: string;
}

interface PricingCardProps {
  plan: Plan;
  index: number;
  onSelect: () => void;
  currencyCode?: string;
}

export const PricingCard = ({ plan, index, onSelect, currencyCode }: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`relative glass-card p-6 flex flex-col ${
        plan.popular ? "border-purple-500/50 shadow-xl shadow-purple-500/10" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white">{plan.name}</h3>
        <div className="mt-4">
          <span className="text-4xl font-bold text-white">{plan.price}</span>
          <span className="text-gray-400">/{plan.period}</span>
          {plan.originalPrice && (
            <div className="text-xs text-gray-500 line-through mt-1">
              {plan.originalPrice} USD
            </div>
          )}
        </div>
        {plan.savings && (
          <div className="mt-2">
            <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
              🎉 {plan.savings}
            </span>
          </div>
        )}
      </div>

      <ul className="flex-1 space-y-3 mb-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4 text-purple-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        className={`w-full py-3 rounded-full font-semibold transition-all duration-200 ${
          plan.popular
            ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25"
            : "glass hover:bg-white/10 text-white"
        }`}
      >
        {plan.buttonText}
      </button>
      
      {/* Local payment notice */}
      {currencyCode && currencyCode !== "USD" && (
        <p className="text-center text-xs text-gray-500 mt-3">
          💳 Pay in {currencyCode} • No hidden fees
        </p>
      )}
    </motion.div>
  );
};