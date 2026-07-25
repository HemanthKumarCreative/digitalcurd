const https = require('https');

const urls = [
  'https://cdn.simpleicons.org/react',
  'https://cdn.simpleicons.org/nextdotjs/000000',
  'https://cdn.simpleicons.org/vercel/000000',
  'https://cdn.simpleicons.org/stripe',
  'https://cdn.simpleicons.org/openai/000000',
  'https://cdn.simpleicons.org/figma',
  'https://cdn.simpleicons.org/amazonaws',
  'https://cdn.simpleicons.org/googlecloud'
];

urls.forEach(url => {
  https.get(url, (res) => {
    console.log(url, res.statusCode);
  }).on('error', (e) => {
    console.error(url, e.message);
  });
});
