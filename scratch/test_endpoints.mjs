async function testUrls() {
  const tests = [
    { url: 'http://localhost:3000/images/team/alisha_fatima.png', type: 'image' },
    { url: 'http://localhost:3000/images/team/mohsin_shakeel.png', type: 'image' },
    { url: 'http://localhost:3000/team', type: 'html', checks: ['Mohsin Shakeel', 'Alisha Fatima', '/images/team/mohsin_shakeel.png'] },
    { url: 'http://localhost:3000/events/agentic-ai-workshop', type: 'html', checks: ['Ubaid Ghazi'], notChecks: ['Raheem'] },
    { url: 'http://localhost:3000/events/web-development-for-beginners', type: 'html', checks: ['Muhammad Ismail'], notChecks: ['Raheem'] },
    { url: 'http://localhost:3000/events/google-ai-tools-vibe-coding-sp26', type: 'html', notChecks: ['Abdur Raheem'] }
  ];

  for (const t of tests) {
    try {
      const res = await fetch(t.url);
      console.log(`[${res.status}] ${t.url}`);
      if (t.type === 'html' && res.ok) {
        const text = await res.text();
        if (t.checks) {
          for (const c of t.checks) {
            console.log(`  Contains "${c}"?`, text.includes(c));
          }
        }
        if (t.notChecks) {
          for (const nc of t.notChecks) {
            console.log(`  Does NOT contain "${nc}"?`, !text.includes(nc));
          }
        }
      }
    } catch (e) {
      console.error(`Error fetching ${t.url}:`, e.message);
    }
  }
}

testUrls();
