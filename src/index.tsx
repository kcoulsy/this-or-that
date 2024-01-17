import { Hono } from 'hono';
import { validator } from 'hono/validator';
import { serveStatic } from '@hono/node-server/serve-static';
import { z } from 'zod';
import { selectSituation } from './services/situation';
import { IndexPage } from './pages/Index';
import { ScoresPage } from './pages/Scores';

const app = new Hono();

app.use('/assets/*', serveStatic({ root: './dist' }));

app.get('/', async (c) => c.html(<IndexPage />));

app.get('/scores', async (c) => c.html(<ScoresPage />));

const comparisonSchema = z.object({
  situationAId: z.string(),
  situationBId: z.string(),
  selected: z.union([z.literal('A'), z.literal('B')]),
});

app.post(
  '/comparison',
  validator('json', (value, c) => {
    const parsed = comparisonSchema.safeParse(value);
    if (!parsed.success) {
      return c.json(JSON.parse(parsed.error.message), 400);
    }
    return parsed.data;
  }),
  async (c) => {
    const { situationAId, situationBId, selected } = c.req.valid('json');

    const comparison = await selectSituation(
      situationAId,
      situationBId,
      selected,
    );

    return c.json(comparison);
  },
);

export default app;
