async function check() {
  const res = await fetch('http://localhost:3000/events/hack-data-v1');
  const text = await res.text();
  const start = text.indexOf('Event Speakers');
  if (start !== -1) {
    console.log(text.slice(start, start + 1000));
  }
}
check();
