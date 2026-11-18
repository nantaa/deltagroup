const https = require('https');

https.get('https://deltanusa.co.id', { rejectUnauthorized: false }, (res) => {
  console.log('HTTP Status:', res.statusCode);
  console.log('Headers:', res.headers);
  let html = '';
  res.on('data', c => html += c);
  res.on('end', () => {
    console.log('HTML length:', html.length);
    const navMatch = html.match(/<nav[\s\S]*?<\/nav>/i);
    if (navMatch) {
      console.log('NAV HTML:', navMatch[0].substring(0, 400));
    }
    const logos = html.match(/[^"'<>]*(?:Logo|logo|DNP)[^"'<>]*/gi);
    console.log('Matching logo strings:', logos ? [...new Set(logos)] : 'None');
  });
}).on('error', e => console.error(e));

