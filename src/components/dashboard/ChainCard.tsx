import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Activity, Zap, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChainCardProps {
  name: string;
  status: 'healthy' | 'warning' | 'critical' | 'offline';
  latency: number;
  uptime: number;
  rpcEndpoint?: string;
  errorRate?: number;
}

export function ChainCard({ 
  name, 
  status, 
  latency, 
  uptime, 
  rpcEndpoint,
  errorRate = 0
}: ChainCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getLatencyColor = (latency: number) => {
    if (latency < 300) return 'text-status-healthy';
    if (latency < 500) return 'text-status-warning';
    return 'text-status-critical';
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card className="card-glow overflow-hidden">
        <CollapsibleTrigger className="w-full p-4 hover:bg-card/50 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={cn("status-indicator", status)} />
              <div className="text-left">
                <h3 className="font-semibold text-card-foreground">{name}</h3>
                <p className="text-sm text-muted-foreground">
                  {latency}ms • {uptime}% uptime
                </p>
              </div>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 transition-transform text-muted-foreground",
              isOpen && "rotate-180"
            )} />
          </div>
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="px-4 pb-4 border-t border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className={cn("font-semibold", getLatencyColor(latency))}>
                    {latency}ms
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Uptime</p>
                  <p className="font-semibold text-status-healthy">
                    {uptime}%
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Error Rate</p>
                  <p className={cn(
                    "font-semibold",
                    errorRate > 5 ? 'text-status-critical' : 
                    errorRate > 1 ? 'text-status-warning' : 'text-status-healthy'
                  )}>
                    {errorRate}%
                  </p>
                </div>
              </div>
            </div>
            
            {rpcEndpoint && (
              <div className="mt-4 p-2 bg-muted/30 rounded border">
                <p className="text-xs text-muted-foreground">RPC Endpoint</p>
                <p className="text-sm font-mono text-card-foreground">{rpcEndpoint}</p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}