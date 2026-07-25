const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

const logoUpdates = [
  { oldSrc: 'https://cdn.simpleicons.org/react', newSrc: 'https://cdn.simpleicons.org/react', name: 'React' },
  { oldSrc: 'https://cdn.simpleicons.org/nextdotjs/000000', newSrc: 'https://cdn.simpleicons.org/nextdotjs/000000', name: 'Next.js' },
  { oldSrc: 'https://cdn.simpleicons.org/vercel/000000', newSrc: 'https://cdn.simpleicons.org/vercel/000000', name: 'Vercel' },
  { oldSrc: 'https://cdn.simpleicons.org/stripe', newSrc: 'https://cdn.simpleicons.org/stripe', name: 'Stripe' },
  { oldSrc: 'https://cdn.simpleicons.org/openai/000000', newSrc: 'https://cdn.simpleicons.org/github/000000', name: 'GitHub' }, // fix 404
  { oldSrc: 'https://cdn.simpleicons.org/figma', newSrc: 'https://cdn.simpleicons.org/figma', name: 'Figma' },
  { oldSrc: 'https://cdn.simpleicons.org/amazonaws', newSrc: 'https://cdn.simpleicons.org/amazonwebservices/232F3E', name: 'AWS' }, // fix 404
  { oldSrc: 'https://cdn.simpleicons.org/googlecloud', newSrc: 'https://cdn.simpleicons.org/googlecloud', name: 'Google Cloud' }
];

logoUpdates.forEach(logo => {
  const oldStr = `<img loading="lazy" src="${logo.oldSrc}" alt="Valuecoders" width="107" height="50">`;
  const newStr = `<img loading="lazy" src="${logo.newSrc}" alt="${logo.name}" width="50" height="50" style="object-fit: contain; margin: 0 auto; display: block;">`;
  content = content.replace(oldStr, newStr);
});

fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
