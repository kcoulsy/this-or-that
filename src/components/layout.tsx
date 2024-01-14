import type { FC } from 'hono/jsx';

const Layout: FC = (props) => (
  <html>
    <style>
      {`
        body {
          font-family: sans-serif;
        }

        main {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          height: 100%;
        }

        .question-container {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
        }

        .question-container > div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .question-block {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .situation-btn {
          font-size: 2rem;
          padding: 1rem;
          border: 1px solid black;
          border-radius: 0.5rem;
          margin: 1rem;
          background-color: white;
          cursor: pointer;
        }

        .situation-btn:hover {
          background-color: #eee;
        }

        .situation-btn:disabled {
          background-color: #ddd;
          cursor: not-allowed;
        }

        .percent {
          display: inline-block;
          width: 5rem;
          text-align: center;
          font-size: 2rem;
        }

        .next-btn {
          font-size: 2rem;
          padding: 1rem;
          border: 1px solid black;
          border-radius: 0.5rem;
          margin: 1rem;
          background-color: white;
          cursor: pointer;
        }

        .next-btn:hover {
          background-color: #eee;
        }

        .next-btn.hidden {
          display: none;
        }
      `}
    </style>
    <body>{props.children}</body>
    <script
      dangerouslySetInnerHTML={{
        __html: `
        const situationA = document.getElementById('situationA');
        const situationB = document.getElementById('situationB');
        console.log('Hello from Hono!')
        document.querySelectorAll('.situation-btn').forEach((btn) => {
          btn.addEventListener('click', async () => {
            console.log('Clicked', btn.id)

            const response = await fetch('/comparison', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                situationAId: situationA.dataset.id,
                situationBId: situationB.dataset.id,
                selected:  btn.id === 'situationA' ? 'A' : 'B'
              })
            });

            const data = await response.json();

            const total = data.aScore + data.bScore;

            const percentA = Math.round((data.aScore / total) * 100);
            const percentB = Math.round((data.bScore / total) * 100);

            document.getElementById('situationA').nextElementSibling.innerHTML = percentA + '%';
            document.getElementById('situationB').nextElementSibling.innerHTML = percentB + '%';

            document.querySelectorAll('.situation-btn').forEach((btn) => {
              btn.disabled = true;
            });

            document.querySelector('.next-btn').classList.remove('hidden');

            document.querySelector('.next-btn').addEventListener('click', () => {
              window.location.reload();
            });
          })
        });
      `,
      }}
    />
  </html>
);

export default Layout;
