// 分页管理模块
const PaginationManager = (function() {
    // 分页逻辑 - 上一页
    function goToPrevPage() {
        const currentPage = DataService.getCurrentPage();
        if (currentPage > 1) {
            // 设置上一页
            DataService.setFilters({ page: currentPage - 1 });
            AppManager.renderPage();
            // 滚动到页面顶部
            window.scrollTo(0, 0);
        }
    }
    
    // 分页逻辑 - 下一页
    function goToNextPage() {
        const currentPage = DataService.getCurrentPage();
        const totalPages = DataService.getTotalPages();
        if (currentPage < totalPages) {
            // 设置下一页
            DataService.setFilters({ page: currentPage + 1 });
            AppManager.renderPage();
            // 滚动到页面顶部
            window.scrollTo(0, 0);
        }
    }
    
    // 分页逻辑 - 跳转到指定页
    function goToPage(page) {
        const totalPages = DataService.getTotalPages();
        if (page >= 1 && page <= totalPages) {
            // 设置指定页
            DataService.setFilters({ page: page });
            AppManager.renderPage();
            // 滚动到页面顶部
            window.scrollTo(0, 0);
        }
    }

    // 添加分页功能
    function setupPagination() {
        const pageFooter = document.querySelector('.page-footer');
        if (!pageFooter) {
            console.error('找不到.page-footer元素');
            return;
        }
        
        // 创建分页回调
        const paginationCallbacks = {
            onPrevPage: goToPrevPage,
            onNextPage: goToNextPage,
            onPageChange: goToPage
        };
        
        // 使用分页组件创建UI
        const paginationUI = PaginationComponent.createPaginationUI(
            DataService.getCurrentPage(), 
            DataService.getTotalPages(),
            paginationCallbacks
        );
        
        pageFooter.appendChild(paginationUI);
    }

    // 更新分页UI
    function updatePaginationUI(totalItems) {
        console.log(`更新分页UI，总项目数: ${totalItems}`);
        
        // 使用分页组件更新UI
        PaginationComponent.updatePaginationUI(
            DataService.getCurrentPage(), 
            DataService.getTotalPages(), 
            totalItems
        );
    }

    // 公共接口
    return {
        setupPagination: setupPagination,
        updatePaginationUI: updatePaginationUI,
        getCurrentPage: function() {
            return DataService.getCurrentPage();
        },
        getItemsPerPage: function() {
            return DataService.getItemsPerPage();
        },
        resetPage: function() {
            DataService.resetPage();
        }
    };
})();

// 全局访问
window.PaginationManager = PaginationManager;
