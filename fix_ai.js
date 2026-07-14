const fs = require('fs');
let c = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf8');
c = c.replace(
  "import IndustriesCarouselWrapper from './IndustriesCarouselWrapper';",
  "import IndustriesCarouselWrapper from './IndustriesCarouselWrapper';\nimport AiSection from './AiSection';"
);
c = c.replace(/<!-- ai section start -->[\s\S]*?<!-- ai section end -->/, '');
c = c.replace(
  "<div dangerouslySetInnerHTML={{ __html: htmlPart2 }} />",
  "<AiSection />\n      <div dangerouslySetInnerHTML={{ __html: htmlPart2 }} />"
);
fs.writeFileSync('src/components/home/HomeContent.tsx', c);
