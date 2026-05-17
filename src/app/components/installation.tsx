// components/InstallationGuide.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Smartphone, Tv, Monitor, Apple, 
  CheckCircle, Download, 
  Tv2, Globe, MessageCircle, Send, Film, Wifi, Star,
  ChevronRight
} from "lucide-react";

interface Device {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  steps: string[];
  downloadUrl?: string;
  appStoreUrl?: string;
  tips?: string[];
}

const devices: Device[] = [
  {
    id: "firestick",
    name: "Fire TV Stick",
    icon: <Tv className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-600",
    steps: [
      "Go to 'Search' on the Home screen and click on 'Search'",
      "Search for and select 'Downloader' app, then click Download",
      "After installation, click Open, then return to Home screen",
      "Go to Settings → My Fire TV → Developer Options",
      "Click 'Install Unknown Apps' and enable for Downloader",
      "Open Downloader app, click Allow, then OK",
      "Enter URL: https://www.iptvsmarters.com/smarters.apk and click Go",
      "Wait for download, click Install, then Done",
      "Open IPTV Smarters and choose 'Login with Xtream Codes API'",
      "Enter the login details we sent you via WhatsApp or Email"
    ],
    downloadUrl: "https://www.iptvsmarters.com/smarters.apk",
    tips: [
      "Restart your Firestick weekly for optimal performance",
      "Clear cache regularly for smooth streaming",
      "Use a VPN for better privacy"
    ]
  },
  {
    id: "android",
    name: "Android TV",
    icon: <Smartphone className="w-5 h-5" />,
    color: "from-green-500 to-emerald-600",
    steps: [
      "Download IPTV Smarters app from Google Play Store or via APK",
      "Open the app after installation",
      "Select 'Login with Xtream Codes API'",
      "Enter your username, password, and server URL (sent  via whatsApp or Telegram)",
      "Click 'ADD USER' and wait a few seconds",
      "Click on 'Live TV' icon to see available channels",
      "Select the channel group you want to watch",
      "Click on channel name, then double-tap for full-screen mode"
    ],
    downloadUrl: "https://www.iptvsmarters.com/smarters.apk",
    tips: [
      "Use Ethernet connection for best performance",
      "Enable hardware decoding in app settings",
      "Clear cache if buffering occurs"
    ]
  },
  {
    id: "ios",
    name: "Apple / iOS",
    icon: <Apple className="w-5 h-5" />,
    color: "from-gray-600 to-gray-800",
    steps: [
      "Download 'Smarters Player Lite' from Apple App Store",
      "Open the app after installation",
      "Select 'Login with Xtream Codes API'",
      "Enter your username, password, and server URL",
      "Click 'ADD USER' and wait for playlist to load",
      "Click on 'Live TV' icon to see channels",
      "Select channel group and click on any channel",
      "To add EPG, click 'Install EPG' (no URL needed)"
    ],
    appStoreUrl: "https://apps.apple.com/in/app/smarters-player-lite/id1628995509",
    tips: [
      "Use WiFi for HD streaming",
      "Enable background refresh for EPG updates",
      "Use Picture-in-Picture mode for multitasking"
    ]
  },
  {
    id: "smarttv",
    name: "Smart TV",
    icon: <Tv2 className="w-5 h-5" />,
    color: "from-purple-500 to-pink-600",
    steps: [
      "Open LG Content Store or Samsung Smart Hub on your TV",
      "Search for 'SetIPTV', 'NetIPTV', or 'IBO Player Pro'",
      "Download and install the app",
      "Open the app and note your MAC address displayed",
      "Send us the MAC address via WhatsApp or Telegram",
      "Wait 2-3 minutes for activation",
      "Restart your TV and open the app again",
      "Your channels will load automatically!"
    ],
    tips: [
      "MAC activation is instant after we receive it",
      "Update TV firmware if app doesn't appear",
      "Use wired connection for better stability"
    ]
  },
  {
    id: "windows",
    name: "Windows PC",
    icon: <Monitor className="w-5 h-5" />,
    color: "from-blue-600 to-indigo-700",
    steps: [
      "Download IPTV Smarters for Windows from official website",
      "Run the installer and follow setup wizard",
      "Open the app after installation",
      "Select 'Login with Xtream Codes API'",
      "Enter your username, password, and server URL",
      "Click 'Add User' and wait for playlist to load",
      "Click on 'Live TV' to start watching",
      "Use full-screen mode for best experience"
    ],
    downloadUrl: "https://www.iptvsmarters.com/download?download=windows",
    tips: [
      "Use VLC as external player for better codec support",
      "Press F for fullscreen mode",
      "Update graphics drivers for smooth playback"
    ]
  },
  {
    id: "mac",
    name: "MacBook",
    icon: <Apple className="w-5 h-5" />,
    color: "from-gray-700 to-black",
    steps: [
      "Download IPTV Smarters for Mac from official website",
      "Drag the app to Applications folder",
      "Open the app (may need to allow from Security settings)",
      "Select 'Login with Xtream Codes API'",
      "Enter your username, password, and server URL",
      "Click 'Add User' and wait for playlist to sync",
      "Navigate through categories using trackpad",
      "Start streaming in HD/4K quality!"
    ],
    downloadUrl: "https://www.iptvsmarters.com/download?download=mac",
    tips: [
      "IINA player is a great alternative for Mac",
      "Use Safari or Chrome for web player access",
      "Allow app in Privacy settings if blocked"
    ]
  },
  {
    id: "magbox",
    name: "Mag Box",
    icon: <Film className="w-5 h-5" />,
    color: "from-red-500 to-orange-600",
    steps: [
      "Power on your MAG device and go to Settings",
      "Note down the MAC address shown on screen",
      "Send us the MAC address via WhatsApp or Telegram",
      "We will activate your device and send portal URL",
      "Go to Settings → Servers → Portals",
      "Enter the portal URL we sent you",
      "Save settings and restart your MAG box",
      "Your channels will load automatically!"
    ],
    tips: [
      "Make sure your MAG box firmware is updated",
      "Use Ethernet for best streaming quality",
      "Contact support if portal doesn't load"
    ]
  },
  {
    id: "web",
    name: "Web Browser",
    icon: <Globe className="w-5 h-5" />,
    color: "from-red-500 to-orange-600",
    steps: [
      "Open Chrome, Firefox, or Edge browser",
      "Visit our web player URL (sent via whatsApp or Telegram after purchase)",
      "Enter your login credentials (username & password)",
      "Select your preferred channel category",
      "Click on any channel to start streaming",
      "Use the EPG to see program schedule",
      "Enable fullscreen for better viewing",
      "Bookmark the page for quick access!"
    ],
    tips: [
      "Chrome browser provides best performance",
      "Disable extensions for smoother playback",
      "Use incognito mode for privacy",
      "Clear cache regularly"
    ]
  }
];

