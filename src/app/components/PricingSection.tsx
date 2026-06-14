// components/PricingSection.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, Send, Check, Zap } from "lucide-react";

// Default pricing in GBP
const basePrices = {
  monthly: 45,
  quarterly: 110,
  yearly: 180,
  twoyear: 230,
};

// Fake original prices (higher than actual)
const fakeOriginalPrices = {
  monthly: 90,
  quarterly: 220,
  yearly: 260,
  twoyear: 460,
};

export const PricingSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCountry, setUserCountry] = useState("");

  // Admin WhatsApp number (same as contact section)
  const ADMIN_WHATSAPP = "+447472958379";
  
  // Telegram username
  const TELEGRAM_USERNAME = "nexusstreampro";

  useEffect(() => {
    // Detect user's country for display only
    const detectCountry = async () => {
      try {
        const userLocale = navigator.language;
        const countryCode = userLocale.split('-')[1] || userLocale.split('_')[1];
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        let detectedCountry = countryCode || "";
        
        const timezoneMap: Record<string, string> = {
          "America/New_York": "US",
          "America/Los_Angeles": "US",
          "America/Chicago": "US",
          "Europe/London": "GB",
          "Europe/Paris": "FR",
          "Europe/Berlin": "DE",
          "Europe/Madrid": "ES",
          "Europe/Rome": "IT",
          "Asia/Dubai": "AE",
          "Asia/Riyadh": "SA",
          "Asia/Karachi": "PK",
          "Asia/Dhaka": "BD",
          "Asia/Kolkata": "IN",
          "Asia/Tokyo": "JP",
          "Asia/Shanghai": "CN",
          "Asia/Singapore": "SG",
          "Australia/Sydney": "AU",
          "Africa/Johannesburg": "ZA",
        };
        
        if (timezone && timezoneMap[timezone]) {
          detectedCountry = timezoneMap[timezone];
        }
        
        try {
          const response = await fetch('https://ipapi.co/json/');
          const data = await response.json();
          if (data && data.country_code) {
            detectedCountry = data.country_code;
          }
        } catch (ipError) {
          console.log("IP detection failed, using fallback");
        }
        
        setUserCountry(detectedCountry || "International");
      } catch (error) {
        console.error("Error detecting country:", error);
        setUserCountry("International");
      } finally {
        setIsLoading(false);
      }
    };
    
    detectCountry();
  }, []);

  const formatPrice = (price: number): string => {
    return `£${price.toFixed(2)}`;
  };

  const handleWhatsApp = (planName: string, price: string) => {
    const message = `Hello! I'm interested in the ${planName} plan for ${price}. Please send me the payment details and activation instructions.`;
    const encodedMessage = encodeURIComponent(message);
    // Send to admin WhatsApp number
    window.open(`https://wa.me/${ADMIN_WHATSAPP.replace("+", "")}?text=${encodedMessage}`, "_blank");
  };

  const handleTelegram = (planName: string, price: string) => {
    const message = `Hello! I'm interested in the ${planName} plan for ${price}. Please send me the payment details and activation instructions.`;
    const encodedMessage = encodeURIComponent(message);
    // Open Telegram directly in app with pre-filled message
    window.location.href = `tg://resolve?domain=${TELEGRAM_USERNAME}&text=${encodedMessage}`;
  };

  const getPlans = () => {
    return [
      {
        name: "1 Month",
        price: formatPrice(basePrices.monthly),
        fakePrice: formatPrice(fakeOriginalPrices.monthly),
        period: "month",
        features: ["10,000+ Channels", "4K Streaming", "1 Device At Time", "24/7 Support", "Instant Activation"],
        popular: false,
        savings: `Save ${Math.round(((fakeOriginalPrices.monthly - basePrices.monthly) / fakeOriginalPrices.monthly) * 100)}%`,
      },
      {
        name: "6 Months",
        price: formatPrice(basePrices.quarterly),
        fakePrice: formatPrice(fakeOriginalPrices.quarterly),
        period: "6 months",
        features: ["10,000+ Channels", "4K Streaming", "1 Devices At Time", "24/7 Support", "Instant Activation", "Free Updates"],
        popular: true,
        savings: `Save ${Math.round(((fakeOriginalPrices.quarterly - basePrices.quarterly) / fakeOriginalPrices.quarterly) * 100)}%`,
      },
      {
        name: "1 Year",
        price: formatPrice(basePrices.yearly),
        fakePrice: formatPrice(fakeOriginalPrices.yearly),
        period: "year",
        features: ["10,000+ Channels", "4K Streaming", "1 Devices At Time", "24/7 Priority Support", "Instant Activation", "Free Updates", "Best Value"],
        popular: false,
        savings: `Save ${Math.round(((fakeOriginalPrices.yearly - basePrices.yearly) / fakeOriginalPrices.yearly) * 100)}%`,
      },
      {
        name: "2 Year",
        price: formatPrice(basePrices.twoyear),
        fakePrice: formatPrice(fakeOriginalPrices.twoyear),
        period: "2 years",
        features: ["10,000+ Channels", "4K Streaming", "1 Devices At Time", "24/7 Priority Support", "Instant Activation", "Free Updates", "Ultimate Savings"],
        popular: false,
        savings: `Save ${Math.round(((fakeOriginalPrices.twoyear - basePrices.twoyear) / fakeOriginalPrices.twoyear) * 100)}%`,
      },
    ];
  };

  if (isLoading) {
    return (
      <section id="pricing" className="py-20 md:py-5 px-4 md:px-6 bg-gradient-to-b from-black via-purple-900/10 to-black">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-sm text-gray-300">Loading pricing...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-20 md:py-28 px-4 md:px-6 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
            Pricing Plans
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Simple, Transparent{" "}
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Choose the plan that fits your needs. All plans include instant activation.
          </p>
          
          {/* Currency Display Badge - Always shows GBP */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="glass px-3 py-1 rounded-full text-xs">
              💷 All prices in British Pounds (£ GBP)
            </div>
            {userCountry && (
              <div className="glass px-3 py-1 rounded-full text-xs">
                🌍 {userCountry}
              </div>
            )}
          </div>
        </motion.div>

        {/* All 4 plans in one row on desktop, responsive on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {getPlans().map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`relative glass-card p-5 flex flex-col ${
                plan.popular ? "border-purple-500/50 shadow-xl shadow-purple-500/10" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              {/* Savings Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-red-500/20 backdrop-blur-sm rounded-full px-2 py-0.5">
                  <span className="text-xs font-bold text-red-400">{plan.savings} OFF</span>
                </div>
              </div>

              <div className="text-center mb-5">
                <h3 className="text-lg font-semibold text-white">{plan.name}</h3>
                <div className="mt-3">
                  {/* Fake original price with strikethrough */}
                  <div className="text-xs text-gray-500 line-through mb-1">
                    {plan.fakePrice}
                  </div>
                  <div>
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 text-sm">/{plan.period}</span>
                  </div>
                </div>
              </div>

              <ul className="flex-1 space-y-2 mb-5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-xs text-gray-300">
                    <Check className="w-3 h-3 text-purple-500 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* WhatsApp and Telegram Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => handleWhatsApp(plan.name, plan.price)}
                  className="w-full py-2 rounded-full font-semibold transition-all duration-200 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center gap-2 text-sm"
                >
                  <MessageCircle className="w-3 h-3" />
                  Buy via WhatsApp
                </button>
                <button
                  onClick={() => handleTelegram(plan.name, plan.price)}
                  className="w-full py-2 rounded-full font-semibold transition-all duration-200 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2 text-sm"
                >
                  <Send className="w-3 h-3" />
                  Buy via Telegram
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-xs text-gray-500 mb-3">Secure payments accepted</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Visa", "Mastercard",  "PayPal", "Google Pay"].map((method) => (
              <span key={method} className="glass px-3 py-1 rounded-full text-xs text-gray-400">
                {method}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};