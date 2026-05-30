var data = JSON.parse(require('fs').readFileSync('data.js','utf8').replace('const storiesData = ','').replace(/;\s*$/,''));
var s = data.stories.find(function(s){return s.title.includes('北大西洋公约组织')});
console.log('标题:', s.title);
console.log('位置:', s.location.name);
console.log('内容前200字:', s.content.substring(0, 200));
