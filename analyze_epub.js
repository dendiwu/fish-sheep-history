const Epub = require('epub2').EPub;
const path = require('path');
const epubPath = path.join(__dirname, '鱼羊野史（全六卷）.epub');
const epub = new Epub(epubPath);

epub.on('end', function() {
    // 只看1月1日章节的详细结构
    const item = epub.spine.contents.find(c => c.id && c.title && c.title.includes('1月1日'));
    
    // 遍历所有章节找1月1日
    let found = false;
    epub.spine.contents.forEach((item, idx) => {
        if (found) return;
        
        epub.getChapter(item.id, function(err, text) {
            if (err || found) return;
            
            const titleMatch = text.match(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/);
            const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '') : '';
            
            if (title.includes('1月1日')) {
                found = true;
                
                // 按 h4 分割内容
                const sections = text.split(/<h4[^>]*>/);
                console.log('按h4分割后的段数:', sections.length);
                
                // 看前5个section的结构
                sections.slice(1, 6).forEach((section, i) => {
                    const h4TitleMatch = section.match(/^(.*?)<\/h4>/);
                    const h4Title = h4TitleMatch ? h4TitleMatch[1].replace(/<[^>]+>/g, '').trim() : '无标题';
                    
                    // 提取p标签内容
                    const pMatches = [...section.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
                    const pTexts = pMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(t => t.length > 0);
                    
                    console.log('\n--- Section ' + (i+1) + ' ---');
                    console.log('h4标题:', h4Title);
                    console.log('p段落数:', pTexts.length);
                    console.log('总字数:', pTexts.join('').length);
                    pTexts.forEach((p, j) => {
                        console.log('  p[' + j + '](' + p.length + '字): ' + p.substring(0, 80) + (p.length > 80 ? '...' : ''));
                    });
                });
            }
        });
    });
});

epub.parse();
