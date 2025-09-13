import { StatusCard } from "@/components/dashboard/StatusCard";
import { ChainCard } from "@/components/dashboard/ChainCard";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import { 
  Server, 
  Activity, 
  Bot, 
  Shield, 
  Database, 
  Cpu, 
  HardDrive,
  BarChart3,
  TrendingUp,
  Users
} from "lucide-react";
import { 
  systemStatus, 
  chainData, 
  infrastructureData, 
  chartData, 
  alertsData 
} from "@/data/mockData";

const Index = () => {
  return (
    <div className="container mx-auto px-6 py-8 space-y-8">
      {/* System Status Overview */}
      <section>
        <h2 className="text-xl font-semibold text-card-foreground mb-6">
          System Status Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatusCard
            title="Sales API"
            status={systemStatus.salesApi.status}
            value={`${systemStatus.salesApi.uptime}%`}
            subtitle={`${systemStatus.salesApi.latency}ms avg`}
            icon={<Server className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="Verification API"
            status={systemStatus.verificationApi.status}
            value={`${systemStatus.verificationApi.uptime}%`}
            subtitle={`${systemStatus.verificationApi.latency}ms avg`}
            icon={<Activity className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="Discord Bots"
            status={systemStatus.discordBots.status}
            value={`${systemStatus.discordBots.online}/${systemStatus.discordBots.total}`}
            subtitle={`${systemStatus.discordBots.averageLatency}ms response`}
            icon={<Bot className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="SSL Certificates"
            status={systemStatus.sslCertificates.status}
            value={`${systemStatus.sslCertificates.daysRemaining} days`}
            subtitle="Until renewal required"
            icon={<Shield className="h-5 w-5 text-primary" />}
          />
        </div>
      </section>

      {/* Chain Monitoring */}
      <section>
        <h2 className="text-xl font-semibold text-card-foreground mb-6">
          Blockchain Network Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chainData.map((chain) => (
            <ChainCard
              key={chain.name}
              name={chain.name}
              status={chain.status}
              latency={chain.latency}
              uptime={chain.uptime}
              rpcEndpoint={chain.rpcEndpoint}
              errorRate={chain.errorRate}
            />
          ))}
        </div>
      </section>

      {/* Infrastructure Monitoring */}
      <section>
        <h2 className="text-xl font-semibold text-card-foreground mb-6">
          Infrastructure Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {infrastructureData.servers.map((server, index) => (
            <StatusCard
              key={server.name}
              title={server.name}
              status={server.status}
              value={`${server.cpu}%`}
              subtitle={`${server.memory}% RAM • ${server.uptime}d uptime`}
              icon={<Cpu className="h-5 w-5 text-primary" />}
            />
          ))}
          
          <StatusCard
            title="Database"
            status={infrastructureData.database.status}
            value={`${infrastructureData.database.queryLatency}ms`}
            subtitle={`${infrastructureData.database.storageUsage}% storage used`}
            icon={<Database className="h-5 w-5 text-primary" />}
          />
        </div>
      </section>

      {/* Historical Trends */}
      <section>
        <h2 className="text-xl font-semibold text-card-foreground mb-6">
          Performance Trends
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetricsChart
            title="API Uptime Percentage"
            data={chartData.apiUptime}
            color="hsl(var(--status-healthy))"
            type="area"
            formatter={(value) => `${value}%`}
          />
          
          <MetricsChart
            title="Average RPC Latency"
            data={chartData.rpcLatency}
            color="hsl(var(--primary))"
            formatter={(value) => `${value}ms`}
          />
          
          <MetricsChart
            title="Server CPU Usage"
            data={chartData.serverCpu}
            color="hsl(var(--status-warning))"
            type="area"
            formatter={(value) => `${value}%`}
          />
          
          <MetricsChart
            title="Database Query Performance"
            data={chartData.dbPerformance}
            color="hsl(var(--accent))"
            formatter={(value) => `${value}ms`}
          />
        </div>
      </section>

      {/* Additional Metrics */}
      <section>
        <h2 className="text-xl font-semibold text-card-foreground mb-6">
          Additional Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatusCard
            title="API Request Volume"
            status="healthy"
            value="2.4M"
            subtitle="Requests today • 98.2% success rate"
            icon={<BarChart3 className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="Webhook Delivery"
            status="healthy"
            value="99.1%"
            subtitle="Success rate • 1,247 delivered"
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
          
          <StatusCard
            title="Discord Verifications"
            status="healthy"
            value="342"
            subtitle="Verifications today"
            icon={<Users className="h-5 w-5 text-primary" />}
          />
        </div>
      </section>

      {/* Alerts Panel */}
      <section>
        <AlertsPanel alerts={alertsData} />
      </section>
    </div>
  );
};

export default Index;