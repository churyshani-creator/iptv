// components/Footer.tsx
"use client";

import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
            <p className="text-gray-400 text-sm">
              Premium IPTV subscription service with 10,000+ channels, 4K quality, and instant activation.
            </p>
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
              <li><a href="https://wa.me/15551234567" target="_blank" className="text-gray-400 hover:text-white transition">WhatsApp Support</a></li>
              <li><a href="https://instagram.com/nexusstream" target="_blank" className="text-gray-400 hover:text-white transition">Instagram</a></li>
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
        </div>
      </div>
    </footer>
  );
};