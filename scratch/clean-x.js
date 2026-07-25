const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf-8');
content = content.replace(/<a href="https:\/\/x\.com\/ValueCoders"[\s\S]*?<\/a>\n\s*/g, '');
fs.writeFileSync('src/components/Footer.tsx', content);
console.log('done');
