// components/SocialProofPopups.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ShoppingBag, UserCheck, Star, TrendingUp } from "lucide-react";

interface RecentPurchase {
  id: number;
  name: string;
  plan: string;
  timeAgo: string;
}

interface OnlineUser {
  id: number;
  country: string;
  flag: string;
}

interface UserFeedback {
  id: number;
  name: string;
  rating: number;
  comment: string;
  timeAgo: string;
  avatar: string;
}

// Mock data - in production, this would come from a real-time API/WebSocket
const recentPurchases: RecentPurchase[] = [
  { id: 1, name: "Michael from Texas", plan: "1 Year Plan", timeAgo: "just now" },
  { id: 2, name: "Sarah from UK", plan: "3 Months Plan", timeAgo: "2 min ago" },
  { id: 3, name: "David from Canada", plan: "1 Year Plan", timeAgo: "4 min ago" },
  { id: 4, name: "Emma from Australia", plan: "1 Month Plan", timeAgo: "7 min ago" },
  { id: 5, name: "James from Germany", plan: "1 Year Plan", timeAgo: "9 min ago" },

  { id: 6, name: "Lucas from France", plan: "3 Months Plan", timeAgo: "11 min ago" },
  { id: 7, name: "Noah from Italy", plan: "1 Month Plan", timeAgo: "13 min ago" },
  { id: 8, name: "Ethan from Spain", plan: "1 Year Plan", timeAgo: "15 min ago" },
  { id: 9, name: "Ava from Brazil", plan: "3 Months Plan", timeAgo: "17 min ago" },
  { id: 10, name: "Liam from Mexico", plan: "1 Month Plan", timeAgo: "19 min ago" },

  { id: 11, name: "Mason from USA", plan: "1 Year Plan", timeAgo: "21 min ago" },
  { id: 12, name: "Olivia from USA", plan: "3 Months Plan", timeAgo: "23 min ago" },
  { id: 13, name: "Sophia from UK", plan: "1 Month Plan", timeAgo: "25 min ago" },
  { id: 14, name: "Benjamin from Canada", plan: "1 Year Plan", timeAgo: "27 min ago" },
  { id: 15, name: "Isabella from Australia", plan: "3 Months Plan", timeAgo: "29 min ago" },

  { id: 16, name: "Alexander from Netherlands", plan: "1 Year Plan", timeAgo: "31 min ago" },
  { id: 17, name: "Mia from Sweden", plan: "1 Month Plan", timeAgo: "33 min ago" },
  { id: 18, name: "Daniel from Norway", plan: "3 Months Plan", timeAgo: "35 min ago" },
  { id: 19, name: "Charlotte from Denmark", plan: "1 Year Plan", timeAgo: "37 min ago" },
  { id: 20, name: "Henry from Switzerland", plan: "1 Month Plan", timeAgo: "39 min ago" },

  { id: 21, name: "Jack from Ireland", plan: "3 Months Plan", timeAgo: "41 min ago" },
  { id: 22, name: "Amelia from UAE", plan: "1 Year Plan", timeAgo: "43 min ago" },
  { id: 23, name: "William from Saudi Arabia", plan: "1 Month Plan", timeAgo: "45 min ago" },
  { id: 24, name: "Harper from India", plan: "3 Months Plan", timeAgo: "47 min ago" },
  { id: 25, name: "Evelyn from Pakistan", plan: "1 Year Plan", timeAgo: "49 min ago" },

  { id: 26, name: "Sebastian from Turkey", plan: "1 Month Plan", timeAgo: "51 min ago" },
  { id: 27, name: "Aiden from Egypt", plan: "3 Months Plan", timeAgo: "53 min ago" },
  { id: 28, name: "Scarlett from South Africa", plan: "1 Year Plan", timeAgo: "55 min ago" },
  { id: 29, name: "Matthew from Argentina", plan: "1 Month Plan", timeAgo: "57 min ago" },
  { id: 30, name: "Ella from Chile", plan: "3 Months Plan", timeAgo: "59 min ago" },

  { id: 31, name: "David from Philippines", plan: "1 Year Plan", timeAgo: "1 hour ago" },
  { id: 32, name: "Grace from Malaysia", plan: "1 Month Plan", timeAgo: "1 hour ago" },
  { id: 33, name: "Logan from Indonesia", plan: "3 Months Plan", timeAgo: "1 hour ago" },
  { id: 34, name: "Chloe from Thailand", plan: "1 Year Plan", timeAgo: "1 hour ago" },
  { id: 35, name: "Lucas from Vietnam", plan: "1 Month Plan", timeAgo: "1 hour ago" },

  { id: 36, name: "Anthony from Russia", plan: "3 Months Plan", timeAgo: "1 hour ago" },
  { id: 37, name: "Zoe from Poland", plan: "1 Year Plan", timeAgo: "1 hour ago" },
  { id: 38, name: "Nathan from Portugal", plan: "1 Month Plan", timeAgo: "1 hour ago" },
  { id: 39, name: "Lily from Belgium", plan: "3 Months Plan", timeAgo: "1 hour ago" },
  { id: 40, name: "Andrew from Austria", plan: "1 Year Plan", timeAgo: "1 hour ago" },

  { id: 41, name: "Victoria from Greece", plan: "1 Month Plan", timeAgo: "1 hour ago" },
  { id: 42, name: "Ryan from Finland", plan: "3 Months Plan", timeAgo: "1 hour ago" },
  { id: 43, name: "Madison from Colombia", plan: "1 Year Plan", timeAgo: "1 hour ago" },
  { id: 44, name: "Joseph from Peru", plan: "1 Month Plan", timeAgo: "1 hour ago" },
  { id: 45, name: "Abigail from New Zealand", plan: "3 Months Plan", timeAgo: "1 hour ago" },

  { id: 46, name: "Joshua from Kenya", plan: "1 Year Plan", timeAgo: "1 hour ago" },
  { id: 47, name: "Sofia from Nigeria", plan: "1 Month Plan", timeAgo: "1 hour ago" },
  { id: 48, name: "Andrew from Morocco", plan: "3 Months Plan", timeAgo: "1 hour ago" },
  { id: 49, name: "Layla from Qatar", plan: "1 Year Plan", timeAgo: "1 hour ago" },
  { id: 50, name: "Adam from Singapore", plan: "1 Month Plan", timeAgo: "1 hour ago" }
];

