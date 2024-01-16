import { Situation } from '@prisma/client';

interface Props {
  id: string;
  situation: Situation;
}

export function SituationButton({ situation, id }: Props) {
  return (
    <button
      class="text-2xl p-4 border border-black rounded-lg m-4 cursor-pointer bg-blue-300"
      id={id}
      data-id={situation.id}
    >
      {situation.description}
    </button>
  );
}
