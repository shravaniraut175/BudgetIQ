import HeroSection from "@/components/hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="mt-40">
      <HeroSection />
      <section className="py-20 px-4 bg-green-100 text-center">
        <h2 className="text-3xl font-bold mb-4 text-green-700">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto bold">
          Join BudgetIQ today and start your journey towards financial clarity
          and freedom.
        </p>
        <Link href="/sign-up" className="mb-4 inline-block">
          <Button
            size="lg"
            className="px-8 bg-green-600 hover:bg-green-700 animate-bounce"
          >
            Start Trial Now
          </Button>
        </Link>
      </section>
    </div>
  );
}
