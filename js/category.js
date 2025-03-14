// 分类管理模块
const CategoryManager = (function() {
    // 获取默认分类
    const defaultCategory = ConfigManager.getDefaultCategory();
    
    // 创建分类标签
    function createCategoryTabs() {
        // 使用DataService获取所有分类
        const categories = DataService.getAllCategories();
        const tabsContainer = document.getElementById('categoryTabs');
        
        // 为已有的"全部"按钮添加事件监听
        const allTab = document.querySelector(`.category-tab[data-category="${defaultCategory}"]`);
        if (allTab) {
            allTab.addEventListener('click', () => filterByCategory(defaultCategory));
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

    // 根据分类筛选资源
    function filterByCategory(category) {
        // 更新DataService中的分类筛选条件
        DataService.setFilters({ category: category });
        
        // 更新活跃标签
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active');
            if ((category === defaultCategory && tab.dataset.category === defaultCategory) || 
                tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        // 重置分页
        AppManager.resetPage();
        
        // 应用当前筛选条件
        AppManager.applyFilters();
        
        // 滚动到页面顶部
        window.scrollTo(0, 0);
    }

    // 公共接口
    return {
        createCategoryTabs: createCategoryTabs,
        filterByCategory: filterByCategory
    };
})();

// 全局访问
window.CategoryManager = CategoryManager;
