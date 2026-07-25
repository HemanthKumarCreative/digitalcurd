const fs = require('fs');

let content = fs.readFileSync('src/components/Footer.tsx', 'utf-8');

const startStr = '<div data-rocket-location-hash=\\"9984d1240ea9f0eac724d28fbc8f7db6\\" class=\\"dis-flex footer-middle\\">';
const endStr = '<div data-rocket-location-hash=\\"ff2b1e33cb798c9e700790fcd946d0f4\\" class=\\"dis-flex footer-bottom\\">';

const startIndex = content.indexOf(startStr);
const endIndex = content.indexOf(endStr);

if (startIndex !== -1 && endIndex !== -1) {
    let newMiddle = `${startStr}
      <div class=\\"flex-5\\">
        <h4>AI &amp; Automation</h4>
        <ul>
          <li><a href=\\"/ai/consulting-services-company\\">AI Agents</a></li>
          <li><a href=\\"/ai/ai-augmented-software-development\\">AI Chatbots</a></li>
          <li><a href=\\"/ai/generative-ai-services\\">AI Search Optimization (AEO/GEO)</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">Workflow Automation</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">AI for Customer Support</a></li>
        </ul>
      </div>
      <div class=\\"flex-5\\">
        <h4>Growth Marketing</h4>
        <ul>
          <li><a href=\\"/ai/custom-ai-agent-development\\">SEO</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">Performance Marketing</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">Google Ads</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">Meta Ads</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">LinkedIn Ads</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">Content Marketing</a></li>
          <li><a href=\\"/ai/custom-ai-agent-development\\">WhatsApp Marketing</a></li>
        </ul>
      </div>
      <div class=\\"flex-5\\">
        <h4>ECommerce</h4>
        <ul>
          <li><a href=\\"/data-engineering\\">Shopify Development</a></li>
          <li><a href=\\"/data-analytics\\">WooCommerce</a></li>
          <li><a href=\\"/data/warehouse\\">Wordpress</a></li>
        </ul>
      </div>
      <div class=\\"flex-5\\">
        <h4>Digital Engineering</h4>
        <ul>
          <li><a href=\\"/salesforce\\">Website Development</a></li>
          <li><a href=\\"/hire/sap-developers\\">Next.js</a></li>
          <li><a href=\\"/servicenow-development\\">React</a></li>
          <li><a href=\\"/microsoft-dynamics\\">Headless CMS</a></li>
          <li><a href=\\"/services/system-integration\\">API Integration</a></li>
          <li><a href=\\"/services/progressive-web-apps\\">Progressive Web Apps</a></li>
        </ul>
      </div>
      <div class=\\"flex-5\\">
        <h4>Creative Studio</h4>
        <ul>
          <li><a href=\\"/digital-transformation-services\\">Brand Materials</a></li>
          <li><a href=\\"/it-strategy-consulting-firms\\">UI/UX</a></li>
          <li><a href=\\"/services/cybersecurity\\">Graphic Design</a></li>
          <li><a href=\\"/services/quality-engineering\\">Video Production</a></li>
        </ul>
      </div>
    </div>\\n    `;
    
    newMiddle = newMiddle.replace(/\n/g, '\\n');
    
    content = content.slice(0, startIndex) + newMiddle + content.slice(endIndex);
    fs.writeFileSync('src/components/Footer.tsx', content);
    console.log('done');
} else {
    console.log('Could not find boundaries');
}
