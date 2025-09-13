import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, BarChart3, Calendar } from "lucide-react";
import apelloLogo from "@/assets/apello-logo.png";

interface NavigationProps {
  children: React.ReactNode;
}

export function Navigation({ children }: NavigationProps) {
  const location = useLocation();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const navItems = [
    { to: "/", label: "Real-time Dashboard", icon: Home },
    { to: "/historical", label: "Historical Data", icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <img 
                  src={apelloLogo} 
                  alt="Apello Logo" 
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gradient-primary">
                    Apello Monitoring
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    System Infrastructure Dashboard
                  </p>
                </div>
              </div>
              
              {/* Navigation */}
              <nav className="flex items-center gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.to;
                  
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                        isActive 
                          ? "bg-primary/20 text-primary border border-primary/30" 
                          : "text-muted-foreground hover:text-card-foreground hover:bg-muted/50"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Today</p>
              <p className="font-medium text-card-foreground">{currentDate}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main>
        {children}
      </main>
    </div>
  );
}