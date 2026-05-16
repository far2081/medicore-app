import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MediCore Pro | Real Hospital & Clinic Management SaaS Platform',
  description: 'A production-ready, multi-tenant hospital and clinic management system. Secure authentication, patient records, real-time appointments, billing, and analytics for modern healthcare facilities.',
  keywords: 'healthcare software, clinic management system, hospital SaaS, medical billing software, patient management software',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
