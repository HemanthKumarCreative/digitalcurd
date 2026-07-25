const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

const regex = /<li class=\\"epfo-dt\\">[\s\S]*?<\/li>\\n/g;
content = content.replace(regex, '');

fs.writeFileSync('src/components/Footer.tsx', content);
console.log('done');
