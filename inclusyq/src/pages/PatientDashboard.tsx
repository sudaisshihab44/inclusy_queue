import React from 'react';
import { 
  Clock, 
  MapPin, 
  Calendar, 
  Bell, 
  User, 
  ChevronRight, 
  Accessibility, 
  Smartphone,
  Info,
  CalendarDays,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export function PatientDashboard() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hello, John!</h1>
          <p className="text-slate-500">Welcome to City General Hospital</p>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm">
          <Accessibility className="w-6 h-6 text-primary" />
        </Button>
      </div>

      {/* Live Queue Tracker - The most important part */}
      <Card className="border-primary/20 shadow-xl shadow-primary/5 overflow-hidden">
        <div className="bg-primary p-6 text-white">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium uppercase tracking-wider">Your Token</p>
              <h2 className="text-5xl font-black">A-102</h2>
            </div>
            <Badge className="bg-white/20 text-white border-none backdrop-blur-md">Live Status</Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span>Queue Progress</span>
              <span>2 patients ahead</span>
            </div>
            <div className="relative h-4 bg-white/20 rounded-full overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-white rounded-full" style={{ width: '75%' }} />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-2xl font-bold">~15 min</span>
              </div>
              <p className="text-sm text-primary-foreground/80">Est. Waiting Time</p>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6 space-y-6">
          <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">Consulting With</p>
              <p className="text-lg font-bold text-slate-900">Dr. Sarah Smith</p>
              <p className="text-sm text-slate-500">OPD - General Medicine • Room 204</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-14 rounded-2xl gap-2 border-slate-200">
              <RefreshCw className="w-5 h-5" />
              Reschedule
            </Button>
            <Button variant="outline" className="h-14 rounded-2xl gap-2 border-slate-200 text-destructive hover:text-destructive">
              <XCircle className="w-5 h-5" />
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Smart Token Status */}
      <Card className="bg-slate-900 text-white border-none overflow-hidden">
        <CardContent className="p-6 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Smartphone className="w-8 h-8 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg">Smart Token Linked</h4>
            <p className="text-sm text-slate-400">Device T-042 is active. It will vibrate when it's your turn.</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-success text-sm font-bold">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Connected
            </div>
            <p className="text-xs text-slate-500 mt-1">85% Battery</p>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps / Guidance */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900">What to do next?</h3>
        <div className="space-y-3">
          <GuidanceItem 
            icon={Info} 
            title="Wait in the Lobby" 
            description="Please stay near Room 204. We'll notify you 5 minutes before your turn." 
          />
          <GuidanceItem 
            icon={MapPin} 
            title="Locate Pharmacy" 
            description="After consultation, the pharmacy is located on the Ground Floor, Block B." 
          />
          <GuidanceItem 
            icon={CalendarDays} 
            title="Upcoming Follow-up" 
            description="You have a follow-up scheduled for next Monday at 10:00 AM." 
          />
        </div>
      </div>

      {/* Accessibility Panel Preview */}
      <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Accessibility className="w-6 h-6 text-slate-400" />
          <div>
            <p className="font-bold text-slate-900">Accessibility Mode</p>
            <p className="text-sm text-slate-500">Larger text, high contrast, audio support</p>
          </div>
        </div>
        <Button variant="outline" className="rounded-full">Enable</Button>
      </div>
    </div>
  );
}

function GuidanceItem({ icon: Icon, title, description }: any) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-slate-400" />
      </div>
      <div>
        <p className="font-bold text-slate-900">{title}</p>
        <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
