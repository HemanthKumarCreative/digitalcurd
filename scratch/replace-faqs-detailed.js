const fs = require('fs');

let content = fs.readFileSync('src/components/home/FaqAccordion.tsx', 'utf-8');

const newFaqs = `const faqs = [
  {
    question: 'What is DigitalCurd?',
    answer: <p>DigitalCurd is an AI-first digital transformation company that helps businesses accelerate growth through strategy, technology, marketing, and data. We specialize in AI solutions, modern web development, ecommerce, digital marketing, automation, analytics, and customer experience optimization. Our goal is to build scalable digital ecosystems that deliver measurable business outcomes, not just digital products.</p>
  },
  {
    question: 'What services does DigitalCurd offer?',
    answer: (
      <>
        <p>We provide end-to-end digital solutions, including:</p>
        <ul>
          <li>AI Consulting & AI Agent Development</li>
          <li>Website Design & Development</li>
          <li>Next.js & React Development</li>
          <li>Shopify & Shopify Plus Development</li>
          <li>Digital Marketing & Growth Strategy</li>
          <li>Search Engine Optimization (SEO)</li>
          <li>AI Search Optimization (AISO)</li>
          <li>Google Ads & Performance Marketing</li>
          <li>Meta & LinkedIn Advertising</li>
          <li>Marketing Automation</li>
          <li>WhatsApp Business Automation</li>
          <li>Power BI & Business Intelligence</li>
          <li>Google Analytics 4 (GA4) & GTM</li>
          <li>UI/UX Design & Branding</li>
          <li>CRM & API Integrations</li>
          <li>Website Maintenance & Support</li>
        </ul>
      </>
    )
  },
  {
    question: 'Who do you work with?',
    answer: <p>We partner with startups, small and medium-sized businesses (SMBs), enterprise organizations, ecommerce brands, healthcare and pharmaceutical companies, SaaS businesses, manufacturers, and professional service firms. Whether you're launching a new business or scaling globally, our solutions are tailored to your goals and industry.</p>
  },
  {
    question: 'What makes DigitalCurd different from other digital agencies?',
    answer: <p>Unlike traditional agencies that focus on a single service, DigitalCurd combines AI, engineering, digital marketing, analytics, automation, and creative design into one integrated strategy. We don't just deliver websites or campaigns—we build scalable digital solutions that improve customer experience, increase operational efficiency, and drive long-term business growth.</p>
  },
  {
    question: 'Do you build custom websites?',
    answer: <p>Yes. We design and develop high-performance, responsive, and SEO-friendly websites using modern technologies such as Next.js, React, Node.js, WordPress, and Shopify. Every website is built with scalability, security, performance, accessibility, and conversion optimization in mind.</p>
  },
  {
    question: 'Can you redesign our existing website?',
    answer: <p>Absolutely. Our website redesign services focus on improving user experience (UX), website speed, search engine visibility, accessibility, mobile responsiveness, and conversion rates. We modernize outdated websites while preserving your brand identity and business objectives.</p>
  },
  {
    question: 'Do you build Shopify and Shopify Plus stores?',
    answer: <p>Yes. We design, develop, migrate, and optimize Shopify and Shopify Plus stores. Our ecommerce services include custom theme development, store migration, payment gateway integration, subscription commerce, conversion rate optimization (CRO), third-party app integrations, and ongoing performance optimization.</p>
  },
  {
    question: 'What AI solutions do you provide?',
    answer: <p>We build practical AI solutions that improve productivity, customer engagement, and business efficiency. Our services include AI chatbots, AI agents, customer support automation, knowledge assistants, workflow automation, document intelligence, predictive analytics, and AI-powered business applications integrated with your existing systems.</p>
  },
  {
    question: 'What is AI Search Optimization (AISO)?',
    answer: <p>AI Search Optimization prepares your business for the future of search. We optimize your website, content, structured data, and digital presence so your business is discoverable in both traditional search engines and AI-powered search experiences. This helps improve visibility, authority, and brand discoverability as search continues to evolve.</p>
  },
  {
    question: 'Do you provide SEO services?',
    answer: <p>Yes. Our SEO services include technical SEO, on-page optimization, content strategy, local SEO, ecommerce SEO, international SEO, schema markup, Core Web Vitals optimization, link strategy, and ongoing performance monitoring. We focus on sustainable organic growth rather than short-term ranking improvements.</p>
  },
  {
    question: 'Do you manage paid advertising campaigns?',
    answer: <p>Yes. We manage Google Ads, Performance Max, Shopping Ads, Display Ads, YouTube Ads, Facebook Ads, Instagram Ads, LinkedIn Ads, and remarketing campaigns. Every campaign is optimized around measurable business goals such as qualified leads, return on ad spend (ROAS), customer acquisition cost (CAC), and revenue growth.</p>
  },
  {
    question: 'What analytics and reporting solutions do you provide?',
    answer: <p>We help businesses make data-driven decisions through Power BI dashboards, Google Analytics 4 (GA4), Google Tag Manager (GTM), marketing attribution, KPI dashboards, executive reporting, and business intelligence solutions. Our reports provide actionable insights that help improve marketing performance and operational efficiency.</p>
  },
  {
    question: 'Can you integrate our existing systems?',
    answer: <p>Yes. We integrate websites and applications with CRM platforms, ERP systems, payment gateways, marketing automation tools, ecommerce platforms, analytics solutions, APIs, cloud services, and third-party business applications to create seamless digital workflows.</p>
  },
  {
    question: 'What is your project delivery process?',
    answer: (
      <>
        <p>Every project follows a structured process:</p>
        <ul>
          <li>Discovery & Business Consultation</li>
          <li>Strategy & Solution Planning</li>
          <li>UX/UI Design</li>
          <li>Development & Integration</li>
          <li>Quality Assurance & Testing</li>
          <li>Launch & Deployment</li>
          <li>Training & Documentation</li>
          <li>Ongoing Support & Optimization</li>
        </ul>
        <p>This ensures transparency, faster delivery, and successful project outcomes.</p>
      </>
    )
  },
  {
    question: 'How long does a typical project take?',
    answer: <p>Project timelines depend on complexity and scope. A business website typically takes 4–8 weeks, while ecommerce platforms, enterprise applications, or AI-driven digital transformation projects may require 8–16 weeks or more. A detailed project timeline is provided before development begins.</p>
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: <p>Yes. We offer flexible support and maintenance plans that include performance monitoring, security updates, software upgrades, bug fixes, content updates, analytics reporting, SEO improvements, feature enhancements, and technical support to ensure your digital platforms continue to perform at their best.</p>
  },
  {
    question: 'Do you work with international clients?',
    answer: <p>Yes. We work with businesses across India, the United States, the United Kingdom, Australia, the Middle East, and other global markets. Our remote-first collaboration model, structured communication, and agile project management ensure seamless project delivery across different time zones.</p>
  },
  {
    question: 'How do you ensure quality and security?',
    answer: <p>Quality and security are integrated into every stage of our development process. We follow modern coding standards, responsive design principles, secure development practices, performance optimization, accessibility guidelines, code reviews, automated testing, and regular security updates to deliver reliable and scalable digital solutions.</p>
  },
  {
    question: 'How is project success measured?',
    answer: <p>Success is measured using clearly defined business KPIs established at the beginning of every project. Depending on your objectives, these may include website traffic, qualified leads, conversion rate, customer acquisition cost (CAC), return on investment (ROI), return on ad spend (ROAS), revenue growth, customer engagement, and operational efficiency.</p>
  },
  {
    question: 'Why should businesses choose DigitalCurd?',
    answer: <p>DigitalCurd combines business strategy, AI innovation, software engineering, digital marketing, ecommerce, analytics, and automation into one integrated partnership. Instead of delivering isolated services, we build scalable digital ecosystems that help businesses increase revenue, improve customer experiences, automate operations, and achieve sustainable long-term growth. Our commitment to transparency, measurable results, and continuous innovation makes us a trusted technology partner for ambitious organizations.</p>
  }
];`;

content = content.replace(/const faqs = \[[\s\S]*?\];/, newFaqs);

fs.writeFileSync('src/components/home/FaqAccordion.tsx', content);
console.log('done');