export const InstallationProcess  = () => {
    const [selectedDeviceId, setSelectedDeviceId] = useState<string>("firestick");

    // Admin WhatsApp number
    const ADMIN_WHATSAPP = "+447472958379";
    
    // Telegram username
    const TELEGRAM_USERNAME = "nexusstreampro";

    const selectedDevice = devices.find(d => d.id === selectedDeviceId);

    const scrollToContact = () => {
      const contactSection = document.querySelector("#contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    const openWhatsApp = () => {
      window.open(`https://wa.me/${ADMIN_WHATSAPP.replace("+", "")}`, "_blank");
    };

    const openTelegram = () => {
      window.location.href = `tg://resolve?domain=${TELEGRAM_USERNAME}`;
    };

  return (
    <section id="devices" className="py-20 md:py-5 px-4 md:px-6 bg-gradient-to-b from-black via-purple-900/5 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
            Installation Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            How to Install{" "}
            <span className="gradient-text">IPTV</span>
          </h2>
          <p className="text-gray-400 mt-4">
            Select your device below to see step-by-step instructions
          </p>
        </motion.div>

        {/* Device Selector - Small Clickable Boxes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-8">
          {devices.map((device) => (
            <motion.button
              key={device.id}
              onClick={() => setSelectedDeviceId(device.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`glass-card p-3 text-center transition-all duration-200 cursor-pointer ${
                selectedDeviceId === device.id
                  ? `bg-gradient-to-r ${device.color} border-transparent shadow-lg shadow-purple-500/20`
                  : "hover:bg-white/5"
              }`}
            >
              <div className={`inline-flex p-2 rounded-lg mb-2 transition-all duration-200 ${
                selectedDeviceId === device.id ? "bg-white/20" : "glass"
              }`}>
                <div className={selectedDeviceId === device.id ? "text-white" : "text-purple-400"}>
                  {device.icon}
                </div>
              </div>
              <p className={`text-xs font-medium ${
                selectedDeviceId === device.id ? "text-white" : "text-gray-300"
              }`}>
                {device.name}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Selected Device Installation Details */}
        <AnimatePresence mode="wait">
          {selectedDevice && (
            <motion.div
              key={selectedDevice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="glass-card p-6 md:p-8"
            >
              {/* Device Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${selectedDevice.color}`}>
                  <div className="text-white">
                    {selectedDevice.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedDevice.name}</h3>
                  <p className="text-sm text-gray-400">Complete Installation Guide</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Steps */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    <span className="text-lg font-semibold text-purple-400">Installation Steps</span>
                  </div>
                  <div className="space-y-3">
                    {selectedDevice.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center mt-0.5">
                          <span className="text-purple-400 text-xs font-bold">{stepIndex + 1}</span>
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column - Tips & Downloads */}
                <div>
                  {/* Pro Tips */}
                  {selectedDevice.tips && selectedDevice.tips.length > 0 && (
                    <div className="mb-6 p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-md font-semibold text-green-400">Pro Tips</span>
                      </div>
                      <div className="space-y-2">
                        {selectedDevice.tips.map((tip, idx) => (
                          <p key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            {tip}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download Buttons */}
                  <div className="space-y-3">
                    <h4 className="text-md font-semibold text-white mb-3">Download Options</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedDevice.downloadUrl && (
                        <a
                          href={selectedDevice.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Download APK
                        </a>
                      )}
                      {selectedDevice.appStoreUrl && (
                        <a
                          href={selectedDevice.appStoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                        >
                          <Apple className="w-4 h-4" />
                          App Store
                        </a>
                      )}
                      <button
                        onClick={scrollToContact}
                        className="inline-flex items-center gap-2 glass hover:bg-white/10 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Need Help?
                      </button>
                    </div>
                  </div>

                  {/* Quick Support Message */}
                  <div className="mt-6 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-xs text-green-400 text-center">
                      💬 Need instant help? Contact us on WhatsApp for 24/7 support
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Rating Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div className="flex text-yellow-400">
              {"★".repeat(5)}
            </div>
            <span className="text-sm text-gray-300">4.8/5 based on 10,000+ reviews</span>
          </div>
        </motion.div>

        {/* Need Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12 pt-8 border-t border-white/10"
        >
          <h3 className="text-lg font-semibold text-white mb-4">
            Still Need Help with Installation?
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full text-sm font-semibold transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support 24/7
            </button>
            <button
              onClick={openTelegram}
              className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-full text-sm font-semibold transition-all"
            >
              <Send className="w-4 h-4" />
              Join Telegram Channel
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};