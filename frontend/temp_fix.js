const fs = require('fs');

// Fix URL in fallbackData.ts
let dataContent = fs.readFileSync('src/data/fallbackData.ts', 'utf8');
dataContent = dataContent.replace(
    /title: "AI-Powered Smart Campaign & Mail Queue Engine",\s*link: "https:\/\/aman-bulk-mailer\.vercel\.app\/",/g, 
    'title: "AI-Powered Smart Campaign & Mail Queue Engine",\n      link: "https://aman-bulk-mailer.vercel.app/",' // In case it was already replaced
);
// wait let's just do a generic replace
dataContent = dataContent.replace(/link: ".*?",\s*\/\/\s*or just match the previous link/g, ''); // no that's dangerous.

// I will just read fallbackData.ts first.
