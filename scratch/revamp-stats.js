const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

content = content.replace(
  'Trusted by Startups and Fortune 500 companies',
  'Trusted by Innovative Brands & Ambitious Startups'
);

content = content.replace(
  '<h4>20+ years of experience</h4>',
  '<h4>15+ years of experience</h4>'
);

content = content.replace(
  '<p>We can handle projects </p>',
  '<p>Delivering digital excellence</p>'
);

content = content.replace(
  '<h4>4500 satisfied customers</h4>',
  '<h4>500+ successful projects</h4>'
);

content = content.replace(
  '<p>Startups to Fortune 500.</p>',
  '<p>From concepts to reality.</p>'
);

content = content.replace(
  '<h4>675+ in-house team</h4>',
  '<h4>50+ creative experts</h4>'
);

content = content.replace(
  '<p>Ensure your digital success.</p>',
  '<p>Dedicated to your success.</p>'
);

fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
