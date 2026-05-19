import { prisma } from '@/lib/prisma';
import SubscriptionsClient from './SubscriptionsClient';

export const dynamic = 'force-dynamic';

export default async function SubscriptionsAdminPage() {
  const clinics = await prisma.clinic.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <SubscriptionsClient initialClinics={clinics} />;
}
