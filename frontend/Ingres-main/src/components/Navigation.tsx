import { Button } from "@/components/ui/button";
import { NavigationMenuItem } from "@radix-ui/react-navigation-menu";
import { Droplets, MessageCircle, Map, BarChart3 } from "lucide-react";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation = ({ activeSection, onSectionChange }: NavigationProps) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Droplets },
    { id: 'map', label: 'Interactive Map', icon: Map },
    { id: 'chat', label: 'Ask Questions', icon: MessageCircle },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <nav className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Droplets className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-ocean bg-clip-text text-transparent">
              AquaIndia
            </span>
          </div>

          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    size="sm"
                    onClick={() => onSectionChange(item.id)}
                    className="flex items-center space-x-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden md:inline">{item.label}</span>
                  </Button>
              );
            })}
            <div className="px-4"></div>
            <Button
              onClick={() => alert("Login clicked!")}
              className="rounded-md border px-8 py-0 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Login
            </Button>
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Navigation;