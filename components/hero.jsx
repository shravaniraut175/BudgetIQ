"use client";

import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  ShieldCheck,
  PieChart,
  Smartphone,
  LineChart,
  Wallet,
  Target,
} from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      icon: <Wallet className="w-8 h-8 text-green-600" />,
      title: "Smart Expense Tracking",
      desc: "Automatically organize and visualize your daily spending.",
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Budget Made Simple",
      desc: "Set goals and track progress without the hassle.",
    },
    {
      icon: <LineChart className="w-8 h-8 text-green-600" />,
      title: "AI-Powered Insights",
      desc: "Get personalized tips to save more and spend wisely.",
    },
    {
      icon: <PieChart className="w-8 h-8 text-green-600" />,
      title: "All Accounts in One Place",
      desc: "Connect and monitor your money seamlessly.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: "Secure & Private",
      desc: "Your data stays safe with enterprise-level protection.",
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Works Anywhere",
      desc: "Access your dashboard on web and mobile anytime.",
    },
  ];

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        {/* Hero Text + CTA */}
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Your Personal Finance Dashboard
          <br />~ Powered by AI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Take control of your money with ease. Whether it’s daily expenses or
          long-term savings, everything you need to manage your money is right
          at your fingertips.
        </p>
        <div className="flex justify-center">
          <Link href="/dashboard">
            <Button className="px-8 mt-6 bg-green-600 hover:bg-green-700" size="lg">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Dashboard Image"
            priority
            width={600}
            height={600}
            className="mt-10 rounded-lg"
          />
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Everything You Need to Manage Your Money
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto bg-green">
            Track spending, set budgets, and gain financial clarity with ease.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
    