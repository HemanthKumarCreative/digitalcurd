const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

console.log(content.indexOf('Trusted by Startups and Fortune 500 companies'));
console.log(content.indexOf('<h4>20+ years of experience</h4>'));
console.log(content.indexOf('<p>We can handle projects </p>'));
console.log(content.indexOf('<h4>4500 satisfied customers</h4>'));
console.log(content.indexOf('<p>Startups to Fortune 500.</p>'));
console.log(content.indexOf('<h4>675+ in-house team</h4>'));
console.log(content.indexOf('<p>Ensure your digital success.</p>'));

