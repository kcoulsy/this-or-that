import Layout from '../components/Layout';
import prisma from '../db';

export async function ScoresPage() {
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

  return (
    <Layout>
      <h1>Scores</h1>
      <table>
        <thead>
          <tr>
            <th>A Situation</th>
            <th>A Score</th>
            <th>A Percent</th>
            <th>Total</th>
            <th>B Score</th>
            <th>B Percent</th>
            <th>B Situation</th>
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
              <td>{score.aScore + score.bScore}</td>
              <td>
                {Math.ceil(
                  (score.bScore / (score.aScore + score.bScore)) * 100,
                )}
                %
              </td>
              <td>{score.bScore}</td>
              <td>{score.situationB.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
