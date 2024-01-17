import prisma from '../db';

let count: number | null = null;

export async function getRandomSituations() {
  if (!count) {
    count = await prisma.situation.count();
  }

  const situationAId = Math.floor(Math.random() * count);
  let situationBId = Math.floor(Math.random() * count);

  while (situationAId === situationBId) {
    situationBId = Math.floor(Math.random() * count);
  }

  const situationA = await prisma.situation.findFirst({
    take: 1,
    skip: situationAId,
  });

  const situationB = await prisma.situation.findFirst({
    take: 1,
    skip: situationBId,
  });

  return {
    situationA,
    situationB,
  };
}

export async function selectSituation(
  situationAId: string,
  situationBId: string,
  selected: 'A' | 'B',
) {
  const existingComparison = await prisma.comparison.findFirst({
    where: {
      OR: [
        {
          situationAId: parseInt(situationAId, 10),
          situationBId: parseInt(situationBId, 10),
        },
        {
          situationAId: parseInt(situationBId, 10),
          situationBId: parseInt(situationAId, 10),
        },
      ],
    },
  });

  if (existingComparison) {
    const comparison = await prisma.comparison.update({
      where: {
        id: existingComparison.id,
      },
      data: {
        [selected === 'A' ? 'aScore' : 'bScore']: {
          increment: 1,
        },
      },
    });

    return comparison;
  }

  const comparison = await prisma.comparison.create({
    data: {
      situationA: {
        connect: {
          id: parseInt(situationAId, 10),
        },
      },
      situationB: {
        connect: {
          id: parseInt(situationBId, 10),
        },
      },
      aScore: selected === 'A' ? 1 : 0,
      bScore: selected === 'B' ? 1 : 0,
    },
  });

  return comparison;
}
