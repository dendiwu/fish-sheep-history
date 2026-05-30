const Epub = require('epub2').EPub;
const path = require('path');
const fs = require('fs');

const epubPath = path.join(__dirname, '鱼羊野史（全六卷）.epub');
const epub = new Epub(epubPath);

let chapterCount = 0;
let totalH4Sections = 0;
let totalStories = 0;
const allChapterStats = [];

epub.on('end', function() {
    const totalChapters = epub.spine.contents.length;
    console.log('总章节数:', totalChapters);
    
    let processed = 0;
    
    epub.spine.contents.forEach((item, idx) => {
        epub.getChapter(item.id, function(err, text) {
            if (err) {
                processed++;
                return;
            }
            
            const cleanText = text.replace(/<[^>]+>/g, '').trim();
            if (cleanText.length < 50) {
                processed++;
                return;
            }
            
            const h1Match = text.match(/<h[1-3][^>]*>(.*?)<\/h[1-3]>/);
            const chapterTitle = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : '';
            
            if (!chapterTitle || !chapterTitle.match(/\d+月\d+日/)) {
                processed++;
                return;
            }
            
            chapterCount++;
            
            const h4Sections = text.split(/<h4[^>]*>/);
            const h4Count = Math.max(0, h4Sections.length - 1);
            
            const pipeCount = (cleanText.match(/｜/g) || []).length;
            const doublePipeCount = (cleanText.match(/｜｜/g) || []).length;
            
            const stats = {
                title: chapterTitle,
                h4Count: h4Count,
                pipeCount: pipeCount,
                doublePipeCount: doublePipeCount,
                textLength: cleanText.length,
                sections: []
            };
            
            if (h4Count > 0) {
                h4Sections.slice(1).forEach((section, i) => {
                    const h4TitleMatch = section.match(/^(.*?)<\/h4>/);
                    const h4Title = h4TitleMatch ? h4TitleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
                    
                    const pMatches = [...section.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
                    const pTexts = pMatches.map(m => m[1].replace(/<[^>]+>/g, '').trim()).filter(t => t.length > 0);
                    const sectionText = pTexts.join('\n');
                    
                    stats.sections.push({
                        h4Title: h4Title,
                        textLength: sectionText.length,
                        preview: sectionText.substring(0, 120)
                    });
                });
            }
            
            allChapterStats.push(stats);
            totalH4Sections += h4Count;
            
            processed++;
            
            if (processed === totalChapters) {
                console.log('\n========== EPUB 结构分析 ==========');
                console.log('日期章节数:', chapterCount);
                console.log('h4子标题总数:', totalH4Sections);
                console.log('平均每章h4数:', (totalH4Sections / chapterCount).toFixed(1));
                
                const chaptersWithH4 = allChapterStats.filter(s => s.h4Count > 0).length;
                const chaptersWithoutH4 = allChapterStats.filter(s => s.h4Count === 0).length;
                console.log('有h4的章节数:', chaptersWithH4);
                console.log('无h4的章节数:', chaptersWithoutH4);
                
                console.log('\n========== 无h4的章节（前10个） ==========');
                allChapterStats.filter(s => s.h4Count === 0).slice(0, 10).forEach(s => {
                    console.log('\n章节:', s.title);
                    console.log('文本长度:', s.textLength);
                    console.log('｜符号数:', s.pipeCount);
                    console.log('｜｜符号数:', s.doublePipeCount);
                });
                
                console.log('\n========== 有h4的章节示例（前5个） ==========');
                allChapterStats.filter(s => s.h4Count > 0).slice(0, 5).forEach(s => {
                    console.log('\n章节:', s.title);
                    console.log('h4数量:', s.h4Count);
                    s.sections.forEach((sec, i) => {
                        console.log('  [' + (i+1) + '] ' + sec.h4Title + ' (' + sec.textLength + '字)');
                        console.log('      预览: ' + sec.preview.substring(0, 80));
                    });
                });
                
                console.log('\n========== h4数量分布 ==========');
                const h4Dist = {};
                allChapterStats.forEach(s => {
                    const key = s.h4Count;
                    h4Dist[key] = (h4Dist[key] || 0) + 1;
                });
                Object.keys(h4Dist).sort((a,b) => Number(a) - Number(b)).forEach(k => {
                    console.log('  ' + k + '个h4: ' + h4Dist[k] + '个章节');
                });
                
                const totalEstimatedStories = allChapterStats.reduce((sum, s) => {
                    return sum + Math.max(1, s.h4Count);
                }, 0);
                console.log('\n预估故事总数（按h4切分）:', totalEstimatedStories);
                
                fs.writeFileSync(
                    path.join(__dirname, 'epub_analysis.json'),
                    JSON.stringify(allChapterStats, null, 2),
                    'utf-8'
                );
                console.log('\n详细分析已保存到 epub_analysis.json');
            }
        });
    });
});

epub.parse();
