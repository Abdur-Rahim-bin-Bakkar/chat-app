"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useChatStore } from "@/store/useChatStore";
import { Send, Image as ImageIcon, Smile, Users as UsersIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function ChatWindow() {
  const { activeConversation, currentUser, messages, isLoading, sendMessage } = useChatStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // Auto-scroll logic
  const scrollToBottom = (force = false) => {
    if (!isUserScrolling || force) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Run when messages change

  // Reset scroll state when changing conversations
  useEffect(() => {
    setIsUserScrolling(false);
    scrollToBottom(true);
  }, [activeConversation?.id]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    
    // If we are near the bottom (within 50px), consider it not scrolling up
    if (scrollHeight - scrollTop - clientHeight < 50) {
      setIsUserScrolling(false);
    } else {
      setIsUserScrolling(true);
    }
  };

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(inputText.trim());
    setInputText("");
    // After sending, force scroll to bottom
    setIsUserScrolling(false);
    setTimeout(() => scrollToBottom(true), 100);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeConversation) {
    return (
      <div className="flex h-full flex-1 flex-col items-center justify-center bg-gray-50/50">
        <div className="rounded-full bg-blue-100 p-6 mb-4 text-blue-600">
          <Send className="h-10 w-10" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Your Messages</h2>
        <p className="mt-2 text-sm text-gray-500 max-w-sm text-center">
          Select a conversation from the sidebar or start a new one to begin chatting.
        </p>
      </div>
    );
  }

  const title = activeConversation.isGroup 
    ? activeConversation.name 
    : activeConversation.participants.find(p => p.id !== currentUser?.id)?.name;

  return (
    <div className="flex h-full flex-1 flex-col bg-[#F9FAFB] relative">
      {/* Header */}
      <div className="flex items-center border-b border-gray-200 bg-white/80 backdrop-blur-md px-6 py-4 shadow-sm z-10">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-full mr-4", activeConversation.isGroup ? "bg-indigo-100 text-indigo-600" : "bg-blue-100 text-blue-600 font-bold")}>
          {activeConversation.isGroup ? <UsersIcon className="h-5 w-5" /> : title?.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <p className="text-xs text-green-600 font-medium">
            {activeConversation.isGroup 
              ? `${activeConversation.participants.length} participants` 
              : "Online"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 overflow-y-auto p-6 scroll-smooth"
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {isLoading && messages.length === 0 ? (
          <div className="flex h-full items-center justify-center space-x-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-blue-600"></div>
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
            {messages.map((msg, i) => {
              const isMine = msg.senderId === currentUser?.id;
              const sender = activeConversation.participants.find(p => p.id === msg.senderId);
              
              // Group messages logically to show sender name only when needed
              const showSenderInfo = activeConversation.isGroup && !isMine && 
                (i === 0 || messages[i-1].senderId !== msg.senderId);

              return (
                <div key={msg.id} className={cn("flex max-w-[75%]", isMine ? "self-end" : "self-start")}>
                  <div className="flex flex-col">
                    {showSenderInfo && (
                      <span className="text-[11px] font-medium text-gray-500 mb-1 ml-1">{sender?.name}</span>
                    )}
                    <div
                      className={cn(
                        "rounded-2xl px-5 py-3 shadow-sm relative group",
                        isMine 
                          ? "bg-blue-600 text-white rounded-tr-none" 
                          : "bg-white border border-gray-100 text-gray-800 rounded-tl-none"
                      )}
                    >
                      <p className="text-[15px] leading-relaxed break-words">{msg.content}</p>
                      
                      <span className={cn(
                        "text-[10px] mt-1.5 block opacity-70", 
                        isMine ? "text-blue-100 text-right" : "text-gray-400"
                      )}>
                        {format(new Date(msg.timestamp), "HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} className="h-px w-full" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white p-4 pb-6 border-t border-gray-100">
        <div className="mx-auto flex max-w-4xl items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-2 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all shadow-sm">
          <button className="rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
            <Smile className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors">
            <ImageIcon className="h-5 w-5" />
          </button>
          
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="flex-1 bg-transparent px-2 py-2 outline-none text-gray-700"
          />
          
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:shadow-none transition-all"
          >
            <Send className="h-4 w-4 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
