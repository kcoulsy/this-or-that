import Comparison from '../components/Comparison';
import Layout from '../components/Layout';
import { getRandomSituations } from '../services/situation';

export async function IndexPage() {
  const { situationA, situationB } = await getRandomSituations();

  if (!situationA || !situationB) {
    return (
      <Layout>
        <h1>Not enough situations</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Comparison situationA={situationA} situationB={situationB} />
    </Layout>
  );
}
