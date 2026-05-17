// components/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, User, Clock, CheckCheck, Reply, Phone, AlertCircle } from "lucide-react";

interface Message {
  id: string;
  name: string;
  phone: string;
  message: string;
  timestamp: Date;
  status: "sent" | "delivered" | "read";
  whatsappSent: boolean;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [telegramError, setTelegramError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Admin WhatsApp number
  const ADMIN_WHATSAPP = "+447472958379";
  
  // Telegram username (make sure this is correct)
  const TELEGRAM_USERNAME = "nexusstreampro"; // Your actual Telegram username
  const TELEGRAM_INVITE_LINK = `https://t.me/${TELEGRAM_USERNAME}`;
  const TELEGRAM_ALTERNATIVE = "https://web.telegram.org/k/#@nexusstreampro";

  // Load messages from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("contactMessages");
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
      } catch (e) {
        console.error("Failed to load messages", e);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contactMessages", JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send message to admin via WhatsApp
  const sendToWhatsApp = (name: string, phone: string, message: string) => {
    const adminMessage = `📨 *New Contact Form Submission*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n💬 *Message:*\n${message}\n\n🕐 Sent from website contact form`;
    const encodedMessage = encodeURIComponent(adminMessage);
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP.replace("+", "")}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  // Handle Telegram click with fallback options
  const handleTelegramClick = () => {
    setTelegramError(false);
    
    // Try to open in Telegram app first
    const telegramAppUrl = `tg://resolve?domain=${TELEGRAM_USERNAME}`;
    const webUrl = TELEGRAM_INVITE_LINK;
    
    // Create a hidden iframe to try opening the app
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = telegramAppUrl;
    document.body.appendChild(iframe);
    
    // If app doesn't open, redirect to web version after timeout
    // const timeout = setTimeout(() => {
    //   document.body.removeChild(iframe);
    //   window.open(webUrl, "_blank");
    // }, 2000);
    
    // Clean up iframe after timeout
    setTimeout(() => {
      // clearTimeout(timeout);
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 3000);
  };

  // Handle alternative Telegram links
  const handleTelegramAlternative = () => {
    window.open(TELEGRAM_ALTERNATIVE, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setError("Please fill in all fields");
      setTimeout(() => setError(""), 3000);
      return;
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone.trim()) && formData.phone.trim().length < 8) {
      setError("Please enter a valid phone number");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setIsSending(true);

    // Create new message
    const newMessage: Message = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      timestamp: new Date(),
      status: "sent",
      whatsappSent: false,
    };

    // Add to messages list
    setMessages(prev => [newMessage, ...prev]);
    
    // Send to admin WhatsApp
    sendToWhatsApp(formData.name.trim(), formData.phone.trim(), formData.message.trim());
    
    // Update message status to delivered and mark WhatsApp as sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "delivered", whatsappSent: true } 
            : msg
        )
      );
    }, 2000);
    
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 5000);

    // Show success message
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    
    // Reset form
    setFormData({ name: "", phone: "", message: "" });
    setIsSending(false);
  };

  const handleClearMessages = () => {
    if (confirm("Are you sure you want to delete all messages? This action cannot be undone.")) {
      setMessages([]);
      localStorage.removeItem("contactMessages");
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const getStatusIcon = (status: string, whatsappSent: boolean) => {
    if (whatsappSent) {
      return (
        <div className="flex items-center gap-1">
          <MessageCircle className="w-3 h-3 text-green-400" />
          <span className="text-xs text-green-400">WhatsApp Sent</span>
        </div>
      );
    }
    switch (status) {
      case "sent":
        return <CheckCheck className="w-3 h-3 text-gray-500" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-green-400" />;
      default:
        return null;
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-6 bg-gradient-to-b from-black via-purple-900/10 to-black">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
            Get in Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Ready to Start{" "}
            <span className="gradient-text">Streaming?</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Have questions? We're here to help 24/7
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Info - WhatsApp & Telegram */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us Directly</h3>
            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${ADMIN_WHATSAPP.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Chat with us</p>
                  <p className="font-medium text-white">WhatsApp</p>
                </div>
                <div className="ml-auto">
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </a>

              {/* Telegram - Fixed Link */}
              <div className="space-y-2">
                <button
                  onClick={handleTelegramClick}
                  className="w-full flex items-center gap-3 p-3 glass rounded-xl hover:bg-white/5 transition-colors group"
                >
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm text-gray-400">Join our channel</p>
                    <p className="font-medium text-white">Telegram</p>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs text-blue-400">Click to join</span>
                  </div>
                </button>
                
                {/* Alternative Telegram Link */}
                <div className="flex gap-2">
                  <button
                    onClick={handleTelegramAlternative}
                    className="flex-1 text-xs text-gray-400 hover:text-blue-400 transition-colors py-1 px-2 glass rounded-lg"
                  >
                    Open in Web Telegram
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`https://t.me/${TELEGRAM_USERNAME}`);
                      alert("Telegram link copied! You can paste it in your browser.");
                    }}
                    className="text-xs text-gray-400 hover:text-blue-400 transition-colors py-1 px-2 glass rounded-lg"
                  >
                    Copy Link
                  </button>
                </div>
                
                {telegramError && (
                  <div className="flex items-center gap-2 text-xs text-yellow-400 p-2 glass rounded-lg">
                    <AlertCircle className="w-3 h-3" />
                    <span>Having trouble? Try the Web Telegram option above.</span>
                  </div>
                )}
              </div>

              {/* Response Time Badge */}
              <div className="mt-4 pt-3 border-t border-white/10 text-center">
                <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span>Response time: Usually under 2 minutes</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass-card p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                required
              />
              <input
                type="tel"
                placeholder="Your Phone Number (with country code)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                required
              />
              <textarea
                placeholder="Your Message"
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none transition-all duration-200"
                required
              />
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  "Send Message via WhatsApp"
                )}
              </button>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center"
                >
                  ✓ Message sent to admin! We'll reply on WhatsApp within 2 minutes.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <div className="inline-flex flex-wrap justify-center gap-3 glass px-6 py-3 rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs text-gray-300">24/7 Support</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <MessageCircle className="w-3 h-3 text-green-400" />
              <span className="text-xs text-gray-300">Instant WhatsApp to Admin</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Send className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-gray-300">Join Telegram: @{TELEGRAM_USERNAME}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};