const path = require('path');
const fs = require('fs');
const data = fs.readFileSync(path.join(__dirname, 'data.js'), 'utf-8');
const jsonStr = data.replace(/^const storiesData = /, '').replace(/;$/, '');
const d = JSON.parse(jsonStr);

const keywords = [
    '登月', '挑战者号', '切尔诺贝利', '古巴导弹', '柏林战役',
    '莱特湾', '阿拉曼', '平型关', '北伐战争', '义和团',
    '戊戌变法', '洋务运动', '文艺复兴', '大航海时代', '工业革命',
    '冷战', '海湾战争', '楚汉之争', '贞观之治', '开元盛世',
    '郑和下西洋', '焚书坑儒', '玄武门之变', '杯酒释兵权', '虎门销烟',
    '武昌起义', '平津战役', '淮海战役', '渡江战役', '遵义会议',
    '南昌起义', '秋收起义'
];

keywords.forEach(function(keyword) {
    const found = d.stories.filter(function(s) {
        return s.content.includes(keyword);
    });
    if (found.length > 0) {
        found.forEach(function(s) {
            console.log('[' + keyword + '] title="' + s.title + '" -> ' + s.location.name);
        });
    } else {
        console.log('[' + keyword + '] NOT FOUND IN CONTENT');
    }
});
