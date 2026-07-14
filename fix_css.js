const fs = require('fs');
const path = require('path');

function fixCss(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    content = content.replace(/url\(images\//g, "url(https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/");
    content = content.replace(/url\('images\//g, "url('https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/");
    content = content.replace(/url\(\"images\//g, "url(\"https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/");
    
    fs.writeFileSync(filePath, content, 'utf8');
}

fixCss(path.join(__dirname, 'src', 'app', 'menu-v9.css'));
fixCss(path.join(__dirname, 'src', 'app', 'index-v10.css'));
fixCss(path.join(__dirname, 'src', 'app', 'dev-style.css'));
