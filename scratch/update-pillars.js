const fs = require('fs');

let content = fs.readFileSync('src/components/home/HomeContent.tsx', 'utf-8');

const sectionRegex = /<section data-rocket-location-hash="e1b5209b5f2da0c7e58f1c906cdfd2e1" class="delivery-models padding-t-120 padding-b-120">[\s\S]*?<\/section>/;

const newSection = `<section data-rocket-location-hash="e1b5209b5f2da0c7e58f1c906cdfd2e1" class="delivery-models padding-t-120 padding-b-120">
<div data-rocket-location-hash="508f734dc81ad1acedb07465d13fa49f" class="container">
<div data-rocket-location-hash="a12a1207031b9ca934d03a748feb7620" class="section-header">
<h2>Our Three Core Pillars</h2>
<p>At DigitalCurd, our approach is built on three core pillars that empower businesses to innovate, scale, and lead in the digital era. By combining Artificial Intelligence, modern digital engineering, and data-driven growth strategies, we deliver integrated solutions that accelerate transformation, improve customer experiences, and generate measurable business outcomes. Every project we undertake is guided by innovation, performance, and a commitment to long-term success.</p>
</div>
<div data-rocket-location-hash="bb7b4605ad65fb02fe445cba5579f773" class="models-grid">

<article class="model-card ">
<div class="card-top">
<div class="icon-box" style="font-size: 24px;">🤖</div>
<span class="badge">INNOVATE</span>
</div>
<h3><a href="#">AI Solutions</a></h3>
<p>We help businesses unlock the full potential of Artificial Intelligence through intelligent automation, AI agents, conversational chatbots, predictive analytics, and custom AI solutions.</p>
<div class="card-footer"><p>Our AI-first approach streamlines operations, enhances decision-making, and creates smarter customer experiences that drive efficiency, innovation, and sustainable growth.</p></div>
</article>

<article class="model-card highlighted">
<div class="card-top">
<div class="icon-box" style="font-size: 24px;">🌐</div>
<span class="badge">BUILD</span>
</div>
<h3>Digital Engineering</h3>
<p>We build high-performance websites, ecommerce platforms, and custom digital solutions using modern technologies like Next.js, React, Shopify, and cloud-native architectures.</p>
<div class="card-footer"><p>Every solution is designed for speed, scalability, security, and exceptional user experience, ensuring your digital foundation is ready for today's demands and tomorrow's opportunities.</p></div>
</article>

<article class="model-card ">
<div class="card-top">
<div class="icon-box" style="font-size: 24px;">📈</div>
<span class="badge">SCALE</span>
</div>
<h3><a href="#">Digital Growth & Analytics</a></h3>
<p>We accelerate business growth through strategic digital marketing, AI Search Optimization, SEO, performance advertising, conversion optimization, and advanced analytics.</p>
<div class="card-footer"><p>By combining data-driven insights with proven growth strategies, we help businesses attract the right audience, maximize marketing ROI, and make confident decisions that fuel long-term success.</p></div>
</article>

</div>
</div>
</section>`;

content = content.replace(sectionRegex, newSection);

fs.writeFileSync('src/components/home/HomeContent.tsx', content);
console.log('done');
