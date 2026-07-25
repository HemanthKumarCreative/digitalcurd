const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

const newLogos = [
  'https://cdn.simpleicons.org/react',
  'https://cdn.simpleicons.org/nextdotjs/000000', // black for nextjs since default is white sometimes depending on background
  'https://cdn.simpleicons.org/vercel/000000',
  'https://cdn.simpleicons.org/stripe',
  'https://cdn.simpleicons.org/openai/000000',
  'https://cdn.simpleicons.org/figma',
  'https://cdn.simpleicons.org/amazonaws',
  'https://cdn.simpleicons.org/googlecloud'
];

for (let i = 1; i <= 8; i++) {
  const oldSrc = `https://www.valuecoders.com/wp-content/themes/valuecoders/dev-img/crt-icons/ico-${i}.svg`;
  content = content.replace(oldSrc, newLogos[i-1]);
}

fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
