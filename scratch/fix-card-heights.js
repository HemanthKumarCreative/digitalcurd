const fs = require('fs');

let content = fs.readFileSync('src/components/home/HelpSectionGrid.tsx', 'utf-8');

// Replace block styles with flex column styles
content = content.replace(
  /style=\{\{ display: 'block' \}\}/g,
  "style={{ display: 'flex', flexDirection: 'column', height: '100%' }}"
);

content = content.replace(
  /style=\{\{ display: isExpanded \? 'block' : 'none' \}\}/g,
  "style={{ display: isExpanded ? 'flex' : 'none', flexDirection: 'column', height: '100%' }}"
);

// Add flexGrow: 1 to the ul elements to push the bottom border down
content = content.replace(
  /<ul>/g,
  '<ul style={{ flexGrow: 1 }}>'
);

fs.writeFileSync('src/components/home/HelpSectionGrid.tsx', content);
console.log('done');
