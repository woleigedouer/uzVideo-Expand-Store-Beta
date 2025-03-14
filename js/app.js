// 应用主模块
const AppManager = (function() {
    // 应用筛选条件（类别和搜索）
    function applyFilters() {
        // 使用DataService应用当前的筛选条件
        DataService.applyFilters();
        
        // 更新分页UI
        PaginationManager.updatePaginationUI(DataService.getTotalCount());
        
        // 渲染当前页
        renderPage();
    }

    // 渲染指定页的内容
    function renderPage() {
        // 获取当前页数据并渲染
        const pageItems = DataService.getCurrentPageData();
        ResourceManager.renderItems(pageItems);
    }

    // 重置页码
    function resetPage() {
        DataService.resetPage();
    }

    // 设置导航菜单项点击效果
    function setupNavItems() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function(e) {
                // 首页链接功能
                if(this.getAttribute('href') === '#') {
                    e.preventDefault();
                    // 重置所有筛选条件
                    DataService.setFilters({
                        category: ConfigManager.getDefaultCategory(),
                        searchQuery: ''
                    });
                    // 重置页码
                    DataService.resetPage();
                    // 重新渲染页面
                    applyFilters();
                    
                    // 重置分类标签
                    const tabs = document.querySelectorAll('.category-tab');
                    tabs.forEach(tab => {
                        tab.classList.remove('active');
                        if(tab.dataset.category === ConfigManager.getDefaultCategory()) {
                            tab.classList.add('active');
                        }
                    });
                    
                    // 清空搜索框
                    if(SearchComponent && typeof SearchComponent.clearSearch === 'function') {
                        SearchComponent.clearSearch();
                    }
                    
                    // 滚动到页面顶部
                    window.scrollTo(0, 0);
                }
            });
        });
        console.log("导航项点击效果已设置");
    }

    // 初始化应用
    function init() {
        console.log("页面加载完成，开始初始化...");
        
        // 首先验证关键DOM元素是否存在
        const resourcesContainer = document.getElementById('resourcesContainer');
        if (!resourcesContainer) {
            console.error('致命错误: 找不到resourcesContainer元素!');
            return;
        }
        
        // 初始化数据服务
        DataService.initialize();
        console.log("数据服务初始化完成");
        
        // 首先进行一次直接渲染，确保有内容显示
        ResourceManager.initialRender();
        
        // 然后进行其他初始化
        console.log("进行其他初始化...");
        
        // 创建分类标签
        CategoryManager.createCategoryTabs();
        console.log("分类标签创建完成");
        
        // 设置分页
        PaginationManager.setupPagination();
        console.log("分页设置完成");
        
        // 设置搜索功能
        SearchManager.setupSearch();
        console.log("搜索功能设置完成");
        
        // 设置主题切换功能
        ThemeComponent.createThemeToggle();
        console.log("主题切换功能设置完成");
        
        // 导航项点击效果
        setupNavItems();
    }

    // 公共接口
    return {
        init: init,
        applyFilters: applyFilters,
        renderPage: renderPage,
        resetPage: resetPage
    };
})();

// DOM加载完成后初始化应用
document.addEventListener('DOMContentLoaded', function() {
    AppManager.init();
});

// 全局访问
window.AppManager = AppManager;
