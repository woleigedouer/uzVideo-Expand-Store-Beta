const configs = [
    {
        title: 'uz影视 all in one 直连版',
        description: '由豆整理的 <a href="https://gitee.com/woleigedouer/uzVideo-extensions">豆的 gitee</a>，感谢豆',
        resourceUrl: 'https://gitee.com/woleigedouer/uzVideo-extensions/raw/main/uzAio_gitee.json',
        category: '影视资源'
    },
    {
        title: 'uz影视 all in one 无代理',
        description: '整合大佬们开发的资源，感谢所有大佬',
        resourceUrl: 'https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/uzAio_raw.json',
        category: '影视资源'
    },
    {
        title: 'uz影视 all in one',
        description: '整合大佬们开发的资源，感谢所有大佬',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/uzAio.json',
        category: '影视资源'
    },
    {
        title: 'pv大佬 all in one',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a> 大佬 all in one，感谢大佬",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/uzAio.json',
        category: '影视资源'
    },
    {
        title: '视频源扩展',
        description: "视频源扩展大多由 <a href='https://github.com/Yswag'>Yswag</a> 大佬开发，感谢大佬",
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/vod/vod.json',
        category: '视频源'
    },
    {
        title: '网盘工具扩展-夸克、UC、阿里',
        description: "阿里解析功能由 <a href='https://github.com/wangdepeng100'>wangdepeng100</a> 大佬开发，感谢大佬。iOS15 以下系统无法使用，夸克需要会员",
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/panTools/panTools.json',
        category: '网盘工具'
    },
    {
        title: '网盘工具扩展-夸克、UC、阿里、天翼',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a>   大佬开发，感谢大佬。iOS15 以下系统无法使用，夸克需要会员",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/panTools/panTools.json',
        category: '网盘工具'
    },
    {
        title: '网盘源',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a>   大佬开发，感谢大佬",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/vod/vod.json',
        category: '网盘工具'
    },
    {
        title: '推荐首页扩展',
        description: '展示视频推荐',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/recommend/douban.json',
        category: '推荐扩展'
    },
    {
        title: '采集站',
        description: '采集站资源，不需要添加太多两个够用',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo/main/video_sources_default.json',
        category: '采集资源'
    },
]

// 添加搜索功能
function setupSearch() {
    // 创建搜索容器
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="搜索资源...">
        <button id="searchButton">搜索</button>
    `;
    document.body.appendChild(searchContainer);

    // 搜索图标点击事件
    const searchIcon = document.querySelector('.nav-icon .fa-search');
    if (searchIcon) {
        searchIcon.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                document.getElementById('searchInput').focus();
            }
        });
    }

    // 点击其他地方关闭搜索框
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target) && 
            !searchIcon.parentElement.contains(e.target)) {
            searchContainer.classList.remove('active');
        }
    });

    // 添加搜索事件监听
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');

    searchButton.addEventListener('click', () => {
        searchResources(searchInput.value.trim());
    });

    searchInput.addEventListener('keyup', (e) => {
        // 回车键或搜索框为空时都触发搜索
        if (e.key === 'Enter' || searchInput.value.trim() === '') {
            searchResources(searchInput.value.trim());
        }
    });
}

function installResource(isSpecial, configUrl) {
    if (!configUrl) {
        return;
    }

    const encodedUrl = encodeURIComponent(configUrl)
    const baseScheme = 'uzVideo://uzVideo?action=addSub&url='
    const intentScheme = 'intent://uzVideo?action=addSub&url='

    const finalUrl = isSpecial ? `${intentScheme}${encodedUrl}#Intent;scheme=uzVideo;end` : `${baseScheme}${encodedUrl}`

    window.location.href = finalUrl
}

// 添加复制函数
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            alert('使用路径：uz影视 -> 设置 -> 数据管理 -> 订阅 -> +')
            alert('复制成功')
        })
        .catch((err) => {
            const textArea = document.createElement('textarea')
            textArea.value = text
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            alert('复制失败，请手动复制：\n\n' + text + '\n\n使用路径：uz影视 -> 设置 -> 数据管理 -> 订阅 -> +')
        })
}

// 获取所有分类
function getAllCategories() {
    const categories = new Set();
    configs.forEach(config => {
        if (config.category) {
            categories.add(config.category);
        }
    });
    return Array.from(categories);
}

// 创建分类标签
function createCategoryTabs() {
    const categories = getAllCategories();
    const tabsContainer = document.getElementById('categoryTabs');
    
    // 为已有的"全部"按钮添加事件监听
    const allTab = document.querySelector('.category-tab[data-category="all"]');
    if (allTab) {
        allTab.addEventListener('click', () => filterByCategory('all'));
    }
    
    categories.forEach(category => {
        const tabButton = document.createElement('button');
        tabButton.className = 'category-tab';
        tabButton.textContent = category;
        tabButton.dataset.category = category;
        tabButton.addEventListener('click', () => filterByCategory(category));
        tabsContainer.appendChild(tabButton);
    });
}

// 当前选中的类别
let currentCategory = 'all';
let currentSearchQuery = '';

// 根据分类筛选资源
function filterByCategory(category) {
    // 更新当前分类
    currentCategory = category;
    
    // 更新活跃标签
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if ((category === 'all' && tab.dataset.category === 'all') || 
            tab.dataset.category === category) {
            tab.classList.add('active');
        }
    });

    // 应用当前筛选条件
    applyFilters();
}

// 搜索功能
function searchResources(query) {
    currentSearchQuery = query;
    applyFilters();
}

// 应用筛选条件（类别和搜索）
function applyFilters() {
    const resourceElements = document.querySelectorAll('.resource-group');
    
    resourceElements.forEach((elem, index) => {
        const config = configs[index];
        
        // 类别匹配
        const categoryMatch = currentCategory === 'all' || config.category === currentCategory;
        
        // 搜索匹配
        let searchMatch = true;
        if (currentSearchQuery) {
            const query = currentSearchQuery.toLowerCase();
            const titleMatch = config.title.toLowerCase().includes(query);
            const descMatch = config.description.toLowerCase().includes(query);
            searchMatch = titleMatch || descMatch;
        }
        
        // 同时匹配类别和搜索
        if (categoryMatch && searchMatch) {
            elem.classList.remove('hidden');
        } else {
            elem.classList.add('hidden');
        }
    });
}

window.onload = function () {
    // 渲染资源列表
    const container = document.getElementById('resourcesContainer')
    configs.forEach((config) => {
        const resourceGroup = document.createElement('div')
        resourceGroup.className = 'resource-group'
        resourceGroup.innerHTML = `
            <div class="resource-header">
                <div class="resource-title">${config.title}</div>
                ${config.description ? `<div class="resource-description">${config.description}</div>` : ''}
                <div class="resource-category">分类: ${config.category}</div>
            </div>
            <div class="button-row">
                <button class="copy-btn" onclick="copyToClipboard('${config.resourceUrl}')">复制链接</button>
                <button class="help-btn" onclick="window.open('https://uz-video-five.vercel.app/help.html')">使用教程</button>
                <button class="btn" onclick="installResource(false, '${config.resourceUrl}')">添加</button>
                <button class="btn" onclick="installResource(true, '${config.resourceUrl}')">特殊添加</button>
            </div>
        `
        container.appendChild(resourceGroup)
    })

    // 创建分类标签
    createCategoryTabs();
    
    // 确保初始状态显示全部资源
    filterByCategory('all');

    // 设置搜索功能
    setupSearch();

    // 导航项点击效果
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
} 