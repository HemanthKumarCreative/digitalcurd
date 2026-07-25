const https = require('https');

['amazonaws', 'amazonwebservices', 'apple', 'microsoft'].forEach(slug => {
  https.get(`https://cdn.simpleicons.org/${slug}`, (res) => {
    console.log(slug, res.statusCode);
  }).on('error', (e) => {
    console.error(slug, e.message);
  });
});
