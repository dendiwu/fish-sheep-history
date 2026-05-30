const Epub = require('epub2').EPub;
const path = require('path');
const fs = require('fs');

const epubPath = path.join(__dirname, '鱼羊野史（全六卷）.epub');

const locationsDB = {
    '关东大地震': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 25 },
    '珍珠港事件': { lat: 21.3963, lng: -157.9772, name: '珍珠港', priority: 25 },
    '中途岛海战': { lat: 28.2715, lng: -177.2169, name: '中途岛', priority: 25 },
    '诺曼底登陆': { lat: 49.3375, lng: -0.6670, name: '诺曼底', priority: 25 },
    '敦刻尔克大撤退': { lat: 51.0343, lng: 2.3730, name: '敦刻尔克', priority: 25 },
    '斯大林格勒保卫战': { lat: 48.7223, lng: 44.5133, name: '伏尔加格勒', priority: 25 },
    '阿拉曼战役': { lat: 30.9742, lng: 27.3378, name: '阿拉曼', priority: 25 },
    '卢沟桥事变': { lat: 39.9242, lng: 116.1739, name: '北京', priority: 25 },
    '南京大屠杀': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '西安事变': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '九一八事变': { lat: 41.8047, lng: 123.4328, name: '沈阳', priority: 25 },
    '七七事变': { lat: 39.9242, lng: 116.1739, name: '北京', priority: 25 },
    '淞沪会战': { lat: 31.2304, lng: 121.4737, name: '上海', priority: 25 },
    '台儿庄战役': { lat: 34.5366, lng: 117.7176, name: '枣庄', priority: 25 },
    '武汉会战': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 25 },
    '长沙会战': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 25 },
    '渡江战役': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '开国大典': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '鸦片战争': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 25 },
    '甲午战争': { lat: 37.9269, lng: 121.6223, name: '威海', priority: 25 },
    '八国联军': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '太平天国': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '辛亥革命': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 25 },
    '五四运动': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '南昌起义': { lat: 28.6871, lng: 115.8573, name: '南昌', priority: 25 },
    '秋收起义': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 25 },
    '遵义会议': { lat: 27.7172, lng: 106.9186, name: '遵义', priority: 25 },
    '抗美援朝': { lat: 39.0392, lng: 125.7625, name: '平壤', priority: 25 },
    '波苏战争': { lat: 52.2297, lng: 21.0122, name: '华沙', priority: 25 },
    '苏波战争': { lat: 52.2297, lng: 21.0122, name: '华沙', priority: 25 },
    '马岛战争': { lat: -51.7000, lng: -59.0000, name: '福克兰群岛', priority: 25 },
    '福克兰群岛': { lat: -51.7000, lng: -59.0000, name: '福克兰群岛', priority: 25 },
    '法国大革命': { lat: 48.8566, lng: 2.3522, name: '巴黎', priority: 25 },
    '美国独立战争': { lat: 39.9526, lng: -75.1652, name: '费城', priority: 25 },
    '南北战争': { lat: 38.9072, lng: -77.0369, name: '华盛顿', priority: 25 },
    '明治维新': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 25 },
    '戊戌变法': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '洋务运动': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '义和团': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '北伐战争': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 25 },
    '解放战争': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '抗日战争': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '安史之乱': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '靖康之变': { lat: 34.7973, lng: 114.3074, name: '开封', priority: 25 },
    '郑和下西洋': { lat: 32.0617, lng: 118.7778, name: '南京', priority: 25 },
    '焚书坑儒': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '玄武门之变': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '杯酒释兵权': { lat: 34.7973, lng: 114.3074, name: '开封', priority: 25 },
    '虎门销烟': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 25 },
    '武昌起义': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 25 },
    '百团大战': { lat: 37.8716, lng: 112.5492, name: '太原', priority: 25 },
    '平津战役': { lat: 39.1422, lng: 117.2070, name: '天津', priority: 25 },
    '辽沈战役': { lat: 41.8047, lng: 123.4328, name: '沈阳', priority: 25 },
    '淮海战役': { lat: 34.2621, lng: 117.1832, name: '徐州', priority: 25 },
    '工业革命': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 25 },
    '文艺复兴': { lat: 43.7696, lng: 11.2558, name: '佛罗伦萨', priority: 25 },
    '宗教改革': { lat: 51.8670, lng: 11.6800, name: '维滕贝格', priority: 25 },
    '大航海时代': { lat: 38.7223, lng: -9.1393, name: '里斯本', priority: 25 },
    '十字军东征': { lat: 41.9028, lng: 12.4964, name: '罗马', priority: 25 },
    '冷战': { lat: 38.9072, lng: -77.0369, name: '华盛顿', priority: 25 },
    '海湾战争': { lat: 33.3152, lng: 44.3661, name: '巴格达', priority: 25 },

    '北平': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 20 },
    '北京': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 20 },
    '紫禁城': { lat: 39.9163, lng: 116.3972, name: '北京', priority: 20 },
    '天安门': { lat: 39.9055, lng: 116.3976, name: '北京', priority: 20 },
    '南京': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 20 },
    '上海': { lat: 31.2304, lng: 121.4737, name: '上海', priority: 20 },
    '西安': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 20 },
    '长安': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 20 },
    '洛阳': { lat: 34.6197, lng: 112.4539, name: '洛阳', priority: 20 },
    '开封': { lat: 34.7973, lng: 114.3074, name: '开封', priority: 20 },
    '杭州': { lat: 30.2741, lng: 120.1551, name: '杭州', priority: 20 },
    '苏州': { lat: 31.3251, lng: 120.6298, name: '苏州', priority: 20 },
    '广州': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 20 },
    '成都': { lat: 30.5728, lng: 104.0668, name: '成都', priority: 20 },
    '重庆': { lat: 29.4316, lng: 106.9123, name: '重庆', priority: 20 },
    '武汉': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 20 },
    '长沙': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 20 },
    '昆明': { lat: 25.0389, lng: 102.7183, name: '昆明', priority: 20 },
    '沈阳': { lat: 41.8047, lng: 123.4328, name: '沈阳', priority: 20 },
    '天津': { lat: 39.1422, lng: 117.2070, name: '天津', priority: 20 },
    '青岛': { lat: 36.0671, lng: 120.3826, name: '青岛', priority: 20 },
    '厦门': { lat: 24.4798, lng: 118.0894, name: '厦门', priority: 20 },
    '香港': { lat: 22.3193, lng: 114.1694, name: '香港', priority: 20 },
    '台湾': { lat: 23.6978, lng: 120.9605, name: '台湾', priority: 20 },
    '澳门': { lat: 22.1987, lng: 113.5439, name: '澳门', priority: 20 },
    '遵义': { lat: 27.7172, lng: 106.9186, name: '遵义', priority: 20 },
    '南昌': { lat: 28.6871, lng: 115.8573, name: '南昌', priority: 20 },
    '延安': { lat: 36.5658, lng: 109.4272, name: '延安', priority: 20 },
    '大同': { lat: 39.8262, lng: 113.4062, name: '大同', priority: 20 },
    '威海': { lat: 37.5569, lng: 122.1059, name: '威海', priority: 20 },
    '徐州': { lat: 34.2621, lng: 117.1832, name: '徐州', priority: 20 },
    '济南': { lat: 36.6762, lng: 116.9898, name: '济南', priority: 20 },
    '太原': { lat: 37.8716, lng: 112.5492, name: '太原', priority: 20 },
    '大连': { lat: 38.9140, lng: 121.6147, name: '大连', priority: 20 },
    '长春': { lat: 43.8868, lng: 125.3231, name: '长春', priority: 20 },
    '哈尔滨': { lat: 45.8038, lng: 126.5351, name: '哈尔滨', priority: 20 },
    '合肥': { lat: 31.8654, lng: 117.2272, name: '合肥', priority: 20 },
    '南宁': { lat: 22.8155, lng: 108.3201, name: '南宁', priority: 20 },
    '桂林': { lat: 25.2741, lng: 110.2993, name: '桂林', priority: 20 },
    '拉萨': { lat: 29.6549, lng: 91.1405, name: '拉萨', priority: 20 },
    '西宁': { lat: 36.6271, lng: 101.7782, name: '西宁', priority: 20 },
    '乌鲁木齐': { lat: 43.8041, lng: 87.6068, name: '乌鲁木齐', priority: 20 },
    '兰州': { lat: 36.0611, lng: 103.8343, name: '兰州', priority: 20 },
    '贵阳': { lat: 26.5783, lng: 106.7131, name: '贵阳', priority: 20 },
    '银川': { lat: 38.4781, lng: 106.2756, name: '银川', priority: 20 },
    '呼和浩特': { lat: 40.8175, lng: 111.6558, name: '呼和浩特', priority: 20 },
    '福州': { lat: 26.0745, lng: 119.2965, name: '福州', priority: 20 },
    '泉州': { lat: 24.8741, lng: 118.6757, name: '泉州', priority: 20 },
    '郑州': { lat: 34.7466, lng: 113.6253, name: '郑州', priority: 20 },
    '石家庄': { lat: 38.0423, lng: 114.5075, name: '石家庄', priority: 20 },
    '保定': { lat: 38.8739, lng: 115.4646, name: '保定', priority: 20 },
    '承德': { lat: 40.9762, lng: 117.9626, name: '承德', priority: 20 },
    '景德镇': { lat: 29.2687, lng: 117.1784, name: '景德镇', priority: 20 },
    '曲阜': { lat: 35.5797, lng: 116.9862, name: '曲阜', priority: 20 },
    '敦煌': { lat: 40.1421, lng: 94.6619, name: '敦煌', priority: 20 },
    '丽江': { lat: 26.8642, lng: 100.2365, name: '丽江', priority: 20 },
    '大理': { lat: 25.6065, lng: 100.2676, name: '大理', priority: 20 },
    '宜宾': { lat: 28.7643, lng: 104.6246, name: '宜宾', priority: 20 },
    '乐山': { lat: 29.5630, lng: 103.7619, name: '乐山', priority: 20 },
    '达州': { lat: 31.2134, lng: 107.5008, name: '达州', priority: 20 },
    '海南': { lat: 19.0330, lng: 110.3355, name: '海南', priority: 20 },
    '海口': { lat: 20.0333, lng: 110.3500, name: '海口', priority: 20 },
    '三亚': { lat: 18.2208, lng: 109.8333, name: '三亚', priority: 20 },
    '北海': { lat: 21.4815, lng: 109.1158, name: '北海', priority: 20 },
    '烟台': { lat: 37.5333, lng: 121.4333, name: '烟台', priority: 20 },
    '锦州': { lat: 41.1424, lng: 121.1563, name: '锦州', priority: 20 },
    '包头': { lat: 40.6576, lng: 109.8306, name: '包头', priority: 20 },
    '安阳': { lat: 36.1052, lng: 114.3534, name: '安阳', priority: 20 },
    '南阳': { lat: 33.0143, lng: 112.5359, name: '南阳', priority: 20 },
    '瑞金': { lat: 25.8229, lng: 116.0241, name: '瑞金', priority: 20 },
    '百色': { lat: 23.8112, lng: 106.6167, name: '百色', priority: 20 },
    '延安': { lat: 36.5658, lng: 109.4272, name: '延安', priority: 20 },
    '枣庄': { lat: 34.5366, lng: 117.7176, name: '枣庄', priority: 20 },

    '关东': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 18 },
    '长崎': { lat: 32.7447, lng: 129.8737, name: '长崎', priority: 18 },
    '广岛': { lat: 34.3964, lng: 132.4595, name: '广岛', priority: 18 },
    '冲绳': { lat: 26.2124, lng: 127.6809, name: '冲绳', priority: 18 },
    '硫磺岛': { lat: 24.7869, lng: 141.3093, name: '硫磺岛', priority: 18 },
    '东京': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 18 },
    '日本': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 18 },
    '大阪': { lat: 34.6937, lng: 135.5023, name: '大阪', priority: 18 },
    '京都': { lat: 35.0116, lng: 135.7681, name: '京都', priority: 18 },
    '奈良': { lat: 34.6851, lng: 135.8048, name: '奈良', priority: 18 },
    '横滨': { lat: 35.4437, lng: 139.6380, name: '横滨', priority: 18 },
    '名古屋': { lat: 35.1815, lng: 136.9066, name: '名古屋', priority: 18 },
    '汉城': { lat: 37.5665, lng: 126.9780, name: '首尔', priority: 18 },
    '韩国': { lat: 37.5665, lng: 126.9780, name: '首尔', priority: 18 },
    '首尔': { lat: 37.5665, lng: 126.9780, name: '首尔', priority: 18 },
    '平壤': { lat: 39.0392, lng: 125.7625, name: '平壤', priority: 18 },
    '朝鲜': { lat: 39.0392, lng: 125.7625, name: '平壤', priority: 18 },
    '苏联': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 18 },
    '俄罗斯': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 18 },
    '莫斯科': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 18 },
    '圣彼得堡': { lat: 59.9343, lng: 30.3351, name: '圣彼得堡', priority: 18 },
    '列宁格勒': { lat: 59.9343, lng: 30.3351, name: '圣彼得堡', priority: 18 },
    '斯大林格勒': { lat: 48.7223, lng: 44.5133, name: '伏尔加格勒', priority: 18 },
    '伏尔加格勒': { lat: 48.7223, lng: 44.5133, name: '伏尔加格勒', priority: 18 },
    '芝加哥': { lat: 41.8781, lng: -87.6298, name: '芝加哥', priority: 18 },
    '洛杉矶': { lat: 34.0522, lng: -118.2437, name: '洛杉矶', priority: 18 },
    '华盛顿': { lat: 38.9072, lng: -77.0369, name: '华盛顿', priority: 18 },
    '旧金山': { lat: 37.7749, lng: -122.4194, name: '旧金山', priority: 18 },
    '亚特兰大': { lat: 33.7405, lng: -84.3911, name: '亚特兰大', priority: 18 },
    '檀香山': { lat: 21.3069, lng: -157.8583, name: '檀香山', priority: 18 },
    '珍珠港': { lat: 21.3963, lng: -157.9772, name: '珍珠港', priority: 18 },
    '美国': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 18 },
    '纽约': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 18 },
    '费城': { lat: 39.9526, lng: -75.1652, name: '费城', priority: 18 },
    '波士顿': { lat: 42.3601, lng: -71.0589, name: '波士顿', priority: 18 },
    '底特律': { lat: 42.3314, lng: -83.0458, name: '底特律', priority: 18 },
    '休斯顿': { lat: 29.7604, lng: -95.3698, name: '休斯顿', priority: 18 },
    '西雅图': { lat: 47.6062, lng: -122.3321, name: '西雅图', priority: 18 },
    '好莱坞': { lat: 34.0928, lng: -118.3287, name: '好莱坞', priority: 18 },
    '硅谷': { lat: 37.3861, lng: -122.0839, name: '硅谷', priority: 18 },
    '英国': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 18 },
    '伦敦': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 18 },
    '牛津': { lat: 51.7520, lng: -1.2577, name: '牛津', priority: 18 },
    '剑桥': { lat: 52.2053, lng: 0.1218, name: '剑桥', priority: 18 },
    '曼彻斯特': { lat: 53.4808, lng: -2.2426, name: '曼彻斯特', priority: 18 },
    '利物浦': { lat: 53.4084, lng: -2.9916, name: '利物浦', priority: 18 },
    '法国': { lat: 48.8566, lng: 2.3522, name: '巴黎', priority: 18 },
    '巴黎': { lat: 48.8566, lng: 2.3522, name: '巴黎', priority: 18 },
    '凡尔赛': { lat: 48.8049, lng: 2.1204, name: '凡尔赛', priority: 18 },
    '马赛': { lat: 43.2965, lng: 5.3698, name: '马赛', priority: 18 },
    '德国': { lat: 52.5200, lng: 13.4050, name: '柏林', priority: 18 },
    '柏林': { lat: 52.5200, lng: 13.4050, name: '柏林', priority: 18 },
    '慕尼黑': { lat: 48.1351, lng: 11.5820, name: '慕尼黑', priority: 18 },
    '法兰克福': { lat: 50.1109, lng: 8.6821, name: '法兰克福', priority: 18 },
    '汉堡': { lat: 53.5511, lng: 9.9937, name: '汉堡', priority: 18 },
    '意大利': { lat: 41.9028, lng: 12.4964, name: '罗马', priority: 18 },
    '罗马': { lat: 41.9028, lng: 12.4964, name: '罗马', priority: 18 },
    '佛罗伦萨': { lat: 43.7696, lng: 11.2558, name: '佛罗伦萨', priority: 18 },
    '威尼斯': { lat: 45.4408, lng: 12.3155, name: '威尼斯', priority: 18 },
    '米兰': { lat: 45.4642, lng: 9.1900, name: '米兰', priority: 18 },
    '西班牙': { lat: 40.4168, lng: -3.7038, name: '马德里', priority: 18 },
    '马德里': { lat: 40.4168, lng: -3.7038, name: '马德里', priority: 18 },
    '巴塞罗那': { lat: 41.3851, lng: 2.1734, name: '巴塞罗那', priority: 18 },
    '葡萄牙': { lat: 38.7223, lng: -9.1393, name: '里斯本', priority: 18 },
    '里斯本': { lat: 38.7223, lng: -9.1393, name: '里斯本', priority: 18 },
    '荷兰': { lat: 52.3676, lng: 4.9041, name: '阿姆斯特丹', priority: 18 },
    '阿姆斯特丹': { lat: 52.3676, lng: 4.9041, name: '阿姆斯特丹', priority: 18 },
    '比利时': { lat: 50.8503, lng: 4.3517, name: '布鲁塞尔', priority: 18 },
    '布鲁塞尔': { lat: 50.8503, lng: 4.3517, name: '布鲁塞尔', priority: 18 },
    '瑞士': { lat: 46.9480, lng: 7.4474, name: '伯尔尼', priority: 18 },
    '奥地利': { lat: 48.2082, lng: 16.3738, name: '维也纳', priority: 18 },
    '维也纳': { lat: 48.2082, lng: 16.3738, name: '维也纳', priority: 18 },
    '捷克': { lat: 50.0755, lng: 14.4378, name: '布拉格', priority: 18 },
    '布拉格': { lat: 50.0755, lng: 14.4378, name: '布拉格', priority: 18 },
    '希腊': { lat: 37.9838, lng: 23.7275, name: '雅典', priority: 18 },
    '雅典': { lat: 37.9838, lng: 23.7275, name: '雅典', priority: 18 },
    '斯巴达': { lat: 37.0739, lng: 22.4248, name: '斯巴达', priority: 18 },
    '印度': { lat: 28.6139, lng: 77.2090, name: '新德里', priority: 15 },
    '新德里': { lat: 28.6139, lng: 77.2090, name: '新德里', priority: 15 },
    '孟买': { lat: 19.0760, lng: 72.8777, name: '孟买', priority: 15 },
    '埃及': { lat: 30.0444, lng: 31.2357, name: '开罗', priority: 15 },
    '开罗': { lat: 30.0444, lng: 31.2357, name: '开罗', priority: 15 },
    '古巴': { lat: 23.1136, lng: -82.3666, name: '哈瓦那', priority: 15 },
    '哈瓦那': { lat: 23.1136, lng: -82.3666, name: '哈瓦那', priority: 15 },
    '澳大利亚': { lat: -33.8688, lng: 151.2093, name: '悉尼', priority: 15 },
    '悉尼': { lat: -33.8688, lng: 151.2093, name: '悉尼', priority: 15 },
    '墨尔本': { lat: -37.8136, lng: 144.9631, name: '墨尔本', priority: 15 },
    '加拿大': { lat: 43.6532, lng: -79.3832, name: '多伦多', priority: 15 },
    '多伦多': { lat: 43.6532, lng: -79.3832, name: '多伦多', priority: 15 },
    '墨西哥': { lat: 19.4326, lng: -99.1332, name: '墨西哥城', priority: 15 },
    '巴西': { lat: -23.5505, lng: -46.6333, name: '圣保罗', priority: 15 },
    '阿根廷': { lat: -34.6037, lng: -58.3816, name: '布宜诺斯艾利斯', priority: 15 },
    '布宜诺斯艾利斯': { lat: -34.6037, lng: -58.3816, name: '布宜诺斯艾利斯', priority: 15 },
    '越南': { lat: 21.0278, lng: 105.8342, name: '河内', priority: 15 },
    '河内': { lat: 21.0278, lng: 105.8342, name: '河内', priority: 15 },
    '西贡': { lat: 10.8231, lng: 106.6297, name: '胡志明市', priority: 15 },
    '泰国': { lat: 13.7563, lng: 100.5018, name: '曼谷', priority: 15 },
    '曼谷': { lat: 13.7563, lng: 100.5018, name: '曼谷', priority: 15 },
    '新加坡': { lat: 1.3521, lng: 103.8198, name: '新加坡', priority: 15 },
    '马来西亚': { lat: 3.1390, lng: 101.6869, name: '吉隆坡', priority: 15 },
    '吉隆坡': { lat: 3.1390, lng: 101.6869, name: '吉隆坡', priority: 15 },
    '印度尼西亚': { lat: -6.2088, lng: 106.8456, name: '雅加达', priority: 15 },
    '雅加达': { lat: -6.2088, lng: 106.8456, name: '雅加达', priority: 15 },
    '菲律宾': { lat: 14.5995, lng: 120.9842, name: '马尼拉', priority: 15 },
    '马尼拉': { lat: 14.5995, lng: 120.9842, name: '马尼拉', priority: 15 },
    '缅甸': { lat: 16.7862, lng: 96.1929, name: '仰光', priority: 15 },
    '仰光': { lat: 16.7862, lng: 96.1929, name: '仰光', priority: 15 },
    '伊朗': { lat: 35.6892, lng: 51.3890, name: '德黑兰', priority: 15 },
    '德黑兰': { lat: 35.6892, lng: 51.3890, name: '德黑兰', priority: 15 },
    '伊拉克': { lat: 33.3152, lng: 44.3661, name: '巴格达', priority: 15 },
    '巴格达': { lat: 33.3152, lng: 44.3661, name: '巴格达', priority: 15 },
    '以色列': { lat: 31.7683, lng: 35.2137, name: '耶路撒冷', priority: 15 },
    '耶路撒冷': { lat: 31.7683, lng: 35.2137, name: '耶路撒冷', priority: 15 },
    '巴勒斯坦': { lat: 31.5000, lng: 35.1833, name: '拉姆安拉', priority: 15 },
    '南非': { lat: -33.9249, lng: 18.4241, name: '开普敦', priority: 15 },
    '开普敦': { lat: -33.9249, lng: 18.4241, name: '开普敦', priority: 15 },
    '波兰': { lat: 52.2297, lng: 21.0122, name: '华沙', priority: 15 },
    '华沙': { lat: 52.2297, lng: 21.0122, name: '华沙', priority: 15 },
    '匈牙利': { lat: 47.4979, lng: 19.0402, name: '布达佩斯', priority: 15 },
    '布达佩斯': { lat: 47.4979, lng: 19.0402, name: '布达佩斯', priority: 15 },
    '罗马尼亚': { lat: 44.4268, lng: 26.1025, name: '布加勒斯特', priority: 15 },
    '布加勒斯特': { lat: 44.4268, lng: 26.1025, name: '布加勒斯特', priority: 15 },
    '乌克兰': { lat: 50.4501, lng: 30.5234, name: '基辅', priority: 15 },
    '基辅': { lat: 50.4501, lng: 30.5234, name: '基辅', priority: 15 },
    '白俄罗斯': { lat: 53.9045, lng: 27.5516, name: '明斯克', priority: 15 },
    '明斯克': { lat: 53.9045, lng: 27.5516, name: '明斯克', priority: 15 },
    '蒙古': { lat: 47.8864, lng: 106.9057, name: '乌兰巴托', priority: 15 },
    '阿富汗': { lat: 34.5228, lng: 69.1792, name: '喀布尔', priority: 15 },
    '沙特阿拉伯': { lat: 23.8859, lng: 45.0792, name: '利雅得', priority: 15 },
    '土耳其': { lat: 39.9334, lng: 32.8597, name: '安卡拉', priority: 15 },
    '伊斯坦布尔': { lat: 41.0082, lng: 28.9784, name: '伊斯坦布尔', priority: 15 },
    '君士坦丁堡': { lat: 41.0082, lng: 28.9784, name: '伊斯坦布尔', priority: 15 },
    '叙利亚': { lat: 33.5138, lng: 36.2765, name: '大马士革', priority: 15 },
    '黎巴嫩': { lat: 33.8938, lng: 35.5018, name: '贝鲁特', priority: 15 },
    '新西兰': { lat: -36.8485, lng: 174.7633, name: '奥克兰', priority: 15 },
    '爱尔兰': { lat: 53.3498, lng: -6.2603, name: '都柏林', priority: 15 },
    '都柏林': { lat: 53.3498, lng: -6.2603, name: '都柏林', priority: 15 },
    '苏格兰': { lat: 55.9533, lng: -3.1883, name: '爱丁堡', priority: 15 },
    '爱丁堡': { lat: 55.9533, lng: -3.1883, name: '爱丁堡', priority: 15 },
    '柬埔寨': { lat: 11.5560, lng: 104.9282, name: '金边', priority: 15 },
    '巴基斯坦': { lat: 33.6844, lng: 73.0479, name: '伊斯兰堡', priority: 15 },
    '肯尼亚': { lat: -1.2864, lng: 36.8172, name: '内罗毕', priority: 15 },
    '秘鲁': { lat: -12.0464, lng: -77.0428, name: '利马', priority: 15 },
    '智利': { lat: -33.4489, lng: -70.6693, name: '圣地亚哥', priority: 15 },
    '挪威': { lat: 59.9139, lng: 10.7522, name: '奥斯陆', priority: 15 },
    '瑞典': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 15 },
    '丹麦': { lat: 55.6761, lng: 12.5683, name: '哥本哈根', priority: 15 },
    '芬兰': { lat: 60.1282, lng: 24.9384, name: '赫尔辛基', priority: 15 },
    '塞尔维亚': { lat: 44.7866, lng: 20.4489, name: '贝尔格莱德', priority: 15 },
    '保加利亚': { lat: 42.6977, lng: 23.3219, name: '索菲亚', priority: 15 },
    '哈萨克斯坦': { lat: 43.2389, lng: 76.8897, name: '努尔苏丹', priority: 15 },

    '中国': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 8 },

    '河北': { lat: 38.0423, lng: 114.5075, name: '石家庄', priority: 20 },
    '山东': { lat: 36.6762, lng: 116.9898, name: '济南', priority: 20 },
    '山西': { lat: 37.8716, lng: 112.5492, name: '太原', priority: 20 },
    '河南': { lat: 34.7466, lng: 113.6253, name: '郑州', priority: 20 },
    '湖北': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 20 },
    '湖南': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 20 },
    '广东': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 20 },
    '广西': { lat: 22.8170, lng: 108.3665, name: '南宁', priority: 20 },
    '四川': { lat: 30.5728, lng: 104.0668, name: '成都', priority: 20 },
    '云南': { lat: 25.0389, lng: 102.7183, name: '昆明', priority: 20 },
    '贵州': { lat: 26.6470, lng: 106.6302, name: '贵阳', priority: 20 },
    '陕西': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 20 },
    '甘肃': { lat: 36.0611, lng: 103.8343, name: '兰州', priority: 20 },
    '青海': { lat: 36.6171, lng: 101.7782, name: '西宁', priority: 20 },
    '宁夏': { lat: 38.4872, lng: 106.2309, name: '银川', priority: 20 },
    '新疆': { lat: 43.8256, lng: 87.6168, name: '乌鲁木齐', priority: 20 },
    '西藏': { lat: 29.6549, lng: 91.1405, name: '拉萨', priority: 20 },
    '内蒙古': { lat: 40.8175, lng: 111.6558, name: '呼和浩特', priority: 20 },
    '辽宁': { lat: 41.8047, lng: 123.4328, name: '沈阳', priority: 20 },
    '吉林': { lat: 43.8868, lng: 125.3231, name: '长春', priority: 20 },
    '黑龙江': { lat: 45.8038, lng: 126.5351, name: '哈尔滨', priority: 20 },
    '江苏': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 20 },
    '浙江': { lat: 30.2741, lng: 120.1551, name: '杭州', priority: 20 },
    '安徽': { lat: 31.8654, lng: 117.2272, name: '合肥', priority: 20 },
    '福建': { lat: 26.0745, lng: 119.2965, name: '福州', priority: 20 },
    '江西': { lat: 28.6871, lng: 115.8573, name: '南昌', priority: 20 },
    '海南': { lat: 19.0330, lng: 110.3355, name: '海南', priority: 20 },
    '东北': { lat: 41.8047, lng: 123.4328, name: '沈阳', priority: 20 },
    '华北': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 20 },
    '华东': { lat: 31.2304, lng: 121.4737, name: '上海', priority: 20 },
    '华中': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 20 },
    '华南': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 20 },
    '西南': { lat: 30.5728, lng: 104.0668, name: '成都', priority: 20 },
    '西北': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 20 },

    '常德': { lat: 29.0318, lng: 111.6986, name: '常德', priority: 20 },
    '衡阳': { lat: 26.8936, lng: 112.5720, name: '衡阳', priority: 20 },
    '岳阳': { lat: 29.3572, lng: 113.1289, name: '岳阳', priority: 20 },
    '湘潭': { lat: 27.8298, lng: 112.9442, name: '湘潭', priority: 20 },
    '株洲': { lat: 27.8274, lng: 113.1340, name: '株洲', priority: 20 },
    '邵阳': { lat: 27.2387, lng: 111.4683, name: '邵阳', priority: 20 },
    '怀化': { lat: 27.5501, lng: 109.9972, name: '怀化', priority: 20 },
    '永州': { lat: 26.4345, lng: 111.6132, name: '永州', priority: 20 },
    '郴州': { lat: 25.7706, lng: 113.0147, name: '郴州', priority: 20 },
    '益阳': { lat: 28.5530, lng: 112.3553, name: '益阳', priority: 20 },
    '娄底': { lat: 27.7006, lng: 111.9944, name: '娄底', priority: 20 },
    '金华': { lat: 29.0795, lng: 119.6496, name: '金华', priority: 20 },
    '温州': { lat: 28.0006, lng: 120.6722, name: '温州', priority: 20 },
    '宁波': { lat: 29.8683, lng: 121.5440, name: '宁波', priority: 20 },
    '绍兴': { lat: 30.0000, lng: 120.5833, name: '绍兴', priority: 20 },
    '嘉兴': { lat: 30.7469, lng: 120.7555, name: '嘉兴', priority: 20 },
    '湖州': { lat: 30.8725, lng: 120.0886, name: '湖州', priority: 20 },
    '台州': { lat: 28.6563, lng: 121.4208, name: '台州', priority: 20 },
    '无锡': { lat: 31.4912, lng: 120.3119, name: '无锡', priority: 20 },
    '常州': { lat: 31.8106, lng: 119.9741, name: '常州', priority: 20 },
    '南通': { lat: 31.9808, lng: 120.8943, name: '南通', priority: 20 },
    '扬州': { lat: 32.3932, lng: 119.4129, name: '扬州', priority: 20 },
    '镇江': { lat: 32.1882, lng: 119.4252, name: '镇江', priority: 20 },
    '盐城': { lat: 33.3478, lng: 120.1615, name: '盐城', priority: 20 },
    '淮安': { lat: 33.5514, lng: 119.0130, name: '淮安', priority: 20 },
    '连云港': { lat: 34.5967, lng: 119.2217, name: '连云港', priority: 20 },
    '泰州': { lat: 32.4550, lng: 119.9232, name: '泰州', priority: 20 },
    '宿迁': { lat: 33.9631, lng: 118.2757, name: '宿迁', priority: 20 },
    '徐州': { lat: 34.2621, lng: 117.1832, name: '徐州', priority: 20 },
    '芜湖': { lat: 31.3340, lng: 118.4326, name: '芜湖', priority: 20 },
    '蚌埠': { lat: 32.9168, lng: 117.3889, name: '蚌埠', priority: 20 },
    '马鞍山': { lat: 31.6705, lng: 118.5077, name: '马鞍山', priority: 20 },
    '安庆': { lat: 30.5430, lng: 117.0631, name: '安庆', priority: 20 },
    '黄山': { lat: 29.7147, lng: 118.3376, name: '黄山', priority: 20 },
    '阜阳': { lat: 32.8908, lng: 115.8142, name: '阜阳', priority: 20 },
    '宿州': { lat: 33.6461, lng: 116.9641, name: '宿州', priority: 20 },
    '滁州': { lat: 32.3018, lng: 118.3171, name: '滁州', priority: 20 },
    '六安': { lat: 31.7350, lng: 116.5231, name: '六安', priority: 20 },
    '宣城': { lat: 30.9457, lng: 118.7590, name: '宣城', priority: 20 },
    '池州': { lat: 30.6650, lng: 117.4912, name: '池州', priority: 20 },
    '亳州': { lat: 33.8693, lng: 115.7785, name: '亳州', priority: 20 },
    '漳州': { lat: 24.5127, lng: 117.6471, name: '漳州', priority: 20 },
    '莆田': { lat: 25.4309, lng: 119.0078, name: '莆田', priority: 20 },
    '三明': { lat: 26.2654, lng: 117.6389, name: '三明', priority: 20 },
    '南平': { lat: 26.6418, lng: 118.1778, name: '南平', priority: 20 },
    '龙岩': { lat: 25.0755, lng: 117.0174, name: '龙岩', priority: 20 },
    '宁德': { lat: 26.6566, lng: 119.5479, name: '宁德', priority: 20 },
    '景德镇': { lat: 29.2687, lng: 117.1784, name: '景德镇', priority: 20 },
    '萍乡': { lat: 27.6229, lng: 113.8545, name: '萍乡', priority: 20 },
    '新余': { lat: 27.8175, lng: 114.9173, name: '新余', priority: 20 },
    '鹰潭': { lat: 28.2386, lng: 117.0694, name: '鹰潭', priority: 20 },
    '宜春': { lat: 27.8043, lng: 114.4161, name: '宜春', priority: 20 },
    '临沂': { lat: 35.1041, lng: 118.3564, name: '临沂', priority: 20 },
    '潍坊': { lat: 36.7069, lng: 119.1619, name: '潍坊', priority: 20 },
    '淄博': { lat: 36.8131, lng: 118.0548, name: '淄博', priority: 20 },
    '济宁': { lat: 35.4149, lng: 116.5873, name: '济宁', priority: 20 },
    '泰安': { lat: 36.2000, lng: 117.0870, name: '泰安', priority: 20 },
    '威海': { lat: 37.5569, lng: 122.1059, name: '威海', priority: 20 },
    '日照': { lat: 35.4164, lng: 119.5269, name: '日照', priority: 20 },
    '德州': { lat: 37.4360, lng: 116.3575, name: '德州', priority: 20 },
    '聊城': { lat: 36.4558, lng: 115.9854, name: '聊城', priority: 20 },
    '滨州': { lat: 37.3827, lng: 117.9714, name: '滨州', priority: 20 },
    '菏泽': { lat: 35.2333, lng: 115.4807, name: '菏泽', priority: 20 },
    '枣庄': { lat: 34.5366, lng: 117.7176, name: '枣庄', priority: 20 },
    '东营': { lat: 37.4336, lng: 118.6749, name: '东营', priority: 20 },
    '洛阳': { lat: 34.6197, lng: 112.4539, name: '洛阳', priority: 20 },
    '开封': { lat: 34.7973, lng: 114.3074, name: '开封', priority: 20 },
    '信阳': { lat: 32.1264, lng: 114.0913, name: '信阳', priority: 20 },
    '许昌': { lat: 34.0357, lng: 113.8524, name: '许昌', priority: 20 },
    '平顶山': { lat: 33.7662, lng: 113.1925, name: '平顶山', priority: 20 },
    '焦作': { lat: 35.2340, lng: 113.2418, name: '焦作', priority: 20 },
    '鹤壁': { lat: 35.7475, lng: 114.2976, name: '鹤壁', priority: 20 },
    '新乡': { lat: 35.3030, lng: 113.8835, name: '新乡', priority: 20 },
    '安阳': { lat: 36.1052, lng: 114.3534, name: '安阳', priority: 20 },
    '濮阳': { lat: 35.7627, lng: 115.0296, name: '濮阳', priority: 20 },
    '漯河': { lat: 33.5817, lng: 114.0166, name: '漯河', priority: 20 },
    '驻马店': { lat: 32.9802, lng: 114.0228, name: '驻马店', priority: 20 },
    '周口': { lat: 33.6259, lng: 114.6498, name: '周口', priority: 20 },
    '商丘': { lat: 34.4142, lng: 115.6562, name: '商丘', priority: 20 },
    '三门峡': { lat: 34.7734, lng: 111.2005, name: '三门峡', priority: 20 },
    '南阳': { lat: 33.0143, lng: 112.5359, name: '南阳', priority: 20 },
    '宜昌': { lat: 30.6918, lng: 111.2864, name: '宜昌', priority: 20 },
    '襄阳': { lat: 32.0422, lng: 112.1442, name: '襄阳', priority: 20 },
    '荆州': { lat: 30.3265, lng: 112.2390, name: '荆州', priority: 20 },
    '黄冈': { lat: 30.4539, lng: 114.8724, name: '黄冈', priority: 20 },
    '十堰': { lat: 32.6292, lng: 110.7980, name: '十堰', priority: 20 },
    '孝感': { lat: 30.9244, lng: 113.9269, name: '孝感', priority: 20 },
    '荆门': { lat: 31.0354, lng: 112.1993, name: '荆门', priority: 20 },
    '鄂州': { lat: 30.3905, lng: 114.8949, name: '鄂州', priority: 20 },
    '黄石': { lat: 30.1992, lng: 115.0386, name: '黄石', priority: 20 },
    '咸宁': { lat: 29.8413, lng: 114.3224, name: '咸宁', priority: 20 },
    '随州': { lat: 31.6904, lng: 113.3826, name: '随州', priority: 20 },
    '恩施': { lat: 30.2720, lng: 109.4883, name: '恩施', priority: 20 },
    '丹东': { lat: 40.0006, lng: 124.3538, name: '丹东', priority: 20 },
    '营口': { lat: 40.6665, lng: 122.2350, name: '营口', priority: 20 },
    '鞍山': { lat: 41.1087, lng: 122.9956, name: '鞍山', priority: 20 },
    '抚顺': { lat: 41.8819, lng: 123.9574, name: '抚顺', priority: 20 },
    '本溪': { lat: 41.2979, lng: 123.7869, name: '本溪', priority: 20 },
    '辽阳': { lat: 41.2682, lng: 123.1731, name: '辽阳', priority: 20 },
    '盘锦': { lat: 41.1198, lng: 122.0707, name: '盘锦', priority: 20 },
    '铁岭': { lat: 42.2997, lng: 123.8443, name: '铁岭', priority: 20 },
    '朝阳': { lat: 41.5718, lng: 120.4587, name: '朝阳', priority: 20 },
    '阜新': { lat: 42.0118, lng: 121.6481, name: '阜新', priority: 20 },
    '葫芦岛': { lat: 40.7430, lng: 120.8372, name: '葫芦岛', priority: 20 },
    '吉林市': { lat: 43.8380, lng: 126.5497, name: '吉林市', priority: 20 },
    '四平': { lat: 43.1666, lng: 124.3504, name: '四平', priority: 20 },
    '通化': { lat: 41.7277, lng: 125.9397, name: '通化', priority: 20 },
    '白山': { lat: 41.9426, lng: 126.4275, name: '白山', priority: 20 },
    '松原': { lat: 45.1411, lng: 124.8258, name: '松原', priority: 20 },
    '白城': { lat: 45.6196, lng: 122.8388, name: '白城', priority: 20 },
    '齐齐哈尔': { lat: 47.3542, lng: 123.9180, name: '齐齐哈尔', priority: 20 },
    '牡丹江': { lat: 44.5520, lng: 129.6328, name: '牡丹江', priority: 20 },
    '佳木斯': { lat: 46.7996, lng: 130.3180, name: '佳木斯', priority: 20 },
    '大庆': { lat: 46.5907, lng: 125.1037, name: '大庆', priority: 20 },
    '绥化': { lat: 46.6374, lng: 126.9689, name: '绥化', priority: 20 },
    '鸡西': { lat: 45.3004, lng: 130.9697, name: '鸡西', priority: 20 },
    '鹤岗': { lat: 47.3500, lng: 130.2775, name: '鹤岗', priority: 20 },
    '双鸭山': { lat: 46.6434, lng: 131.1571, name: '双鸭山', priority: 20 },
    '张家口': { lat: 40.7675, lng: 114.8865, name: '张家口', priority: 20 },
    '承德': { lat: 40.9762, lng: 117.9626, name: '承德', priority: 20 },
    '秦皇岛': { lat: 39.9354, lng: 119.6005, name: '秦皇岛', priority: 20 },
    '唐山': { lat: 39.6292, lng: 118.1742, name: '唐山', priority: 20 },
    '廊坊': { lat: 39.5246, lng: 116.6839, name: '廊坊', priority: 20 },
    '沧州': { lat: 38.3037, lng: 116.8386, name: '沧州', priority: 20 },
    '衡水': { lat: 37.7389, lng: 115.6656, name: '衡水', priority: 20 },
    '邢台': { lat: 37.0682, lng: 114.5047, name: '邢台', priority: 20 },
    '邯郸': { lat: 36.6258, lng: 114.5391, name: '邯郸', priority: 20 },
    '运城': { lat: 35.0264, lng: 111.0076, name: '运城', priority: 20 },
    '临汾': { lat: 36.0881, lng: 111.5190, name: '临汾', priority: 20 },
    '晋中': { lat: 37.6872, lng: 112.7530, name: '晋中', priority: 20 },
    '长治': { lat: 36.1954, lng: 113.1163, name: '长治', priority: 20 },
    '晋城': { lat: 35.4908, lng: 112.8513, name: '晋城', priority: 20 },
    '朔州': { lat: 39.3313, lng: 112.4329, name: '朔州', priority: 20 },
    '忻州': { lat: 38.4167, lng: 112.7339, name: '忻州', priority: 20 },
    '吕梁': { lat: 37.5186, lng: 111.1414, name: '吕梁', priority: 20 },
    '大同': { lat: 39.8262, lng: 113.4062, name: '大同', priority: 20 },
    '包头': { lat: 40.6576, lng: 109.8306, name: '包头', priority: 20 },
    '赤峰': { lat: 42.2578, lng: 118.8870, name: '赤峰', priority: 20 },
    '通辽': { lat: 43.6171, lng: 122.2430, name: '通辽', priority: 20 },
    '鄂尔多斯': { lat: 39.6086, lng: 109.7812, name: '鄂尔多斯', priority: 20 },
    '呼伦贝尔': { lat: 49.2122, lng: 119.7361, name: '呼伦贝尔', priority: 20 },
    '巴彦淖尔': { lat: 40.7433, lng: 107.3880, name: '巴彦淖尔', priority: 20 },
    '乌兰察布': { lat: 41.0340, lng: 113.1330, name: '乌兰察布', priority: 20 },

    '中原': { lat: 34.7466, lng: 113.6253, name: '郑州', priority: 20 },
    '关中': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 20 },
    '江南': { lat: 30.2741, lng: 120.1551, name: '杭州', priority: 20 },
    '岭南': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 20 },
    '塞外': { lat: 40.8175, lng: 111.6558, name: '呼和浩特', priority: 20 },
    '西域': { lat: 43.8256, lng: 87.6168, name: '乌鲁木齐', priority: 20 },
    '巴蜀': { lat: 30.5728, lng: 104.0668, name: '成都', priority: 20 },
    '荆楚': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 20 },
    '吴越': { lat: 31.2304, lng: 121.4737, name: '上海', priority: 20 },
    '齐鲁': { lat: 36.6762, lng: 116.9898, name: '济南', priority: 20 },
    '燕赵': { lat: 38.0423, lng: 114.5075, name: '石家庄', priority: 20 },
    '湘楚': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 20 },
    '滇': { lat: 25.0389, lng: 102.7183, name: '昆明', priority: 20 },
    '黔': { lat: 26.6470, lng: 106.6302, name: '贵阳', priority: 20 },
    '蜀': { lat: 30.5728, lng: 104.0668, name: '成都', priority: 20 },
    '渝': { lat: 29.4316, lng: 106.9123, name: '重庆', priority: 20 },
    '粤': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 20 },
    '闽': { lat: 26.0745, lng: 119.2965, name: '福州', priority: 20 },
    '赣': { lat: 28.6871, lng: 115.8573, name: '南昌', priority: 20 },
    '皖': { lat: 31.8654, lng: 117.2272, name: '合肥', priority: 20 },
    '晋': { lat: 37.8716, lng: 112.5492, name: '太原', priority: 20 },
    '鲁': { lat: 36.6762, lng: 116.9898, name: '济南', priority: 20 },
    '豫': { lat: 34.7466, lng: 113.6253, name: '郑州', priority: 20 },
    '鄂': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 20 },
    '湘': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 20 },
    '秦': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 20 },
    '陇': { lat: 36.0611, lng: 103.8343, name: '兰州', priority: 20 },
    '藏': { lat: 29.6549, lng: 91.1405, name: '拉萨', priority: 20 },

    '黄埔军校': { lat: 23.1167, lng: 113.4167, name: '广州', priority: 25 },
    '卢沟桥': { lat: 39.8470, lng: 116.2110, name: '北京', priority: 25 },
    '台儿庄': { lat: 34.5366, lng: 117.7176, name: '枣庄', priority: 25 },
    '淞沪': { lat: 31.2304, lng: 121.4737, name: '上海', priority: 25 },
    '百团大战': { lat: 38.0423, lng: 114.5075, name: '石家庄', priority: 25 },
    '辽沈战役': { lat: 41.8047, lng: 123.4328, name: '沈阳', priority: 25 },
    '淮海战役': { lat: 34.2621, lng: 117.1832, name: '徐州', priority: 25 },
    '平津战役': { lat: 39.1422, lng: 117.2070, name: '天津', priority: 25 },
    '渡江战役': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '武昌起义': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 25 },
    '南昌起义': { lat: 28.6871, lng: 115.8573, name: '南昌', priority: 25 },
    '秋收起义': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 25 },
    '遵义会议': { lat: 27.7256, lng: 106.9274, name: '遵义', priority: 25 },
    '开国大典': { lat: 39.9055, lng: 116.3976, name: '北京', priority: 25 },
    '虎门销烟': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 25 },
    '甲午战争': { lat: 38.9140, lng: 121.6147, name: '大连', priority: 25 },
    '鸦片战争': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 25 },
    '太平天国': { lat: 23.1333, lng: 113.2667, name: '广州', priority: 25 },
    '义和团': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '北伐战争': { lat: 23.1291, lng: 113.2644, name: '广州', priority: 25 },
    '解放战争': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '抗日战争': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '抗美援朝': { lat: 39.0392, lng: 125.7625, name: '平壤', priority: 25 },
    '九一八事变': { lat: 41.8047, lng: 123.4328, name: '沈阳', priority: 25 },
    '七七事变': { lat: 39.8470, lng: 116.2110, name: '北京', priority: 25 },
    '南京大屠杀': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '西安事变': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '卢沟桥事变': { lat: 39.8470, lng: 116.2110, name: '北京', priority: 25 },
    '淞沪会战': { lat: 31.2304, lng: 121.4737, name: '上海', priority: 25 },
    '武汉会战': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 25 },
    '长沙会战': { lat: 28.2280, lng: 112.9388, name: '长沙', priority: 25 },
    '台儿庄战役': { lat: 34.5366, lng: 117.7176, name: '枣庄', priority: 25 },
    '辛亥革命': { lat: 30.5928, lng: 114.3055, name: '武汉', priority: 25 },
    '五四运动': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '戊戌变法': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '洋务运动': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '八国联军': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '安史之乱': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '靖康之变': { lat: 34.7973, lng: 114.3074, name: '开封', priority: 25 },
    '焚书坑儒': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '玄武门之变': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '杯酒释兵权': { lat: 34.7973, lng: 114.3074, name: '开封', priority: 25 },
    '赤壁之战': { lat: 30.3333, lng: 113.9000, name: '赤壁', priority: 25 },
    '土木堡之变': { lat: 40.3833, lng: 115.7333, name: '土木堡', priority: 25 },
    '唐山大地震': { lat: 39.6292, lng: 118.1742, name: '唐山', priority: 25 },
    '汶川大地震': { lat: 31.0000, lng: 103.5800, name: '汶川', priority: 25 },
    '郑和下西洋': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '贞观之治': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '开元盛世': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '楚汉之争': { lat: 34.2621, lng: 117.1832, name: '徐州', priority: 25 },
    '公车上书': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '八一建军': { lat: 28.6871, lng: 115.8573, name: '南昌', priority: 25 },
    '护国运动': { lat: 25.0389, lng: 102.7183, name: '昆明', priority: 25 },
    '黄花岗起义': { lat: 23.1333, lng: 113.2667, name: '广州', priority: 25 },
    '井冈山会师': { lat: 26.5750, lng: 114.1750, name: '井冈山', priority: 25 },
    '平型关大捷': { lat: 39.3500, lng: 113.9500, name: '平型关', priority: 25 },
    '昆仑关战役': { lat: 22.9167, lng: 108.5667, name: '昆仑关', priority: 25 },
    '喜峰口战役': { lat: 40.4167, lng: 118.2500, name: '喜峰口', priority: 25 },
    '皖南事变': { lat: 30.7500, lng: 118.3833, name: '泾县', priority: 25 },
    '二二八事件': { lat: 25.0330, lng: 121.5650, name: '台北', priority: 25 },
    '虹口公园': { lat: 31.2647, lng: 121.4911, name: '上海', priority: 25 },
    '山海关': { lat: 39.9786, lng: 119.7753, name: '山海关', priority: 25 },

    '福特': { lat: 42.3314, lng: -83.0458, name: '底特律', priority: 25 },
    '底特律': { lat: 42.3314, lng: -83.0458, name: '底特律', priority: 20 },
    '联合国': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '联合国总部': { lat: 40.7489, lng: -73.9680, name: '纽约', priority: 25 },
    '白宫': { lat: 38.8977, lng: -77.0365, name: '华盛顿', priority: 25 },
    '五角大楼': { lat: 38.8719, lng: -77.0563, name: '华盛顿', priority: 25 },
    '国会': { lat: 38.8899, lng: -76.9897, name: '华盛顿', priority: 25 },
    '总统': { lat: 38.8977, lng: -77.0365, name: '华盛顿', priority: 18 },
    '好莱坞': { lat: 34.0928, lng: -118.3287, name: '好莱坞', priority: 25 },
    '硅谷': { lat: 37.3861, lng: -122.0839, name: '硅谷', priority: 25 },
    '华尔街': { lat: 40.7074, lng: -74.0113, name: '纽约', priority: 25 },
    '百老汇': { lat: 40.7634, lng: -73.9832, name: '纽约', priority: 25 },
    'CNN': { lat: 33.7405, lng: -84.3911, name: '亚特兰大', priority: 25 },
    'Discovery': { lat: 33.7405, lng: -84.3911, name: '亚特兰大', priority: 25 },
    '探索频道': { lat: 33.7405, lng: -84.3911, name: '亚特兰大', priority: 25 },
    '奥斯卡': { lat: 34.0928, lng: -118.3287, name: '好莱坞', priority: 25 },
    '诺贝尔': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 25 },
    '诺贝尔奖': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 25 },
    '戛纳': { lat: 43.5528, lng: 7.0174, name: '戛纳', priority: 25 },
    '戛纳电影节': { lat: 43.5528, lng: 7.0174, name: '戛纳', priority: 25 },
    '威尼斯电影节': { lat: 45.4408, lng: 12.3155, name: '威尼斯', priority: 25 },
    '格莱美': { lat: 34.0522, lng: -118.2437, name: '洛杉矶', priority: 25 },
    '艾美奖': { lat: 34.0522, lng: -118.2437, name: '洛杉矶', priority: 25 },
    '托尼奖': { lat: 40.7634, lng: -73.9832, name: '纽约', priority: 25 },
    '普利策奖': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    'NBA': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    'NFL': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    'MLB': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    'FBI': { lat: 38.8977, lng: -77.0365, name: '华盛顿', priority: 25 },
    'CIA': { lat: 38.8977, lng: -77.0365, name: '华盛顿', priority: 25 },
    'NASA': { lat: 28.5721, lng: -80.6480, name: '卡纳维拉尔角', priority: 25 },
    'MIT': { lat: 42.3601, lng: -71.0589, name: '波士顿', priority: 25 },
    '哈佛': { lat: 42.3770, lng: -71.1167, name: '波士顿', priority: 25 },
    '斯坦福': { lat: 37.4275, lng: -122.1697, name: '斯坦福', priority: 25 },
    '牛津大学': { lat: 51.7520, lng: -1.2577, name: '牛津', priority: 25 },
    '剑桥大学': { lat: 52.2053, lng: 0.1218, name: '剑桥', priority: 25 },
    '北大': { lat: 39.9929, lng: 116.3059, name: '北京', priority: 25 },
    '清华': { lat: 40.0036, lng: 116.3267, name: '北京', priority: 25 },
    '黄埔军校': { lat: 23.1167, lng: 113.4167, name: '广州', priority: 25 },
    '西点军校': { lat: 41.3908, lng: -73.9566, name: '西点', priority: 25 },
    '伊顿公学': { lat: 51.4778, lng: -0.6153, name: '伊顿', priority: 25 },
    '帝国大厦': { lat: 40.7484, lng: -73.9857, name: '纽约', priority: 25 },
    '自由女神像': { lat: 40.6892, lng: -74.0445, name: '纽约', priority: 25 },
    '埃菲尔铁塔': { lat: 48.8584, lng: 2.2945, name: '巴黎', priority: 25 },
    '凯旋门': { lat: 48.8738, lng: 2.2950, name: '巴黎', priority: 25 },
    '悉尼歌剧院': { lat: -33.8568, lng: 151.2153, name: '悉尼', priority: 25 },
    '巴拿马运河': { lat: 9.0833, lng: -79.6833, name: '巴拿马城', priority: 25 },
    '奉化': { lat: 29.6553, lng: 121.4078, name: '奉化', priority: 20 },
    '溪口': { lat: 29.5900, lng: 121.2500, name: '溪口', priority: 20 },
    '慈湖': { lat: 24.8333, lng: 121.2833, name: '台北', priority: 20 },

    '微软': { lat: 47.6062, lng: -122.3321, name: '西雅图', priority: 25 },
    'Microsoft': { lat: 47.6062, lng: -122.3321, name: '西雅图', priority: 25 },
    '谷歌': { lat: 37.3861, lng: -122.0839, name: '硅谷', priority: 25 },
    'Google': { lat: 37.3861, lng: -122.0839, name: '硅谷', priority: 25 },
    '苹果': { lat: 37.3230, lng: -122.0322, name: '硅谷', priority: 25 },
    'iTunes': { lat: 37.3230, lng: -122.0322, name: '硅谷', priority: 25 },
    '可口可乐': { lat: 33.7490, lng: -84.3880, name: '亚特兰大', priority: 25 },
    '北约': { lat: 50.8503, lng: 4.3517, name: '布鲁塞尔', priority: 25 },
    'NATO': { lat: 50.8503, lng: 4.3517, name: '布鲁塞尔', priority: 25 },
    '北大西洋公约组织': { lat: 50.8503, lng: 4.3517, name: '布鲁塞尔', priority: 25 },
    'AK-47': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 25 },
    '卡拉什尼科夫': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 25 },
    'DNA': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 25 },
    '化学武器': { lat: 50.8503, lng: 4.3517, name: '布鲁塞尔', priority: 20 },
    '贝克汉姆': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 25 },
    '扎克伯格': { lat: 42.3601, lng: -71.0589, name: '波士顿', priority: 25 },
    '安妮·海瑟薇': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '泰森': { lat: 39.9526, lng: -75.1652, name: '费城', priority: 25 },
    '大力水手': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '山口百惠': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 25 },
    '金·凯瑞': { lat: 43.6532, lng: -79.3832, name: '多伦多', priority: 25 },
    '坂本龙一': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 25 },
    '直升机': { lat: 48.1351, lng: 11.5820, name: '慕尼黑', priority: 20 },
    '红男爵': { lat: 52.5200, lng: 13.4050, name: '柏林', priority: 25 },
    '里希特霍芬': { lat: 52.5200, lng: 13.4050, name: '柏林', priority: 25 },
    '左轮手枪': { lat: 41.2565, lng: -95.9345, name: '奥马哈', priority: 20 },
    '契诃夫': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 25 },
    '陀思妥耶夫斯基': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 25 },
    '普希金': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 25 },
    '巴赫': { lat: 51.0504, lng: 13.7373, name: '莱比锡', priority: 25 },
    '慈禧': { lat: 39.9163, lng: 116.3972, name: '北京', priority: 25 },
    '尚小云': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '梅兰芳': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '朱自清': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '马三立': { lat: 39.1422, lng: 117.2070, name: '天津', priority: 25 },
    '施今墨': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '老舍': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '冯玉祥': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '粟裕': { lat: 32.0603, lng: 118.7969, name: '南京', priority: 25 },
    '溥仪': { lat: 39.9163, lng: 116.3972, name: '北京', priority: 25 },
    '乾隆': { lat: 39.9163, lng: 116.3972, name: '北京', priority: 25 },
    '格朗宁': { lat: 45.5017, lng: -73.5673, name: '蒙特利尔', priority: 20 },
    '小野洋子': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 25 },
    '列侬': { lat: 53.4000, lng: -2.9833, name: '利物浦', priority: 25 },
    '猫王': { lat: 35.1495, lng: -90.0490, name: '孟菲斯', priority: 25 },
    '喷气式飞机': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 20 },
    '北极': { lat: 90.0000, lng: 0.0000, name: '北极', priority: 25 },
    '厕纸': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 20 },
    '冥王星': { lat: 34.0195, lng: -118.4912, name: '帕萨迪纳', priority: 20 },
    '春晚': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '普通话': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '玛丽·雪莱': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 25 },
    '卡朋特': { lat: 34.0522, lng: -118.2437, name: '洛杉矶', priority: 25 },
    '沈殿霞': { lat: 22.3193, lng: 114.1694, name: '香港', priority: 25 },
    '王力宏': { lat: 25.0330, lng: 121.5654, name: '台北', priority: 25 },
    '万艾可': { lat: 41.2565, lng: -95.9345, name: '奥马哈', priority: 20 },
    '伟哥': { lat: 41.2565, lng: -95.9345, name: '奥马哈', priority: 20 },
    '爱德华八世': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 25 },
    '深蓝': { lat: 41.2565, lng: -95.9345, name: '奥马哈', priority: 20 },
    '卡斯帕罗夫': { lat: 55.7558, lng: 37.6173, name: '莫斯科', priority: 25 },

    '玄奘': { lat: 34.2658, lng: 108.9541, name: '西安', priority: 25 },
    '长安': { lat: 34.2658, lng: 108.9541, name: '西安', priority: 25 },
    '刘邦': { lat: 34.2658, lng: 108.9541, name: '西安', priority: 25 },
    '汉朝': { lat: 34.2658, lng: 108.9541, name: '西安', priority: 25 },
    '汉献帝': { lat: 34.2658, lng: 108.9541, name: '西安', priority: 25 },
    '袁世凯': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '中华民国': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 20 },
    '顾城': { lat: -36.8485, lng: 174.7633, name: '奥克兰', priority: 25 },
    '中国科学院': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '译制剧': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '中国荧屏': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '暹罗': { lat: 13.7563, lng: 100.5018, name: '曼谷', priority: 25 },
    '泰国': { lat: 13.7563, lng: 100.5018, name: '曼谷', priority: 20 },
    '希腊独立': { lat: 37.9838, lng: 23.7275, name: '雅典', priority: 25 },
    '希腊': { lat: 37.9838, lng: 23.7275, name: '雅典', priority: 20 },
    '玛雅': { lat: 20.7099, lng: -89.0943, name: '尤卡坦', priority: 25 },
    '伊丽莎白·泰勒': { lat: 34.0522, lng: -118.2437, name: '洛杉矶', priority: 25 },
    '马龙·白兰度': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '莎士比亚': { lat: 52.1937, lng: -1.7080, name: '斯特拉特福', priority: 25 },
    '费雯·丽': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 25 },
    '卡萨布兰卡': { lat: 33.5731, lng: -7.5898, name: '卡萨布兰卡', priority: 25 },
    '黎刹': { lat: 14.5995, lng: 120.9842, name: '马尼拉', priority: 25 },
    '菲律宾': { lat: 14.5995, lng: 120.9842, name: '马尼拉', priority: 20 },

    '清政府': { lat: 39.9163, lng: 116.3972, name: '北京', priority: 25 },
    '黄龙旗': { lat: 39.9163, lng: 116.3972, name: '北京', priority: 25 },
    '定军山': { lat: 33.1547, lng: 106.6581, name: '汉中', priority: 25 },
    '文言文': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '新文化运动': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '白话文': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '阿根廷': { lat: -34.6037, lng: -58.3816, name: '布宜诺斯艾利斯', priority: 20 },
    '以色列': { lat: 31.7683, lng: 35.2137, name: '耶路撒冷', priority: 20 },
    '伊拉克': { lat: 33.3152, lng: 44.3661, name: '巴格达', priority: 20 },
    '弗里达': { lat: 19.4326, lng: -99.1332, name: '墨西哥城', priority: 25 },
    '基努·里维斯': { lat: 43.6532, lng: -79.3832, name: '多伦多', priority: 25 },
    '席琳·迪翁': { lat: 45.5017, lng: -73.5673, name: '蒙特利尔', priority: 25 },
    '诺拉·琼斯': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },

    '欧洲': { lat: 48.8566, lng: 2.3522, name: '巴黎', priority: 3 },
    '亚洲': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 3 },
    '美洲': { lat: 38.9072, lng: -77.0369, name: '华盛顿', priority: 3 },
    '非洲': { lat: 30.0444, lng: 31.2357, name: '开罗', priority: 3 },
    '大洋洲': { lat: -33.8688, lng: 151.2093, name: '悉尼', priority: 3 },
    '太平洋': { lat: 0.0000, lng: -160.0000, name: '太平洋', priority: 5 },
    '大西洋': { lat: 0.0000, lng: -30.0000, name: '大西洋', priority: 5 },

    '9·11事件': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '911事件': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '世贸中心': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '双子塔': { lat: 40.7128, lng: -74.0060, name: '纽约', priority: 25 },
    '登月': { lat: 28.5721, lng: -80.6480, name: '卡纳维拉尔角', priority: 25 },
    '阿波罗': { lat: 28.5721, lng: -80.6480, name: '卡纳维拉尔角', priority: 25 },
    '挑战者号': { lat: 28.5721, lng: -80.6480, name: '卡纳维拉尔角', priority: 25 },
    '哥伦比亚号': { lat: 28.5721, lng: -80.6480, name: '卡纳维拉尔角', priority: 25 },
    '切尔诺贝利': { lat: 51.3865, lng: 30.2218, name: '切尔诺贝利', priority: 25 },
    '古巴导弹危机': { lat: 23.1136, lng: -82.3666, name: '哈瓦那', priority: 25 },
    '普法战争': { lat: 49.0097, lng: 2.5479, name: '色当', priority: 25 },
    '美西战争': { lat: 23.1136, lng: -82.3666, name: '哈瓦那', priority: 25 },
    '美墨战争': { lat: 19.4326, lng: -99.1332, name: '墨西哥城', priority: 25 },
    '苏芬战争': { lat: 60.1282, lng: 24.9384, name: '赫尔辛基', priority: 25 },
    '博罗季诺': { lat: 55.5147, lng: 35.8367, name: '博罗季诺', priority: 25 },
    '勒班陀': { lat: 38.2000, lng: 22.1833, name: '勒班陀', priority: 25 },
    '诺门罕': { lat: 47.7333, lng: 118.8167, name: '诺门罕', priority: 25 },
    '卡廷森林': { lat: 54.8333, lng: 32.0500, name: '斯摩棱斯克', priority: 25 },
    '雅尔塔会议': { lat: 44.4900, lng: 34.1667, name: '雅尔塔', priority: 25 },
    '雅尔塔': { lat: 44.4900, lng: 34.1667, name: '雅尔塔', priority: 25 },
    '波茨坦公告': { lat: 52.4028, lng: 13.0556, name: '波茨坦', priority: 25 },
    '波茨坦': { lat: 52.4028, lng: 13.0556, name: '波茨坦', priority: 25 },
    '德黑兰会议': { lat: 35.6892, lng: 51.3890, name: '德黑兰', priority: 25 },
    '巴黎公社': { lat: 48.8566, lng: 2.3522, name: '巴黎', priority: 25 },
    '西班牙内战': { lat: 40.4168, lng: -3.7038, name: '马德里', priority: 25 },
    '不列颠空战': { lat: 51.5074, lng: -0.1278, name: '伦敦', priority: 25 },
    '东京大轰炸': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 25 },
    '库尔斯克': { lat: 51.7373, lng: 36.2087, name: '库尔斯克', priority: 25 },
    '列宁格勒保卫战': { lat: 59.9343, lng: 30.3351, name: '圣彼得堡', priority: 25 },
    '柏林战役': { lat: 52.5200, lng: 13.4050, name: '柏林', priority: 25 },
    '柏林墙': { lat: 52.5200, lng: 13.4050, name: '柏林', priority: 25 },
    '仁川登陆': { lat: 37.4474, lng: 126.6233, name: '仁川', priority: 25 },
    '仁川': { lat: 37.4474, lng: 126.6233, name: '仁川', priority: 25 },
    '莱特湾': { lat: 11.3333, lng: 124.9500, name: '莱特湾', priority: 25 },
    '珊瑚海海战': { lat: -15.0000, lng: 155.0000, name: '珊瑚海', priority: 25 },
    '瓜岛': { lat: -9.4333, lng: 160.0167, name: '瓜达尔卡纳尔', priority: 25 },
    '瓜达尔卡纳尔': { lat: -9.4333, lng: 160.0167, name: '瓜达尔卡纳尔', priority: 25 },
    '塞班岛': { lat: 15.1833, lng: 145.7500, name: '塞班岛', priority: 25 },
    '西西里岛': { lat: 37.6000, lng: 14.0167, name: '西西里岛', priority: 25 },
    '冲绳岛战役': { lat: 26.2124, lng: 127.6809, name: '冲绳', priority: 25 },
    '敦刻尔克': { lat: 51.0343, lng: 2.3730, name: '敦刻尔克', priority: 25 },
    '阿拉曼': { lat: 30.9742, lng: 27.3378, name: '阿拉曼', priority: 25 },
    '索姆河': { lat: 50.0500, lng: 2.7000, name: '索姆河', priority: 25 },
    '日德兰': { lat: 56.0000, lng: 6.0000, name: '日德兰', priority: 25 },
    '奠边府': { lat: 21.3833, lng: 103.8500, name: '奠边府', priority: 25 },
    '水晶之夜': { lat: 52.5200, lng: 13.4050, name: '柏林', priority: 25 },
    '虹口公园': { lat: 31.2647, lng: 121.4911, name: '上海', priority: 25 },
    '皖南事变': { lat: 30.7500, lng: 118.3833, name: '泾县', priority: 25 },
    '二二八事件': { lat: 25.0330, lng: 121.5650, name: '台北', priority: 25 },
    '井冈山': { lat: 26.5750, lng: 114.1750, name: '井冈山', priority: 25 },
    '井冈山会师': { lat: 26.5750, lng: 114.1750, name: '井冈山', priority: 25 },
    '平型关': { lat: 39.3500, lng: 113.9500, name: '平型关', priority: 25 },
    '昆仑关': { lat: 22.9167, lng: 108.5667, name: '昆仑关', priority: 25 },
    '喜峰口': { lat: 40.4167, lng: 118.2500, name: '喜峰口', priority: 25 },
    '山海关': { lat: 39.9786, lng: 119.7753, name: '山海关', priority: 25 },
    '黄花岗': { lat: 23.1333, lng: 113.2667, name: '广州', priority: 25 },
    '护国运动': { lat: 25.0389, lng: 102.7183, name: '昆明', priority: 25 },
    '公车上书': { lat: 39.9042, lng: 116.4074, name: '北京', priority: 25 },
    '八一建军': { lat: 28.6871, lng: 115.8573, name: '南昌', priority: 25 },
    '楚汉之争': { lat: 34.2621, lng: 117.1832, name: '徐州', priority: 25 },
    '贞观之治': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '开元盛世': { lat: 34.3416, lng: 108.9398, name: '西安', priority: 25 },
    '赤壁之战': { lat: 30.3333, lng: 113.9000, name: '赤壁', priority: 25 },
    '赤壁': { lat: 30.3333, lng: 113.9000, name: '赤壁', priority: 25 },
    '土木堡': { lat: 40.3833, lng: 115.7333, name: '土木堡', priority: 25 },
    '唐山大地震': { lat: 39.6292, lng: 118.1742, name: '唐山', priority: 25 },
    '汶川大地震': { lat: 31.0000, lng: 103.5800, name: '汶川', priority: 25 },
    '滑铁卢': { lat: 50.6833, lng: 4.4167, name: '滑铁卢', priority: 25 },
    '凡尔登': { lat: 49.1561, lng: 5.3850, name: '凡尔登', priority: 25 },
    '硫磺岛': { lat: 24.7869, lng: 141.3093, name: '硫磺岛', priority: 25 },
    '中途岛': { lat: 28.2715, lng: -177.2169, name: '中途岛', priority: 25 },
    '慕尼黑惨案': { lat: 48.1351, lng: 11.5820, name: '慕尼黑', priority: 25 },
    '波士顿倾茶': { lat: 42.3601, lng: -71.0589, name: '波士顿', priority: 25 },
    '黑船事件': { lat: 35.2833, lng: 139.6667, name: '横须贺', priority: 25 },
    '奥斯卡': { lat: 34.0928, lng: -118.3287, name: '好莱坞', priority: 25 },
    '戛纳': { lat: 43.5528, lng: 7.0174, name: '戛纳', priority: 25 },
    '戛纳电影节': { lat: 43.5528, lng: 7.0174, name: '戛纳', priority: 25 },
    '威尼斯电影节': { lat: 45.4408, lng: 12.3155, name: '威尼斯', priority: 25 },
    '诺贝尔奖': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 25 },
    '诺贝尔': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 25 },
    '悉尼歌剧院': { lat: -33.8568, lng: 151.2153, name: '悉尼', priority: 25 },
    '帝国大厦': { lat: 40.7484, lng: -73.9857, name: '纽约', priority: 25 },
    '自由女神像': { lat: 40.6892, lng: -74.0445, name: '纽约', priority: 25 },
    '埃菲尔铁塔': { lat: 48.8584, lng: 2.2945, name: '巴黎', priority: 25 },
    '凯旋门': { lat: 48.8738, lng: 2.2950, name: '巴黎', priority: 25 },
    '巴拿马运河': { lat: 9.0833, lng: -79.6833, name: '巴拿马城', priority: 25 },
    '伊顿公学': { lat: 51.4778, lng: -0.6153, name: '伊顿', priority: 25 },
    '西点军校': { lat: 41.3908, lng: -73.9566, name: '西点', priority: 25 },
    '黄埔军校': { lat: 23.1167, lng: 113.4167, name: '广州', priority: 25 },
    '哥伦布': { lat: 41.9028, lng: 12.4964, name: '罗马', priority: 18 },
    '哥伦布发现新大陆': { lat: 24.0000, lng: -74.5000, name: '巴哈马', priority: 25 },
    '麦哲伦': { lat: 38.7223, lng: -9.1393, name: '里斯本', priority: 18 },
    '麦哲伦环球': { lat: 38.7223, lng: -9.1393, name: '里斯本', priority: 25 },
    '格陵兰岛': { lat: 72.0000, lng: -40.0000, name: '格陵兰', priority: 25 },
    '南极点': { lat: -90.0000, lng: 0.0000, name: '南极', priority: 25 },
    '南极': { lat: -90.0000, lng: 0.0000, name: '南极', priority: 25 },
    '科威特': { lat: 29.3759, lng: 47.9774, name: '科威特城', priority: 25 },
    '科威特城': { lat: 29.3759, lng: 47.9774, name: '科威特城', priority: 25 },
    '伊拉克吞并科威特': { lat: 29.3759, lng: 47.9774, name: '科威特城', priority: 25 },

    '台北': { lat: 25.0330, lng: 121.5650, name: '台北', priority: 20 },
    '高雄': { lat: 22.6273, lng: 120.3014, name: '高雄', priority: 20 },
    '台中': { lat: 24.1477, lng: 120.6736, name: '台中', priority: 20 },
    '唐山': { lat: 39.6292, lng: 118.1742, name: '唐山', priority: 20 },
    '汶川': { lat: 31.0000, lng: 103.5800, name: '汶川', priority: 20 },
    '泾县': { lat: 30.7500, lng: 118.3833, name: '泾县', priority: 20 },
    '黄冈': { lat: 30.4539, lng: 114.8724, name: '黄冈', priority: 20 },
    '荆州': { lat: 30.3265, lng: 112.2390, name: '荆州', priority: 20 },
    '襄阳': { lat: 32.0422, lng: 112.1442, name: '襄阳', priority: 20 },
    '宜昌': { lat: 30.6918, lng: 111.2864, name: '宜昌', priority: 20 },
    '九江': { lat: 29.7053, lng: 116.0019, name: '九江', priority: 20 },
    '赣州': { lat: 25.8314, lng: 114.9334, name: '赣州', priority: 20 },
    '吉安': { lat: 27.1139, lng: 114.9863, name: '吉安', priority: 20 },
    '上饶': { lat: 28.4553, lng: 117.9433, name: '上饶', priority: 20 },
    '抚州': { lat: 27.9538, lng: 116.3583, name: '抚州', priority: 20 },
    '兰州': { lat: 36.0611, lng: 103.8343, name: '兰州', priority: 20 },
    '天水': { lat: 34.5809, lng: 105.7249, name: '天水', priority: 20 },
    '武威': { lat: 37.9283, lng: 102.6346, name: '武威', priority: 20 },
    '张掖': { lat: 38.9262, lng: 100.4495, name: '张掖', priority: 20 },
    '酒泉': { lat: 39.7322, lng: 98.4942, name: '酒泉', priority: 20 },
    '嘉峪关': { lat: 39.7732, lng: 98.2773, name: '嘉峪关', priority: 20 },
    '平凉': { lat: 35.5428, lng: 106.6652, name: '平凉', priority: 20 },
    '银川': { lat: 38.4872, lng: 106.2309, name: '银川', priority: 20 },
    '中卫': { lat: 37.5149, lng: 105.1966, name: '中卫', priority: 20 },
    '固原': { lat: 36.0160, lng: 106.2425, name: '固原', priority: 20 },
    '吴忠': { lat: 37.9862, lng: 106.1987, name: '吴忠', priority: 20 },
    '西宁': { lat: 36.6171, lng: 101.7782, name: '西宁', priority: 20 },
    '格尔木': { lat: 36.4232, lng: 94.9054, name: '格尔木', priority: 20 },
    '日喀则': { lat: 29.2671, lng: 88.8809, name: '日喀则', priority: 20 },
    '林芝': { lat: 29.6491, lng: 94.3615, name: '林芝', priority: 20 },
    '山南': { lat: 29.2360, lng: 91.7730, name: '山南', priority: 20 },
    '那曲': { lat: 31.4762, lng: 92.0513, name: '那曲', priority: 20 },
    '乌鲁木齐': { lat: 43.8256, lng: 87.6168, name: '乌鲁木齐', priority: 20 },
    '喀什': { lat: 39.4677, lng: 75.9894, name: '喀什', priority: 20 },
    '吐鲁番': { lat: 42.9513, lng: 89.1898, name: '吐鲁番', priority: 20 },
    '伊犁': { lat: 43.9210, lng: 81.3245, name: '伊犁', priority: 20 },
    '阿克苏': { lat: 41.1673, lng: 80.2610, name: '阿克苏', priority: 20 },
    '和田': { lat: 37.1104, lng: 79.9260, name: '和田', priority: 20 },
    '库尔勒': { lat: 41.7259, lng: 86.1746, name: '库尔勒', priority: 20 },
    '呼和浩特': { lat: 40.8175, lng: 111.6558, name: '呼和浩特', priority: 20 },
    '鄂尔多斯': { lat: 39.6086, lng: 109.7812, name: '鄂尔多斯', priority: 20 },
    '包头': { lat: 40.6576, lng: 109.8306, name: '包头', priority: 20 },
    '赤峰': { lat: 42.2578, lng: 118.8870, name: '赤峰', priority: 20 },
    '通辽': { lat: 43.6171, lng: 122.2430, name: '通辽', priority: 20 },
    '海拉尔': { lat: 49.2122, lng: 119.7361, name: '海拉尔', priority: 20 },
    '满洲里': { lat: 49.5978, lng: 117.3788, name: '满洲里', priority: 20 },
    '南宁': { lat: 22.8170, lng: 108.3665, name: '南宁', priority: 20 },
    '柳州': { lat: 24.3264, lng: 109.4115, name: '柳州', priority: 20 },
    '北海': { lat: 21.4819, lng: 109.1198, name: '北海', priority: 20 },
    '梧州': { lat: 23.4770, lng: 111.2791, name: '梧州', priority: 20 },
    '玉林': { lat: 22.6542, lng: 110.1538, name: '玉林', priority: 20 },
    '贵阳': { lat: 26.6470, lng: 106.6302, name: '贵阳', priority: 20 },
    '遵义': { lat: 27.7256, lng: 106.9274, name: '遵义', priority: 20 },
    '六盘水': { lat: 26.5930, lng: 104.8333, name: '六盘水', priority: 20 },
    '安顺': { lat: 26.2456, lng: 105.9462, name: '安顺', priority: 20 },
    '毕节': { lat: 27.3019, lng: 105.2847, name: '毕节', priority: 20 },
    '铜仁': { lat: 27.7183, lng: 109.1896, name: '铜仁', priority: 20 },
    '昆明': { lat: 25.0389, lng: 102.7183, name: '昆明', priority: 20 },
    '大理': { lat: 25.6065, lng: 100.2676, name: '大理', priority: 20 },
    '丽江': { lat: 26.8642, lng: 100.2365, name: '丽江', priority: 20 },
    '曲靖': { lat: 25.4900, lng: 103.7961, name: '曲靖', priority: 20 },
    '玉溪': { lat: 24.3518, lng: 102.5457, name: '玉溪', priority: 20 },
    '保山': { lat: 25.1120, lng: 99.1671, name: '保山', priority: 20 },
    '昭通': { lat: 27.3400, lng: 103.7250, name: '昭通', priority: 20 },
    '普洱': { lat: 22.8252, lng: 100.9660, name: '普洱', priority: 20 },
    '临沧': { lat: 23.8770, lng: 100.0899, name: '临沧', priority: 20 },
    '西双版纳': { lat: 22.0074, lng: 100.7971, name: '西双版纳', priority: 20 },
    '海口': { lat: 20.0440, lng: 110.1999, name: '海口', priority: 20 },
    '三亚': { lat: 18.2528, lng: 109.5120, name: '三亚', priority: 20 },

    '卡纳维拉尔角': { lat: 28.5721, lng: -80.6480, name: '卡纳维拉尔角', priority: 18 },
    '休斯敦': { lat: 29.7604, lng: -95.3698, name: '休斯敦', priority: 18 },
    '达拉斯': { lat: 32.7767, lng: -96.7970, name: '达拉斯', priority: 18 },
    '新奥尔良': { lat: 29.9511, lng: -90.0715, name: '新奥尔良', priority: 18 },
    '迈阿密': { lat: 25.7617, lng: -80.1918, name: '迈阿密', priority: 18 },
    '拉斯维加斯': { lat: 36.1699, lng: -115.1398, name: '拉斯维加斯', priority: 18 },
    '圣迭戈': { lat: 32.7157, lng: -117.1611, name: '圣迭戈', priority: 18 },
    '圣弗朗西斯科': { lat: 37.7749, lng: -122.4194, name: '旧金山', priority: 18 },
    '夏威夷': { lat: 21.3069, lng: -157.8583, name: '檀香山', priority: 18 },
    '阿拉斯加': { lat: 64.2008, lng: -152.4937, name: '阿拉斯加', priority: 18 },
    '五角大楼': { lat: 38.8719, lng: -77.0563, name: '华盛顿', priority: 18 },
    '白宫': { lat: 38.8977, lng: -77.0365, name: '华盛顿', priority: 18 },
    '国会山': { lat: 38.8899, lng: -76.9897, name: '华盛顿', priority: 18 },
    '华尔街': { lat: 40.7074, lng: -74.0113, name: '纽约', priority: 18 },
    '百老汇': { lat: 40.7634, lng: -73.9832, name: '纽约', priority: 18 },
    '中央公园': { lat: 40.7829, lng: -73.9654, name: '纽约', priority: 18 },
    '时代广场': { lat: 40.7589, lng: -73.9851, name: '纽约', priority: 18 },

    '横须贺': { lat: 35.2833, lng: 139.6667, name: '横须贺', priority: 18 },
    '神户': { lat: 34.6901, lng: 135.1956, name: '神户', priority: 18 },
    '福冈': { lat: 33.5904, lng: 130.4017, name: '福冈', priority: 18 },
    '札幌': { lat: 43.0621, lng: 141.3544, name: '札幌', priority: 18 },
    '那霸': { lat: 26.2124, lng: 127.6809, name: '那霸', priority: 18 },
    '鹿儿岛': { lat: 31.5966, lng: 130.5571, name: '鹿儿岛', priority: 18 },
    '广岛': { lat: 34.3964, lng: 132.4595, name: '广岛', priority: 18 },
    '长崎': { lat: 32.7447, lng: 129.8737, name: '长崎', priority: 18 },
    '冲绳': { lat: 26.2124, lng: 127.6809, name: '冲绳', priority: 18 },
    '关东': { lat: 35.6762, lng: 139.6503, name: '东京', priority: 18 },
    '关西': { lat: 34.6937, lng: 135.5023, name: '大阪', priority: 18 },

    '釜山': { lat: 35.1796, lng: 129.0756, name: '釜山', priority: 18 },
    '仁川': { lat: 37.4474, lng: 126.6233, name: '仁川', priority: 18 },

    '斯摩棱斯克': { lat: 54.7818, lng: 32.0403, name: '斯摩棱斯克', priority: 18 },
    '伏尔加格勒': { lat: 48.7223, lng: 44.5133, name: '伏尔加格勒', priority: 18 },
    '库尔斯克': { lat: 51.7373, lng: 36.2087, name: '库尔斯克', priority: 18 },
    '喀山': { lat: 55.7887, lng: 49.1221, name: '喀山', priority: 18 },
    '新西伯利亚': { lat: 55.0084, lng: 82.9357, name: '新西伯利亚', priority: 18 },
    '海参崴': { lat: 43.1155, lng: 131.8855, name: '海参崴', priority: 18 },
    '符拉迪沃斯托克': { lat: 43.1155, lng: 131.8855, name: '海参崴', priority: 18 },

    '色当': { lat: 49.7000, lng: 4.9500, name: '色当', priority: 18 },
    '凡尔登': { lat: 49.1561, lng: 5.3850, name: '凡尔登', priority: 18 },
    '马恩河': { lat: 48.9000, lng: 3.4000, name: '马恩河', priority: 18 },
    '敦刻尔克': { lat: 51.0343, lng: 2.3730, name: '敦刻尔克', priority: 18 },
    '诺曼底': { lat: 49.3375, lng: -0.6670, name: '诺曼底', priority: 18 },
    '波尔多': { lat: 44.8378, lng: -0.5792, name: '波尔多', priority: 18 },
    '里昂': { lat: 45.7640, lng: 4.8357, name: '里昂', priority: 18 },
    '图卢兹': { lat: 43.6047, lng: 1.4442, name: '图卢兹', priority: 18 },
    '斯特拉斯堡': { lat: 48.5734, lng: 7.7521, name: '斯特拉斯堡', priority: 18 },
    '鲁昂': { lat: 49.4432, lng: 1.0999, name: '鲁昂', priority: 18 },
    '奥尔良': { lat: 47.9029, lng: 1.9093, name: '奥尔良', priority: 18 },

    '德累斯顿': { lat: 51.0504, lng: 13.7373, name: '德累斯顿', priority: 18 },
    '纽伦堡': { lat: 49.4521, lng: 11.0767, name: '纽伦堡', priority: 18 },
    '科隆': { lat: 50.9375, lng: 6.9603, name: '科隆', priority: 18 },
    '莱比锡': { lat: 51.3397, lng: 12.3731, name: '莱比锡', priority: 18 },
    '波恩': { lat: 50.7374, lng: 7.0982, name: '波恩', priority: 18 },
    '魏玛': { lat: 50.9787, lng: 11.3298, name: '魏玛', priority: 18 },
    '维滕贝格': { lat: 51.8670, lng: 11.6800, name: '维滕贝格', priority: 18 },

    '巴哈马': { lat: 24.0000, lng: -74.5000, name: '巴哈马', priority: 18 },
    '巴拿马城': { lat: 9.0833, lng: -79.6833, name: '巴拿马城', priority: 18 },
    '格陵兰': { lat: 72.0000, lng: -40.0000, name: '格陵兰', priority: 18 },

    '伊顿': { lat: 51.4778, lng: -0.6153, name: '伊顿', priority: 18 },
    '西点': { lat: 41.3908, lng: -73.9566, name: '西点', priority: 18 },

    '雅尔塔': { lat: 44.4900, lng: 34.1667, name: '雅尔塔', priority: 18 },
    '波茨坦': { lat: 52.4028, lng: 13.0556, name: '波茨坦', priority: 18 },
    '斯摩棱斯克': { lat: 54.7818, lng: 32.0403, name: '斯摩棱斯克', priority: 18 },

    '莱特湾': { lat: 11.3333, lng: 124.9500, name: '莱特湾', priority: 18 },
    '珊瑚海': { lat: -15.0000, lng: 155.0000, name: '珊瑚海', priority: 18 },
    '瓜达尔卡纳尔': { lat: -9.4333, lng: 160.0167, name: '瓜达尔卡纳尔', priority: 18 },
    '塞班岛': { lat: 15.1833, lng: 145.7500, name: '塞班岛', priority: 18 },
    '西西里岛': { lat: 37.6000, lng: 14.0167, name: '西西里岛', priority: 18 },

    '索姆河': { lat: 50.0500, lng: 2.7000, name: '索姆河', priority: 18 },
    '日德兰': { lat: 56.0000, lng: 6.0000, name: '日德兰', priority: 18 },
    '奠边府': { lat: 21.3833, lng: 103.8500, name: '奠边府', priority: 18 },
    '博罗季诺': { lat: 55.5147, lng: 35.8367, name: '博罗季诺', priority: 18 },
    '勒班陀': { lat: 38.2000, lng: 22.1833, name: '勒班陀', priority: 18 },
    '诺门罕': { lat: 47.7333, lng: 118.8167, name: '诺门罕', priority: 18 },
    '滑铁卢': { lat: 50.6833, lng: 4.4167, name: '滑铁卢', priority: 18 },
    '阿拉曼': { lat: 30.9742, lng: 27.3378, name: '阿拉曼', priority: 18 },
    '切尔诺贝利': { lat: 51.3865, lng: 30.2218, name: '切尔诺贝利', priority: 18 },

    '胡志明市': { lat: 10.8231, lng: 106.6297, name: '胡志明市', priority: 18 },
    '顺化': { lat: 16.4637, lng: 107.5909, name: '顺化', priority: 18 },

    '巴勒斯坦': { lat: 31.5000, lng: 35.1833, name: '拉姆安拉', priority: 15 },
    '加沙': { lat: 31.3833, lng: 34.3333, name: '加沙', priority: 15 },
    '约旦': { lat: 31.9454, lng: 35.9284, name: '安曼', priority: 15 },
    '安曼': { lat: 31.9454, lng: 35.9284, name: '安曼', priority: 15 },
    '利比亚': { lat: 32.8872, lng: 13.1913, name: '的黎波里', priority: 15 },
    '的黎波里': { lat: 32.8872, lng: 13.1913, name: '的黎波里', priority: 15 },
    '苏丹': { lat: 15.5007, lng: 32.5599, name: '喀土穆', priority: 15 },
    '喀土穆': { lat: 15.5007, lng: 32.5599, name: '喀土穆', priority: 15 },
    '埃塞俄比亚': { lat: 9.0250, lng: 38.7469, name: '亚的斯亚贝巴', priority: 15 },
    '坦桑尼亚': { lat: -6.3690, lng: 34.8888, name: '多多马', priority: 15 },
    '刚果': { lat: -4.0383, lng: 21.7587, name: '金沙萨', priority: 15 },
    '尼日利亚': { lat: 9.0579, lng: 7.4951, name: '阿布贾', priority: 15 },
    '阿尔及利亚': { lat: 36.7538, lng: 3.0588, name: '阿尔及尔', priority: 15 },
    '阿尔及尔': { lat: 36.7538, lng: 3.0588, name: '阿尔及尔', priority: 15 },
    '摩洛哥': { lat: 33.9716, lng: -6.8498, name: '拉巴特', priority: 15 },
    '突尼斯': { lat: 33.8869, lng: 9.5375, name: '突尼斯', priority: 15 },
    '津巴布韦': { lat: -17.8292, lng: 31.0522, name: '哈拉雷', priority: 15 },
    '卢旺达': { lat: -1.9403, lng: 29.8739, name: '基加利', priority: 15 },
    '索马里': { lat: 2.0469, lng: 45.3182, name: '摩加迪沙', priority: 15 },

    '克什米尔': { lat: 34.0000, lng: 76.0000, name: '克什米尔', priority: 15 },
    '加尔各答': { lat: 22.5726, lng: 88.3639, name: '加尔各答', priority: 15 },
    '班加罗尔': { lat: 12.9716, lng: 77.5946, name: '班加罗尔', priority: 15 },
    '金奈': { lat: 13.0827, lng: 80.2707, name: '金奈', priority: 15 },
    '果阿': { lat: 15.2993, lng: 74.1240, name: '果阿', priority: 15 },

    '喀布尔': { lat: 34.5228, lng: 69.1792, name: '喀布尔', priority: 15 },
    '巴格达': { lat: 33.3152, lng: 44.3661, name: '巴格达', priority: 15 },
    '大马士革': { lat: 33.5138, lng: 36.2765, name: '大马士革', priority: 15 },
    '贝鲁特': { lat: 33.8938, lng: 35.5018, name: '贝鲁特', priority: 15 },
    '利雅得': { lat: 24.7136, lng: 46.6753, name: '利雅得', priority: 15 },
    '麦加': { lat: 21.3891, lng: 39.8579, name: '麦加', priority: 15 },
    '麦地那': { lat: 24.5247, lng: 39.5692, name: '麦地那', priority: 15 },
    '迪拜': { lat: 25.2048, lng: 55.2708, name: '迪拜', priority: 15 },
    '安卡拉': { lat: 39.9334, lng: 32.8597, name: '安卡拉', priority: 15 },
    '伊斯坦布尔': { lat: 41.0082, lng: 28.9784, name: '伊斯坦布尔', priority: 15 },

    '巴比伦': { lat: 32.5355, lng: 44.4275, name: '巴比伦', priority: 15 },
    '波斯': { lat: 32.4279, lng: 53.6880, name: '波斯波利斯', priority: 15 },
    '波斯波利斯': { lat: 32.4279, lng: 53.6880, name: '波斯波利斯', priority: 15 },
    '亚历山大': { lat: 31.2001, lng: 29.9187, name: '亚历山大', priority: 15 },
    '亚历山大港': { lat: 31.2001, lng: 29.9187, name: '亚历山大', priority: 15 },
    '底比斯': { lat: 25.7200, lng: 32.6100, name: '底比斯', priority: 15 },
    '金字塔': { lat: 29.9792, lng: 31.1342, name: '开罗', priority: 15 },
    '苏伊士': { lat: 30.0000, lng: 32.5500, name: '苏伊士', priority: 15 },
    '苏伊士运河': { lat: 30.0000, lng: 32.5500, name: '苏伊士', priority: 15 },

    '特洛伊': { lat: 39.9575, lng: 26.2389, name: '特洛伊', priority: 15 },
    '奥林匹亚': { lat: 37.6372, lng: 21.6303, name: '奥林匹亚', priority: 15 },
    '马拉松': { lat: 38.1500, lng: 23.9667, name: '马拉松', priority: 15 },
    '温泉关': { lat: 38.7958, lng: 22.5361, name: '温泉关', priority: 15 },
    '萨拉米斯': { lat: 37.9500, lng: 23.4833, name: '萨拉米斯', priority: 15 },

    '迦太基': { lat: 36.8550, lng: 10.3267, name: '迦太基', priority: 15 },
    '西顿': { lat: 33.5631, lng: 35.3742, name: '西顿', priority: 15 },
    '耶路撒冷': { lat: 31.7683, lng: 35.2137, name: '耶路撒冷', priority: 15 },
    '伯利恒': { lat: 31.7054, lng: 35.2024, name: '伯利恒', priority: 15 },
    '拿撒勒': { lat: 32.6996, lng: 35.3036, name: '拿撒勒', priority: 15 },

    '维京': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 15 },
    '北欧海盗': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 15 },
    '奥斯陆': { lat: 59.9139, lng: 10.7522, name: '奥斯陆', priority: 15 },
    '斯德哥尔摩': { lat: 59.3293, lng: 18.0686, name: '斯德哥尔摩', priority: 15 },
    '哥本哈根': { lat: 55.6761, lng: 12.5683, name: '哥本哈根', priority: 15 },
    '赫尔辛基': { lat: 60.1282, lng: 24.9384, name: '赫尔辛基', priority: 15 },
    '雷克雅未克': { lat: 64.1466, lng: -21.9426, name: '雷克雅未克', priority: 15 },
    '冰岛': { lat: 64.1466, lng: -21.9426, name: '雷克雅未克', priority: 15 },

    '布宜诺斯艾利斯': { lat: -34.6037, lng: -58.3816, name: '布宜诺斯艾利斯', priority: 15 },
    '圣保罗': { lat: -23.5505, lng: -46.6333, name: '圣保罗', priority: 15 },
    '里约热内卢': { lat: -22.9068, lng: -43.1729, name: '里约热内卢', priority: 15 },
    '墨西哥城': { lat: 19.4326, lng: -99.1332, name: '墨西哥城', priority: 15 },
    '利马': { lat: -12.0464, lng: -77.0428, name: '利马', priority: 15 },
    '圣地亚哥': { lat: -33.4489, lng: -70.6693, name: '圣地亚哥', priority: 15 },
    '波哥大': { lat: 4.7110, lng: -74.0721, name: '波哥大', priority: 15 },
    '加拉加斯': { lat: 10.4806, lng: -66.9036, name: '加拉加斯', priority: 15 },
    '哈瓦那': { lat: 23.1136, lng: -82.3666, name: '哈瓦那', priority: 15 },
    '巴拿马': { lat: 9.0833, lng: -79.6833, name: '巴拿马城', priority: 15 },

    '奥克兰': { lat: -36.8485, lng: 174.7633, name: '奥克兰', priority: 15 },
    '惠灵顿': { lat: -41.2865, lng: 174.7762, name: '惠灵顿', priority: 15 },

    '马尼拉': { lat: 14.5995, lng: 120.9842, name: '马尼拉', priority: 15 },
    '雅加达': { lat: -6.2088, lng: 106.8456, name: '雅加达', priority: 15 },
    '仰光': { lat: 16.7862, lng: 96.1929, name: '仰光', priority: 15 },
    '金边': { lat: 11.5560, lng: 104.9282, name: '金边', priority: 15 },
    '万象': { lat: 17.9757, lng: 102.6331, name: '万象', priority: 15 },
    '吉隆坡': { lat: 3.1390, lng: 101.6869, name: '吉隆坡', priority: 15 },
    '新加坡': { lat: 1.3521, lng: 103.8198, name: '新加坡', priority: 15 },
    '曼谷': { lat: 13.7563, lng: 100.5018, name: '曼谷', priority: 15 },
    '河内': { lat: 21.0278, lng: 105.8342, name: '河内', priority: 15 },

    '乌兰巴托': { lat: 47.8864, lng: 106.9057, name: '乌兰巴托', priority: 15 },
    '伊斯兰堡': { lat: 33.6844, lng: 73.0479, name: '伊斯兰堡', priority: 15 },
    '内罗毕': { lat: -1.2864, lng: 36.8172, name: '内罗毕', priority: 15 },
    '努尔苏丹': { lat: 51.1694, lng: 71.4491, name: '努尔苏丹', priority: 15 },
    '贝尔格莱德': { lat: 44.7866, lng: 20.4489, name: '贝尔格莱德', priority: 15 },
    '索菲亚': { lat: 42.6977, lng: 23.3219, name: '索菲亚', priority: 15 },
    '布加勒斯特': { lat: 44.4268, lng: 26.1025, name: '布加勒斯特', priority: 15 },
    '基辅': { lat: 50.4501, lng: 30.5234, name: '基辅', priority: 15 },
    '明斯克': { lat: 53.9045, lng: 27.5516, name: '明斯克', priority: 15 },
    '华沙': { lat: 52.2297, lng: 21.0122, name: '华沙', priority: 15 },
    '布达佩斯': { lat: 47.4979, lng: 19.0402, name: '布达佩斯', priority: 15 },
    '布拉格': { lat: 50.0755, lng: 14.4378, name: '布拉格', priority: 15 },
    '伯尔尼': { lat: 46.9480, lng: 7.4474, name: '伯尔尼', priority: 15 },
    '阿姆斯特丹': { lat: 52.3676, lng: 4.9041, name: '阿姆斯特丹', priority: 15 },
    '布鲁塞尔': { lat: 50.8503, lng: 4.3517, name: '布鲁塞尔', priority: 15 },
    '都柏林': { lat: 53.3498, lng: -6.2603, name: '都柏林', priority: 15 },
    '爱丁堡': { lat: 55.9533, lng: -3.1883, name: '爱丁堡', priority: 15 },
};

