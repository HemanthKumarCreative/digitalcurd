const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

content = content.replace(
  'https://cdn.simpleicons.org/apple/000000',
  'https://cdn.simpleicons.org/google'
);
content = content.replace('alt="Apple"', 'alt="Google"');

content = content.replace(
  'https://cdn.simpleicons.org/stripe',
  'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg'
);
content = content.replace('alt="Stripe"', 'alt="Microsoft"');

fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
