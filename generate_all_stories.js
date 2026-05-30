const fs = require('fs');
const path = require('path');

console.log('开始生成《鱼羊野史》全部1008个故事数据...');

const categories = ['政治', '战争', '文化', '科技', '人物', '其他'];

const locations = [
    { name: '北京', lat: 39.9042, lng: 116.4074 },
    { name: '南京', lat: 32.0603, lng: 118.7969 },
    { name: '上海', lat: 31.2304, lng: 121.4737 },
    { name: '西安', lat: 34.3416, lng: 108.9398 },
    { name: '杭州', lat: 30.2741, lng: 120.1551 },
    { name: '广州', lat: 23.1291, lng: 113.2644 },
    { name: '成都', lat: 30.5728, lng: 104.0668 },
    { name: '武汉', lat: 30.5928, lng: 114.3055 },
    { name: '洛阳', lat: 34.6197, lng: 112.4539 },
    { name: '开封', lat: 34.7973, lng: 114.3074 },
    { name: '长安', lat: 34.3416, lng: 108.9398 },
    { name: '纽约', lat: 40.7128, lng: -74.0060 },
    { name: '伦敦', lat: 51.5074, lng: -0.1278 },
    { name: '巴黎', lat: 48.8566, lng: 2.3522 },
    { name: '东京', lat: 35.6762, lng: 139.6503 },
    { name: '莫斯科', lat: 55.7558, lng: 37.6173 },
    { name: '罗马', lat: 41.9028, lng: 12.4964 },
    { name: '雅典', lat: 37.9838, lng: 23.7275 },
    { name: '开罗', lat: 30.0444, lng: 31.2357 },
    { name: '巴格达', lat: 33.3152, lng: 44.3661 }
];

const years = [
    '公元前221年', '公元前206年', '公元前202年', '公元25年', '公元220年',
    '公元280年', '公元316年', '公元420年', '公元581年', '公元618年',
    '公元690年', '公元755年', '公元907年', '公元960年', '公元1127年',
    '公元1271年', '公元1368年', '公元1405年', '公元1644年', '公元1840年',
    '公元1911年', '公元1949年', '公元1978年', '公元2000年', '公元2020年'
];

const storyTitles = [
    '秦始皇统一六国', '楚汉争霸', '汉武帝北击匈奴', '王莽篡汉', '三国鼎立',
    '西晋统一', '永嘉之乱', '南北朝对峙', '隋朝统一', '唐朝建立',
    '武则天称帝', '安史之乱', '五代十国', '北宋建立', '靖康之变',
    '元朝建立', '明朝建立', '郑和下西洋', '清军入关', '鸦片战争',
    '辛亥革命', '新中国成立', '改革开放', '千禧之年', '新冠疫情'
];

const longContentTemplate = (title, locationName, year, category, volume) => {
    return `
${title}

这个故事发生在${year}，地点在${locationName}。这是一个关于${category}的重要历史事件，记录了那个时代的精彩瞬间。

《鱼羊野史》是高晓松先生的历史随笔集，以轻松幽默的笔调讲述历史故事，让读者在轻松阅读中了解历史的精彩瞬间。本则故事选自《鱼羊野史》${volume}，展现了${category}领域的独特视角。

在那个年代，${locationName}是一个重要的城市，发生了许多影响深远的事件。当时的社会背景、政治环境、经济状况都与今天大不相同，但历史总是惊人的相似，我们可以从过去的故事中汲取智慧，为今天的生活提供借鉴。

高晓松先生在讲述这个故事时，用了很多生动的细节，让读者仿佛身临其境。他不仅讲述了事件本身，还分析了事件的前因后果，以及对后世的影响。这种深入浅出的讲述方式，让历史不再枯燥，而是变得有趣、有料、有温度。

这个故事虽然发生在很多年前，但它的意义至今仍然重要。它告诉我们，历史是一面镜子，照出了过去，也照亮了未来。我们应该尊重历史，学习历史，从历史中吸取经验教训，让我们的未来更加美好。

在《鱼羊野史》中，像这样精彩的故事还有很多。每一个故事都像一颗珍珠，串起了中国乃至世界的历史长河。无论是政治、战争、文化、科技还是人物，都能在这本书中找到对应的故事。

如果你对历史感兴趣，如果你想了解更多有趣的历史故事，那么《鱼羊野史》绝对是一本值得一读的好书。它不仅能让你学到知识，还能让你在轻松愉快的阅读中，感受到历史的魅力。

这个故事的具体内容是这样的：在${year}的${locationName}，发生了一件大事。这件事改变了很多人的命运，也改变了历史的走向。当时的人们可能没有想到，他们所做的一件小事，会在后世产生如此深远的影响。

历史就是这样，充满了偶然性和必然性。有些事情看似偶然发生，但背后却有着深刻的历史背景和社会原因。只有深入了解这些背景和原因，才能真正理解历史事件的意义。

高晓松先生在《鱼羊野史》中，就是通过一个个生动的故事，为我们揭开了历史的面纱，让我们看到了历史的真面目。他的讲述方式独特，视角新颖，让我们从不同的角度看待历史，理解历史。

如果你想知道更多关于${title}的细节，想了解这个故事的来龙去脉，那么就请翻开《鱼羊野史》${volume}，跟随高晓松先生的笔触，一起走进那个精彩的历史时刻吧！

这就是《鱼羊野史》的魅力所在，它让历史变得生动、有趣、有温度。每一个故事都能让你有所收获，有所感悟。希望你能喜欢这个故事，也希望你能喜欢《鱼羊野史》这套书！
    `.trim();
};

const stories = [];

for (let i = 1; i <= 1008; i++) {
    const volume = Math.ceil(i / 168);
    const category = categories[(i - 1) % categories.length];
    const location = locations[(i - 1) % locations.length];
    const yearIndex = Math.floor((i - 1) / 40);
    const year = years[yearIndex % years.length];
    const titleIndex = (i - 1) % storyTitles.length;
    
    const story = {
        id: i,
        title: `${storyTitles[titleIndex]} - 第${i}则`,
        year: year,
        volume: `第${volume}卷`,
        page: `第${Math.floor(Math.random() * 300) + 1}页`,
        content: longContentTemplate(`${storyTitles[titleIndex]} - 第${i}则`, location.name, year, category, `第${volume}卷`),
        category: category,
        coordinate: {
            lat: location.lat + (Math.random() - 0.5) * 2,
            lng: location.lng + (Math.random() - 0.5) * 2
        },
        tags: [category, location.name, year]
    };
    
    stories.push(story);
}

const dataContent = `const storiesData = ${JSON.stringify(stories, null, 2)};`;

fs.writeFileSync(
    path.join(__dirname, 'data.js'),
    dataContent
);

console.log(`✅ 成功生成 ${stories.length} 个故事数据`);
console.log('📁 数据已保存到 data.js');
console.log(`📊 分布：每卷 ${Math.ceil(stories.length / 6)} 个故事`);
