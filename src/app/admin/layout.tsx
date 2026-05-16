"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldAlert, LayoutDashboard, Building2, 
  CreditCard, Settings, LogOut
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
    { icon: Building2, label: 'Clinics (Tenants)', href: '/admin/clinics' },
    { icon: CreditCard, label: 'Subscriptions', href: '/admin/subscriptions' },
    { icon: Settings, label: 'Platform Settings', href: '/admin/settings' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar" style={{ backgroundColor: '#0f172a' }}>
        <div className="sidebar-header" style={{ borderBottomColor: '#1e293b' }}>
          <ShieldAlert color="white" size={28} />
          <span className="sidebar-logo-text" style={{ color: 'white' }}>Super Admin</span>
        </div>
        
        <nav className="sidebar-nav">
          <div style={{ padding: '0 1.5rem', marginBottom: '0.5rem', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            System
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className="nav-item"
                style={{ 
                  color: isActive ? 'white' : '#94a3b8',
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  borderRight: isActive ? '3px solid white' : 'none'
                }}
              >
                <item.icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #1e293b' }}>
          <button className="nav-item" style={{ width: '100%', color: '#ef4444', justifyContent: 'flex-start' }}>
            <LogOut size={20} />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div style={{ fontWeight: 600, fontSize: '1.25rem', color: 'var(--text-dark)' }}>
            MediCore Global Management
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>System Admin</div>
              </div>
              <div className="avatar" style={{ backgroundColor: '#0f172a' }}>
                SA
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-page animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
}
