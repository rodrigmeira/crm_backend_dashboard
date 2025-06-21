import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  const projetos = await prisma.project.findMany()

  if (projetos.length === 0) {
    console.log('Nenhum projeto encontrado. Por favor, crie projetos primeiro.')
    return
  }

  const statuses = ['Novo', 'Em andamento', 'Fechado', 'Perdido']

  for (let i = 0; i < 100; i++) {
    const randomProject = projetos[Math.floor(Math.random() * projetos.length)]
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]

    const randomMonth = Math.floor(Math.random() * 6) + 1 // 1 a 6
    const randomDay = Math.floor(Math.random() * 28) + 1 // Para evitar problemas com fevereiro

    const createdAt = new Date(`2024-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`)

    await prisma.lead.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number({ style: 'national' }),
        company: faker.company.name(),
        origin: 'site',
        status: randomStatus,
        createdAt,
        projectId: randomProject.id,
      },
    })
  }

  console.log('Leads criados com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