function cleanHtmlTags(text) {
    return text
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#\d+;/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function removeTransitionText(text) {
    return text.replace(/《晓松说——历史上的今天》来到了\d+月\d+日[。，；]?\s*/g, '')
               .replace(/\|\s*鱼羊野史\s*\|\s*\d+月\d+日\s*/g, '')
               .trim();
}

function extractLocation(content, title) {
    var titleOnly = title.toLowerCase();
    var fullText = (title + ' ' + content).toLowerCase();
    var startText = fullText.substring(0, 1500);

    var countryNames = {'中国':true,'美国':true,'日本':true,'英国':true,'法国':true,'德国':true,
        '意大利':true,'西班牙':true,'俄罗斯':true,'苏联':true,'韩国':true,'朝鲜':true,
        '印度':true,'澳大利亚':true,'加拿大':true,'巴西':true,'阿根廷':true,'墨西哥':true,
        '越南':true,'泰国':true,'新加坡':true,'马来西亚':true,'印度尼西亚':true,
        '菲律宾':true,'缅甸':true,'伊朗':true,'伊拉克':true,'以色列':true,'巴勒斯坦':true,
        '南非':true,'波兰':true,'匈牙利':true,'罗马尼亚':true,'乌克兰':true,'白俄罗斯':true,
        '蒙古':true,'阿富汗':true,'沙特阿拉伯':true,'土耳其':true,'叙利亚':true,'黎巴嫩':true,
        '新西兰':true,'爱尔兰':true,'苏格兰':true,'柬埔寨':true,'巴基斯坦':true,'肯尼亚':true,
        '秘鲁':true,'智利':true,'挪威':true,'瑞典':true,'丹麦':true,'芬兰':true,
        '塞尔维亚':true,'保加利亚':true,'哈萨克斯坦':true,'葡萄牙':true,'荷兰':true,
        '比利时':true,'瑞士':true,'奥地利':true,'捷克':true,'希腊':true,'古巴':true,
        '关东':true,'关西':true};

    var regionNames = {'太平洋':true,'大西洋':true,'印度洋':true,'北冰洋':true,
        '欧洲':true,'亚洲':true,'美洲':true,'非洲':true,'大洋洲':true,
        '中东':true,'远东':true,'近东':true,'东亚':true,'东南亚':true,
        '南亚':true,'中亚':true,'北非':true,'撒哈拉':true,'加勒比':true,
        '中美洲':true,'南美洲':true,'北美洲':true};

    var eventNames = {'关东大地震':true,'珍珠港事件':true,'中途岛海战':true,'诺曼底登陆':true,
        '敦刻尔克大撤退':true,'斯大林格勒保卫战':true,'阿拉曼战役':true,'卢沟桥事变':true,
        '南京大屠杀':true,'西安事变':true,'九一八事变':true,'七七事变':true,'淞沪会战':true,
        '台儿庄战役':true,'武汉会战':true,'长沙会战':true,'渡江战役':true,'开国大典':true,
        '鸦片战争':true,'甲午战争':true,'八国联军':true,'太平天国':true,'辛亥革命':true,
        '五四运动':true,'南昌起义':true,'秋收起义':true,'遵义会议':true,'抗美援朝':true,
        '法国大革命':true,'美国独立战争':true,'南北战争':true,'明治维新':true,'戊戌变法':true,
        '洋务运动':true,'义和团':true,'北伐战争':true,'解放战争':true,'抗日战争':true,
        '安史之乱':true,'靖康之变':true,'郑和下西洋':true,'焚书坑儒':true,'玄武门之变':true,
        '杯酒释兵权':true,'虎门销烟':true,'武昌起义':true,'百团大战':true,'平津战役':true,
        '辽沈战役':true,'淮海战役':true,'工业革命':true,'文艺复兴':true,'宗教改革':true,
        '大航海时代':true,'十字军东征':true,'冷战':true,'海湾战争':true,'9·11事件':true,
        '911事件':true,'登月':true,'阿波罗':true,'挑战者号':true,'哥伦比亚号':true,
        '切尔诺贝利':true,'古巴导弹危机':true,'普法战争':true,'美西战争':true,'美墨战争':true,
        '苏芬战争':true,'波苏战争':true,'苏波战争':true,'马岛战争':true,'福克兰群岛':true,
        '巴黎公社':true,'西班牙内战':true,'不列颠空战':true,'东京大轰炸':true,
        '库尔斯克':true,'列宁格勒保卫战':true,'柏林战役':true,'柏林墙':true,
        '仁川登陆':true,'莱特湾':true,'珊瑚海海战':true,'瓜岛':true,'瓜达尔卡纳尔':true,
        '塞班岛':true,'西西里岛':true,'冲绳岛战役':true,'索姆河':true,'日德兰':true,
        '奠边府':true,'水晶之夜':true,'虹口公园':true,'皖南事变':true,'二二八事件':true,
        '井冈山':true,'井冈山会师':true,'平型关':true,'昆仑关':true,'喜峰口':true,
        '山海关':true,'黄花岗':true,'护国运动':true,'公车上书':true,'八一建军':true,
        '楚汉之争':true,'贞观之治':true,'开元盛世':true,'赤壁之战':true,'土木堡':true,
        '唐山大地震':true,'汶川大地震':true,'慕尼黑惨案':true,'波士顿倾茶':true,
        '黑船事件':true,'奥斯卡':true,'戛纳':true,'戛纳电影节':true,'威尼斯电影节':true,
        '诺贝尔奖':true,'诺贝尔':true,'哥伦布发现新大陆':true,'麦哲伦环球':true,
        '黄埔军校':true,'卢沟桥':true,'台儿庄':true,'淞沪':true,
        '平型关大捷':true,'昆仑关战役':true,'喜峰口战役':true,'黄花岗起义':true,
        '土木堡之变':true,'赤壁':true,
        '福特':true,'联合国':true,'联合国总部':true,
        'CNN':true,'Discovery':true,'探索频道':true,
        '白宫':true,'五角大楼':true,'国会':true,'总统':true,
        '好莱坞':true,'硅谷':true,'华尔街':true,'百老汇':true,
        '奥斯卡':true,'诺贝尔':true,'诺贝尔奖':true,
        '戛纳':true,'戛纳电影节':true,'威尼斯电影节':true,
        '格莱美':true,'艾美奖':true,'托尼奖':true,'普利策奖':true,
        'NBA':true,'NFL':true,'MLB':true,'FBI':true,'CIA':true,'NASA':true,
        'MIT':true,'哈佛':true,'斯坦福':true,'牛津大学':true,'剑桥大学':true,
        '北大':true,'清华':true,'黄埔军校':true,'西点军校':true,'伊顿公学':true,
        '帝国大厦':true,'自由女神像':true,'埃菲尔铁塔':true,'凯旋门':true,
        '悉尼歌剧院':true,'巴拿马运河':true,
        '微软':true,'Microsoft':true,'谷歌':true,'Google':true,'苹果':true,'iTunes':true,
        '可口可乐':true,'北约':true,'NATO':true,'北大西洋公约组织':true,'AK-47':true,'卡拉什尼科夫':true,
        'DNA':true,'化学武器':true,'贝克汉姆':true,'扎克伯格':true,'安妮·海瑟薇':true,
        '泰森':true,'大力水手':true,'山口百惠':true,'金·凯瑞':true,'坂本龙一':true,
        '直升机':true,'红男爵':true,'里希特霍芬':true,'左轮手枪':true,
        '契诃夫':true,'陀思妥耶夫斯基':true,'普希金':true,'巴赫':true,
        '慈禧':true,'尚小云':true,'梅兰芳':true,'朱自清':true,'马三立':true,
        '施今墨':true,'老舍':true,'冯玉祥':true,'粟裕':true,'溥仪':true,'乾隆':true,
        '格朗宁':true,'小野洋子':true,'列侬':true,'猫王':true,
        '喷气式飞机':true,'北极':true,'厕纸':true,'冥王星':true,
        '春晚':true,'普通话':true,'玛丽·雪莱':true,'卡朋特':true,
        '沈殿霞':true,'王力宏':true,'万艾可':true,'伟哥':true,
        '爱德华八世':true,'深蓝':true,'卡斯帕罗夫':true,
        '玄奘':true,'长安':true,'刘邦':true,'汉朝':true,'汉献帝':true,
        '袁世凯':true,'中华民国':true,'顾城':true,'中国科学院':true,
        '译制剧':true,'中国荧屏':true,'暹罗':true,'泰国':true,
        '希腊独立':true,'希腊':true,'玛雅':true,
        '伊丽莎白·泰勒':true,'马龙·白兰度':true,'莎士比亚':true,
        '费雯·丽':true,'卡萨布兰卡':true,'黎刹':true,'菲律宾':true,
        '清政府':true,'黄龙旗':true,'定军山':true,'文言文':true,
        '新文化运动':true,'白话文':true,'阿根廷':true,'以色列':true,'伊拉克':true,
        '弗里达':true,'基努·里维斯':true,'席琳·迪翁':true,'诺拉·琼斯':true};

    var cityMatches = [];
    var countryMatches = [];
    var eventMatches = [];
    var regionMatches = [];

    for (var entry of Object.entries(locationsDB)) {
        var name = entry[0];
        var data = entry[1];
        var nameLower = name.toLowerCase();

        var inTitle = titleOnly.includes(nameLower);
        var inStart = startText.includes(nameLower);
        var inFull = fullText.includes(nameLower);

        if (!inFull) continue;

        var isCountry = !!countryNames[name];
        var isEvent = !!eventNames[name];
        var isRegion = !!regionNames[name];
        var isCity = !isCountry && !isEvent && !isRegion;

        var relevance = 0;

        if (inTitle) {
            relevance += 400;
            relevance += name.length * 40;
        }

        if (inStart && !inTitle) {
            relevance += 60;
        }

        var posInText = fullText.indexOf(nameLower);
        if (posInText >= 0 && posInText < 200) {
            relevance += 40;
        }

        if (isCity) {
            relevance += name.length * 15;
            relevance += 80;
        } else if (isCountry) {
            relevance += name.length * 3;
            relevance -= 80;
        } else if (isEvent) {
            relevance += name.length * 8;
            relevance += 40;
        } else if (isRegion) {
            relevance += name.length * 3;
            relevance -= 150;
        }

        var isChinaArea = data.lng > 73 && data.lng < 136 && data.lat > 15 && data.lat < 55;

        if (isChinaArea) {
            if (inTitle) {
                relevance += 15;
            } else {
                relevance += 5;
            }
        }

        var match = {
            name: name,
            displayName: data.name,
            lat: data.lat,
            lng: data.lng,
            priority: data.priority,
            relevance: relevance,
            inTitle: inTitle,
            isCountry: isCountry,
            isEvent: isEvent,
            isCity: isCity,
            isRegion: isRegion,
            isChinaArea: isChinaArea
        };

        if (isCity) {
            cityMatches.push(match);
        } else if (isEvent) {
            eventMatches.push(match);
        } else if (isCountry) {
            countryMatches.push(match);
        } else {
            regionMatches.push(match);
        }
    }

    cityMatches.sort(function(a, b) { return b.relevance - a.relevance; });
    eventMatches.sort(function(a, b) { return b.relevance - a.relevance; });
    countryMatches.sort(function(a, b) { return b.relevance - a.relevance; });
    regionMatches.sort(function(a, b) { return b.relevance - a.relevance; });

    var bestCity = cityMatches.length > 0 ? cityMatches[0] : null;
    var bestEvent = eventMatches.length > 0 ? eventMatches[0] : null;
    var bestCountry = countryMatches.length > 0 ? countryMatches[0] : null;
    var bestRegion = regionMatches.length > 0 ? regionMatches[0] : null;

    var bestForeignCity = cityMatches.find(function(m) { return !m.isChinaArea; });
    var bestChineseCity = cityMatches.find(function(m) { return m.isChinaArea; });

    if (bestCity && bestCity.inTitle) {
        return { lat: bestCity.lat, lng: bestCity.lng, name: bestCity.displayName };
    }

    if (bestEvent && bestEvent.inTitle) {
        return { lat: bestEvent.lat, lng: bestEvent.lng, name: bestEvent.displayName };
    }

    if (bestCity && bestCity.relevance > 0) {
        if (bestForeignCity && bestChineseCity && bestChineseCity.relevance > bestForeignCity.relevance) {
            var foreignScore = bestForeignCity.relevance - (bestForeignCity.isChinaArea ? 15 : 0);
            var chineseBaseScore = bestChineseCity.relevance - (bestChineseCity.isChinaArea ? 15 : 0) - 5;
            if (foreignScore > chineseBaseScore + 30) {
                return { lat: bestForeignCity.lat, lng: bestForeignCity.lng, name: bestForeignCity.displayName };
            }
        }
        if (bestCountry && !bestCountry.isChinaArea && bestCity.isChinaArea && !bestCity.inTitle) {
            return { lat: bestCountry.lat, lng: bestCountry.lng, name: bestCountry.displayName };
        }
        if (bestEvent && bestEvent.inTitle && bestEvent.relevance > bestCity.relevance) {
            return { lat: bestEvent.lat, lng: bestEvent.lng, name: bestEvent.displayName };
        }
        return { lat: bestCity.lat, lng: bestCity.lng, name: bestCity.displayName };
    }

    if (bestEvent && bestEvent.relevance > 0) {
        return { lat: bestEvent.lat, lng: bestEvent.lng, name: bestEvent.displayName };
    }

    if (bestCountry && bestCountry.relevance > 0) {
        return { lat: bestCountry.lat, lng: bestCountry.lng, name: bestCountry.displayName };
    }

    if (bestRegion && bestRegion.relevance > 0) {
        return { lat: bestRegion.lat, lng: bestRegion.lng, name: bestRegion.displayName };
    }

    return { lat: 39.9042, lng: 116.4074, name: '北京' };
}

