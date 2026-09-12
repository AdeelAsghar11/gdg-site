const http = require('http');

http.get('http://localhost:3000/', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('HOME PAGE STATUS:', res.statusCode);
    const hasChapterPhotos = body.includes('Chapter Photos');
    const hasHackTheVibe = body.includes('HackTheVibe Team Photo');
    console.log('Has Chapter Photos section:', hasChapterPhotos);
    console.log('Has HackTheVibe Photo:', hasHackTheVibe);
  });
});

http.get('http://localhost:3000/gallery', res => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('GALLERY PAGE STATUS:', res.statusCode);
    const hasHackTheVibe = body.includes('HackTheVibe Team Photo');
    console.log('Gallery has HackTheVibe:', hasHackTheVibe);
  });
});
