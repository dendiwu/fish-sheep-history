let globe = null;
let currentCategory = 'all';
let filteredStories = [];
let selectedYear = null;

const categoryColors = {
  '政治': '#c0392b',
  '战争': '#e74c3c',
  '文化': '#3498db',
  '科技': '#f39c12',
  '人物': '#9b59b6',
  '其他': '#95a5a6'
};

function showLoading() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'block';
}

function hideLoading() {
  const loading = document.getElementById('loading');
  if (loading) loading.style.display = 'none';
}

function showWelcomeGuide() {
  const guide = document.getElementById('welcome-guide');
  if (guide) {
    guide.style.display = 'block';
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => {
        guide.style.display = 'none';
      });
    }
  }
}

async function initGlobe() {
  showLoading();
  
  try {
    // 等待 globe.gl 库加载完成
    if (typeof Globe === 'undefined') {
      // 如果还没加载，等待一下
      await new Promise(resolve => {
        const checkInterval = setInterval(() => {
          if (typeof Globe !== 'undefined') {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        // 设置超时
        setTimeout(() => {
          clearInterval(checkInterval);
          resolve();
        }, 10000);
      });
    }
    
    const globeContainer = document.getElementById('globe-container');
    globe = new Globe(globeContainer)
      .globeImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-night.jpg')
      .backgroundImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
      .showAtmosphere(true)
      .atmosphereColor('#d4a574')
      .atmosphereAltitude(0.15)
      .pointOfView({ lat: 35, lng: 105, altitude: 2.5 }, 2000)
      .enablePointerInteraction(true)
      .enableGlobeHover(true);
    
    setTimeout(() => {
      updateGlobePoints(storiesData);
      hideLoading();
      document.getElementById('total-stories').textContent = storiesData.length;
      showWelcomeGuide();
    }, 1000);
  } catch (error) {
    console.error('初始化地球失败:', error);
    hideLoading();
    alert('初始化失败，请刷新页面重试');
  }
}

function updateGlobePoints(stories) {
  if (!globe) return;
  
  const pointsData = stories.map(story => ({
    ...story,
    color: categoryColors[story.category] || '#d4a574'
  }));
  
  globe.pointsData(pointsData)
    .pointLat(d => d.coordinate.lat)
    .pointLng(d => d.coordinate.lng)
    .pointColor(d => d.color)
    .pointAltitude(0.08)
    .pointRadius(0.7)
    .pointsMerge(false)
    .pointLabel(d => `
      <div style="background: rgba(26, 26, 26, 0.95); padding: 15px; border-radius: 10px; border: 2px solid #d4a574; min-width: 200px;">
        <div style="color: #d4a574; font-weight: bold; font-size: 16px; margin-bottom: 8px;">${d.title}</div>
        <div style="color: #888; font-size: 14px; margin-bottom: 5px;">📅 ${d.year}</div>
        <div style="color: #888; font-size: 14px; margin-bottom: 5px;">🏷️ ${d.category}</div>
        <div style="color: #888; font-size: 14px;">📖 ${d.volume}</div>
        <div style="color: #d4a574; font-size: 12px; margin-top: 10px;">点击查看详情</div>
      </div>
    `)
    .onPointClick(handlePointClick);
}

function handlePointClick(point) {
  showStoryModal(point);
  if (globe) {
    globe.pointOfView({ lat: point.coordinate.lat, lng: point.coordinate.lng, altitude: 1.5 }, 1000);
  }
}

function showStoryModal(story) {
  const modal = document.getElementById('story-modal');
  if (!modal) return;
  
  document.getElementById('modal-title').textContent = story.title;
  document.getElementById('modal-year').textContent = story.year;
  document.getElementById('modal-volume').textContent = story.volume;
  document.getElementById('modal-category').textContent = story.category;
  document.getElementById('modal-content').textContent = story.content;
  document.getElementById('modal-location').textContent = `📍 位置: ${story.coordinate.lat.toFixed(2)}°, ${story.coordinate.lng.toFixed(2)}°`;
  
  modal.style.display = 'block';
}

function parseYearToNumber(yearStr) {
  // 将年份字符串转换为可比较的数字
  const match = yearStr.match(/(\d+)/);
  if (!match) return 0;
  let year = parseInt(match[1]);
  if (yearStr.includes('公元前')) {
    year = -year;
  }
  return year;
}

function initTimeline() {
  const timelineContainer = document.getElementById('timeline');
  if (!timelineContainer) return;
  
  // 提取并排序年份
  const yearSet = new Set();
  storiesData.forEach(story => {
    yearSet.add(story.year);
  });
  
  const years = Array.from(yearSet).sort((a, b) => parseYearToNumber(a) - parseYearToNumber(b));
  
  const margin = { top: 10, right: 30, bottom: 30, left: 30 };
  const width = timelineContainer.clientWidth - margin.left - margin.right;
  const height = 60 - margin.top - margin.bottom;
  
  if (width <= 0) return;
  
  const svg = d3.select('#timeline')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);
  
  // 计算每个年份的位置
  const xScale = d3.scaleBand()
    .domain(years)
    .range([0, width])
    .padding(0.1);
  
  // 绘制时间轴刻度
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(xScale))
    .selectAll('text')
    .style('fill', '#888')
    .style('font-size', '10px')
    .attr('transform', 'rotate(-45)')
    .attr('text-anchor', 'end');
  
  svg.selectAll('.domain, .tick line')
    .style('stroke', '#d4a574');
  
  // 绘制年份柱子
  svg.selectAll('.year-bar')
    .data(years)
    .enter()
    .append('rect')
    .attr('class', 'year-bar')
    .attr('x', d => xScale(d))
    .attr('y', 0)
    .attr('width', xScale.bandwidth())
    .attr('height', height)
    .attr('fill', '#d4a574')
    .attr('opacity', 0.3)
    .attr('cursor', 'pointer')
    .on('click', function(event, year) {
      filterByYear(year);
      d3.selectAll('.year-bar').attr('opacity', 0.3);
      d3.select(this).attr('opacity', 0.8);
    });
  
  // 添加"全部"按钮
  const allBtn = document.createElement('button');
  allBtn.textContent = '全部';
  allBtn.className = 'timeline-all-btn';
  allBtn.style.cssText = `
    position: absolute;
    top: 5px;
    right: 30px;
    padding: 5px 15px;
    border: 2px solid #d4a574;
    background: rgba(26, 26, 26, 0.9);
    color: #d4a574;
    border-radius: 15px;
    cursor: pointer;
    font-size: 12px;
  `;
  allBtn.onclick = function() {
    filterByYear(null);
    d3.selectAll('.year-bar').attr('opacity', 0.3);
  };
  timelineContainer.appendChild(allBtn);
}

function filterByYear(year) {
  selectedYear = year;
  applyFilters();
}

function initSearch() {
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  if (!searchInput || !searchResults) return;
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }
    
    const results = storiesData.filter(story => 
      story.title.toLowerCase().includes(query) ||
      story.year.toLowerCase().includes(query) ||
      story.category.toLowerCase().includes(query) ||
      story.tags.some(tag => tag.toLowerCase().includes(query))
    ).slice(0, 10);
    
    if (results.length > 0) {
      searchResults.innerHTML = results.map(story => `
        <div class="search-result-item" data-id="${story.id}">
          <div style="color: #d4a574; font-weight: bold;">${story.title}</div>
          <div style="color: #888; font-size: 12px;">${story.year} · ${story.category}</div>
        </div>
      `).join('');
      searchResults.style.display = 'block';
      
      document.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', function() {
          const id = parseInt(this.dataset.id);
          const story = storiesData.find(s => s.id === id);
          if (story) {
            showStoryModal(story);
            if (globe) {
              globe.pointOfView({ lat: story.coordinate.lat, lng: story.coordinate.lng, altitude: 1.5 }, 1000);
            }
            searchResults.style.display = 'none';
            searchInput.value = '';
          }
        });
      });
    } else {
      searchResults.innerHTML = '<div class="search-result-item" style="color: #888;">未找到相关故事</div>';
      searchResults.style.display = 'block';
    }
  });
  
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
}

function initCategoryFilter() {
  document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentCategory = this.dataset.category;
      applyFilters();
    });
  });
}

function applyFilters() {
  filteredStories = storiesData;
  
  if (currentCategory !== 'all') {
    filteredStories = filteredStories.filter(s => s.category === currentCategory);
  }
  
  if (selectedYear) {
    filteredStories = filteredStories.filter(s => s.year === selectedYear);
  }
  
  updateGlobePoints(filteredStories);
  document.getElementById('total-stories').textContent = filteredStories.length;
}

function initModal() {
  const modal = document.getElementById('story-modal');
  const closeBtn = document.querySelector('.close-btn');
  
  if (!modal || !closeBtn) return;
  
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });
}

async function init() {
  if (typeof storiesData === 'undefined' || !storiesData || storiesData.length === 0) {
    console.error('数据未加载');
    alert('数据加载失败，请刷新页面重试');
    return;
  }
  
  await initGlobe();
  initTimeline();
  initSearch();
  initCategoryFilter();
  initModal();
  
  console.log('✅ 鱼羊野史 - 全球历史故事地图已加载');
  console.log(`📖 共 ${storiesData.length} 个历史故事`);
}

document.addEventListener('DOMContentLoaded', init);
