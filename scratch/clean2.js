const fs = require('fs');
let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');
content = content.replace(/<section data-rocket-location-hash="4baae5500584045aa45abe7895d804b0"[\s\S]*?<\/section>/g, '');
fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
