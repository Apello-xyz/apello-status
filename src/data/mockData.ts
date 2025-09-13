// Mock data for the Apello monitoring dashboard
export const systemStatus = {
  salesApi: {
    status: 'healthy' as const,
    uptime: 99.8,
    latency: 145,
    errorRate: 0.2
  },
  verificationApi: {
    status: 'healthy' as const,
    uptime: 99.5,
    latency: 198,
    errorRate: 0.5
  },
  discordBots: {
    status: 'healthy' as const,
    online: 3,
    total: 3,
    averageLatency: 89
  },
  sslCertificates: {
    status: 'warning' as const,
    daysRemaining: 45,
    domains: ['apello.org', 'api.apello.xyz', 'bot.apello.xyz']
  }
};

export const chainData = [
  {
    name: 'Injective',
    status: 'healthy' as const,
    latency: 210,
    uptime: 99.7,
    rpcEndpoint: 'https://rpc.injective.network',
    errorRate: 0.3
  },
  {
    name: 'Stargaze',
    status: 'healthy' as const,
    latency: 180,
    uptime: 99.9,
    rpcEndpoint: 'https://rpc.stargaze-apis.com',
    errorRate: 0.1
  },
  {
    name: 'Passage',
    status: 'healthy' as const,
    latency: 165,
    uptime: 99.6,
    rpcEndpoint: 'https://rpc.passage.io',
    errorRate: 0.4
  },
  {
    name: 'Juno',
    status: 'healthy' as const,
    latency: 195,
    uptime: 99.8,
    rpcEndpoint: 'https://rpc.juno.network',
    errorRate: 0.2
  },
  {
    name: 'Teritori',
    status: 'warning' as const,
    latency: 420,
    uptime: 98.9,
    rpcEndpoint: 'https://rpc.teritori.com',
    errorRate: 1.1
  },
  {
    name: 'Archway',
    status: 'healthy' as const,
    latency: 220,
    uptime: 99.4,
    rpcEndpoint: 'https://rpc.archway.io',
    errorRate: 0.6
  },
  {
    name: 'OmniFlix',
    status: 'healthy' as const,
    latency: 240,
    uptime: 99.2,
    rpcEndpoint: 'https://rpc.omniflix.network',
    errorRate: 0.8
  },
  {
    name: 'Terra',
    status: 'warning' as const,
    latency: 550,
    uptime: 98.5,
    rpcEndpoint: 'https://rpc.terra.dev',
    errorRate: 1.5
  },
  {
    name: 'Chihuahua',
    status: 'critical' as const,
    latency: 430,
    uptime: 97.9,
    rpcEndpoint: 'https://rpc.chihuahua.wtf',
    errorRate: 2.1
  },
  {
    name: 'Forma (EVM)',
    status: 'healthy' as const,
    latency: 125,
    uptime: 99.9,
    rpcEndpoint: 'https://rpc.forma.art',
    errorRate: 0.1
  }
];

export const infrastructureData = {
  servers: [
    {
      name: 'API Server 1',
      cpu: 35,
      memory: 62,
      uptime: 14,
      status: 'healthy' as const
    },
    {
      name: 'API Server 2',
      cpu: 28,
      memory: 58,
      uptime: 14,
      status: 'healthy' as const
    },
    {
      name: 'Bot Server',
      cpu: 15,
      memory: 34,
      uptime: 7,
      status: 'healthy' as const
    }
  ],
  database: {
    status: 'healthy' as const,
    queryLatency: 120,
    storageUsage: 67,
    connections: 45
  }
};

// Generate sample data for charts (Sept 1-13)
const generateChartData = (baseValue: number, variance: number, suffix = '') => {
  const data = [];
  const startDate = new Date('2024-09-01');
  
  for (let i = 0; i < 13; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    const randomVariance = (Math.random() - 0.5) * variance;
    const value = Math.max(0, baseValue + randomVariance);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: parseFloat(value.toFixed(2))
    });
  }
  
  return data;
};

export const chartData = {
  apiUptime: generateChartData(99.5, 1),
  rpcLatency: generateChartData(280, 100),
  serverCpu: generateChartData(32, 15),
  serverMemory: generateChartData(58, 12),
  dbPerformance: generateChartData(125, 30)
};

export const alertsData = [
  {
    id: '1',
    type: 'warning' as const,
    title: 'Terra RPC High Latency',
    description: 'Average response time exceeded 500ms threshold',
    timestamp: '10:24 UTC',
    resolved: false
  },
  {
    id: '2',
    type: 'critical' as const,
    title: 'Chihuahua RPC Connection Issues',
    description: 'Multiple connection timeouts detected',
    timestamp: '09:15 UTC',
    resolved: false
  },
  {
    id: '3',
    type: 'info' as const,
    title: 'SSL Certificate Renewal Reminder',
    description: 'Certificate for apello.org expires in 45 days',
    timestamp: '08:00 UTC',
    resolved: false
  },
  {
    id: '4',
    type: 'warning' as const,
    title: 'API Rate Limit Approaching',
    description: 'Sales API approaching 80% of rate limit',
    timestamp: 'Yesterday 22:30 UTC',
    resolved: true
  }
];