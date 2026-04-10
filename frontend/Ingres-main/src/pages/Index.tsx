import { useState } from "react";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InteractiveMap from "@/components/InteractiveMap";
import ChatBot from "@/components/ChatBot";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import DataPanel from "@/components/DataPanel";
import groundwaterData from '@/DATA/mapDetailsData/groundwater_data.json';
import allDistrictsData from '@/DATA/geoJson/all_districts.json';
import { SelectedRegion, GroundwaterData } from "@/types";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedRegion, setSelectedRegion] = useState<SelectedRegion | null>(null);

  const handleStartExploring = () => {
    setActiveSection("map");
  };

  // For "Ask Questions"
  const handleAskQuestions = () => {
    setActiveSection("chat");
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "overview":
        return <HeroSection onStartExploring={handleStartExploring}  onAskQuestions={handleAskQuestions}/>;
      case "map":
        return (
          <div className="flex h-screen">
            <div className="w-2/3 h-full">
              <InteractiveMap
                view="india"
                onRegionSelect={setSelectedRegion}
                groundwaterData={groundwaterData as GroundwaterData[]}
                allDistrictsData={allDistrictsData as GeoJSON.FeatureCollection}
              />
            </div>
            <div className="w-1/3 bg-gray-100 p-4">
              <DataPanel
                selectedRegion={selectedRegion}
                groundwaterData={groundwaterData as GroundwaterData[]}
              />
            </div>
          </div>
        );
      case "chat":
        return <ChatBot />;
      case "analytics":
        return <AnalyticsDashboard />;
      default:
        return <HeroSection onStartExploring={handleStartExploring} onAskQuestions={handleAskQuestions}/>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      {renderActiveSection()}
    </div>
  );
};

export default Index;
