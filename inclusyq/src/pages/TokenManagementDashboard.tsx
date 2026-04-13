import React from 'react';
import { 
  Cpu, 
  Battery, 
  BatteryLow, 
  Wifi, 
  WifiOff, 
  Search, 
  Plus, 
  MoreVertical,
  RefreshCw,
  AlertTriangle,
  CheckCircle2
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
import { Progress } from '@/components/ui/progress';
import { mockTokenDevices } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function TokenManagementDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Smart Token Inventory</h1>
          <p className="text-slate-500">Manage and monitor physical queue devices</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Sync All
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Register New Device
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard title="Total Devices" value="1,240" icon={Cpu} />
        <OverviewCard title="Active Now" value="842" icon={CheckCircle2} variant="success" />
        <OverviewCard title="Low Battery" value="15" icon={BatteryLow} variant="warning" />
        <OverviewCard title="Offline" value="8" icon={WifiOff} variant="destructive" />
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle>Device List</CardTitle>
            <CardDescription>Real-time status and assignment of all tokens</CardDescription>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search by ID or Patient..." className="pl-9" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Device ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Battery</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTokenDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell className="font-bold text-slate-900">{device.id}</TableCell>
                  <TableCell>
                    <DeviceStatusBadge status={device.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            device.batteryLevel < 20 ? "bg-destructive" : device.batteryLevel < 50 ? "bg-warning" : "bg-success"
                          )}
                          style={{ width: `${device.batteryLevel}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-600">{device.batteryLevel}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {device.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                          {device.assignedTo.charAt(0)}
                        </div>
                        <span className="text-sm font-medium">{device.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-sm">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{device.department || '-'}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-500">{device.lastSync}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" title="Test Alert">
                        <Wifi className="w-4 h-4 text-primary" />
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Maintenance Alerts</CardTitle>
            <CardDescription>Devices requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertItem 
              type="warning" 
              title="Low Battery Warning" 
              description="12 devices in OPD - General are below 15% battery." 
              time="10 mins ago"
            />
            <AlertItem 
              type="destructive" 
              title="Connection Lost" 
              description="Device T-842 has been offline for more than 2 hours." 
              time="2 hours ago"
            />
            <AlertItem 
              type="info" 
              title="Firmware Update" 
              description="New firmware version v2.4.1 is available for all devices." 
              time="Yesterday"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Analytics</CardTitle>
            <CardDescription>Token utilization across departments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <UsageBar label="OPD - General" value={85} />
            <UsageBar label="Laboratory" value={62} />
            <UsageBar label="Radiology" value={45} />
            <UsageBar label="Pharmacy" value={92} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function OverviewCard({ title, value, icon: Icon, variant = 'default' }: any) {
  const colors: any = {
    default: "bg-primary/10 text-primary",
    success: "bg-success/10 text-success",
    warning: "bg-warning/10 text-warning",
    destructive: "bg-destructive/10 text-destructive",
  };

  return (
    <Card>
      <CardContent className="p-6 flex items-center gap-4">
        <div className={cn("p-3 rounded-xl", colors[variant])}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}

function DeviceStatusBadge({ status }: { status: string }) {
  const variants: any = {
    ACTIVE: { label: 'Active', className: 'bg-success/10 text-success border-success/20' },
    LOW_BATTERY: { label: 'Low Battery', className: 'bg-warning/10 text-warning border-warning/20' },
    DISCONNECTED: { label: 'Offline', className: 'bg-destructive/10 text-destructive border-destructive/20' },
    INACTIVE: { label: 'Inactive', className: 'bg-slate-100 text-slate-500 border-slate-200' },
  };
  
  const { label, className } = variants[status] || variants.INACTIVE;
  
  return (
    <Badge variant="outline" className={cn("rounded-full font-medium", className)}>
      {label}
    </Badge>
  );
}

function AlertItem({ type, title, description, time }: any) {
  const icons: any = {
    warning: <AlertTriangle className="w-5 h-5 text-warning" />,
    destructive: <AlertTriangle className="w-5 h-5 text-destructive" />,
    info: <RefreshCw className="w-5 h-5 text-primary" />,
  };

  const bgColors: any = {
    warning: "bg-warning/5 border-warning/10",
    destructive: "bg-destructive/5 border-destructive/10",
    info: "bg-primary/5 border-primary/10",
  };

  return (
    <div className={cn("flex gap-4 p-4 rounded-xl border", bgColors[type])}>
      <div className="flex-shrink-0 mt-1">{icons[type]}</div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <p className="font-bold text-slate-900 text-sm">{title}</p>
          <span className="text-[10px] text-slate-400 font-medium">{time}</span>
        </div>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function UsageBar({ label, value }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-bold text-slate-900">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
