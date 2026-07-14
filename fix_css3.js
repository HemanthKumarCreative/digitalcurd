const fs = require('fs');
const path = require('path');

function fixCss(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/url\(['"]?(?:(?:\.\.\/)+)?([^'"\)]+)['"]?\)/g, (match, p1) => {
        if (p1.startsWith('http') || p1.startsWith('data:')) return match;
        
        // Remove leading slash if present to avoid double slash
        if (p1.startsWith('/')) p1 = p1.substring(1);
        
        if (p1.startsWith('dev-img/')) {
            return `url(https://www.valuecoders.com/wp-content/themes/valuecoders/${p1})`;
        } else {
            return `url(https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/${p1})`;
        }
    });
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixCss(path.join(__dirname, 'src', 'app', 'menu-v9.css'));
fixCss(path.join(__dirname, 'src', 'app', 'index-v10.css'));
fixCss(path.join(__dirname, 'src', 'app', 'dev-style.css'));