function categorizeStory(title, content) {
    const text = (title + ' ' + content).toLowerCase();

    if (text.includes('战争') || text.includes('战役') || text.includes('军队') ||
        text.includes('军事') || text.includes('海军') || text.includes('空军') ||
        text.includes('坦克') || text.includes('战舰') || text.includes('武器') ||
        text.includes('会战') || text.includes('战斗') || text.includes('投降') ||
        text.includes('侵略') || text.includes('入侵') || text.includes('轰炸') ||
        text.includes('登陆') || text.includes('冲锋') || text.includes('阵地')) {
        return '战争';
    }

    if (text.includes('科学') || text.includes('技术') || text.includes('发明') ||
        text.includes('发现') || text.includes('研究') || text.includes('实验') ||
        text.includes('医学') || text.includes('药物') || text.includes('疫苗') ||
        text.includes('计算机') || text.includes('互联网') || text.includes('软件') ||
        text.includes('原子') || text.includes('核') || text.includes('火箭') ||
        text.includes('航天') || text.includes('太空') || text.includes('登月')) {
        return '科技';
    }

    if (text.includes('文化') || text.includes('艺术') || text.includes('音乐') ||
        text.includes('文学') || text.includes('电影') || text.includes('戏剧') ||
        text.includes('绘画') || text.includes('雕塑') || text.includes('诗歌') ||
        text.includes('小说') || text.includes('作家') || text.includes('诗人') ||
        text.includes('导演') || text.includes('演员') || text.includes('歌手') ||
        text.includes('作曲') || text.includes('书法') || text.includes('国画') ||
        text.includes('奥斯卡') || text.includes('诺贝尔文学奖') || text.includes('出版')) {
        return '文化';
    }

    if (text.includes('政治') || text.includes('政府') || text.includes('总统') ||
        text.includes('首相') || text.includes('选举') || text.includes('议会') ||
        text.includes('政策') || text.includes('法案') || text.includes('宪法') ||
        text.includes('独立') || text.includes('建国') || text.includes('革命')) {
        return '政治';
    }

    if (text.includes('经济') || text.includes('金融') || text.includes('股票') ||
        text.includes('市场') || text.includes('贸易') || text.includes('货币') ||
        text.includes('银行') || text.includes('公司') || text.includes('企业')) {
        return '经济';
    }

    return '历史';
}

