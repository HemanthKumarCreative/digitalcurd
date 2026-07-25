const fs = require('fs');

let content = fs.readFileSync('src/components/home/FaqAccordion.tsx', 'utf-8');

const newFaqs = `const faqs = [
    { question: 'What does DigitalCurd do?', answer: <p>We provide AI solutions, digital marketing, Shopify development, websites, analytics, automation and creative services under one strategy.</p> },
    { question: 'Who do you work with?', answer: <p>Startups, SMEs, ecommerce brands, healthcare, SaaS, manufacturing and enterprise organizations.</p> },
    { question: 'Do you build Shopify stores?', answer: <p>Yes. We design, develop, migrate and optimize Shopify and Shopify Plus stores.</p> },
    { question: 'Can you redesign existing websites?', answer: <p>Yes. We modernize websites for better speed, SEO, UX and conversions.</p> },
    { question: 'Do you provide SEO?', answer: <p>Yes. Technical SEO, content SEO, local SEO and AI search optimization.</p> },
    { question: 'What is AI Search Optimization?', answer: <p>Optimizing content and structure so businesses are discoverable in AI-powered search experiences alongside traditional search.</p> },
    { question: 'Do you run Google Ads?', answer: <p>Yes. Search, Display, Shopping, Performance Max and remarketing campaigns.</p> },
    { question: 'Can you manage Meta Ads?', answer: <p>Yes. Facebook and Instagram campaigns focused on measurable ROI.</p> },
    { question: 'What is WhatsApp Automation?', answer: <p>Automated customer conversations for support, lead nurturing, order updates and engagement.</p> },
    { question: 'Do you develop AI chatbots?', answer: <p>Yes. AI assistants for customer service, lead qualification and knowledge management.</p> },
    { question: 'What analytics platforms do you support?', answer: <p>Power BI, GA4, GTM and executive dashboards.</p> },
    { question: 'Can you integrate CRM systems?', answer: <p>Yes. We integrate CRM, ecommerce, marketing and analytics platforms.</p> },
    { question: 'Do you offer branding?', answer: <p>Yes. Identity, UI/UX, creative assets and marketing collateral.</p> },
    { question: 'How do projects begin?', answer: <p>We start with a discovery workshop followed by a tailored roadmap.</p> },
    { question: 'Do you offer ongoing support?', answer: <p>Yes. Maintenance, optimization, reporting and continuous improvement.</p> },
    { question: 'How long does a website take?', answer: <p>Typically 4–12 weeks depending on complexity.</p> },
    { question: 'How is success measured?', answer: <p>Through agreed KPIs such as leads, revenue, conversions, engagement and operational efficiency.</p> },
    { question: 'Can small businesses work with you?', answer: <p>Absolutely. We offer scalable solutions suitable for growing businesses.</p> },
    { question: 'Do you provide enterprise solutions?', answer: <p>Yes. We support larger organizations with governance, analytics and transformation initiatives.</p> },
    { question: 'Why choose DigitalCurd?', answer: <p>Because we combine AI, marketing, commerce, engineering and analytics into one connected growth strategy focused on business outcomes.</p> }
  ];`;

content = content.replace(/const faqs = \[[\s\S]*?\];/, newFaqs);

fs.writeFileSync('src/components/home/FaqAccordion.tsx', content);
console.log('done');
