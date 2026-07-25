const fs = require('fs');

let content = fs.readFileSync('src/components/home/AiSection.tsx', 'utf-8');

// The main title is already correct, but I'll make sure it's perfect.
const titleRegex = /<h2>Powerful Solutions\. Measurable Business Growth\.<\/h2>/;
if (!titleRegex.test(content)) {
  content = content.replace(/<h2>.*?<\/h2>/, '<h2>Powerful Solutions. Measurable Business Growth.</h2>');
}

// Replace the long paragraph with just the first part
const descStartIdx = content.indexOf('<p>Technology is evolving faster');
const descEndIdx = content.indexOf('connected ecosystem.</p>') + 'connected ecosystem.</p>'.length;

if (descStartIdx > -1 && descEndIdx > descStartIdx) {
  const newDesc = `<p>Technology is evolving faster than ever, and customer expectations continue to rise. Businesses need solutions that not only solve today's challenges but also prepare them for tomorrow's opportunities.</p>`;
  content = content.substring(0, descStartIdx) + newDesc + content.substring(descEndIdx);
}

// Replace the items array
const newItems = `const items = [
    { title: 'Integrated Growth', desc: 'At DigitalCurd, we deliver integrated growth solutions designed to help businesses attract more customers and increase revenue.' },
    { title: 'Digital Foundation', desc: 'Improve operational efficiency and build a strong digital foundation for the future.' },
    { title: 'Connected Ecosystem', desc: 'Explore our most in-demand solutions that combine AI, marketing, commerce, analytics, and modern engineering.' }
  ];`;

content = content.replace(/const items = \[\s*\{[\s\S]*?\];/, newItems);

fs.writeFileSync('src/components/home/AiSection.tsx', content);
console.log('done');
