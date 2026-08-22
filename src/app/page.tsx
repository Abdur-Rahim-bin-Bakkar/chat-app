import Link from "next/link";
import { MessageSquare, Zap, Shield, Users, ArrowRight } from "lucide-react";
import { Metadata } from "next";
import HomeHero from '@/components/HomeHero';
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

      <HomeHero />

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
