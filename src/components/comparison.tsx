import { Situation } from '@prisma/client';
import type { FC } from 'hono/jsx';

interface ComparisonProps {
  situationA: Situation;
  situationB: Situation;
}

const Comparison: FC<ComparisonProps> = (props) => (
  <main>
    <div class="question-container">
      <div class="question-block">
        <button
          class="situation-btn"
          id="situationA"
          data-id={`${props.situationA.id}`}
        >
          {props.situationA.description}
        </button>
        <div class="percent"></div>
      </div>
      VS
      <div class="question-block">
        <button
          class="situation-btn"
          id="situationB"
          data-id={`${props.situationB.id}`}
        >
          {props.situationB.description}
        </button>
        <div class="percent"></div>
      </div>
    </div>
    <button class="next-btn hidden">Next</button>
  </main>
);

export default Comparison;
