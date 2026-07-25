const fs = require('fs');

let content = fs.readFileSync('src/components/Header.tsx', 'utf-8');

const searchRegex = /\s*<div className="search" id="search-trigger"[\s\S]*?<\/div>/;

content = content.replace(searchRegex, '');

fs.writeFileSync('src/components/Header.tsx', content);
console.log('done');
