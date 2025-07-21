const fs = require('fs');
const path = require('path');

function replaceAliasInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Only replace @/lib/ imports
  const regex = /from ['"]@\/lib\/(.*?)['"]/g;
  let changed = false;

  content = content.replace(regex, (match, importPath) => {
    // Calculate relative path from file to src/lib
    const fileDir = path.dirname(filePath);
    const libDir = path.resolve(__dirname, 'src', 'lib');
    let relPath = path.relative(fileDir, libDir);
    // Normalize for import (no leading ./, always use /)
    if (!relPath.startsWith('.')) relPath = './' + relPath;
    relPath = relPath.replace(/\\/g, '/');
    changed = true;
    return `from '${relPath}/${importPath}'`;
  });

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated:', filePath);
  }
}

function walk(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      replaceAliasInFile(fullPath);
    }
  });
}

// Start from src/
walk(path.join(__dirname, 'src'));
console.log('Done! Review your git diff and redeploy.');