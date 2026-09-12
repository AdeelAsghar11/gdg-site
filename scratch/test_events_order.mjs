async function check() {
  const res = await fetch('http://localhost:3000/events');
  const html = await res.text();
  const regex = /<h2 className="event-title">([^<]+)<\/h2>/g;
  let match;
  let idx = 1;
  console.log('--- RENDERED EVENTS ON /events ---');
  while ((match = regex.exec(html)) !== null) {
    console.log(`${idx++}. ${match[1].trim()}`);
  }
}

check().catch(console.error);
