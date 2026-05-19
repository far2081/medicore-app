import { prisma } from '@/lib/prisma';
import BillingClient from './BillingClient';

export const dynamic = 'force-dynamic';

export default async function BillingPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { date: 'desc' },
    include: {
      patient: {
        select: {
          name: true,
          patientId: true
        }
      }
    }
  });

  const patients = await prisma.patient.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      patientId: true,
      name: true
    }
  });

  return (
    <BillingClient 
      initialInvoices={invoices} 
      patients={patients} 
    />
  );
}
