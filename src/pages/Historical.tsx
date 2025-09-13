import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { StatusCard } from "@/components/dashboard/StatusCard";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { parseCSV, formatDate, getLatestValue } from "@/utils/dataUtils";
import { 
  TrendingUp, 
  Server, 
  Database, 
  Bot, 
  Shield, 
  Activity,
  Zap,
  Calendar
} from "lucide-react";

const Historical = () => {
  const [data, setData] = useState<any>({
    apis: [],
    chains: [],
    servers: [],
    databases: [],
    discordBots: [],
    ssl: [],
    alerts: []
  });

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const [
          apiResponse,
          chainResponse,
          serverResponse,
          dbResponse,
          botResponse,
          sslResponse,
          alertResponse
        ] = await Promise.all([
          fetch('/src/data/api_trends_daily.csv'),
          fetch('/src/data/chain_rpc_daily.csv'),
          fetch('/src/data/servers_daily.csv'),
          fetch('/src/data/databases_daily.csv'),
          fetch('/src/data/discord_bots_daily.csv'),
          fetch('/src/data/ssl_tracking_daily.csv'),
          fetch('/src/data/alerts.csv')
        ]);

        const [
          apiText,
          chainText,
          serverText,
          dbText,
          botText,
          sslText,
          alertText
        ] = await Promise.all([
          apiResponse.text(),
          chainResponse.text(),
          serverResponse.text(),
          dbResponse.text(),
          botResponse.text(),
          sslResponse.text(),
          alertResponse.text()
        ]);

        setData({
          apis: parseCSV(apiText),
          chains: parseCSV(chainText),
          servers: parseCSV(serverText),
          databases: parseCSV(dbText),
          discordBots: parseCSV(botText),
          ssl: parseCSV(sslText),
          alerts: parseCSV(alertText)
        });
      } catch (error) {
        console.error('Error loading CSV data:', error);
      }
    };

    loadCSVData();
  }, []);

  // Process data for charts
  const processApiData = () => {
    const salesApi = data.apis.filter((row: any) => row.api === 'Sales API');
    const verificationApi = data.apis.filter((row: any) => row.api === 'Account Verification API');
    
    return {
      salesUptime: salesApi.map((row: any) => ({
        date: formatDate(row.date),
        value: row.uptime_percent
      })),
      salesLatency: salesApi.map((row: any) => ({
        date: formatDate(row.date),
        value: row.latency_ms_avg
      })),
      verificationUptime: verificationApi.map((row: any) => ({
        date: formatDate(row.date),
        value: row.uptime_percent
      })),
      verificationLatency: verificationApi.map((row: any) => ({
        date: formatDate(row.date),
        value: row.latency_ms_avg
      }))
    };
  };

  const processChainData = () => {
    const chains = ['Injective', 'Terra', 'Chihuahua', 'Stargaze'];
    const result: any = {};
    
    chains.forEach(chain => {
      const chainData = data.chains.filter((row: any) => row.chain === chain);
      result[chain] = {
        latency: chainData.map((row: any) => ({
          date: formatDate(row.date),
          value: row.rpc_latency_ms_avg
        })),
        uptime: chainData.map((row: any) => ({
          date: formatDate(row.date),
          value: row.rpc_uptime_percent
        }))
      };
    });
    
    return result;
  };

  const processServerData = () => {
    const servers = ['api-1', 'api-2', 'worker-1'];
    const result: any = {};
    
    servers.forEach(server => {
      const serverData = data.servers.filter((row: any) => row.server === server);
      result[server] = {
        cpu: serverData.map((row: any) => ({
          date: formatDate(row.date),
          value: row.cpu_percent_avg
        })),
        memory: serverData.map((row: any) => ({
          date: formatDate(row.date),
          value: row.memory_percent_avg
        }))
      };
    });
    
    return result;
  };

  const processDatabaseData = () => {
    const primaryDb = data.databases.filter((row: any) => row.database === 'postgres-primary');
    const replicaDb = data.databases.filter((row: any) => row.database === 'postgres-replica');
    
    return {
      primary: {
        latency: primaryDb.map((row: any) => ({
          date: formatDate(row.date),
          value: row.avg_query_latency_ms
        })),
        storage: primaryDb.map((row: any) => ({
          date: formatDate(row.date),
          value: row.storage_used_percent
        }))
      },
      replica: {
        latency: replicaDb.map((row: any) => ({
          date: formatDate(row.date),
          value: row.avg_query_latency_ms
        })),
        storage: replicaDb.map((row: any) => ({
          date: formatDate(row.date),
          value: row.storage_used_percent
        }))
      }
    };
  };

  const processAlerts = () => {
    return data.alerts.map((alert: any) => ({
      id: `alert-${alert.timestamp}`,
      type: alert.severity === 'critical' ? 'critical' : 
            alert.severity === 'warning' ? 'warning' : 'info',
      title: `${alert.source} Alert`,
      description: alert.message,
      timestamp: new Date(alert.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      resolved: false
    }));
  };

  const apiData = processApiData();
  const chainData = processChainData();
  const serverData = processServerData();
  const dbData = processDatabaseData();
  const alerts = processAlerts();

  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* Overview Stats */}
      <section>
        <h2 className="text-xl font-semibold text-card-foreground mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Historical Overview (September 2024)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard
            title="Sales API Avg Uptime"
            status="healthy"
            value={`${data.apis.length ? (data.apis.filter((row: any) => row.api === 'Sales API').reduce((acc: number, row: any) => acc + row.uptime_percent, 0) / data.apis.filter((row: any) => row.api === 'Sales API').length).toFixed(2) : 0}%`}
            subtitle="30-day average"
            icon={<Server className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="Verification API Avg Uptime"
            status="healthy"
            value={`${data.apis.length ? (data.apis.filter((row: any) => row.api === 'Account Verification API').reduce((acc: number, row: any) => acc + row.uptime_percent, 0) / data.apis.filter((row: any) => row.api === 'Account Verification API').length).toFixed(2) : 0}%`}
            subtitle="30-day average"
            icon={<Activity className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="Bot Uptime Average"
            status="healthy"
            value={`${data.discordBots.length ? ((data.discordBots.filter((row: any) => row.status === 'online').length / data.discordBots.length) * 100).toFixed(1) : 0}%`}
            subtitle="All bots combined"
            icon={<Bot className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="SSL Certificates"
            status="warning"
            value={`${data.ssl.length ? getLatestValue(data.ssl, 'days_remaining') : 0} days`}
            subtitle="Until renewal needed"
            icon={<Shield className="h-5 w-5 text-primary" />}
          />
        </div>
      </section>

      {/* Detailed Charts */}
      <Tabs defaultValue="apis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="apis">API Performance</TabsTrigger>
          <TabsTrigger value="chains">Blockchain RPCs</TabsTrigger>
          <TabsTrigger value="servers">Server Health</TabsTrigger>
          <TabsTrigger value="databases">Database Metrics</TabsTrigger>
          <TabsTrigger value="alerts">Alert History</TabsTrigger>
        </TabsList>

        <TabsContent value="apis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricsChart
              title="Sales API Uptime"
              data={apiData.salesUptime}
              color="hsl(var(--status-healthy))"
              type="area"
              formatter={(value) => `${value.toFixed(2)}%`}
            />
            
            <MetricsChart
              title="Sales API Latency"
              data={apiData.salesLatency}
              color="hsl(var(--primary))"
              formatter={(value) => `${value.toFixed(1)}ms`}
            />
            
            <MetricsChart
              title="Verification API Uptime"
              data={apiData.verificationUptime}
              color="hsl(var(--status-healthy))"
              type="area"
              formatter={(value) => `${value.toFixed(2)}%`}
            />
            
            <MetricsChart
              title="Verification API Latency"
              data={apiData.verificationLatency}
              color="hsl(var(--accent))"
              formatter={(value) => `${value.toFixed(1)}ms`}
            />
          </div>
        </TabsContent>

        <TabsContent value="chains" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(chainData).map(([chain, metrics]: [string, any]) => (
              <div key={chain} className="space-y-6">
                <MetricsChart
                  title={`${chain} RPC Latency`}
                  data={metrics.latency}
                  color="hsl(var(--primary))"
                  formatter={(value) => `${value.toFixed(1)}ms`}
                />
                <MetricsChart
                  title={`${chain} RPC Uptime`}
                  data={metrics.uptime}
                  color="hsl(var(--status-healthy))"
                  type="area"
                  formatter={(value) => `${value.toFixed(2)}%`}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="servers" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Object.entries(serverData).map(([server, metrics]: [string, any]) => (
              <div key={server} className="space-y-6">
                <MetricsChart
                  title={`${server} CPU Usage`}
                  data={metrics.cpu}
                  color="hsl(var(--status-warning))"
                  type="area"
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
                <MetricsChart
                  title={`${server} Memory Usage`}
                  data={metrics.memory}
                  color="hsl(var(--accent))"
                  type="area"
                  formatter={(value) => `${value.toFixed(1)}%`}
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="databases" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetricsChart
              title="Primary DB Query Latency"
              data={dbData.primary.latency}
              color="hsl(var(--primary))"
              formatter={(value) => `${value.toFixed(1)}ms`}
            />
            
            <MetricsChart
              title="Replica DB Query Latency"
              data={dbData.replica.latency}
              color="hsl(var(--accent))"
              formatter={(value) => `${value.toFixed(1)}ms`}
            />
            
            <MetricsChart
              title="Primary DB Storage Usage"
              data={dbData.primary.storage}
              color="hsl(var(--status-warning))"
              type="area"
              formatter={(value) => `${value.toFixed(1)}%`}
            />
            
            <MetricsChart
              title="Replica DB Storage Usage"
              data={dbData.replica.storage}
              color="hsl(var(--muted-foreground))"
              type="area"
              formatter={(value) => `${value.toFixed(1)}%`}
            />
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <AlertsPanel alerts={alerts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Historical;