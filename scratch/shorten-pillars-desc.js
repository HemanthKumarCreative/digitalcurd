const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

const oldParaRegex = /<p>At DigitalCurd, our approach is built on three core pillars that empower businesses to innovate, scale, and lead in the digital era\. By combining Artificial Intelligence, modern digital engineering, and data-driven growth strategies, we deliver integrated solutions that accelerate transformation, improve customer experiences, and generate measurable business outcomes\. Every project we undertake is guided by innovation, performance, and a commitment to long-term success\.<\/p>/;

const newPara = `<p>We empower businesses to innovate and scale by combining AI, modern digital engineering, and data-driven marketing to deliver integrated solutions that drive measurable growth and long-term success.</p>`;

content = content.replace(oldParaRegex, newPara);

fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
