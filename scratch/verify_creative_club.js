const http = require('http');

function check(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          hasTalha: body.includes('Talha Ahmed'),
          hasJasim: body.includes('Jasim Ali'),
        });
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function main() {
  console.log('Testing Creative Club and Team pages...');
  const r1 = await check('http://localhost:3000/clubs/creative-club');
  console.log('/clubs/creative-club:', r1);

  const r2 = await check('http://localhost:3000/team');
  console.log('/team:', r2);

  const r3 = await check('http://localhost:3000/team/talha-ahmed');
  console.log('/team/talha-ahmed:', r3);

  const r4 = await check('http://localhost:3000/team/jasim-ali');
  console.log('/team/jasim-ali:', r4);
}

main();
