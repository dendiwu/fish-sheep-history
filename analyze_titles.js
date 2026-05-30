const data = require('./epub_analysis.json');
console.log('总章节数:', data.length);
console.log('有h4的:', data.filter(s => s.h4Count > 0).length);
console.log('无h4的:', data.filter(s => s.h4Count === 0).length);

const allH4Titles = [];
data.forEach(ch => {
    ch.sections.forEach(sec => {
        allH4Titles.push(sec.h4Title);
    });
});
console.log('h4标题总数:', allH4Titles.length);

const withPipe = allH4Titles.filter(t => t.includes('\uFF5C')).length;
const withoutPipe = allH4Titles.filter(t => !t.includes('\uFF5C')).length;
console.log('含｜的标题:', withPipe);
console.log('不含｜的标题:', withoutPipe);

const noPipeTitles = allH4Titles.filter(t => !t.includes('\uFF5C'));
console.log('\n不含｜的标题示例:');
noPipeTitles.slice(0, 20).forEach(t => console.log('  -', t));

const pipeTitles = allH4Titles.filter(t => t.includes('\uFF5C'));
console.log('\n含｜的标题示例:');
pipeTitles.slice(0, 20).forEach(t => console.log('  -', t));

const lengths = data.flatMap(ch => ch.sections.map(s => s.textLength));
console.log('\n文本长度统计:');
console.log('最短:', Math.min(...lengths));
console.log('最长:', Math.max(...lengths));
console.log('平均:', Math.round(lengths.reduce((a,b) => a+b, 0) / lengths.length));
console.log('中位数:', lengths.sort((a,b) => a-b)[Math.floor(lengths.length/2)]);
console.log('小于50字的:', lengths.filter(l => l < 50).length);
console.log('50-100字的:', lengths.filter(l => l >= 50 && l < 100).length);
console.log('100-500字的:', lengths.filter(l => l >= 100 && l < 500).length);
console.log('500字以上的:', lengths.filter(l => l >= 500).length);

// 输出所有h4标题到文件，方便后续分析
const fs = require('fs');
const titleList = allH4Titles.map((t, i) => (i+1) + '. ' + t);
fs.writeFileSync('h4_titles.txt', titleList.join('\n'), 'utf-8');
console.log('\n所有h4标题已保存到 h4_titles.txt');
