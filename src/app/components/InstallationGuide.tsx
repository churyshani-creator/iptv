// components/InstallationGuide.tsx
"use client";

import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Subscribe", description: "Choose your plan and complete the payment & send a screen shot whatsApp or Telegram" },
  { number: "02", title: "Get Credentials", description: "Receive your login details instantly via whatsApp or Telegram" },
  { number: "03", title: "Install App", description: "Download our app on your preferred device" },
  { number: "04", title: "Start Watching", description: "Enter credentials and enjoy unlimited entertainment" },
];

const devices = [
  { name: "Smart TV", icon: "📺" },
  { name: "Android", icon: "🤖" },
  { name: "iPhone", icon: "📱" },
  { name: "Firestick", icon: "🔥" },
  { name: "Windows", icon: "💻" },
  { name: "Mac", icon: "🍎" },
];

export const InstallationGuide = () => {
  return (
    <section id="installation" className="py-20 md:py-5 px-4 md:px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-12 md:mb-16"
        >
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
            Easy Setup
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Get Started in{" "}
            <span className="gradient-text">4 Simple Steps</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 text-center"
            >
              <div className="text-5xl font-bold gradient-text mb-4">{step.number}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-semibold mb-6">Supported Devices</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {devices.map((device) => (
              <div
                key={device.name}
                className="glass px-6 py-3 rounded-full flex items-center gap-2"
              >
                <span className="text-xl">{device.icon}</span>
                <span className="text-gray-300">{device.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};