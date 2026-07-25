const fs = require('fs');

let content = fs.readFileSync('src/components/home/HelpSectionGrid.tsx', 'utf-8');

// The file might contain a <br /> or extra spaces, so let's use regex
const oldDescRegex = /<p>We combine cutting-edge AI development with data-driven digital marketing to create scalable growth systems\.[\s\S]*?accelerate their success\.<\/p>/;
const newDesc = '<p>We combine cutting-edge AI development with data-driven digital marketing to build scalable growth systems for forward-thinking businesses.</p>';

content = content.replace(oldDescRegex, newDesc);

fs.writeFileSync('src/components/home/HelpSectionGrid.tsx', content);
console.log('done');
