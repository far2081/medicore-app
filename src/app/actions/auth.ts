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
    const domain = clinicName.toLowerCase().replace(/\s+/g, '-');

    // 1. Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return { error: 'This email address is already registered. Please use a different email or log in.' };
    }

    // 2. Check if clinic domain already exists
    const existingClinic = await prisma.clinic.findUnique({
      where: { domain },
    });
    if (existingClinic) {
      return { error: 'A clinic with this name already exists. Please choose a different clinic name.' };
    }

    // 3. Create the Clinic
    const clinic = await prisma.clinic.create({
      data: {
        name: clinicName,
        domain,
        plan: 'Trial',
        status: 'Active',
      },
    });

    // 4. Create the User (Clinic Admin)
    await prisma.user.create({
      data: {
        name,
        email,
        password, // Note: In a real app, always hash the password!
        role: 'ClinicAdmin',
        clinicId: clinic.id,
      },
    });

    // 5. Redirect to login after successful signup
    return { success: true };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { error: error.message || 'Something went wrong' };
  }
}
