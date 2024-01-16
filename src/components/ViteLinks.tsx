export async function ViteLinks() {
  if (process.env.NODE_ENV === 'production') {
    const manifest = await import('../../dist/.vite/manifest.json');
    const mainScript = manifest['src/app/index.ts'];
    return <link rel="stylesheet" href={`/${mainScript.css}`} />;
  }

  return <></>;
}
