/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/DashboardLayout';
import { SuperAdminDashboard } from './pages/SuperAdminDashboard';
import { HospitalAdminDashboard } from './pages/HospitalAdminDashboard';
import { ReceptionDashboard } from './pages/ReceptionDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { PatientDashboard } from './pages/PatientDashboard';
import { TokenManagementDashboard } from './pages/TokenManagementDashboard';
import { LiveMonitorScreen } from './pages/LiveMonitorScreen';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { AlertsCenter } from './pages/AlertsCenter';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage, ForgotPasswordPage } from './pages/AuthPages';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        
        {/* Public / Signage Routes */}
        <Route path="/monitor" element={<LiveMonitorScreen />} />
        
        {/* Dashboard Routes */}
        <Route path="/super-admin" element={<DashboardLayout><SuperAdminDashboard /></DashboardLayout>} />
        <Route path="/hospital-admin" element={<DashboardLayout><HospitalAdminDashboard /></DashboardLayout>} />
        <Route path="/reception" element={<DashboardLayout><ReceptionDashboard /></DashboardLayout>} />
        <Route path="/doctor" element={<DashboardLayout><DoctorDashboard /></DashboardLayout>} />
        <Route path="/patient" element={<DashboardLayout><PatientDashboard /></DashboardLayout>} />
        <Route path="/tokens" element={<DashboardLayout><TokenManagementDashboard /></DashboardLayout>} />
        <Route path="/analytics" element={<DashboardLayout><AnalyticsDashboard /></DashboardLayout>} />
        <Route path="/alerts" element={<DashboardLayout><AlertsCenter /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
        
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/super-admin" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}
