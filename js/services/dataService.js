// 数据服务模块
const DataService = (function() {
    // 私有变量
    let rawData = [];         // 原始数据
    let filteredData = [];    // 筛选后的数据
    
    // 筛选条件
    let filters = {
        category: ConfigManager.getDefaultCategory(),  // 使用配置获取默认分类
        searchQuery: '',       // 搜索关键词
        page: ConfigManager.getDefaultPage()           // 使用配置获取默认页码
    };
    
    // 从配置获取每页显示数量
    const itemsPerPage = ConfigManager.getItemsPerPage();
    
    // 初始化数据服务
    function initialize() {
        // 获取原始数据
        rawData = AppData.configs ? AppData.configs : [];
        console.log(`数据服务初始化，加载${rawData.length}条资源数据`);
        
        // 初始应用筛选
        applyFilters();
    }
    
    // 应用筛选条件，返回筛选后的数据
    function applyFilters() {
        console.log(`应用筛选 - 类别: ${filters.category}, 搜索: ${filters.searchQuery}`);
        
        // 筛选数据
        filteredData = rawData.filter(config => {
            // 类别匹配
            const categoryMatch = filters.category === ConfigManager.getDefaultCategory() || config.category === filters.category;
            
            // 搜索匹配
            let searchMatch = true;
            if (filters.searchQuery) {
                const query = filters.searchQuery.toLowerCase();
                const titleMatch = config.title.toLowerCase().includes(query);
                const descMatch = config.description.toLowerCase().includes(query);
                searchMatch = titleMatch || descMatch;
            }
            
            // 同时匹配类别和搜索
            return categoryMatch && searchMatch;
        });
        
        console.log(`筛选后的资源数量: ${filteredData.length}`);
        return filteredData;
    }
    
    // 设置筛选条件
    function setFilters(newFilters) {
        // 更新筛选条件
        if (newFilters.category !== undefined) {
            filters.category = newFilters.category;
        }
        
        if (newFilters.searchQuery !== undefined) {
            filters.searchQuery = newFilters.searchQuery;
        }
        
        if (newFilters.page !== undefined) {
            filters.page = newFilters.page;
        }
        
        // 重新应用筛选
        return applyFilters();
    }
    
    // 重置页码
    function resetPage() {
        filters.page = ConfigManager.getDefaultPage();
    }
    
    // 获取当前页的数据
    function getCurrentPageData() {
        const start = (filters.page - 1) * itemsPerPage;
        const end = Math.min(start + itemsPerPage, filteredData.length);
        return filteredData.slice(start, end);
    }
    
    // 获取数据总数
    function getTotalCount() {
        return filteredData.length;
    }
    
    // 获取所有分类
    function getAllCategories() {
        const categories = new Set();
        rawData.forEach(config => {
            if (config.category) {
                categories.add(config.category);
            }
        });
        return Array.from(categories);
    }
    
    // 获取当前页码
    function getCurrentPage() {
        return filters.page;
    }
    
    // 获取总页数
    function getTotalPages() {
        return Math.max(1, Math.ceil(filteredData.length / itemsPerPage));
    }
    
    // 获取每页显示数量
    function getItemsPerPage() {
        return itemsPerPage;
    }
    
    // 公共接口
    return {
        initialize: initialize,
        setFilters: setFilters,
        applyFilters: applyFilters,
        resetPage: resetPage,
        getCurrentPageData: getCurrentPageData,
        getFilteredData: function() { return filteredData; },
        getRawData: function() { return rawData; },
        getTotalCount: getTotalCount,
        getAllCategories: getAllCategories,
        getCurrentCategory: function() { return filters.category; },
        getCurrentSearchQuery: function() { return filters.searchQuery; },
        getCurrentPage: getCurrentPage,
        getTotalPages: getTotalPages,
        getItemsPerPage: getItemsPerPage
    };
})();

// 全局访问
window.DataService = DataService; 