const fs = require('fs');
const path = require('path');

// Search entire workspace or other folders for ksl
function searchDir(dir, pattern) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!['node_modules', '.next', '.git'].includes(entry.name)) {
          searchDir(full, pattern);
        }
      } else {
        if (pattern.test(entry.name)) {
          console.log('Found matching file:', full);
        }
      }
    }
  } catch (e) {}
}

console.log('Searching workspace for *ksl*...');
searchDir('c:/Users/Itcomplex/Documents/GitHub/gdg_site_new', /ksl/i);

console.log('Searching C:/Users/Itcomplex/Downloads for *ksl* or *korn*...');
searchDir('C:/Users/Itcomplex/Downloads', /(ksl|korn)/i);

console.log('Searching C:/Users/Itcomplex/Desktop for *ksl* or *korn*...');
searchDir('C:/Users/Itcomplex/Desktop', /(ksl|korn)/i);
