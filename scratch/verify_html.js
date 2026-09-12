const http = require('http');

http.get('http://localhost:3000/', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    // Look for partner cards
    const regex = /class="[^"]*partnerCard[^"]*"[^>]*title="([^"]*)"/g;
    let match;
    const partners = [];
    while ((match = regex.exec(body)) !== null) {
      partners.push(match[1]);
    }
    console.log('PARTNERS IN RENDERED HTML:', partners);

    // Also look for image src URLs
    const imgRegex = /<img alt="([^"]*)"[^>]*src="([^"]*)"/g;
    let imgMatch;
    console.log('PARTNER IMAGES:');
    while ((imgMatch = imgRegex.exec(body)) !== null) {
      if (['GitHub', 'Algoligence', 'DataCamp', 'KSL', 'Cheezious', 'Korneez'].includes(imgMatch[1])) {
        console.log(`- ${imgMatch[1]}: ${imgMatch[2]}`);
      }
    }
  });
});
