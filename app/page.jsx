import HeroSection from "../components/hero";
import { statsData, featuresData, howItWorksData, testimonialsData } from "../data/landing";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="mt-40 bg-black text-gray-200">
      <HeroSection />

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-gray-950 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((statsData, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2 drop-shadow-md">
                  {statsData.value}
                </div>
                <div className="text-gray-400 text-sm">{statsData.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Everything you need to manage your finances
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card
                className="p-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800/40 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition"
                key={index}
              >
                <CardContent className="space-y-4 pt-4">
                  <div className="text-cyan-400">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-15 bg-gradient-to-r from-gray-950 via-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-950 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-cyan-500/30">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {step.title}
                </h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800/40 hover:border-cyan-400/50 hover:shadow-md hover:shadow-cyan-500/20 transition"
              >
                <CardContent className="pt-4">
                  <div className="flex items-center mb-4">
                    <div className="ml-4">
                      <div className="font-semibold text-white">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.quote}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Take Control of Your Financial Future
          </h2>
          <p className="text-gray-100/90 mb-8 max-w-2xl mx-auto">
            Streamline expense tracking, optimize budgets, and make
            data-driven decisions with BudgetIQ’s intelligent tools.
          </p>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white text-cyan-700 hover:bg-gray-100 shadow-xl shadow-cyan-500/40"
            >
              Get Started Free →
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}