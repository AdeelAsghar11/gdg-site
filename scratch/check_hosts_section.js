async function check() {
  const res = await fetch('http://localhost:3000/events/google-ai-tools-vibe-coding-sp26');
  console.log('Status:', res.status);
  const text = await res.text();
  console.log('Length:', text.length);
  const start = text.indexOf('Event Speakers');
  console.log('Start index:', start);
  if (start !== -1) {
    console.log(text.slice(start, start + 2500));
  } else {
    console.log('First 500 chars:', text.slice(0, 500));
  }
}
check();