function splitVolumeByH3(volumeHtml) {
    const chapters = [];
    const sections = volumeHtml.split(/<h3[^>]*>/);
    for (let i = 1; i < sections.length; i++) {
        const section = sections[i];
        const h3TitleMatch = section.match(/^(.*?)<\/h3>/);
        if (!h3TitleMatch) continue;
        let h3Title = cleanHtmlTags(h3TitleMatch[1]).trim();
        h3Title = h3Title.replace(/[|｜\s]*鱼羊野史[|｜\s]*/g, '').trim();
        h3Title = h3Title.replace(/[|｜]/g, '').trim();
        const dateMatch = h3Title.match(/(\d+)月(\d+)日/);
        if (!dateMatch) continue;
        const afterH3 = section.replace(/^.*?<\/h3>/, '');
        chapters.push({
            title: h3Title,
            html: afterH3
        });
    }
    return chapters;
}

function splitChapterByH4(chapterHtml, chapterTitle) {
    const stories = [];
    const sections = chapterHtml.split(/<h4[^>]*>/);
    for (let i = 1; i < sections.length; i++) {
        const section = sections[i];
        const h4TitleMatch = section.match(/^(.*?)<\/h4>/);
        if (!h4TitleMatch) continue;
        let h4Title = cleanHtmlTags(h4TitleMatch[1]).trim();
        h4Title = h4Title.replace(/^[｜|]\s*/, '').replace(/\s*[｜|]$/, '').trim();
        const afterH4 = section.replace(/^.*?<\/h4>/, '');
        const pMatches = [...afterH4.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)];
        let pTexts = pMatches.map(m => cleanHtmlTags(m[1]).trim()).filter(t => t.length > 0);
        pTexts = pTexts.map(p => removeTransitionText(p)).filter(t => t.length > 0);
        if (pTexts.length === 0) continue;
        const content = pTexts.join('\n\n');
        if (content.length < 20) continue;
        const location = extractLocation(content, chapterTitle + ' ' + h4Title);
        const category = categorizeStory(h4Title, content);
        stories.push({
            title: h4Title,
            content: content,
            location: location,
            category: category,
            chapterLink: {
                chapterTitle: chapterTitle,
                sectionIndex: i,
                totalSections: sections.length - 1
            }
        });
    }
    return stories;
}

