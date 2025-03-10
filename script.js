const configs = [
    {
        title: 'all in one',
        description: '整合大佬们开发的资源，感谢所有大佬',
        resourceUrl: 'https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/uzAio_raw.json',
        category: '综合',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo-extensions',
        updateDate: '2025-03-03',
        connectionType: '需代理'
    },
    {
        title: 'all in one',
        description: '整合大佬们开发的资源，感谢所有大佬',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/uzAio.json',
        category: '综合',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo-extensions',
        updateDate: '2025-03-03',
        connectionType: '直连'
    },
    {
        title: 'all in one',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a> 大佬 all in one，感谢大佬",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/uzAio.json',
        category: '综合',
        provider: 'proversion2024',
        providerUrl: 'https://github.com/proversion2024',
        updateDate: '2025-03-02',
        connectionType: '直连'
    },
    {
        title: '视频源综合',
        description: "视频源扩展大多由 <a href='https://github.com/Yswag'>Yswag</a> 大佬开发，感谢大佬",
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/vod/vod.json',
        category: '视频源',
        provider: 'Yswag',
        providerUrl: 'https://github.com/Yswag',
        updateDate: '2025-03-01',
        connectionType: '直连'
    },
    {
        title: '网盘工具扩展-夸克、UC、阿里',
        description: "阿里解析功能由 <a href='https://github.com/wangdepeng100'>wangdepeng100</a> 大佬开发，感谢大佬。iOS15 以下系统无法使用，夸克需要会员",
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/panTools/panTools.json',
        category: '扩展工具',
        provider: 'wangdepeng100',
        providerUrl: 'https://github.com/wangdepeng100',
        updateDate: '2025-02-28',
        connectionType: '直连'
    },
    {
        title: '网盘工具扩展-夸克、UC、阿里、天翼',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a>   大佬开发，感谢大佬。iOS15 以下系统无法使用，夸克需要会员",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/panTools/panTools.json',
        category: '扩展工具',
        provider: 'proversion2024',
        providerUrl: 'https://github.com/proversion2024',
        updateDate: '2025-02-27',
        connectionType: '直连'
    },
    {
        title: '网盘源综合',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a>   大佬开发，感谢大佬",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/vod/vod.json',
        category: '视频源',
        provider: 'proversion2024',
        providerUrl: 'https://github.com/proversion2024',
        updateDate: '2025-02-26',
        connectionType: '直连'
    },
    {
        title: '首页推荐扩展',
        description: '展示视频推荐',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/recommend/douban.json',
        category: '扩展工具',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo-extensions',
        updateDate: '2025-02-25',
        connectionType: '直连'
    },
    {
        title: '采集综合',
        description: '采集站资源，不需要添加太多两个够用',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo/main/video_sources_default.json',
        category: '视频源',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo',
        updateDate: '2025-02-24',
        connectionType: '直连'
    },
]

// 分页配置
const itemsPerPage = 9; // 每页显示9个资源（3x3网格）
let currentPage = 1;
let totalPages = Math.ceil(configs.length / itemsPerPage);

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

// 添加分页功能
function setupPagination() {
    const pageFooter = document.querySelector('.page-footer');
    if (!pageFooter) {
        console.error('找不到.page-footer元素');
        return;
    }
    
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'pagination';
    paginationDiv.innerHTML = `
        <button id="prevPage" title="上一页">&lt;</button>
        <span>跳至</span>
        <input type="number" id="pageInput" min="1" max="${totalPages}" value="${currentPage}">
        <span>/ ${totalPages} 页</span>
        <button id="nextPage" title="下一页">&gt;</button>
    `;
    pageFooter.appendChild(paginationDiv);

    // 上一页
    document.getElementById('prevPage').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderPage();
        }
    });

    // 下一页
    document.getElementById('nextPage').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderPage();
        }
    });

    // 跳转到指定页面
    document.getElementById('pageInput').addEventListener('change', (e) => {
        const page = parseInt(e.target.value);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderPage();
        }
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

    // 重置分页
    currentPage = 1;
    
    // 应用当前筛选条件
    applyFilters();
}

// 搜索功能
function searchResources(query) {
    currentSearchQuery = query;
    currentPage = 1; // 重置分页
    applyFilters();
}

// 应用筛选条件（类别和搜索）
function applyFilters() {
    console.log(`应用筛选 - 类别: ${currentCategory}, 搜索: ${currentSearchQuery}`);
    
    // 获取筛选后的数据
    const filteredConfigs = configs.filter(config => {
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
        return categoryMatch && searchMatch;
    });

    console.log(`筛选后的资源数量: ${filteredConfigs.length}`);
    
    // 更新总页数
    totalPages = Math.ceil(filteredConfigs.length / itemsPerPage);
    console.log(`更新后的总页数: ${totalPages}`);
    
    // 更新分页UI
    updatePaginationUI(filteredConfigs.length);
    
    // 渲染当前页
    renderItems(filteredConfigs);
}

