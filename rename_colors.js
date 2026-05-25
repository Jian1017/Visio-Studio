const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'web', 'index.html');
let content = fs.readFileSync(htmlPath, 'utf8');

// Replacements:
// 1. Color DB (e.g. code: 'H2')
content = content.replace(/code:\s*'H2'/g, "code: 'C01'");
content = content.replace(/code:\s*'H7'/g, "code: 'C02'");

// 2. Pixelator BW mode (e.g. 'H2' : 'H7')
content = content.replace(/['"]H2['"]\s*:\s*['"]H7['"]/g, "'C01' : 'C02'");
content = content.replace(/beadCode\s*===\s*['"]H2['"]/g, "beadCode === 'C01'");

// 3. App default paint color (e.g. c.code === 'H7')
content = content.replace(/c\.code\s*===\s*['"]H7['"]/g, "c.code === 'C02'");

// 4. HTML active color code
content = content.replace(/activePaintColorCode">H7<\/span>/g, 'activePaintColorCode">C02</span>');

fs.writeFileSync(htmlPath, content, 'utf8');
console.log('Successfully replaced H2/H7 with C01/C02 in index.html!');
