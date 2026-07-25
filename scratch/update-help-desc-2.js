const fs = require('fs');

let content = fs.readFileSync('src/components/home/HelpSectionGrid.tsx', 'utf-8');

const oldDesc = '<p>We combine cutting-edge AI development with data-driven digital marketing to create scalable growth systems. Below are key scenarios where forward-thinking businesses partner with us to accelerate their success.</p>';
const newDesc = '<p>We combine cutting-edge AI development with data-driven digital marketing to build scalable growth systems for forward-thinking businesses.</p>';

content = content.replace(oldDesc, newDesc);

fs.writeFileSync('src/components/home/HelpSectionGrid.tsx', content);
console.log('done');
