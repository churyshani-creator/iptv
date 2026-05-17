// components/LiveActivityFeed.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, UserPlus, Award, ThumbsUp, MessageCircle } from "lucide-react";

interface Activity {
  id: number;
  type: "purchase" | "review" | "join" | "rating";
  user: string;
  action: string;
  detail: string;
  timeAgo: string;
  timestamp: number;
}

// Mock live activity feed
const generateActivity = (): Activity => {
  const types: Activity["type"][] = ["purchase", "review", "join", "rating"];
  const type = types[Math.floor(Math.random() * types.length)];
  const users = [
    "Alex", "Maria", "John", "Sophie", "Carlos", "Emma", "Liam", "Olivia",
    "Noah", "Ava", "Ethan", "Isabella", "Mason", "Mia", "Lucas", "Amelia",
    "Elijah", "Harper", "Oliver", "Evelyn", "James", "Abigail", "Benjamin", "Emily",
    "Jacob", "Elizabeth", "Michael", "Sofia", "Daniel", "Avery", "Henry", "Ella"
  ];
  const user = users[Math.floor(Math.random() * users.length)];
  
  const activities = {
    purchase: { action: "bought", detail: "1 Year Plan" },
    review: { action: "left a review", detail: "⭐⭐⭐⭐⭐ Amazing service!" },
    join: { action: "joined", detail: "NexusStreamPro family" },
    rating: { action: "rated", detail: "5 stars on Trustpilot" },
  };
  
  return {
    id: Date.now(),
    type,
    user,
    action: activities[type].action,
    detail: activities[type].detail,
    timeAgo: "just now",
    timestamp: Date.now(),
  };
};

export const LiveActivityFeed = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Add initial activities
    const initialActivities: Activity[] = [
      {
        id: 1,
        type: "purchase",
        user: "Michael",
        action: "bought",
        detail: "1 Year Plan",
        timeAgo: "2 min ago",
        timestamp: Date.now() - 120000,
      },
      {
        id: 2,
        type: "review",
        user: "Sarah",
        action: "left a review",
        detail: "⭐⭐⭐⭐⭐ Best IPTV!",
        timeAgo: "5 min ago",
        timestamp: Date.now() - 300000,
      },
      {
        id: 3,
        type: "join",
        user: "David",
        action: "joined",
        detail: "NexusStreamPro family",
        timeAgo: "8 min ago",
        timestamp: Date.now() - 480000,
      },
    ];
    setActivities(initialActivities);

    // Add new activity every 15-30 seconds
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev].slice(0, 8));
      
      // Update timeAgo for existing activities
      setActivities(prev =>
        prev.map(activity => ({
          ...activity,
          timeAgo: getTimeAgo(activity.timestamp),
        }))
      );
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp: number): string => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return "just now";
    if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
    return `${Math.floor(seconds / 3600)} hours ago`;
  };

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "purchase":
        return <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center"><UserPlus className="w-3 h-3 text-green-400" /></div>;
      case "review":
        return <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center"><MessageCircle className="w-3 h-3 text-yellow-400" /></div>;
      case "join":
        return <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center"><Users className="w-3 h-3 text-blue-400" /></div>;
      case "rating":
        return <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center"><Award className="w-3 h-3 text-purple-400" /></div>;
    }
  };

  return (
    <div className={`fixed right-4 top-24 z-40 transition-all duration-300 ${isExpanded ? "w-80" : "w-auto"}`}>
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass-card p-2 rounded-full flex items-center gap-2 backdrop-blur-md bg-black/80 border border-purple-500/30"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative">
          <Users className="w-5 h-5 text-purple-400" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>
        {!isExpanded && (
          <span className="text-xs font-medium text-white pr-2">Live</span>
        )}
      </motion.button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="mt-2 glass-card rounded-xl overflow-hidden backdrop-blur-md bg-black/90 border border-purple-500/30"
          >
            <div className="p-3 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                  <span className="text-sm font-semibold text-white">Live Activity Feed</span>
                </div>
                <span className="text-xs text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
                  {activities.length} updates
                </span>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {activities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start gap-2">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-200">
                        <span className="font-semibold text-white">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="text-purple-400">{activity.detail}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">{activity.timeAgo}</p>
                    </div>
                    <ThumbsUp className="w-3 h-3 text-gray-500" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="p-2 text-center border-t border-white/10">
              <p className="text-xs text-gray-500">🔥 High demand - Join {Math.floor(Math.random() * 50) + 200}+ others</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};