const onlineUsers: OnlineUser[] = [
  { id: 1, country: "USA", flag: "🇺🇸" },
  { id: 2, country: "UK", flag: "🇬🇧" },
  { id: 3, country: "Canada", flag: "🇨🇦" },
  { id: 4, country: "Australia", flag: "🇦🇺" },
  { id: 5, country: "Germany", flag: "🇩🇪" },
  { id: 6, country: "France", flag: "🇫🇷" },
  { id: 7, country: "Spain", flag: "🇪🇸" },
  { id: 8, country: "Italy", flag: "🇮🇹" },
];

const userFeedbacks: UserFeedback[] = [
  {
    id: 1,
    name: "Thomas Anderson",
    rating: 5,
    comment: "Best IPTV service I've ever used! 4K quality is incredible and no buffering at all.",
    timeAgo: "2 minutes ago",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Jessica Parker",
    rating: 5,
    comment: "Finally found a reliable IPTV provider. 10,000+ channels and instant activation!",
    timeAgo: "5 minutes ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Robert Chen",
    rating: 5,
    comment: "Sports streaming is flawless. Watched live matches in 4K without lag.",
    timeAgo: "12 minutes ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    name: "Maria Garcia",
    rating: 4,
    comment: "Great movie selection and fast support team. Very satisfied overall.",
    timeAgo: "18 minutes ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },

  {
    id: 5,
    name: "Daniel Smith",
    rating: 5,
    comment: "Best value for money IPTV service. Works perfectly on Firestick.",
    timeAgo: "25 minutes ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 6,
    name: "Emily Johnson",
    rating: 5,
    comment: "Super smooth streaming experience. Highly recommended!",
    timeAgo: "30 minutes ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 7,
    name: "Michael Brown",
    rating: 5,
    comment: "Works great on Android TV. No buffering even on HD channels.",
    timeAgo: "35 minutes ago",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 8,
    name: "Sophia Wilson",
    rating: 4,
    comment: "Good service with lots of channels. Setup was very easy.",
    timeAgo: "40 minutes ago",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=100&q=80",
  },

  {
    id: 9,
    name: "James Taylor",
    rating: 5,
    comment: "Amazing quality IPTV. Works perfectly on all my devices.",
    timeAgo: "45 minutes ago",
    avatar: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 10,
    name: "Olivia Martinez",
    rating: 5,
    comment: "Best streaming experience ever. No buffering issues at all.",
    timeAgo: "50 minutes ago",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 11,
    name: "William Harris",
    rating: 5,
    comment: "Excellent IPTV service with fast channel switching.",
    timeAgo: "55 minutes ago",
    avatar: "https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 12,
    name: "Isabella Clark",
    rating: 4,
    comment: "Good quality streams and very affordable pricing.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1545996124-0501ebae84d0?auto=format&fit=crop&w=100&q=80",
  },

  {
    id: 13,
    name: "David Lewis",
    rating: 5,
    comment: "Best IPTV for sports lovers. HD quality is perfect.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 14,
    name: "Ava Walker",
    rating: 5,
    comment: "Very stable service. Works great on Smart TV.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 15,
    name: "Benjamin Young",
    rating: 5,
    comment: "Instant activation and smooth playback. Highly satisfied.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 16,
    name: "Mia Hall",
    rating: 4,
    comment: "Good IPTV service with lots of entertainment channels.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
  },

  {
    id: 17,
    name: "Alexander King",
    rating: 5,
    comment: "Streaming is very smooth even on slow internet.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 18,
    name: "Charlotte Scott",
    rating: 5,
    comment: "Best IPTV subscription I’ve tried so far.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 19,
    name: "Henry Adams",
    rating: 5,
    comment: "Works perfectly on Firestick and Android TV.",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 20,
    name: "Evelyn Carter",
    rating: 5,
    comment: "Amazing service with zero buffering. Highly recommended!",
    timeAgo: "1 hour ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  }
];

export const SocialProofPopups = () => {
  const [currentPurchase, setCurrentPurchase] = useState<RecentPurchase | null>(null);
  const [onlineCount, setOnlineCount] = useState(127);
  const [currentFeedback, setCurrentFeedback] = useState<UserFeedback | null>(null);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);

  // Simulate real-time purchase notifications
  useEffect(() => {
    let purchaseIndex = 0;
    let feedbackIndex = 0;

    const purchaseInterval = setInterval(() => {
      setCurrentPurchase(recentPurchases[purchaseIndex % recentPurchases.length]);
      setShowPurchasePopup(true);
      purchaseIndex++;

      // Auto hide after 5 seconds
      setTimeout(() => setShowPurchasePopup(false), 5000);
    }, 15000); // Show every 15 seconds

    const feedbackInterval = setInterval(() => {
      setCurrentFeedback(userFeedbacks[feedbackIndex % userFeedbacks.length]);
      setShowFeedbackPopup(true);
      feedbackIndex++;

      setTimeout(() => setShowFeedbackPopup(false), 6000);
    }, 20000); // Show every 20 seconds

    // Simulate fluctuating online users
    const onlineInterval = setInterval(() => {
      const fluctuation = Math.floor(Math.random() * 15) - 5; // -5 to +10
      setOnlineCount(prev => Math.max(98, Math.min(189, prev + fluctuation)));
    }, 10000);

    return () => {
      clearInterval(purchaseInterval);
      clearInterval(feedbackInterval);
      clearInterval(onlineInterval);
    };
  }, []);

  return (
    <>
      {/* Floating Online Users Counter - Bottom Left */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 left-4 md:left-6 z-50"
      >
        <div className="glass-card px-4 py-2 rounded-full flex items-center gap-2 backdrop-blur-md bg-black/80 border border-green-500/30 shadow-lg shadow-green-500/10">
          <div className="relative">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75" />
          </div>
          <div className="flex -space-x-2 mr-2">
            {onlineUsers.slice(0, 3).map((user) => (
              <div
                key={user.id}
                className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-800 border border-white/20 flex items-center justify-center text-xs"
              >
                {user.flag}
              </div>
            ))}
          </div>
          <div className="text-sm font-medium">
            <span className="text-green-400 font-bold">{onlineCount}</span>
            <span className="text-gray-300"> users online now</span>
          </div>
          <TrendingUp className="w-3 h-3 text-green-400 ml-1" />
        </div>
      </motion.div>

      {/* Recent Purchase Popup - Bottom Left (above online counter) */}
      <AnimatePresence>
        {showPurchasePopup && currentPurchase && (
          <motion.div
            initial={{ x: -100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-24 left-4 md:left-6 z-50 max-w-sm"
          >
            <div className="glass-card p-3 rounded-xl backdrop-blur-md bg-black/90 border border-orange-500/30 shadow-lg shadow-orange-500/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold text-white">
                      🔥 {currentPurchase.name}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300">
                    purchased <span className="text-orange-400 font-medium">{currentPurchase.plan}</span> • {currentPurchase.timeAgo}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-orange-400 font-bold">5 people bought</div>
                  <div className="text-xs text-gray-500">in last 10 min</div>
                </div>
              </div>
              <div className="mt-2 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* User Feedback Popup - Bottom Right */}
      <AnimatePresence>
        {showFeedbackPopup && currentFeedback && (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-4 md:right-6 z-50 max-w-sm"
          >
            <div className="glass-card p-3 rounded-xl backdrop-blur-md bg-black/90 border border-purple-500/30 shadow-lg shadow-purple-500/20">
              <div className="flex items-start gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={currentFeedback.avatar}
                    alt={currentFeedback.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-black" />
                </div> */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{currentFeedback.name}</span>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < currentFeedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                    "{currentFeedback.comment}"
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{currentFeedback.timeAgo}</p>
                </div>
                <div className="flex-shrink-0">
                  <div className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};