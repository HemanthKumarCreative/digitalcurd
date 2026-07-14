const fs = require('fs');
const original = fs.readFileSync('C:/Users/heman/.gemini/antigravity-ide/brain/c194b16f-dbfe-42f7-b496-193ad2c4ac44/.system_generated/steps/108/content.md', 'utf8');
const clone = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf8');

const getSections = (html) => {
  const matches = [...html.matchAll(/<section[^>]*class=\\?["']([^\\"']*)\\?["'][^>]*>/g)];
  return matches.map(m => m[1]);
};

console.log('--- Original Sections ---');
const originalSections = getSections(original);
originalSections.forEach((c, i) => console.log(`${i+1}. ${c}`));

console.log('\n--- Clone Sections ---');
const cloneSections = getSections(clone);
cloneSections.forEach((c, i) => console.log(`${i+1}. ${c}`));
