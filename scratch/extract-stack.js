const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

const regex = /<div class="client-stack">[\s\S]*?<\/div>/;
const match = content.match(regex);
if (match) {
  console.log(match[0]);
}
