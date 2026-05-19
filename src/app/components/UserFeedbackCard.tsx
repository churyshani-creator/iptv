// Additional User Feedback Card Component for Testimonials Section
// components/UserFeedbackCard.tsx
"use client";

import { motion } from "framer-motion";
import { Star, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

interface Feedback {
  id: number;
  name: string;
  avatar: string;
  country: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  verified: boolean;
  plan: string;
}

const recentFeedbacks: Feedback[] = [
  {
    id: 1,
    name: "Marcus Williams",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    country: "United States",
    rating: 5,
    comment: "Absolutely blown away by the quality! 4K streams work perfectly on my Sony TV. No buffering during the Super Bowl!",
    date: "2 hours ago",
    likes: 47,
    verified: true,
    plan: "1 Year Plan",
  },
  {
    id: 2,
    name: "Sophia Laurent",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    country: "France",
    rating: 5,
    comment: "Finally an Nexus Stream that actually works! The EPG is accurate and customer support responded within 2 minutes on WhatsApp.",
    date: "5 hours ago",
    likes: 32,
    verified: true,
    plan: "3 Months Plan",
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    country: "UAE",
    rating: 5,
    comment: "Best decision I made. Thousands of channels including all Arabic content. Instant activation was really instant!",
    date: "1 day ago",
    likes: 89,
    verified: true,
    plan: "1 Year Plan",
  },
  {
    id: 4,
    name: "Emma Thompson",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    country: "UK",
    rating: 4,
    comment: "Very happy with the service. A bit overwhelmed by the channel list but that's a good problem to have!",
    date: "1 day ago",
    likes: 23,
    verified: true,
    plan: "1 Month Plan",
  },
];

export const UserFeedbackCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mt-12"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-purple-400" />
          <h3 className="text-xl font-semibold text-white">Latest User Feedback</h3>
        </div>
        <div className="glass px-3 py-1 rounded-full text-xs text-green-400">
          🟢 15 new reviews today
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentFeedbacks.map((feedback, index) => (
          <motion.div
            key={feedback.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={feedback.avatar}
                  alt={feedback.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {feedback.verified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border border-black">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="font-semibold text-white">{feedback.name}</span>
                    <span className="text-xs text-gray-500 ml-2">{feedback.country}</span>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-sm text-gray-300 leading-relaxed">"{feedback.comment}"</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{feedback.date}</span>
                    <span className="text-xs text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                      {feedback.plan}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span className="text-xs">{feedback.likes}</span>
                    </button>
                    <button className="text-gray-400 hover:text-purple-400 transition">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center mt-6"
      >
        <button className="glass px-6 py-2 rounded-full text-sm text-purple-400 hover:text-white transition-colors">
          Load more reviews → {">"}
        </button>
      </motion.div>
    </motion.div>
  );
};