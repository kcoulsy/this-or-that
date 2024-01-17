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
      <main class="container mx-auto flex flex-col items-center">
        <h1 class="text-4xl mb-2">Scores</h1>
        <div class="relative overflow-x-auto w-full">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th class="px-6 py-3">A Situation</th>
                <th class="px-6 py-3">A Score</th>
                <th class="px-6 py-3">A Percent</th>
                <th class="px-6 py-3">Total</th>
                <th class="px-6 py-3">B Score</th>
                <th class="px-6 py-3">B Percent</th>
                <th class="px-6 py-3">B Situation</th>
              </tr>
            </thead>
            <tbody>
              {scoresSorted.map((score) => (
                <tr class="bg-white border-b">
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                    {score.situationA.description}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                    {score.aScore}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                    {Math.ceil(
                      (score.aScore / (score.aScore + score.bScore)) * 100,
                    )}
                    %
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                    {score.aScore + score.bScore}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                    {Math.ceil(
                      (score.bScore / (score.aScore + score.bScore)) * 100,
                    )}
                    %
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                    {score.bScore}
                  </td>
                  <td class="px-6 py-4 font-medium text-gray-900 whitespace-wrap">
                    {score.situationB.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </Layout>
  );
}
