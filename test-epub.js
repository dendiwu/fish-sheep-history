const Epub = require('epub2').EPub;
const path = require('path');

const epubPath = path.join(__dirname, '鱼羊野史（全六卷）.epub');

console.log('🔍 开始分析 EPUB 结构...\n');

const epub = new Epub(epubPath, '', '');

epub.on('error', (err) => {
    console.error('❌ EPUB 错误:', err);
});

epub.on('end', () => {
    console.log('✅ EPUB 解析完成!\n');
    console.log('📚 元数据:');
    console.log('  - 标题:', epub.metadata.title);
    console.log('  - 作者:', epub.metadata.creator);
    console.log('  - 语言:', epub.metadata.language);
    console.log('\n📋 目录结构 (前 50 个):');
    
    const toc = epub.toc;
    console.log(`  总目录项数: ${toc.length}\n`);
    
    // 打印前 50 个目录项
    for (let i = 0; i < Math.min(50, toc.length); i++) {
        const item = toc[i];
        console.log(`  [${i}] ${item.title} (id: ${item.id})`);
    }
    
    if (toc.length > 50) {
        console.log(`  ... 还有 ${toc.length - 50} 个`);
    }
    
    console.log('\n📝 尝试获取前 10 个章节的内容:');
    
    let processedCount = 0;
    let successCount = 0;
    
    const testCount = Math.min(10, toc.length);
    
    for (let i = 0; i < testCount; i++) {
        const item = toc[i];
        
        epub.getChapter(item.id, (err, text) => {
            processedCount++;
            
            if (err) {
                console.log(`  ❌ [${i}] ${item.title} - 错误: ${err.message}`);
            } else {
                const cleanText = text
                    .replace(/<[^>]*>/g, '')
                    .replace(/&nbsp;/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
                
                console.log(`  ✅ [${i}] ${item.title} - ${cleanText.length} 字符`);
                
                if (cleanText.length > 100) {
                    console.log(`    前 150 字符: "${cleanText.substring(0, 150)}..."`);
                    successCount++;
                }
            }
            
            if (processedCount === testCount) {
                console.log(`\n📊 测试结果: ${successCount}/${testCount} 个章节有内容`);
            }
        });
    }
});

epub.parse();
