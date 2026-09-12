const http = require('http');

http.get('http://localhost:3000/', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('STATUS:', res.statusCode);
    const idx = body.indexOf('Meet the Leadership');
    if (idx !== -1) {
      const section = body.slice(idx, idx + 2500);
      console.log('SECTION PREVIEW:');
      
      const names = [];
      const regex = /<h3[^>]*class="[^"]*memberName[^"]*"[^>]*>(.*?)<\/h3>/g;
      let match;
      while ((match = regex.exec(section)) !== null) {
        names.push(match[1]);
      }
      console.log('LEADERSHIP NAMES IN ORDER:', names);

      const roles = [];
      const roleRegex = /<p[^>]*class="[^"]*memberRole[^"]*"[^>]*>(.*?)<\/p>/g;
      let roleMatch;
      while ((roleMatch = roleRegex.exec(section)) !== null) {
        roles.push(roleMatch[1]);
      }
      console.log('ROLES IN ORDER:', roles);
    } else {
      console.log('Could not find Meet the Leadership section');
    }
  });
});
