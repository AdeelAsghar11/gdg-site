async function run() {
  const res = await fetch('http://localhost:3000/');
  const text = await res.text();
  console.log('Homepage Status:', res.status);
  const slugs = [...text.matchAll(/href="\/events\/([^"#\?]+)"/g)].map(m => m[1]);
  // unique preserve order
  const uniqueSlugs = [...new Set(slugs)];
  console.log('Unique Event Slugs on Homepage:', uniqueSlugs);
}

run().catch(console.error);
