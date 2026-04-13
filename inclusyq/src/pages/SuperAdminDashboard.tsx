import React from 'react';
import { 
  Hospital as HospitalIcon, 
  Activity, 
  Users, 
  Clock, 
  AlertTriangle, 
  Cpu,
  Plus,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { mockHospitals } from '@/lib/mock-data';

const flowData = [
  { name: 'Mon', patients: 4000 },
  { name: 'Tue', patients: 3000 },
  { name: 'Wed', patients: 2000 },
  { name: 'Thu', patients: 2780 },
  { name: 'Fri', patients: 1890 },
  { name: 'Sat', patients: 2390 },
  { name: 'Sun', patients: 3490 },
];

const performanceData = [
  { name: 'City Gen', wait: 15 },
  { name: 'St. Mary', wait: 45 },
  { name: 'Westside', wait: 80 },
  { name: 'Eastside', wait: 10 },
];

const COLORS = ['#0d9488', '#0891b2', '#0284c7', '#2563eb'];

export function SuperAdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Overview</h1>
          <p className="text-slate-500">Monitoring 24 hospitals across the network</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Download Report</Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Hospital
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard 
          title="Total Hospitals" 
          value="24" 
          trend="+2" 
          trendType="up" 
          icon={HospitalIcon} 
        />
        <KPICard 
          title="Active Queues" 
          value="156" 
          trend="+12" 
          trendType="up" 
          icon={Activity} 
        />
        <KPICard 
          title="Patients Served" 
          value="12.4k" 
          trend="+15%" 
          trendType="up" 
          icon={Users} 
        />
        <KPICard 
          title="Avg Wait Time" 
          value="24m" 
          trend="-4m" 
          trendType="down" 
          icon={Clock} 
        />
        <KPICard 
          title="Delayed Queues" 
          value="8" 
          trend="+2" 
          trendType="up" 
          icon={AlertTriangle} 
          variant="warning"
        />
        <KPICard 
          title="Active Tokens" 
          value="842" 
          trend="+45" 
          trendType="up" 
          icon={Cpu} 
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Daily Patient Flow</CardTitle>
            <CardDescription>Total patients served across all hospitals this week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={flowData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Line 
                  type="monotone" 
                  dataKey="patients" 
                  stroke="var(--color-primary)" 
                  strokeWidth={3} 
                  dot={{r: 4, fill: 'var(--color-primary)', strokeWidth: 2, stroke: '#fff'}} 
                  activeDot={{r: 6}}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Wait Time by Hospital</CardTitle>
            <CardDescription>Average waiting time (minutes) per facility</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="wait" radius={[4, 4, 0, 0]}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Hospital List Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Hospital Performance</CardTitle>
            <CardDescription>Real-time operational status of connected facilities</CardDescription>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hospital Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Active Queues</TableHead>
                <TableHead>Avg Wait</TableHead>
                <TableHead>Occupancy</TableHead>
                <TableHead>Alerts</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockHospitals.map((hospital) => (
                <TableRow key={hospital.id}>
                  <TableCell className="font-medium">
                    <div>
                      <p>{hospital.name}</p>
                      <p className="text-xs text-slate-500">{hospital.location}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={hospital.status} />
                  </TableCell>
                  <TableCell>{hospital.activeQueues}</TableCell>
                  <TableCell>{hospital.avgWaitTime}m</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden w-24">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            hospital.occupancy > 90 ? "bg-destructive" : hospital.occupancy > 70 ? "bg-warning" : "bg-success"
                          )}
                          style={{ width: `${hospital.occupancy}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600">{hospital.occupancy}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {hospital.alerts > 0 ? (
                      <Badge variant="destructive" className="rounded-full h-5 px-2">
                        {hospital.alerts}
                      </Badge>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

function KPICard({ title, value, trend, trendType, icon: Icon, variant = 'default' }: any) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={cn(
            "p-2 rounded-lg",
            variant === 'warning' ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary"
          )}>
            <Icon className="w-5 h-5" />
          </div>
          <div className={cn(
            "flex items-center text-xs font-medium",
            trendType === 'up' ? "text-success" : "text-destructive"
          )}>
            {trendType === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const variants: any = {
    ACTIVE: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
    BUSY: { label: 'Busy', className: 'bg-warning/10 text-warning border-warning/20' },
    CRITICAL: { label: 'Critical', className: 'bg-destructive/10 text-destructive border-destructive/20' },
    INACTIVE: { label: 'Inactive', className: 'bg-slate-100 text-slate-500 border-slate-200' },
  };
  
  const { label, className } = variants[status] || variants.INACTIVE;
  
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium", className)}>
      {label}
    </Badge>
  );
}
