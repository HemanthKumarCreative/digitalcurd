const fs = require('fs');
let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');
content = content.replace(/<section data-rocket-location-hash="a9321660a03d24930dfd3c43ee4a37f9"[\s\S]*?<\/section>/g, '');
fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
