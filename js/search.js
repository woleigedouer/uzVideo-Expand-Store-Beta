// 搜索管理模块
const SearchManager = (function() {
    // 设置搜索功能
    function setupSearch() {
        // 使用搜索组件
        SearchComponent.createSearchComponent(searchResources);
        console.log("搜索组件创建完成");
    }

    // 搜索功能
    function searchResources(query) {
        // 更新DataService的搜索条件
        DataService.setFilters({ searchQuery: query });
        
        // 重置分页
        AppManager.resetPage();
        
        // 应用筛选
        AppManager.applyFilters();
    }

    // 公共接口
    return {
        setupSearch: setupSearch,
        searchResources: searchResources
    };
})();

// 全局访问
window.SearchManager = SearchManager;
