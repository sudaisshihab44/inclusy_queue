import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  Calendar, 
  Download, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const waitTimeTrends = [
  { day: 'Mon', time: 15 },
  { day: 'Tue', time: 18 },
  { day: 'Wed', time: 25 },
  { day: 'Thu', time: 22 },
  { day: 'Fri', time: 30 },
  { day: 'Sat', time: 12 },
  { day: 'Sun', time: 10 },
];

const peakHourData = [
  { hour: '8am', count: 20 },
  { hour: '10am', count: 65 },
  { hour: '12pm', count: 45 },
  { hour: '2pm', count: 55 },
  { hour: '4pm', count: 80 },
  { hour: '6pm', count: 30 },
];

const satisfactionData = [
  { name: 'Very Satisfied', value: 65 },
  { name: 'Satisfied', value: 20 },
  { name: 'Neutral', value: 10 },
  { name: 'Unsatisfied', value: 5 },
];

const COLORS = ['#0d9488', '#0891b2', '#0284c7', '#2563eb'];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Operational Analytics</h1>
          <p className="text-slate-500">Performance insights and patient satisfaction</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Calendar className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Avg Waiting Time" 
          value="22.4m" 
          trend="-12%" 
          trendType="down" 
          icon={Clock} 
        />
        <MetricCard 
          title="Patient Satisfaction" 
          value="4.8/5" 
          trend="+0.2" 
          trendType="up" 
          icon={CheckCircle2} 
        />
        <MetricCard 
          title="No-show Rate" 
          value="4.2%" 
          trend="-1.5%" 
          trendType="down" 
          icon={AlertCircle} 
        />
        <MetricCard 
          title="Queue Completion" 
          value="98.5%" 
          trend="+2.1%" 
          trendType="up" 
          icon={TrendingUp} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Waiting Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Waiting Time Trends</CardTitle>
            <CardDescription>Average patient wait time across the week</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waitTimeTrends}>
                <defs>
                  <linearGradient id="colorWait" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="time" 
                  stroke="var(--color-primary)" 
                  fillOpacity={1} 
                  fill="url(#colorWait)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peak Hour Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Hour Analysis</CardTitle>
            <CardDescription>Patient volume by time of day</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peakHourData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="hour" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Satisfaction */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Satisfaction</CardTitle>
            <CardDescription>Based on post-consultation feedback</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={satisfactionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {satisfactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {satisfactionData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <span className="text-xs text-slate-600 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Efficiency */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Department Efficiency</CardTitle>
            <CardDescription>Comparing completion rates and wait times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <EfficiencyRow department="OPD - General" completion={98} wait={15} />
              <EfficiencyRow department="Laboratory" completion={92} wait={25} />
              <EfficiencyRow department="Radiology" completion={85} wait={45} />
              <EfficiencyRow department="Pediatrics" completion={96} wait={18} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricCard({ title, value, trend, trendType, icon: Icon }: any) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
            <Icon className="w-5 h-5" />
          </div>
          <div className={cn(
            "flex items-center text-xs font-bold",
            trendType === 'up' ? "text-success" : "text-destructive"
          )}>
            {trendType === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {trend}
          </div>
        </div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 mt-1">{value}</h3>
      </CardContent>
    </Card>
  );
}

function EfficiencyRow({ department, completion, wait }: any) {
  return (
    <div className="flex items-center gap-6">
      <div className="w-32 flex-shrink-0">
        <p className="text-sm font-bold text-slate-900">{department}</p>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
          <span>Completion Rate</span>
          <span>{completion}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: `${completion}%` }} />
        </div>
      </div>
      <div className="w-20 text-right">
        <p className="text-[10px] font-bold text-slate-400 uppercase">Avg Wait</p>
        <p className="text-sm font-bold text-slate-900">{wait}m</p>
      </div>
    </div>
  );
}
