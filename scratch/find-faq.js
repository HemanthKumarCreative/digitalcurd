const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

const match = content.match(/<section[^>]*class="[^"]*faq[^"]*"[^>]*>[\s\S]*?<\/section>/i);
if (match) {
  console.log("Found FAQ section");
} else {
  console.log("Not found by class faq, searching for string...");
  const index = content.indexOf('Frequently Asked Questions');
  console.log(index);
  if (index > -1) {
    console.log(content.substring(index - 200, index + 200));
  }
}
