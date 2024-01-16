import type { FC } from 'hono/jsx';
import { ViteScripts } from './ViteScripts';
import { ViteLinks } from './ViteLinks';

const Layout: FC = (props) => (
  <html>
    <head>
      <ViteLinks />
    </head>
    <body class="font-sans">
      {props.children}
      <ViteScripts />
    </body>
  </html>
);

export default Layout;
