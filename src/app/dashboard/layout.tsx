"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Activity, LayoutDashboard, Users, Calendar, 
  FileText, CreditCard, Settings, LogOut, Bell
} from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Users, label: 'Patients', href: '/dashboard/patients' },
    { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
    { icon: FileText, label: 'Prescriptions', href: '/dashboard/prescriptions' },
    { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Activity color="var(--primary)" size={28} />
          <span className="sidebar-logo-text">MediCore</span>
        </div>
        
        <nav className="sidebar-nav">
          <div style={{ padding: '0 1.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-gray)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Menu
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
          <Link href="/login" className="nav-item" style={{ width: '100%', color: 'var(--danger)', justifyContent: 'flex-start' }}>
            <LogOut size={20} />
            Log Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <div style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-dark)' }}>
            City Hospital Clinic {/* Mock tenant name */}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button style={{ color: 'var(--text-gray)', position: 'relative' }}>
              <Bell size={24} />
              <span style={{ position: 'absolute', top: 0, right: 0, width: '10px', height: '10px', backgroundColor: 'var(--danger)', borderRadius: '50%', border: '2px solid white' }}></span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>Dr. Sarah Smith</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>Admin / Doctor</div>
              </div>
              <div className="avatar">
                SS
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="dashboard-page animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
