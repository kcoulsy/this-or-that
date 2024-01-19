import type { FC } from 'hono/jsx';
import { ViteScripts } from './ViteScripts';
import { ViteLinks } from './ViteLinks';

const getRandomLightColor = () => {
  const colors = [
    'bg-red-300',
    'bg-yellow-100',
    'bg-green-300',
    'bg-purple-300',
    'bg-pink-300',
    'bg-blue-100',
    'bg-indigo-300',
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const Layout: FC = (props) => (
  <html>
    <head>
      <ViteLinks />
    </head>
    <body class={`font-sans ${getRandomLightColor()} flex flex-col h-full`}>
      <nav class="border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap">
              This OR That
            </span>
          </a>

          <div class="w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4  rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <a
                  href="/scores"
                  class="block py-2 px-3 text-gray-900 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
                >
                  Scores
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {props.children}
      <ViteScripts />
    </body>
  </html>
);

export default Layout;
