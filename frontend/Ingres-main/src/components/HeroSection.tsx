import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Map, MessageCircle, Database, TrendingUp, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-groundwater.jpg";

interface HeroSectionProps {
  onStartExploring: () => void;
  onAskQuestions: () => void;
}

const HeroSection = ({ onStartExploring, onAskQuestions }: HeroSectionProps) => {
  const stats = [
    { label: "States Covered", value: 28, suffix: "+", icon: MapPin },
    { label: "Data Points", value: 50, suffix: "K+", icon: Database },
    { label: "Water Sources", value: 12, suffix: "K+", icon: Droplets },
    { label: "Accuracy Rate", value: 95, suffix: "%", icon: TrendingUp },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000; // total animation time ~2s
      const stepTime = Math.max(20, duration / end);
      const increment = 3;

      const interval = setInterval(() => {
        start += increment;
        if (start >= end) {
          start = end;
          clearInterval(interval);
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[index] = start;
          return newCounts;
        });
      }, stepTime);

      return () => clearInterval(interval);
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with ripple overlays */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Groundwater resources in India"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-depth opacity-70" />
        <div className="absolute inset-0 bg-background/20" />

        {/* Ripple water effect overlays */}
        <div className="ripple-overlay slow" />
        <div className="ripple-overlay fast" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4 bg-secondary/30 backdrop-blur-sm">
            <Droplets className="mr-1 h-3 w-3" />
            India's Premier Groundwater Intelligence Platform
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary-foreground">
            Explore India's{" "}
            <span className="bg-gradient-flow bg-clip-text text-transparent">Groundwater</span>{" "}
            Resources
          </h1>

          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Discover comprehensive groundwater data, interactive visualizations, and AI-powered
            insights for sustainable water resource management across India.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={onStartExploring}
              className="bg-primary hover:bg-primary/90 shadow-water p-7 text-md transform transition-transform duration-300 hover:scale-105"
            >
              <Map className="mr-2 h-5 w-5" />
              Start Exploring Data
            </Button>
            <Button
              size="lg"
              onClick={onAskQuestions}
              variant="outline"
              className="bg-primary-foreground/10 p-7 border-primary-foreground/30 text-primary-foreground text-md hover:bg-primary-foreground/20 backdrop-blur-sm transform transition-transform duration-300 hover:scale-105"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Ask Questions
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-4 bg-card/20 backdrop-blur-sm border-border/30 transform transition-transform duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="pt-1 h-7 w-7 text-accent-foreground animate-bounce" />
                  </div>
                  <div className="text-2xl font-bold text-primary-foreground">
                    {counts[index]}
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </Card>
              );
            })}
          </div>

          <div className="w-full text-center pt-12 text-md text-accent-foreground">
            All content presented on this platform is derived from the official{" "}
            <span className="font-semibold">
              <a
                href="https://ingres.iith.ac.in/home"
                className="text-accent-foreground hover:underline"
              >
                INGRES
              </a>
            </span>{" "}
            dataset.
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

