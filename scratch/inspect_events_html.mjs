async function run() {
  const res = await fetch('http://localhost:3000/events');
  const text = await res.text();
  console.log('Status:', res.status);
  console.log('Length:', text.length);
  // find all occurrences of event-title or event slugs
  const titles = [...text.matchAll(/class="event-title">([^<]+)</g)].map(m => m[1]);
  console.log('Titles count:', titles.length);
  titles.forEach((t, i) => console.log(`${i+1}: ${t}`));

  const slugs = [...text.matchAll(/href="\/events\/([^"]+)"/g)].map(m => m[1]);
  console.log('Slugs:', slugs);
}

run().catch(console.error);
