'use client';
import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Simple typing animation component
const TypingBubble: React.FC<{ text: string }> = ({ text }) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{display}</span>;
};

export default function HomeHero() {
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowSecond(true), 2000);
    const timer2 = setTimeout(() => setShowThird(true), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <section className="relative px-6 pt-20 pb-32 lg:px-12 lg:pt-32 overflow-hidden">
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10 flex justify-center items-center pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[800px] w-[1200px] opacity-30">
          <div className="absolute top-[20%] left-[20%] h-96 w-96 rounded-full bg-blue-400 mix-blend-multiply blur-3xl animate-pulse" />
          <div className="absolute top-[20%] right-[20%] h-96 w-96 rounded-full bg-purple-400 mix-blend-multiply blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[20%] left-[40%] h-96 w-96 rounded-full bg-pink-400 mix-blend-multiply blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
        </div>
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-800 mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse" />
          v1.0 is now live
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-8">
          Communication that feels{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            alive.
          </span>
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 sm:text-xl max-w-2xl mx-auto mb-10">
          A beautiful, fast, and completely real-time chat application designed to keep you connected with friends and colleagues without the noise.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/chat"
            className="group flex h-14 items-center justify-center gap-2 rounded-full bg-blue-600 px-8 text-base font-semibold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-500 transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            Start Chatting Free
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-gray-900 ring-1 ring-gray-200 shadow-sm hover:bg-gray-50 transition-all w-full sm:w-auto"
          >
            View Documentation
          </Link>
        </div>
      </div>

      {/* Interactive mock chat */}
      <div className="mx-auto mt-20 max-w-5xl">
        <div className="rounded-2xl border border-gray-200/50 bg-white/40 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-gray-900/5">
          <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm flex h-[500px]">
            {/* Fake Sidebar */}
            <div className="w-64 border-r border-gray-100 bg-gray-50/50 p-4 hidden sm:block">
              <div className="h-4 w-24 rounded bg-gray-200 mb-6" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 w-3/4 rounded bg-gray-200" />
                      <div className="h-2 w-1/2 rounded bg-gray-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Fake Chat */}
            <div className="flex-1 flex flex-col p-6 bg-[#F9FAFB] relative overflow-hidden">
              <div className="h-6 w-32 rounded bg-gray-200 mb-8" />
              <div className="flex-1 space-y-6">
                {/* First message */}
                <div className="flex max-w-[80%] items-end gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 shrink-0" />
                  <div className="rounded-2xl rounded-bl-none bg-white border border-gray-100 p-4 shadow-sm text-sm text-gray-600">
                    Hey! Did you check out the new chat interface?
                  </div>
                </div>
                {/* Second message appears after delay */}
                {showSecond && (
                  <div className="flex max-w-[80%] items-end gap-2 self-end ml-auto">
                    <div className="rounded-2xl rounded-br-none bg-blue-600 p-4 shadow-sm text-sm text-white relative">
                      <div className="absolute -inset-1 bg-blue-600 blur opacity-20 rounded-2xl animate-pulse" />
                      <TypingBubble text="Yes! It feels incredibly fast and smooth. ✨" />
                    </div>
                  </div>
                )}
                {/* Third message appears after another delay */}
                {showThird && (
                  <div className="flex max-w-[80%] items-end gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 shrink-0" />
                    <div className="rounded-2xl rounded-bl-none bg-white border border-gray-100 p-4 shadow-sm text-sm text-gray-600">
                      Want to try it yourself?
                    </div>
                  </div>
                )}
              </div>
              {/* Fake Input */}
              <div className="mt-auto h-14 w-full rounded-full bg-white border border-gray-200 shadow-sm flex items-center px-4">
                <div className="h-4 w-32 rounded bg-gray-100" />
                <div className="ml-auto h-8 w-8 rounded-full bg-blue-600/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
