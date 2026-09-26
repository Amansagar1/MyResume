const fs = require('fs');
let code = fs.readFileSync('src/components/Contact.tsx', 'utf8');
code = code.replace(/import CyberCube3D from "\.\/CyberCube3D";\r?\n/, '');
fs.writeFileSync('src/components/Contact.tsx', code);
console.log('Fixed Contact.tsx');
