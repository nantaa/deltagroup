const fs = require('fs');
const path = require('path');

const projects = [
  {
    dir: 'delta-indonesia-pranenggar/frontend',
    replacements: [
      { from: /Delta Nusantara Persada/g, to: 'Delta Indonesia Pranenggar' },
      { from: /DELTA NUSANTARA PERSADA/g, to: 'DELTA INDONESIA PRANENGGAR' },
      { from: /DELTA NUSANTARA/g, to: 'DELTA INDONESIA' },
      { from: /PERSADA/g, to: 'PRANENGGAR' },
      { from: /delta-nusantara-persada/g, to: 'delta-indonesia-pranenggar' },
    ]
  },
  {
    dir: 'delta-lembaga-kursus/frontend',
    replacements: [
      { from: /Delta Nusantara Persada/g, to: 'Delta Lembaga Kursus' },
      { from: /DELTA NUSANTARA PERSADA/g, to: 'DELTA LEMBAGA KURSUS' },
      { from: /DELTA NUSANTARA/g, to: 'DELTA LEMBAGA' },
      { from: /PERSADA/g, to: 'KURSUS' },
      { from: /delta-nusantara-persada/g, to: 'delta-lembaga-kursus' },
    ]
  },
  {
    dir: 'biro-sertifikasi-indonesia/frontend',
    replacements: [
      { from: /Delta Nusantara Persada/g, to: 'Biro Sertifikasi Indonesia' },
      { from: /DELTA NUSANTARA PERSADA/g, to: 'BIRO SERTIFIKASI INDONESIA' },
      { from: /DELTA NUSANTARA/g, to: 'BIRO SERTIFIKASI' },
      { from: /PERSADA/g, to: 'INDONESIA' },
      { from: /delta-nusantara-persada/g, to: 'biro-sertifikasi-indonesia' },
    ]
  }
];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      if (!file.includes('node_modules') && !file.includes('.next')) {
        results = results.concat(walk(file));
      }
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.json')) {
        results.push(file);
      }
    }
  });
  return results;
}

projects.forEach(project => {
  const fullDir = path.join('d:\\Document Backup\\website-aryo\\delta-group', project.dir);
  const files = walk(fullDir);
  
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    
    project.replacements.forEach(r => {
      content = content.replace(r.from, r.to);
    });
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated: ${file}`);
    }
  });
});
