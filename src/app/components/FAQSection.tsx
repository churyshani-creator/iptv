// components/FAQSection.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What is Nexus Stream and how does it work?",
    answer: "Nexus Stream delivers television content over the internet instead of traditional cable or satellite. With our service, you can stream live TV channels, movies, and shows directly on your device using our app or any compatible Nexus Stream player.",
  },
  {
    question: "Is Nexus Stream legal?",
    answer: "Our service only aggregates publicly available content and channels. We strongly advise our customers to check their local laws regarding streaming content. We do not host any content ourselves - we only provide access to streams.",
  },
  {
    question: "How long does activation take?",
    answer: "Activation is instant! As soon as your payment is confirmed (usually within 1-2 minutes), you'll receive your login credentials  via whatsApp or Telegram. Start watching immediately.",
  },
  {
    question: "What devices are supported?",
    answer: "Our service works on all major platforms: Smart TVs (Samsung, LG, Sony), Android TV, Amazon Firestick, Apple TV, iOS, Android phones/tablets, Windows/Mac computers, and even web browsers.",
  },
  {
    question: "Do you offer a money-back guarantee?",
    answer: "Yes! We offer a 7-day money-back guarantee on all plans. If you're not satisfied with our service, simply contact our support team within 7 days for a full refund.",
  },
  {
    question: "Is there a contract or hidden fees?",
    answer: "No contracts, no hidden fees. You pay exactly what you see. Cancel anytime - there are no long-term commitments.",
  },
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-5 px-4 md:px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-white">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-5 h-5 text-purple-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};