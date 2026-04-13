import React from 'react';
import { 
  Search, 
  UserPlus, 
  Ticket, 
  MapPin, 
  Clock, 
  MoreVertical,
  Printer,
  CheckCircle2,
  AlertCircle,
  Smartphone
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { mockQueues } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function ReceptionDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Front Desk</h1>
          <p className="text-slate-500">Patient check-in and queue assignment</p>
        </div>
        <div className="flex gap-3">
          <Button className="gap-2 h-11 px-6 rounded-full shadow-lg shadow-primary/20">
            <UserPlus className="w-5 h-5" />
            New Registration
          </Button>
        </div>
      </div>

      {/* Search and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input 
                  placeholder="Search patient by name, phone, or token ID..." 
                  className="pl-10 h-12 bg-slate-50 border-slate-200 focus:bg-white transition-all text-base"
                />
              </div>
              <Button variant="secondary" className="h-12 px-8">Search</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-900 text-white border-none">
          <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
            <Smartphone className="w-8 h-8 mb-2 text-primary" />
            <h4 className="font-bold text-lg">Smart Token</h4>
            <p className="text-xs text-slate-400 mb-4">Assign physical device to non-tech users</p>
            <Button variant="secondary" size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-none">
              Assign Device
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Live Queue List */}
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Current Queue</CardTitle>
              <CardDescription>Live status of patients waiting in the lobby</CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-success/5 text-success border-success/20">12 Waiting</Badge>
              <Badge variant="outline" className="bg-warning/5 text-warning border-warning/20">2 Delayed</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Est. Wait</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockQueues.map((q) => (
                  <TableRow key={q.id}>
                    <TableCell>
                      <span className="font-black text-primary text-lg">{q.tokenNumber}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {q.patientName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{q.patientName}</p>
                          {q.priority === 'EMERGENCY' && (
                            <Badge variant="destructive" className="text-[10px] h-4 px-1 uppercase">Emergency</Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-slate-600">
                        <MapPin className="w-3 h-3" />
                        <span className="text-sm">{q.department}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-3 h-3" />
                        <span className="text-sm">{q.estimatedWaitTime}m</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <QueueStatusBadge status={q.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" title="Check-in">
                          <CheckCircle2 className="w-4 h-4 text-success" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Print Slip">
                          <Printer className="w-4 h-4 text-slate-400" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Quick Registration Form Preview / Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Walk-in Assignment</CardTitle>
              <CardDescription>Quickly assign a token to a new arrival</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Patient Name</label>
                <Input placeholder="Full Name" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Department</label>
                <select className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Select Department</option>
                  <option>OPD - General</option>
                  <option>Pediatrics</option>
                  <option>Cardiology</option>
                  <option>Laboratory</option>
                </select>
              </div>
              <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                <Ticket className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="text-xs text-slate-500 font-medium">Next Available Token</p>
                  <p className="text-lg font-black text-primary">A-106</p>
                </div>
                <Button size="sm">Assign</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warning/30 bg-warning/5">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                <CardTitle className="text-sm">Priority Alert</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-slate-600 leading-relaxed">
                3 patients in <strong>Laboratory</strong> have been waiting for more than 45 minutes. Consider redirecting new walk-ins to other counters.
              </p>
              <Button variant="link" className="text-xs p-0 h-auto mt-2 text-warning font-bold">View Details</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function QueueStatusBadge({ status }: { status: string }) {
  const variants: any = {
    WAITING: { label: 'Waiting', className: 'bg-slate-100 text-slate-600 border-slate-200' },
    IN_CONSULTATION: { label: 'In Service', className: 'bg-primary/10 text-primary border-primary/20' },
    DELAYED: { label: 'Delayed', className: 'bg-warning/10 text-warning border-warning/20' },
    COMPLETED: { label: 'Done', className: 'bg-success/10 text-success border-success/20' },
    MISSED: { label: 'Missed', className: 'bg-destructive/10 text-destructive border-destructive/20' },
  };
  
  const { label, className } = variants[status] || variants.WAITING;
  
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium", className)}>
      {label}
    </Badge>
  );
}
