import { Situation } from '@prisma/client';
import type { FC } from 'hono/jsx';
import { SituationButton } from './SituationButton';

interface ComparisonProps {
  situationA: Situation;
  situationB: Situation;
}

const Comparison: FC<ComparisonProps> = (props) => (
  <main class="flex items-center justify-center flex-col h-full">
    <div class="question-container grid grid-cols-[1fr,_auto,_1fr] items-center">
      <div class="question-block flex flex-col items-center">
        <SituationButton situation={props.situationA} id="situationA" />
        <div class="percent inline text-2xl text-center w-20"></div>
      </div>
      VS
      <div class="question-block">
        <SituationButton situation={props.situationA} id="situationB" />
        <div class="percent inline text-2xl text-center w-20"></div>
      </div>
    </div>
    <button class="next-btn hidden text-2xl p-4 rounded-lg m-4 bg-white cursor-pointer hover:bg-gray-200">
      Next
    </button>
  </main>
);

export default Comparison;
