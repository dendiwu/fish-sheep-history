var data = JSON.parse(require('fs').readFileSync('data.js','utf8').replace('const storiesData = ','').replace(/;\s*$/,''));
var foreign = data.stories.filter(function(s) {
  return !(s.location.lng > 73 && s.location.lng < 136 && s.location.lat > 15 && s.location.lat < 55);
});
var wrongForeign = foreign.filter(function(s) {
  var c = s.title + ' ' + s.content;
  var hasChinese = /中国|北京|上海|广州|南京|武汉|西安|重庆|天津|成都|长沙|杭州|沈阳|哈尔滨|济南|郑州|昆明|贵阳|太原|兰州|拉萨|呼和浩特|乌鲁木齐|南宁|银川|西宁|石家庄|合肥|福州|南昌|海口|清朝|明朝|宋朝|唐朝|汉朝|秦朝|民国|北洋|国民政府|解放军|红军|八路军|新四军|太平天国|义和团|戊戌变法|辛亥革命|五四运动/.test(c.substring(0, 300));
  var hasForeign = /英国|伦敦|法国|巴黎|美国|纽约|华盛顿|德国|柏林|日本|东京|俄罗斯|莫斯科|意大利|罗马/.test(c.substring(0, 300));
  return hasChinese && !hasForeign;
});
console.log('中国故事被分到外国的数量:', wrongForeign.length);
wrongForeign.slice(0, 20).forEach(function(s) {
  console.log('  ' + s.title + ' -> ' + s.location.name);
});
