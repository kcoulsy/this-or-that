// add the beginning of your app entry
import 'vite/modulepreload-polyfill';
import './style.css';

const situationA = document.getElementById('situationA');
const situationB = document.getElementById('situationB');

[situationA, situationB].forEach((btn) => {
  btn?.addEventListener('click', async () => {
    const response = await fetch('/comparison', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        situationAId: situationA?.dataset.id,
        situationBId: situationB?.dataset.id,
        selected: btn?.id === 'situationA' ? 'A' : 'B',
      }),
    });

    const data = await response.json();

    const total = data.aScore + data.bScore;

    const percentA = Math.round((data.aScore / total) * 100);
    const percentB = Math.round((data.bScore / total) * 100);

    const a = document.getElementById('situationA');

    if (a && a.nextElementSibling) {
      a.nextElementSibling.innerHTML = `${percentA}%`;
    }
    const b = document.getElementById('situationB');

    if (b && b.nextElementSibling) {
      b.nextElementSibling.innerHTML = `${percentB}%`;
    }

    document
      .querySelectorAll<HTMLButtonElement>('.situation-btn')
      .forEach((button) => {
        // eslint-disable-next-line no-param-reassign
        button.disabled = true;
      });

    document.querySelector('.next-btn')?.classList.remove('hidden');

    document.querySelector('.next-btn')?.addEventListener('click', () => {
      window.location.reload();
    });
  });
});
