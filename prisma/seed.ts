import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding data...');

  // Create Clinic
  const clinic = await prisma.clinic.create({
    data: {
      name: 'City Hospital Clinic',
      domain: 'cityhospital',
      plan: 'Premium',
    },
  });

  // Create Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@cityhospital.com',
      password: 'hashedpassword', // In a real app, hash this
      name: 'Dr. Sarah Smith',
      role: 'ClinicAdmin',
      clinicId: clinic.id,
    },
  });

  const doctor2 = await prisma.user.create({
    data: {
      email: 'johndoe@cityhospital.com',
      password: 'hashedpassword',
      name: 'Dr. John Doe',
      role: 'Doctor',
      clinicId: clinic.id,
    },
  });

  // Create Patients
  const p1 = await prisma.patient.create({
    data: {
      patientId: 'PAT-1001',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      phone: '+1 555-0101',
      age: 45,
      gender: 'Male',
      history: 'Hypertension, Diabetes Type 2',
      clinicId: clinic.id,
    },
  });

  const p2 = await prisma.patient.create({
    data: {
      patientId: 'PAT-1002',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+1 555-0102',
      age: 32,
      gender: 'Female',
      history: 'Asthma, Migraines',
      clinicId: clinic.id,
    },
  });

  const p3 = await prisma.patient.create({
    data: {
      patientId: 'PAT-1003',
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      phone: '+1 555-0103',
      age: 58,
      gender: 'Male',
      history: 'Arthritis, High Cholesterol',
      clinicId: clinic.id,
    },
  });

  // Create Appointments
  await prisma.appointment.create({
    data: {
      date: new Date(),
      time: '09:00 AM',
      status: 'Completed',
      reason: 'Routine Checkup',
      patientId: p1.id,
      doctorId: admin.id,
      clinicId: clinic.id,
    },
  });

  await prisma.appointment.create({
    data: {
      date: new Date(),
      time: '10:30 AM',
      status: 'In Progress',
      reason: 'Migraine followup',
      patientId: p2.id,
      doctorId: doctor2.id,
      clinicId: clinic.id,
    },
  });

  // Create Invoice
  await prisma.invoice.create({
    data: {
      amount: 150.00,
      status: 'Paid',
      patientId: p1.id,
      clinicId: clinic.id,
    },
  });

  await prisma.invoice.create({
    data: {
      amount: 85.00,
      status: 'Unpaid',
      patientId: p2.id,
      clinicId: clinic.id,
    },
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
