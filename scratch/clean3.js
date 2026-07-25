const fs = require('fs');
let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');
content = content.replace(/<!-- success story start -->[\s\S]*?<!-- success story end -->/g, '');
fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
