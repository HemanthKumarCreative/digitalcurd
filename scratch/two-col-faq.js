const fs = require('fs');

let content = fs.readFileSync('src/components/home/FaqAccordion.tsx', 'utf-8');

const newReturnBlock = `return (
    <section style={{ backgroundColor: '#f9fbfc', padding: '100px 0', fontFamily: 'sans-serif' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 style={{ 
          fontSize: '40px', 
          fontWeight: 'bold', 
          marginBottom: '60px', 
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Frequently Asked Questions
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '30px', alignItems: 'start' }}>
          
          {/* LEFT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => {
              const actualIndex = index;
              const isActive = activeIndex === actualIndex;
              return (
                <div 
                  key={actualIndex}
                  style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '24px', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div 
                    onClick={() => toggleAccordion(actualIndex)}
                    style={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}
                  >
                    <h3 style={{ 
                      fontSize: '17px', 
                      fontWeight: '600', 
                      margin: 0, 
                      color: '#1a1a1a',
                      paddingRight: '20px',
                      lineHeight: '1.4'
                    }}>
                      {faq.question}
                    </h3>
                    
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isActive ? 'none' : '2px solid #00569c',
                      backgroundColor: isActive ? '#00569c' : 'transparent',
                      color: isActive ? '#ffffff' : '#00569c',
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}>
                      {isActive ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    style={{ 
                      maxHeight: isActive ? '1000px' : '0', 
                      overflow: 'hidden', 
                      transition: 'max-height 0.3s ease-in-out',
                      marginTop: isActive ? '16px' : '0',
                      color: '#555',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => {
              const actualIndex = index + Math.ceil(faqs.length / 2);
              const isActive = activeIndex === actualIndex;
              return (
                <div 
                  key={actualIndex}
                  style={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '24px', 
                    boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div 
                    onClick={() => toggleAccordion(actualIndex)}
                    style={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center' 
                    }}
                  >
                    <h3 style={{ 
                      fontSize: '17px', 
                      fontWeight: '600', 
                      margin: 0, 
                      color: '#1a1a1a',
                      paddingRight: '20px',
                      lineHeight: '1.4'
                    }}>
                      {faq.question}
                    </h3>
                    
                    <div style={{
                      minWidth: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: isActive ? 'none' : '2px solid #00569c',
                      backgroundColor: isActive ? '#00569c' : 'transparent',
                      color: isActive ? '#ffffff' : '#00569c',
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}>
                      {isActive ? (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      ) : (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      )}
                    </div>
                  </div>
                  
                  <div 
                    style={{ 
                      maxHeight: isActive ? '1000px' : '0', 
                      overflow: 'hidden', 
                      transition: 'max-height 0.3s ease-in-out',
                      marginTop: isActive ? '16px' : '0',
                      color: '#555',
                      fontSize: '15px',
                      lineHeight: '1.6'
                    }}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
`;

content = content.replace(/return \([\s\S]*?\);\n}/, newReturnBlock);

fs.writeFileSync('src/components/home/FaqAccordion.tsx', content);
console.log('done');
