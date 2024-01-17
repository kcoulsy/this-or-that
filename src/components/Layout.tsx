import type { FC } from 'hono/jsx';
import { ViteScripts } from './ViteScripts';
import { ViteLinks } from './ViteLinks';

const Layout: FC = (props) => (
  <html>
    <head>
      <ViteLinks />
    </head>
    <body class="font-sans">
      <nav class="bg-white border-gray-200">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap">
              This OR That
            </span>
          </a>

          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white">
              <li>
                <a
                  href="/scores"
                  class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
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
