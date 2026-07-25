const fs = require('fs');

let content = fs.readFileSync('src/components/home/AiSection.tsx', 'utf-8');

const oldTitle = '<h2><em>Build an AI Ecosystem</em> That Drives Real Business Outcomes</h2>';
const newTitle = '<h2>Powerful Solutions. Measurable Business Growth.</h2>';

const oldDesc = '<p>We help enterprises move from experimentation to execution. From custom LLMs to workflow automation, we design, deploy, and scale AI systems that deliver measurable impact.</p>';
const newDesc = `<p>Technology is evolving faster than ever, and customer expectations continue to rise. Businesses need solutions that not only solve today's challenges but also prepare them for tomorrow's opportunities.</p>
            <p style={{ marginTop: '15px' }}>At DigitalCurd, we deliver integrated growth solutions designed to help businesses attract more customers, improve operational efficiency, increase revenue, and build a strong digital foundation for the future.</p>
            <p style={{ marginTop: '15px' }}>Explore our most in-demand solutions that combine AI, marketing, commerce, analytics, and modern engineering into one connected ecosystem.</p>`;

content = content.replace(oldTitle, newTitle);
content = content.replace(oldDesc, newDesc);

fs.writeFileSync('src/components/home/AiSection.tsx', content);
console.log('done');
