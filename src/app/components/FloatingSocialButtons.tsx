// components/FloatingSocialButtons.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, Star, ThumbsUp, X } from "lucide-react";
import { useState } from "react";

// Type for feedback entry
interface FeedbackEntry {
  id: string;
  name: string;
  rating: number;
  comment: string;
  timeAgo: string;
  avatar: string;
}

export const FloatingSocialButtons = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackEntry | null>(null);

  // Admin WhatsApp number
  const ADMIN_WHATSAPP = "+447472958379";
  
  // Telegram username
  const TELEGRAM_USERNAME = "nexusstreampro";

  const openWhatsApp = () => {
    window.open(`https://wa.me/${ADMIN_WHATSAPP.replace("+", "")}`, "_blank");
  };

  const openTelegram = () => {
    window.location.href = `tg://resolve?domain=${TELEGRAM_USERNAME}`;
  };

  // Function to generate random avatar based on name
  const generateAvatar = (name: string) => {
    const colors = ["FF6B6B", "4ECDC4", "45B7D1", "96CEB4", "FFEAA7", "DDA0DD", "98D8C8"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${randomColor}&color=fff&size=40&bold=true`;
  };

  // Function to get time ago string
  const getTimeAgo = () => {
    const now = new Date();
    return `Just now`;
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!comment.trim()) {
      alert("Please enter your feedback");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create feedback object
    const newFeedback: FeedbackEntry = {
      id: Date.now().toString(),
      name: name.trim(),
      rating: rating,
      comment: comment.trim(),
      timeAgo: getTimeAgo(),
      avatar: generateAvatar(name.trim())
    };
    
    // Here you would send to your backend
    console.log("Feedback submitted:", newFeedback);
    
    // Set current feedback and show popup
    setCurrentFeedback(newFeedback);
    setShowFeedbackPopup(true);
    
    setIsSubmitting(false);
    setShowFeedback(false);
    setShowSuccess(true);
    
    // Reset form
    setRating(0);
    setName("");
    setComment("");
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Auto hide feedback popup after 5 seconds
    setTimeout(() => {
      setShowFeedbackPopup(false);
      setCurrentFeedback(null);
    }, 5000);
  };

  return (
    <>
      <div className="fixed right-4 bottom-20 md:bottom-8 md:right-6 z-50 flex flex-col gap-3">
        {/* Feedback/Review Button */}
        <motion.button
          onClick={() => setShowFeedback(true)}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-yellow-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-yellow-500 hover:bg-yellow-600 text-white p-3 md:p-4 rounded-full shadow-xl transition-all duration-200">
            <Star className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Leave a Review
          </div>
        </motion.button>

        {/* WhatsApp Button */}
        <motion.button
          onClick={openWhatsApp}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-green-600 hover:bg-green-700 text-white p-3 md:p-4 rounded-full shadow-xl transition-all duration-200">
            <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            WhatsApp
          </div>
        </motion.button>

        {/* Telegram Button */}
        <motion.button
          onClick={openTelegram}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative bg-blue-500 hover:bg-blue-600 text-white p-3 md:p-4 rounded-full shadow-xl transition-all duration-200">
            <Send className="w-6 h-6 md:w-7 md:h-7" />
          </div>
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Telegram
          </div>
        </motion.button>
      </div>

      {/* Feedback Submission Popup - Shows after submission */}
      <AnimatePresence>
        {showFeedbackPopup && currentFeedback && (
          <motion.div
            initial={{ x: 100, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 100, opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-4 md:right-6 z-50 max-w-sm cursor-pointer"
            onClick={() => {
              setShowFeedbackPopup(false);
              setCurrentFeedback(null);
            }}
          >
            <div className="glass-card p-3 rounded-xl backdrop-blur-md bg-black/90 border border-purple-500/30 shadow-lg shadow-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={currentFeedback.avatar}
                    alt={currentFeedback.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-black" />
                </div>
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

      {/* Feedback Modal */}
      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowFeedback(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="glass-card max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowFeedback(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-6">
                <div className="inline-flex p-3 rounded-full bg-yellow-500/20 mb-3">
                  <ThumbsUp className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Share Your Experience</h3>
                <p className="text-gray-400 text-sm mt-1">Your feedback helps us improve</p>
              </div>

              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                {/* Rating Stars */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Rating
                  </label>
                  <div className="flex gap-2 justify-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoverRating || rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-600"
                          } transition-colors duration-150`}
                        />
                      </button>
                    ))}
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    {rating === 1 && "Poor"}
                    {rating === 2 && "Fair"}
                    {rating === 3 && "Good"}
                    {rating === 4 && "Very Good"}
                    {rating === 5 && "Excellent!"}
                  </p>
                </div>

                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-200"
                    required
                  />
                </div>

                {/* Comment Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your experience with NexusStream..."
                    rows={4}
                    className="w-full px-4 py-2 glass rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none transition-all duration-200"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-xl font-semibold text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <ThumbsUp className="w-4 h-4" />
                      Submit Review
                    </>
                  )}
                </button>
              </form>

              <p className="text-center text-xs text-gray-500 mt-4">
                Your review will help other users make informed decisions
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast Message */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 50, x: -20 }}
            className="fixed bottom-24 left-4 md:left-6 z-50 glass-card p-3 max-w-sm"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Thank You!</p>
                <p className="text-xs text-gray-400">Your review has been submitted successfully!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};