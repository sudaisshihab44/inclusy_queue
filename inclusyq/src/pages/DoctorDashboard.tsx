import React from 'react';
import { 
  User, 
  Clock, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  AlertCircle, 
  History,
  MessageSquare,
  MoreHorizontal,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockQueues } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function DoctorDashboard() {
  const currentPatient = mockQueues[0];
  const upcomingPatients = mockQueues.slice(1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dr. Sarah Smith</h1>
          <p className="text-slate-500">OPD - General Medicine • Room 204</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" />
            Session History
          </Button>
          <Button variant="destructive" className="gap-2">
            <AlertCircle className="w-4 h-4" />
            Emergency
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Current Patient Focus */}
        <div className="xl:col-span-2 space-y-6">
          <Card className="border-primary/20 bg-primary/[0.02] overflow-hidden">
            <div className="h-1 bg-primary w-full" />
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <Badge className="mb-2 bg-primary text-white border-none">Currently Serving</Badge>
                <CardTitle className="text-2xl">Token {currentPatient.tokenNumber}</CardTitle>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Time in Consultation</p>
                <p className="text-2xl font-mono font-bold text-primary">08:42</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold">
                    {currentPatient.patientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900">{currentPatient.patientName}</h3>
                    <div className="flex gap-2 mt-1">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">Male, 42y</Badge>
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 border-none">First Visit</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
                  <div className="p-3 bg-white rounded-xl border shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Appt Type</p>
                    <p className="text-sm font-semibold text-slate-700">General Checkup</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Priority</p>
                    <p className="text-sm font-semibold text-slate-700">Normal</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Token Device</p>
                    <p className="text-sm font-semibold text-primary">T-042 (Active)</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <Button className="gap-2 bg-success hover:bg-success/90 text-white border-none h-12 px-6">
                  <CheckCircle2 className="w-5 h-5" />
                  Complete Consultation
                </Button>
                <Button variant="outline" className="gap-2 h-12 px-6">
                  <MessageSquare className="w-5 h-5" />
                  Add Notes
                </Button>
                <Button variant="outline" className="gap-2 h-12 px-6">
                  <Clock className="w-5 h-5" />
                  Request Delay
                </Button>
                <Button variant="ghost" className="gap-2 h-12 px-6 text-slate-500">
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Analytics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Patients Seen</p>
                    <h4 className="text-2xl font-bold">18 / 25</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 font-medium">Avg Time</p>
                    <h4 className="text-2xl font-bold">12m</h4>
                  </div>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-[10px] text-slate-400">72% of today's queue completed</p>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle className="text-white text-lg">Queue Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">On Schedule</p>
                    <p className="text-xs text-slate-400">Wait times are within limits</p>
                  </div>
                </div>
                <Button variant="secondary" className="w-full bg-white/10 hover:bg-white/20 text-white border-none">
                  View Full Queue
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upcoming Queue Sidebar */}
        <div className="space-y-6">
          <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Next in Queue</CardTitle>
                <CardDescription>{upcomingPatients.length} patients waiting</CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-4">
              {upcomingPatients.map((patient, index) => (
                <div 
                  key={patient.id} 
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer group",
                    index === 0 ? "bg-primary/5 border-primary/20 ring-2 ring-primary/5" : "hover:bg-slate-50"
                  )}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors">
                      {patient.tokenNumber}
                    </span>
                    <Badge variant="outline" className="text-[10px] h-4 px-1">
                      {patient.estimatedWaitTime}m wait
                    </Badge>
                  </div>
                  <p className="font-bold text-slate-800">{patient.patientName}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-[10px] bg-slate-100 text-slate-500 border-none">
                      {patient.priority}
                    </Badge>
                    <span className="text-[10px] text-slate-400">Check-in: {patient.checkInTime}</span>
                  </div>
                  {index === 0 && (
                    <Button className="w-full mt-4 h-9 gap-2" size="sm">
                      <Play className="w-3 h-3" />
                      Call Next Patient
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
