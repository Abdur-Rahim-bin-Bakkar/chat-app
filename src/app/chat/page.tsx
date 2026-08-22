"use client";

import { useEffect, useState } from "react";
import { useChatStore } from "@/store/useChatStore";
import LoginScreen from "@/components/LoginScreen";
import Sidebar from "@/components/Sidebar";
import ChatWindow from "@/components/ChatWindow";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const { currentUser, loadConversations } = useChatStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadConversations();
    }
  }, [currentUser, loadConversations]);

  if (!mounted) return null;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-gray-900 font-sans">
      <AnimatePresence mode="wait">
        {!currentUser ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <LoginScreen />
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-full w-full bg-white shadow-2xl"
          >
            <Sidebar />
            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
