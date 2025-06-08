"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Brain, Target } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8">
              <h1 className="text-5xl font-bold tracking-tight">
                Transform Ideas into{" "}
                <span className="text-primary">Measurable Outcomes</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Leverage AI-powered insights to achieve your business goals faster and smarter. 
                Our platform turns your objectives into actionable, measurable outcomes.
              </p>
              <div className="flex gap-4">
                <Button size="lg">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Book a Demo
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Analytics Dashboard"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-8 w-8" />}
              title="AI-Powered Insights"
              description="Leverage advanced AI algorithms to generate actionable insights and recommendations."
            />
            <FeatureCard
              icon={<Target className="h-8 w-8" />}
              title="Goal Tracking"
              description="Set, track, and achieve your business objectives with our intuitive tracking system."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8" />}
              title="Real-time Analytics"
              description="Monitor performance metrics and make data-driven decisions in real-time."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Trusted by Industry Leaders
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <TestimonialCard
              quote="This platform has revolutionized how we track and achieve our business outcomes. The AI insights are game-changing."
              author="Sarah Johnson"
              role="CEO, TechCorp"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop"
            />
            <TestimonialCard
              quote="We've seen a 40% improvement in our goal achievement rate since implementing this solution."
              author="Michael Chen"
              role="COO, InnovateX"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-lg border bg-card">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, role, image }) {
  return (
    <div className="p-6 rounded-lg bg-card">
      <p className="text-lg mb-4">{quote}</p>
      <div className="flex items-center gap-4">
        <Image
          src={image}
          alt={author}
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  );
}