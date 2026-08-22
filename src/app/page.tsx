import Link from "next/link";
import { MessageSquare, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChatApp | Connect instantly",
  description: "A fast, beautiful, and real-time chat application for modern teams.",
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden selection:bg-blue-200">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-6 lg:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
            <MessageSquare className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">ChatApp</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/chat" className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Login
          </Link>
          <Link
            href="/chat"
            className="rounded-full bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-gray-800 transition-all hover:scale-105 active:scale-95"
          >
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-32 lg:px-12 lg:pt-32">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[1200px] -translate-x-1/2 opacity-30">
          <div className="absolute top-[20%] left-[20%] h-96 w-96 rounded-full bg-blue-400 mix-blend-multiply blur-3xl filter animate-pulse" />
          <div className="absolute top-[20%] right-[20%] h-96 w-96 rounded-full bg-purple-400 mix-blend-multiply blur-3xl filter animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[20%] left-[40%] h-96 w-96 rounded-full bg-pink-400 mix-blend-multiply blur-3xl filter animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-800 mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
            v1.0 is now live
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-7xl mb-8">
            Communication that feels <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">alive.</span>
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
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-gray-900 ring-1 ring-gray-200 shadow-sm hover:bg-gray-50 transition-all w-full sm:w-auto"
            >
              View Documentation
            </a>
          </div>
        </div>

        {/* Feature Demo Mockup */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="rounded-2xl border border-gray-200/50 bg-white/40 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-gray-900/5">
            <div className="rounded-xl border border-gray-100 bg-white overflow-hidden shadow-sm flex h-[500px]">
              {/* Fake Sidebar */}
              <div className="w-64 border-r border-gray-100 bg-gray-50/50 p-4 hidden sm:block">
                <div className="h-4 w-24 rounded bg-gray-200 mb-6"></div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                      <div className="flex-1 space-y-2">
                        <div className="h-3 w-3/4 rounded bg-gray-200"></div>
                        <div className="h-2 w-1/2 rounded bg-gray-100"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Fake Chat */}
              <div className="flex-1 flex flex-col p-6 bg-[#F9FAFB] relative overflow-hidden">
                <div className="h-6 w-32 rounded bg-gray-200 mb-8"></div>
                <div className="flex-1 space-y-6">
                  {/* Left Message */}
                  <div className="flex max-w-[80%] items-end gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 shrink-0"></div>
                    <div className="rounded-2xl rounded-bl-none bg-white border border-gray-100 p-4 shadow-sm text-sm text-gray-600">
                      Hey! Did you check out the new chat interface?
                    </div>
                  </div>
                  {/* Right Message */}
                  <div className="flex max-w-[80%] items-end gap-2 self-end ml-auto">
                    <div className="rounded-2xl rounded-br-none bg-blue-600 p-4 shadow-sm text-sm text-white relative">
                      <div className="absolute -inset-1 bg-blue-600 blur opacity-20 rounded-2xl animate-pulse"></div>
                      Yes! It feels incredibly fast and smooth. ✨
                    </div>
                  </div>
                </div>
                {/* Fake Input */}
                <div className="mt-auto h-14 w-full rounded-full bg-white border border-gray-200 shadow-sm flex items-center px-4">
                  <div className="h-4 w-32 rounded bg-gray-100"></div>
                  <div className="ml-auto h-8 w-8 rounded-full bg-blue-600/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Everything you need</h2>
            <p className="mt-4 text-lg text-gray-600">We stripped away the clutter to focus on what matters most: talking.</p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  name: "Lightning Fast",
                  description: "Built with Next.js and React Server Components to deliver an experience that feels instantaneous.",
                  icon: Zap,
                },
                {
                  name: "Group Conversations",
                  description: "Create groups, add participants, and keep everyone in the loop with real-time updates.",
                  icon: Users,
                },
                {
                  name: "Secure & Private",
                  description: "Your data is handled securely. We only require a phone number and a display name to get started.",
                  icon: Shield,
                },
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col items-center text-center">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                    <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <dt className="text-xl font-semibold leading-7 text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:py-32 lg:px-8">
        <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to jump in?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Experience the seamless chat application built for modern web standards.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/chat"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-all hover:scale-105 active:scale-95"
          >
            Launch Application
          </Link>
        </div>
      </section>
    </div>
  );
}
