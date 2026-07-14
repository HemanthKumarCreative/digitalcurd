import os

def fix_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace("url(images/", "url(https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/")
    content = content.replace("url('images/", "url('https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/")
    content = content.replace("url(\"images/", "url(\"https://www.valuecoders.com/wp-content/themes/valuecoders/v6.0/images/")
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_css(r'c:\Users\heman\.gemini\antigravity-ide\scratch\valuecoders-clone\src\app\menu-v9.css')
fix_css(r'c:\Users\heman\.gemini\antigravity-ide\scratch\valuecoders-clone\src\app\index-v10.css')
fix_css(r'c:\Users\heman\.gemini\antigravity-ide\scratch\valuecoders-clone\src\app\dev-style.css')
