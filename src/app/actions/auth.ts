'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function signup(formData: FormData) {
  const name = formData.get('name') as string;
  const clinicName = formData.get('clinicName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !name || !clinicName) {
    throw new Error('Please fill all fields');
  }

  try {
    // 1. Create the Clinic
    const clinic = await prisma.clinic.create({
      data: {
        name: clinicName,
        domain: clinicName.toLowerCase().replace(/\s+/g, '-'),
        plan: 'Trial',
        status: 'Active',
      },
    });

    // 2. Create the User (Clinic Admin)
    await prisma.user.create({
      data: {
        name,
        email,
        password, // Note: In a real app, always hash the password!
        role: 'ClinicAdmin',
        clinicId: clinic.id,
      },
    });

    // 3. Redirect to login after successful signup
    return { success: true };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { error: error.message || 'Something went wrong' };
  }
}
