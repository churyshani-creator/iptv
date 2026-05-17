// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Smartphone, MessageCircle, Send } from "lucide-react";

const navLinks = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: 'Installation Guide', href: '#devices' },
  { name: 'Get Started', href: '#installation'},
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin WhatsApp number
  const ADMIN_WHATSAPP = "+447472958379";
  
  // Telegram username
  const TELEGRAM_USERNAME = "nexusstreampro";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Nexus<span className="gradient-text">StreamPro</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Desktop Social Buttons - WhatsApp & Telegram Only */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={openWhatsApp}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </button>
          <button
            onClick={openTelegram}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
          >
            <Send className="w-4 h-4" />
            Telegram
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden glass mt-3 mx-4 rounded-2xl p-4"
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="text-gray-300 hover:text-white py-2 text-left"
              >
                {link.name}
              </button>
            ))}
            <div className="flex gap-3 pt-2 border-t border-white/10">
              <button
                onClick={openWhatsApp}
                className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              <button
                onClick={openTelegram}
                className="flex-1 text-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Telegram
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};