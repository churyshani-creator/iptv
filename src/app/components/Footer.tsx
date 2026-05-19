// components/Footer.tsx
"use client";

import Link from "next/link";
import { MessageCircle, Send } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Admin WhatsApp number
  const ADMIN_WHATSAPP = "+447472958379";
  
  // Telegram username
  const TELEGRAM_USERNAME = "nexusstreampro";

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${ADMIN_WHATSAPP.replace("+", "")}`, "_blank");
  };

  const openTelegram = () => {
    window.location.href = `tg://resolve?domain=${TELEGRAM_USERNAME}`;
  };

  return (
    <footer className="border-t border-white/10 py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">📺</span>
              </div>
              <span className="text-lg font-bold">NexusStreamPro</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Premium Nexus Stream subscription service with 10,000+ channels, 4K quality, and instant activation.
            </p>
            {/* Social Buttons */}
            <div className="flex gap-3">
              <button
                onClick={openWhatsApp}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={openTelegram}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              >
                <Send className="w-4 h-4" />
                Telegram
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection("#features")} className="text-gray-400 hover:text-white transition">Features</button></li>
              <li><button onClick={() => scrollToSection("#pricing")} className="text-gray-400 hover:text-white transition">Pricing</button></li>
              <li><button onClick={() => scrollToSection("#devices")} className="text-gray-400 hover:text-white transition">Installation Guide</button></li>
              <li><button onClick={() => scrollToSection("#faq")} className="text-gray-400 hover:text-white transition">FAQ</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={openWhatsApp} className="text-gray-400 hover:text-white transition flex items-center gap-2">
                <MessageCircle className="w-3 h-3" /> WhatsApp Support
              </button></li>
              <li><button onClick={openTelegram} className="text-gray-400 hover:text-white transition flex items-center gap-2">
                <Send className="w-3 h-3" /> Telegram Channel
              </button></li>
              <li><button onClick={() => scrollToSection("#contact")} className="text-gray-400 hover:text-white transition">Contact Us</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection("#testimonials")} className="text-gray-400 hover:text-white transition">Testimonials</button></li>
              <li><button onClick={() => scrollToSection("#installation")} className="text-gray-400 hover:text-white transition">Get Started</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} NexusStreamPro. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-3">
            <button onClick={openWhatsApp} className="text-gray-500 hover:text-green-400 transition text-xs">WhatsApp</button>
            <button onClick={openTelegram} className="text-gray-500 hover:text-blue-400 transition text-xs">Telegram</button>
            <button onClick={() => scrollToSection("#contact")} className="text-gray-500 hover:text-white transition text-xs">Contact</button>
          </div>
        </div>
      </div>
    </footer>
  );
};