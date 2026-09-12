async function verify() {
  const tests = [
    {
      url: 'http://localhost:3000/images/team/abdul_ahad.png',
      type: 'image'
    },
    {
      url: 'http://localhost:3000/events/hack-the-vibe-2026',
      type: 'html',
      checks: ['Farhan Ashraf', 'Munsif Raza'],
      notChecks: ['Muhammad Adil', 'Adil']
    },
    {
      url: 'http://localhost:3000/events/hack-data-v1',
      type: 'html',
      checks: ['Farhan Ashraf'],
      notChecks: ['Munsif Raza', 'Muhammad Adil']
    },
    {
      url: 'http://localhost:3000/team',
      type: 'html',
      checks: ['Abdul Ahad Khan', '/images/team/abdul_ahad.png']
    }
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

verify();
