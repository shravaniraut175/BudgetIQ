"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 200;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative pb-24 px-4 bg-gradient-to-b from-black via-blue-950 to-indigo-950">
      <div className="container mx-auto text-center">
        {/* Title */}
        <h1 className="text-5xl md:text-7xl lg:text-[95px] pb-6 font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(138,43,226,0.6)]">
            Welcome to BudgetIQ
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-300 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            AI Finance Guide
          </span>
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
          BudgetIQ simplifies expense management with{" "}
          <span className="text-violet-300 font-medium">
            AI-powered automation
          </span>{" "}
          and insights, helping you track spending, spot patterns, and make
          smarter financial decisions effortlessly.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center space-x-4 mb-12">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-violet-600 
                         hover:from-violet-500 hover:to-blue-500 shadow-lg shadow-violet-700/50 
                         transition-transform duration-300 hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Hero Image */}
        <div className="hero-image-wrapper relative">
          <div
            ref={imageRef}
            className="hero-image transition-transform duration-700 ease-out"
          >
            <Image
              src="/logo budget.png"
              alt="Dashboard Banner"
              width={800}
              height={200}
              className="rounded-2xl shadow-[0_0_25px_rgba(99,102,241,0.6)] border border-indigo-700/40 mx-auto 
                         hover:scale-[1.02] transition-transform duration-500"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;