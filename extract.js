const fs = require('fs');
const cheerio = require('cheerio');

// Read the current HomeContent.tsx
const content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf8');

// The HTML is on line 4, inside `const htmlContent = "` ... `";`
// Let's extract it using a regex.
const htmlMatch = content.match(/const htmlContent = "(.*)";/);
if (!htmlMatch) {
  console.error("Could not find htmlContent string!");
  process.exit(1);
}

// Unescape quotes
let rawHtml = htmlMatch[1].replace(/\\"/g, '"');

// Load into cheerio
const $ = cheerio.load(rawHtml, { decodeEntities: false }, false);

// Extract the 5 sections
const extract = (selector, name) => {
  const el = $(selector);
  if (el.length === 0) {
    console.warn(`Warning: Could not find ${selector}`);
    return null;
  }
  const outerHtml = $.html(el);
  fs.writeFileSync(`src/components/home/RAW_${name}.html`, outerHtml, 'utf8');
  el.replaceWith(`___${name}___`);
  return outerHtml;
};

extract('.slide-logo-part', 'ClientLogosSlider');
extract('.help-section', 'HelpSectionGrid');
extract('.industries-section', 'IndustriesCarousel');
extract('.client-feedback', 'TestimonialsSlider');
extract('.faq-section-v10', 'FaqAccordion');

// Get the modified HTML
let newHtml = $.html();

// Escape quotes again for storing in JS strings
// newHtml = newHtml.replace(/"/g, '\\"');

// We will split the HTML by placeholders and create parts
const parts = newHtml.split(/___[A-Za-z]+___/);
const matches = [...newHtml.matchAll(/___([A-Za-z]+)___/g)].map(m => m[1]);

let newTsx = `import React from 'react';
import ClientLogosSlider from './ClientLogosSlider';
import HelpSectionGrid from './HelpSectionGrid';
import IndustriesCarousel from './IndustriesCarousel';
import TestimonialsSlider from './TestimonialsSlider';
import FaqAccordion from './FaqAccordion';

export default function HomeContent() {
`;

parts.forEach((p, i) => {
  newTsx += `  const htmlPart${i} = \`${p.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;\n`;
});

newTsx += `
  return (
    <>
`;

parts.forEach((p, i) => {
  newTsx += `      <div dangerouslySetInnerHTML={{ __html: htmlPart${i} }} />\n`;
  if (i < matches.length) {
    newTsx += `      <${matches[i]} />\n`;
  }
});

newTsx += `    </>
  );
}
`;

fs.writeFileSync('src/components/home/HomeContent.tsx', newTsx, 'utf8');
console.log("Successfully refactored HomeContent.tsx and extracted RAW html sections.");
