import { Hono } from 'hono';
import { serveStatic } from '@hono/node-server/serve-static';
import { z } from 'zod';
import prisma from './db';
import Layout from './components/Layout';
import Comparison from './components/Comparison';

const app = new Hono();

let count: number | null = null;

app.use('/assets/*', serveStatic({ root: './dist' }));

app.get('/', async (c) => {
  if (!count) {
    count = await prisma.situation.count();
  }

  const situationAId = Math.floor(Math.random() * count);
  let situationBId = Math.floor(Math.random() * count);

  while (situationAId === situationBId) {
    situationBId = Math.floor(Math.random() * count);
  }

  console.log({
    situationAId,
    situationBId,
  });

  const situationA = await prisma.situation.findFirst({
    take: 1,
    skip: situationAId,
  });

  const situationB = await prisma.situation.findFirst({
    take: 1,
    skip: situationBId,
  });

  if (!situationA || !situationB) {
    return c.html(
      <Layout>
        <h1>Not enough situations</h1>
      </Layout>,
    );
  }

  return c.html(
    <Layout>
      <Comparison situationA={situationA} situationB={situationB} />
    </Layout>,
  );
});

const comparisonSchema = z.object({
  situationAId: z.string(),
  situationBId: z.string(),
  selected: z.string(),
});

app.post('/comparison', async (c) => {
  const body = await c.req.json();

  try {
    const { situationAId, situationBId, selected } =
      comparisonSchema.parse(body);

    if (!situationAId || !situationBId || !selected) {
      return c.json(
        {
          error: 'Invalid comparison',
        },
        400,
      );
    }

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

      return c.json(comparison);
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

    return c.json(comparison);
  } catch (e) {
    return c.text('Invalid comparison');
  }
});

app.get('/scores', async (c) => {
  const scores = await prisma.comparison.findMany({
    include: {
      situationA: true,
      situationB: true,
    },
  });

  const scoresSorted = scores.sort((a, b) => {
    const aTotal = a.aScore + a.bScore;
    const bTotal = b.aScore + b.bScore;

    return bTotal - aTotal;
  });

  return c.html(
    <Layout>
      <h1>Scores</h1>
      <table>
        <thead>
          <tr>
            <th>A Situation</th>
            <th>A Score</th>
            <th>A Percent</th>
            <th>B Situation</th>
            <th>B Score</th>
            <th>B Percent</th>
          </tr>
        </thead>
        <tbody>
          {scoresSorted.map((score) => (
            <tr>
              <td>{score.situationA.description}</td>
              <td>{score.aScore}</td>
              <td>
                {Math.ceil(
                  (score.aScore / (score.aScore + score.bScore)) * 100,
                )}
                %
              </td>
              <td>{score.situationB.description}</td>
              <td>{score.bScore}</td>
              <td>
                {Math.ceil(
                  (score.bScore / (score.aScore + score.bScore)) * 100,
                )}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>,
  );
});

export default app;
