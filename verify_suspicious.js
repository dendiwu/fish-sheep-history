const path = require('path');
const fs = require('fs');
const data = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf-8');
const jsonStr = data.replace(/^const storiesData = /, '').replace(/;$/, '');
const d = JSON.parse(jsonStr);

var suspicious = [];
d.stories.forEach(function(s) {
    var title = s.title;
    var loc = s.location.name;
    var lat = s.location.lat;
    var lng = s.location.lng;

    if (title.includes('日本') && loc !== '东京' && loc !== '大阪' && loc !== '京都' && loc !== '长崎' && loc !== '广岛' && loc !== '横须贺' && loc !== '冲绳' && loc !== '横滨' && loc !== '名古屋' && loc !== '神户' && loc !== '福冈' && loc !== '札幌' && loc !== '那霸' && loc !== '鹿儿岛' && loc !== '关东' && loc !== '关西' && loc !== '硫磺岛') {
        suspicious.push('TITLE含"日本"但地点=' + loc + ': ' + title);
    }
    if (title.includes('美国') && loc !== '纽约' && loc !== '华盛顿' && loc !== '洛杉矶' && loc !== '旧金山' && loc !== '芝加哥' && loc !== '费城' && loc !== '波士顿' && loc !== '好莱坞' && loc !== '硅谷' && loc !== '卡纳维拉尔角' && loc !== '休斯敦' && loc !== '西点' && loc !== '檀香山' && loc !== '达拉斯' && loc !== '新奥尔良' && loc !== '迈阿密' && loc !== '拉斯维加斯' && loc !== '圣迭戈' && loc !== '夏威夷' && loc !== '阿拉斯加' && loc !== '亚特兰大' && loc !== '底特律' && loc !== '西雅图') {
        suspicious.push('TITLE含"美国"但地点=' + loc + ': ' + title);
    }
    if (title.includes('英国') && loc !== '伦敦' && loc !== '牛津' && loc !== '剑桥' && loc !== '曼彻斯特' && loc !== '利物浦' && loc !== '伊顿' && loc !== '爱丁堡' && loc !== '都柏林') {
        suspicious.push('TITLE含"英国"但地点=' + loc + ': ' + title);
    }
    if (title.includes('法国') && loc !== '巴黎' && loc !== '马赛' && loc !== '凡尔赛' && loc !== '色当' && loc !== '诺曼底' && loc !== '敦刻尔克' && loc !== '凡尔登' && loc !== '波尔多' && loc !== '里昂' && loc !== '图卢兹' && loc !== '斯特拉斯堡' && loc !== '鲁昂' && loc !== '奥尔良') {
        suspicious.push('TITLE含"法国"但地点=' + loc + ': ' + title);
    }
    if (title.includes('德国') && loc !== '柏林' && loc !== '慕尼黑' && loc !== '法兰克福' && loc !== '汉堡' && loc !== '德累斯顿' && loc !== '纽伦堡' && loc !== '科隆' && loc !== '莱比锡' && loc !== '波恩' && loc !== '魏玛' && loc !== '维滕贝格' && loc !== '波茨坦') {
        suspicious.push('TITLE含"德国"但地点=' + loc + ': ' + title);
    }
    if (title.includes('苏联') && loc !== '莫斯科' && loc !== '圣彼得堡' && loc !== '伏尔加格勒' && loc !== '库尔斯克' && loc !== '斯摩棱斯克' && loc !== '切尔诺贝利' && loc !== '明斯克' && loc !== '基辅' && loc !== '斯大林格勒' && loc !== '列宁格勒') {
        suspicious.push('TITLE含"苏联"但地点=' + loc + ': ' + title);
    }
});

console.log('=== 可疑匹配 (' + suspicious.length + ' 个) ===');
suspicious.forEach(function(s) { console.log(s); });

console.log('\n=== 地点分布 ===');
var locStats = {};
d.stories.forEach(function(s) {
    locStats[s.location.name] = (locStats[s.location.name] || 0) + 1;
});
Object.entries(locStats).sort(function(a,b) { return b[1]-a[1]; }).slice(0, 40).forEach(function(e) {
    console.log(e[0] + ': ' + e[1]);
});