const epub = new Epub(epubPath);

epub.on('end', function() {
    console.log('EPUB解析完成');
    console.log('总spine项数:', epub.spine.contents.length);

    const allStories = [];
    let storyId = 1;
    let processed = 0;
    const total = epub.spine.contents.length;

    epub.spine.contents.forEach(function(item) {
        epub.getChapter(item.id, function(err, text) {
            processed++;

            if (err || !text) {
                if (processed >= total) outputResults();
                return;
            }

            var h3Count = (text.match(/<h3[^>]*>/g) || []).length;
            var h4Count = (text.match(/<h4[^>]*>/g) || []).length;
            if (h3Count === 0 && h4Count === 0) {
                if (processed >= total) outputResults();
                return;
            }

            console.log('处理文件: ' + item.id + ' (h3: ' + h3Count + ', h4: ' + h4Count + ')');

            var dateChapters = splitVolumeByH3(text);
            console.log('  -> 切分出 ' + dateChapters.length + ' 个日期章节');

            dateChapters.forEach(function(chapter) {
                var splitStories = splitChapterByH4(chapter.html, chapter.title);

                splitStories.forEach(function(story) {
                    allStories.push({
                        id: storyId++,
                        title: story.title,
                        content: story.content,
                        location: story.location,
                        category: story.category,
                        chapterLink: story.chapterLink,
                        originalChapter: chapter.title
                    });
                });

                if (splitStories.length > 0) {
                    console.log('  -> ' + chapter.title + ': ' + splitStories.length + ' 个故事');
                }
            });

            if (processed >= total) {
                outputResults();
            }
        });
    });

    function outputResults() {
        console.log('\n========== 提取完成 ==========');
        console.log('总故事数:', allStories.length);

        const locationStats = {};
        allStories.forEach(function(story) {
            const locName = story.location.name;
            locationStats[locName] = (locationStats[locName] || 0) + 1;
        });

        console.log('\n地点分布统计 (Top 30):');
        const sortedLocations = Object.entries(locationStats)
            .sort(function(a, b) { return b[1] - a[1]; });

        sortedLocations.slice(0, 30).forEach(function([name, count]) {
            console.log('  ' + name + ': ' + count + ' 个故事');
        });

        const chineseLocations = sortedLocations.filter(function([name]) {
            const locData = locationsDB[name];
            return locData && locData.lng > 70 && locData.lng < 140 && locData.lat > 15 && locData.lat < 55;
        });

        const chineseTotal = chineseLocations.reduce((sum, [_, count]) => sum + count, 0);
        console.log('\n中国地区故事总数:', chineseTotal, '(占比: ' + (chineseTotal / allStories.length * 100).toFixed(1) + '%)');

        const categoryStats = {};
        allStories.forEach(function(story) {
            categoryStats[story.category] = (categoryStats[story.category] || 0) + 1;
        });
        console.log('\n分类统计:');
        Object.entries(categoryStats).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
            console.log('  ' + cat + ': ' + count);
        });

        const finalData = {
            stories: allStories,
            total: allStories.length,
            locations: Object.keys(locationStats).length,
            categories: Object.keys(categoryStats)
        };

        fs.writeFileSync(path.join(__dirname, 'data.js'),
            'const storiesData = ' + JSON.stringify(finalData, null, 2) + ';');

        console.log('\n数据文件已生成: data.js');
    }
});

epub.on('error', function(err) {
    console.error('EPUB解析失败:', err);
});

epub.parse();
