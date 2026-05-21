const fs = require('fs');
const path = require('path');

const files = ['blog/page.tsx', 'privacy/page.tsx', 'security/page.tsx', 'demo/page.tsx', 'login/page.tsx', 'signup/page.tsx'];

files.forEach(f => {
  let p = path.join('src/app', f);
  if(fs.existsSync(p)) {
    let text = fs.readFileSync(p, 'utf8');
    
    // For pages with an existing footer <p> tag
    text = text.replace(/<p style=\{\{\s*color:\s*'#94a3b8'\s*\}\}>&copy; \{new Date\(\)\.getFullYear\(\)\}.*?<\/p>/g, '<p style={{ color: "#94a3b8" }}>&copy; {new Date().getFullYear()} MediCore Pro SaaS. Created by Farhana Aamir | Contact: <a href="mailto:farzunmir@gmail.com" style={{ color: "var(--primary-light)" }}>farzunmir@gmail.com</a></p>');
    
    fs.writeFileSync(p, text, 'utf8');
    console.log('Updated', p);
  }
});
