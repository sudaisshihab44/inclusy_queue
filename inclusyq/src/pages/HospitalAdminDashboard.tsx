import React from 'react';
import { 
  Users, 
  Clock, 
  Activity, 
  UserPlus, 
  UserCheck, 
  AlertCircle,
  Calendar as CalendarIcon,
  Play,
  Pause,
  Volume2,
  ChevronRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockQueues, mockAppointments } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

const inflowData = [
  { time: '8am', patients: 12 },
  { time: '9am', patients: 25 },
  { time: '10am', patients: 45 },
  { time: '11am', patients: 38 },
  { time: '12pm', patients: 20 },
  { time: '1pm', patients: 15 },
  { time: '2pm', patients: 30 },
  { time: '3pm', patients: 42 },
  { time: '4pm', patients: 28 },
];

export function HospitalAdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">City General Hospital</h1>
          <p className="text-slate-500">Live operations dashboard • Monday, April 13</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Volume2 className="w-4 h-4" />
            Announcement
          </Button>
          <Button className="gap-2">
            <UserPlus className="w-4 h-4" />
            New Queue
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard title="Today's Appts" value="124" icon={CalendarIcon} />
        <StatCard title="Active Queues" value="12" icon={Activity} />
        <StatCard title="Avg Wait Time" value="18m" icon={Clock} />
        <StatCard title="Walk-ins" value="42" icon={UserPlus} />
        <StatCard title="Staff on Duty" value="18" icon={UserCheck} />
        <StatCard title="Missed" value="5" icon={AlertCircle} variant="destructive" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Department Queues */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DepartmentCard name="OPD - General" current="A-101" waiting={12} avgWait={15} status="NORMAL" />
            <DepartmentCard name="Laboratory" current="B-205" waiting={8} avgWait={25} status="BUSY" />
            <DepartmentCard name="Radiology" current="C-301" waiting={4} avgWait={45} status="DELAYED" />
            <DepartmentCard name="Pharmacy" current="P-042" waiting={15} avgWait={10} status="NORMAL" />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Patient Inflow</CardTitle>
              <CardDescription>Real-time patient arrivals by hour</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={inflowData}>
                  <defs>
                    <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="patients" 
                    stroke="var(--color-primary)" 
                    fillOpacity={1} 
                    fill="url(#colorPatients)" 
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <Card className="bg-primary text-white border-none">
            <CardHeader>
              <CardTitle className="text-white">Hospital Occupancy</CardTitle>
              <CardDescription className="text-primary-foreground/80">Current facility load</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-end">
                <h3 className="text-4xl font-bold">78%</h3>
                <Badge variant="secondary" className="bg-white/20 text-white border-none">Near Capacity</Badge>
              </div>
              <Progress value={78} className="h-2 bg-white/20" />
              <p className="text-xs text-primary-foreground/70">Estimated peak at 2:30 PM today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Appts</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 px-2">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockAppointments.map((appt) => (
                <div key={appt.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {appt.patientName.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{appt.patientName}</p>
                    <p className="text-xs text-slate-500 truncate">{appt.doctorName} • {appt.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-900">{appt.time}</p>
                    <Badge variant="outline" className="text-[10px] h-4 px-1">{appt.type}</Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              <ActionButton icon={Play} label="Resume All" />
              <ActionButton icon={Pause} label="Pause All" />
              <ActionButton icon={Volume2} label="Broadcast" />
              <ActionButton icon={ChevronRight} label="More" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, variant = 'default' }: any) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={cn(
          "p-2 rounded-lg",
          variant === 'destructive' ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-medium">{title}</p>
          <h3 className="text-lg font-bold text-slate-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function DepartmentCard({ name, current, waiting, avgWait, status }: any) {
  const statusColors: any = {
    NORMAL: "bg-success",
    BUSY: "bg-warning",
    DELAYED: "bg-destructive"
  };

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h4 className="font-bold text-slate-900">{name}</h4>
          <div className={cn("w-2 h-2 rounded-full", statusColors[status])} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Current</p>
            <p className="text-xl font-black text-primary">{current}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Waiting</p>
            <p className="text-xl font-black text-slate-900">{waiting}</p>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t flex justify-between items-center">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            <span>Avg {avgWait}m</span>
          </div>
          <Button variant="ghost" size="sm" className="h-7 text-xs px-2">Manage</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionButton({ icon: Icon, label }: any) {
  return (
    <Button variant="outline" className="flex flex-col h-auto py-3 gap-2 text-xs font-medium border-slate-200 hover:border-primary hover:bg-primary/5">
      <Icon className="w-4 h-4" />
      {label}
    </Button>
  );
}
