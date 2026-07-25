const https = require('https');

['google', 'microsoft', 'windows', 'stripe', 'apple'].forEach(slug => {
  https.get(`https://cdn.simpleicons.org/${slug}`, (res) => {
    console.log(slug, res.statusCode);
  }).on('error', (e) => {
    console.error(slug, e.message);
  });
});