// 更新分页UI
function updatePaginationUI(totalItems) {
    console.log(`更新分页UI，总项目数: ${totalItems}`);
    
    const pageInput = document.getElementById('pageInput');
    if (!pageInput) {
        console.error('找不到pageInput元素');
        return;
    }
    
    const pageSpan = pageInput.nextElementSibling;
    if (!pageSpan) {
        console.error('找不到页码span元素');
        return;
    }
    
    totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
    console.log(`总页数: ${totalPages}`);
    
    pageInput.max = totalPages;
    pageInput.value = Math.min(currentPage, totalPages);
    pageSpan.textContent = `/ ${totalPages} 页`;
    
    // 显示总数量
    const resourceCountElem = document.querySelector('.page-description');
    if (resourceCountElem) {
        resourceCountElem.textContent = `共 ${totalItems} 条数据`;
        console.log(`更新资源计数: ${totalItems}`);
    } else {
        console.error('找不到.page-description元素');
    }
}

// 渲染指定页的内容
function renderPage() {
    applyFilters();
}

// 渲染资源项
function renderItems(items) {
    const container = document.getElementById('resourcesContainer');
    if (!container) {
        console.error('找不到resourcesContainer元素');
        return;
    }
    
    console.log(`正在渲染${items.length}个资源项，当前页面: ${currentPage}`);
    container.innerHTML = '';
    
    // 计算当前页需要显示的数据
    const start = (currentPage - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, items.length);
    const pageItems = items.slice(start, end);
    console.log(`当前页显示: ${start}到${end}, 共${pageItems.length}项`);
    
    // 渲染每个资源
    pageItems.forEach((config, index) => {
        console.log(`渲染第${index + 1}个资源: ${config.title}`);
        const resourceGroup = document.createElement('div');
        resourceGroup.className = 'resource-group';
        
        resourceGroup.innerHTML = `
            <div class="resource-header">
                <div class="resource-title">${config.title}</div>
                <div class="resource-update">更新于 ${config.updateDate}</div>
                <div class="resource-tags">
                    <span class="resource-tag ${config.connectionType === '直连' ? 'direct' : 'proxy'}">${config.connectionType}</span>
                    <span class="resource-tag">${config.category}</span>
                </div>
                <div class="resource-provider"><a href="${config.providerUrl}" target="_blank">${config.provider}</a> 提供</div>
            </div>
            <div class="resource-actions">
                <button class="resource-btn copy" onclick="copyToClipboard('${config.resourceUrl}')">复制链接</button>
                <button class="resource-btn help" onclick="window.open('https://uz-video-five.vercel.app/help.html')">教程</button>
                <button class="resource-btn add" onclick="installResource(false, '${config.resourceUrl}')">添加</button>
                <button class="resource-btn special" onclick="installResource(true, '${config.resourceUrl}')">特殊添加</button>
            </div>
        `;
        container.appendChild(resourceGroup);
    });
    
    // 如果没有结果
    if (pageItems.length === 0) {
        console.log('没有找到符合条件的资源');
        container.innerHTML = '<div class="no-results">没有符合条件的资源</div>';
    }
}

window.onload = function () {
    console.log("页面加载完成，开始初始化...");
    
    // 首先验证关键DOM元素是否存在
    const resourcesContainer = document.getElementById('resourcesContainer');
    if (!resourcesContainer) {
        console.error('致命错误: 找不到resourcesContainer元素!');
        return;
    }
    
    // 首先进行一次直接渲染，确保有内容显示
    console.log("进行初始数据渲染...");
    const initialItems = configs.slice(0, itemsPerPage);
    initialItems.forEach((config, index) => {
        const resourceGroup = document.createElement('div');
        resourceGroup.className = 'resource-group';
        
        resourceGroup.innerHTML = `
            <div class="resource-header">
                <div class="resource-title">${config.title}</div>
                <div class="resource-update">更新于 ${config.updateDate}</div>
                <div class="resource-tags">
                    <span class="resource-tag ${config.connectionType === '直连' ? 'direct' : 'proxy'}">${config.connectionType}</span>
                    <span class="resource-tag">${config.category}</span>
                </div>
                <div class="resource-provider"><a href="${config.providerUrl}" target="_blank">${config.provider}</a> 提供</div>
            </div>
            <div class="resource-actions">
                <button class="resource-btn copy" onclick="copyToClipboard('${config.resourceUrl}')">复制链接</button>
                <button class="resource-btn help" onclick="window.open('https://uz-video-five.vercel.app/help.html')">教程</button>
                <button class="resource-btn add" onclick="installResource(false, '${config.resourceUrl}')">添加</button>
                <button class="resource-btn special" onclick="installResource(true, '${config.resourceUrl}')">特殊添加</button>
            </div>
        `;
        resourcesContainer.appendChild(resourceGroup);
    });
    
    // 更新显示的数据总数
    const pageDescription = document.querySelector('.page-description');
    if (pageDescription) {
        pageDescription.textContent = `共 ${configs.length} 条数据`;
        console.log(`初始化资源计数: ${configs.length}`);
    } else {
        console.error('找不到.page-description元素');
    }
    
    // 然后进行其他初始化
    console.log("进行其他初始化...");
    
    // 创建分类标签
    createCategoryTabs();
    console.log("分类标签创建完成");
    
    // 设置分页
    setupPagination();
    console.log("分页设置完成");
    
    // 设置搜索功能
    setupSearch();
    console.log("搜索功能设置完成");
    
    // 导航项点击效果
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    console.log("导航项点击效果已设置");
} 