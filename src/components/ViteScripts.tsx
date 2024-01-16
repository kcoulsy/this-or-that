export async function ViteScripts() {
  if (process.env.NODE_ENV === 'production') {
    const manifest = await import('../../dist/.vite/manifest.json');
    const mainScript = manifest['src/app/index.ts'];
    return <script type="module" src={`/${mainScript.file}`}></script>;
  }

  return (
    <>
      <script type="module" src="http://localhost:5173/@vite/client"></script>
      <script
        type="module"
        src="http://localhost:5173/src/app/index.ts"
      ></script>
    </>
  );
}
