import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Info, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  resolved?: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
}

export function AlertsPanel({ alerts }: AlertsPanelProps) {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'text-status-critical';
      case 'warning':
        return 'text-status-warning';
      default:
        return 'text-primary';
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case 'critical':
        return 'destructive';
      case 'warning':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Card className="card-glow p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">System Alerts</h3>
        <Badge variant="outline" className="text-xs">
          {alerts.filter(a => !a.resolved).length} Active
        </Badge>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Info className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border transition-colors",
                alert.resolved ? "bg-muted/30 opacity-60" : "bg-card/50 hover:bg-card/70",
                alert.type === 'critical' && !alert.resolved && "border-status-critical/50"
              )}
            >
              <div className={cn("mt-0.5", getAlertColor(alert.type))}>
                {getAlertIcon(alert.type)}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-card-foreground text-sm">
                    {alert.title}
                  </h4>
                  <Badge 
                    variant={getBadgeVariant(alert.type)} 
                    className="text-xs"
                  >
                    {alert.type}
                  </Badge>
                  {alert.resolved && (
                    <Badge variant="outline" className="text-xs text-status-healthy">
                      Resolved
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  {alert.description}
                </p>
                
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.timestamp}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}