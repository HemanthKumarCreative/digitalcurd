const fs = require('fs');
const path = require('path');

function fixCss(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace all relative image paths with absolute remote URLs
    // Using a simple replace since Next.js parses CSS urls correctly without quotes
    content = content.replace(/url\(['"]?(?:\.\.\/)+images\/([^'"\)]+)['"]?\)/g, "url(https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/$1)");
    content = content.replace(/url\(['"]?(?:\.\.\/)+fonts\/([^'"\)]+)['"]?\)/g, "url(https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/fonts/$1)");
    content = content.replace(/url\(['"]?images\/([^'"\)]+)['"]?\)/g, "url(https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/$1)");
    content = content.replace(/url\(['"]?fonts\/([^'"\)]+)['"]?\)/g, "url(https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/fonts/$1)");
    content = content.replace(/url\(['"]?(?:\.\.\/)+dev-img\/([^'"\)]+)['"]?\)/g, "url(https://www.valuecoders.com/wp-content/themes/valuecoders/dev-img/$1)");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixCss(path.join(__dirname, 'src', 'app', 'menu-v9.css'));
if (fs.existsSync(path.join(__dirname, 'src', 'app', 'index-v10.css'))) {
    fixCss(path.join(__dirname, 'src', 'app', 'index-v10.css'));
}
if (fs.existsSync(path.join(__dirname, 'src', 'app', 'dev-style.css'))) {
    fixCss(path.join(__dirname, 'src', 'app', 'dev-style.css'));
}
