const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

const capabilitiesRegex = /<!-- capblieties secton start -->[\s\S]*?<!-- capblieties secton end-->/g;

content = content.replace(capabilitiesRegex, '');

fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
