import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface StatusCardProps {
  title: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

export function StatusCard({ 
  title, 
  status, 
  value, 
  subtitle, 
  icon, 
  className,
  children 
}: StatusCardProps) {
  const statusColors = {
    healthy: 'status-healthy',
    warning: 'status-warning', 
    critical: 'status-critical',
    offline: 'status-offline'
  };

  return (
    <Card className={cn(
      "card-glow p-6 relative overflow-hidden",
      status === 'critical' && "pulse-critical",
      className
    )}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-card/50 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-lg bg-primary/10">
                {icon}
              </div>
            )}
            <div>
              <h3 className="font-semibold text-card-foreground">{title}</h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>
          </div>
          <div className={cn("status-indicator", status)} />
        </div>
        
        <div className="space-y-2">
          <div className="text-2xl font-bold text-gradient-primary">
            {value}
          </div>
          {children}
        </div>
      </div>
    </Card>
  );
}