const fs = require('fs');
let content = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

const startStr = '<div data-rocket-location-hash=\\"c52f93b54e52f7755ad2b989b322a2a9\\" class=\\"dis-flex footer-top\\">';
const endStr = '<div data-rocket-location-hash=\\"9984d1240ea9f0eac724d28fbc8f7db6\\" class=\\"dis-flex footer-middle\\">';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.slice(0, startIndex) + content.slice(endIndex);
    fs.writeFileSync('src/components/Footer.tsx', content);
    console.log('done');
} else {
    console.log('could not find start or end index');
}
