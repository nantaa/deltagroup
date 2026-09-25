async function testSeo() {
  console.log('--- FETCHING HOMEPAGE ---');
  const homeRes = await fetch('https://deltanusa.co.id');
  const homeHtml = await homeRes.text();

  console.log('HTTP Status:', homeRes.status, homeRes.statusText);
  console.log('Server Header:', homeRes.headers.get('server'));
  console.log('Content-Type:', homeRes.headers.get('content-type'));

  console.log('\n--- PRIMARY SEO TAGS ---');
  const titleMatch = homeHtml.match(/<title>([^<]*)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

  const metaDesc = homeHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || homeHtml.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  console.log('Description:', metaDesc ? metaDesc[1] : 'NOT FOUND');

  const metaKeywords = homeHtml.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["']/i);
  console.log('Keywords:', metaKeywords ? metaKeywords[1] : 'NOT FOUND');

  const canonical = homeHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  console.log('Canonical:', canonical ? canonical[1] : 'NOT FOUND');

  const robots = homeHtml.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  console.log('Robots:', robots ? robots[1] : 'NOT FOUND');

  console.log('\n--- OPEN GRAPH TAGS ---');
  const ogMatches = [...homeHtml.matchAll(/<meta[^>]*property=["'](og:[^"']+)["'][^>]*content=["']([^"']*)["']/gi)];
  ogMatches.forEach(m => console.log(`${m[1]}: ${m[2]}`));

  console.log('\n--- TWITTER CARDS ---');
  const twMatches = [...homeHtml.matchAll(/<meta[^>]*name=["'](twitter:[^"']+)["'][^>]*content=["']([^"']*)["']/gi)];
  twMatches.forEach(m => console.log(`${m[1]}: ${m[2]}`));

  console.log('\n--- OPEN GRAPH IMAGE VERIFICATION ---');
  const ogImg = ogMatches.find(m => m[1] === 'og:image');
  if (ogImg) {
    let imgUrl = ogImg[2];
    if (imgUrl.startsWith('/')) imgUrl = 'https://deltanusa.co.id' + imgUrl;
    try {
      const imgRes = await fetch(imgUrl, { method: 'HEAD' });
      console.log(`Image [${imgUrl}] -> HTTP ${imgRes.status} (${imgRes.headers.get('content-type')})`);
    } catch(e) {
      console.log('Failed to fetch image:', e.message);
    }
  }

  console.log('\n--- STRUCTURED DATA (JSON-LD) ---');
  const jsonLd = [...homeHtml.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  console.log(`Found ${jsonLd.length} JSON-LD block(s)`);
  jsonLd.forEach((b, i) => {
    try {
      const parsed = JSON.parse(b[1]);
      console.log(`Block ${i + 1}:`, JSON.stringify(parsed, null, 2));
    } catch(e) {
      console.log(`Block ${i + 1} invalid JSON:`, e.message);
    }
  });

  console.log('\n--- ROBOTS.TXT ---');
  const robotsRes = await fetch('https://deltanusa.co.id/robots.txt');
  console.log('robots.txt status:', robotsRes.status);
  const robotsTxt = await robotsRes.text();
  console.log(robotsTxt.trim());

  console.log('\n--- SITEMAP.XML ---');
  const sitemapRes = await fetch('https://deltanusa.co.id/sitemap.xml');
  console.log('sitemap.xml status:', sitemapRes.status);
  const sitemapTxt = await sitemapRes.text();
  const urlCount = (sitemapTxt.match(/<loc>/g) || []).length;
  console.log('Total URLs indexed:', urlCount);
  const locMatches = [...sitemapTxt.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log('Sample locs:', locMatches.slice(0, 10));

  // If there's an article URL, test its dynamic meta tags!
  const articleUrl = locMatches.find(u => u.includes('/berita/'));
  if (articleUrl) {
    console.log(`\n--- DYNAMIC ARTICLE SEO (${articleUrl}) ---`);
    const artRes = await fetch(articleUrl);
    const artHtml = await artRes.text();
    const artTitle = artHtml.match(/<title>([^<]*)<\/title>/i);
    const artDesc = artHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || artHtml.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
    console.log('Article Title:', artTitle ? artTitle[1] : 'NOT FOUND');
    console.log('Article Description:', artDesc ? artDesc[1] : 'NOT FOUND');
    const artOg = [...artHtml.matchAll(/<meta[^>]*property=["'](og:[^"']+)["'][^>]*content=["']([^"']*)["']/gi)];
    artOg.forEach(m => console.log(`${m[1]}: ${m[2]}`));

    const artJsonLd = [...artHtml.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    console.log(`Article JSON-LD blocks: ${artJsonLd.length}`);
    artJsonLd.forEach((b, i) => {
      try {
        console.log(`Article Schema ${i+1}:`, JSON.stringify(JSON.parse(b[1]), null, 2));
      } catch(e) {}
    });
  }

  console.log('\n--- BACKEND API CHECK ---');
  const apiRes = await fetch('https://api.deltanusa.co.id/api/posts');
  console.log('API /api/posts status:', apiRes.status);
  const apiData = await apiRes.json();
  console.log('Total posts in database:', apiData.data ? apiData.data.length : (Array.isArray(apiData) ? apiData.length : 'Unknown'));
}

testSeo().catch(console.error);
