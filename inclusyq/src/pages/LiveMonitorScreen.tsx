import React from 'react';
import { 
  Clock, 
  Users, 
  Activity, 
  AlertCircle, 
  ArrowRight,
  Maximize2,
  Volume2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export function LiveMonitorScreen() {
  const departments = [
    { name: 'OPD - General', current: 'A-101', next: 'A-102', waiting: 12, status: 'NORMAL' },
    { name: 'Pediatrics', current: 'P-042', next: 'P-043', waiting: 8, status: 'NORMAL' },
    { name: 'Laboratory', current: 'B-205', next: 'B-206', waiting: 15, status: 'BUSY' },
    { name: 'Radiology', current: 'C-301', next: 'C-302', waiting: 4, status: 'DELAYED' },
    { name: 'Pharmacy', current: 'D-012', next: 'D-013', waiting: 22, status: 'CRITICAL' },
    { name: 'Cardiology', current: 'H-005', next: 'H-006', waiting: 3, status: 'NORMAL' },
  ];

  return (
    <div className="h-screen bg-slate-900 text-white p-6 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-black text-2xl">Q</span>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">InclusyQ Live Operations</h1>
            <p className="text-slate-400 text-sm font-medium">City General Hospital • 10:45 AM</p>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
          <LiveStat label="Total Waiting" value="64" icon={Users} color="text-primary" />
          <LiveStat label="Avg Wait Time" value="22m" icon={Clock} color="text-warning" />
          <LiveStat label="Facility Load" value="82%" icon={Activity} color="text-success" />
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Maximize2 className="w-6 h-6 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        {departments.map((dept) => (
          <MonitorCard key={dept.name} {...dept} />
        ))}
      </div>

      {/* Footer / Announcement Bar */}
      <div className="h-20 bg-primary/10 border border-primary/20 rounded-2xl flex items-center px-8 gap-6">
        <div className="flex items-center gap-3 text-primary">
          <Volume2 className="w-8 h-8 animate-pulse" />
          <span className="font-black text-xl uppercase tracking-widest">Announcement:</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-xl font-medium text-slate-200 whitespace-nowrap animate-marquee">
            Token A-101 please proceed to Room 204 • Token B-205 please proceed to Lab Counter 2 • Dr. Sarah Chen is now available in Room 305
          </p>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}

function LiveStat({ label, value, icon: Icon, color }: any) {
  return (
    <div className="flex items-center gap-3">
      <div className={cn("p-2 rounded-lg bg-white/5", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{label}</p>
        <p className="text-xl font-black">{value}</p>
      </div>
    </div>
  );
}

function MonitorCard({ name, current, next, waiting, status }: any) {
  const statusConfig: any = {
    NORMAL: { color: 'bg-success', label: 'Normal' },
    BUSY: { color: 'bg-warning', label: 'Busy' },
    DELAYED: { color: 'bg-destructive', label: 'Delayed' },
    CRITICAL: { color: 'bg-destructive animate-pulse', label: 'Critical' },
  };

  const config = statusConfig[status];

  return (
    <Card className="bg-white/5 border-white/10 overflow-hidden flex flex-col">
      <div className={cn("h-1.5 w-full", config.color)} />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-white text-lg font-bold">{name}</CardTitle>
          <Badge variant="outline" className={cn("text-[10px] border-none text-white", config.color)}>
            {config.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between py-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Now Serving</p>
          <h3 className="text-7xl font-black text-primary tracking-tighter">{current}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="text-center">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Next</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-bold text-slate-200">{next}</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
          <div className="text-center border-l border-white/10">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Waiting</p>
            <span className="text-2xl font-bold text-slate-200">{waiting}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
