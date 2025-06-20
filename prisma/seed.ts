import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const projects = await prisma.project.createMany({
    data: [
      { name: 'Abavsp', description: 'Projeto para Abavsp' },
      { name: 'Allinsys', description: 'Projeto para Allinsys' },
      { name: 'BloodCasted', description: 'Projeto para BloodCasted' },
      { name: 'Passb2b', description: 'Projeto para Passb2b' },
    ],
    skipDuplicates: true,
  });

  const allProjects = await prisma.project.findMany();

  for (let i = 0; i < 50; i++) {
    const project = allProjects[Math.floor(Math.random() * allProjects.length)];
    await prisma.lead.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'national' }),
        company: faker.company.name(),
        origin: faker.helpers.arrayElement(['site', 'linkedin', 'instagram', 'indicacao']),
        createdAt: faker.date.between({ from: '2024-01-01', to: '2024-06-30' }),
        projectId: project.id,
      },
    });
  }

  console.log('Seed completed 🌱');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
