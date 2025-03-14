// 分页UI组件
const PaginationComponent = (function() {
    // 创建分页UI
    function createPaginationUI(currentPage, totalPages, callbacks) {
        const paginationDiv = document.createElement('div');
        paginationDiv.className = 'pagination';
        paginationDiv.innerHTML = `
            <button id="prevPage" title="上一页">&lt;</button>
            <span>跳至</span>
            <input type="number" id="pageInput" min="1" max="${totalPages}" value="${currentPage}">
            <span>/ ${totalPages} 页</span>
            <button id="nextPage" title="下一页">&gt;</button>
        `;
        
        // 设置事件监听器
        setupEventListeners(paginationDiv, callbacks);
        
        return paginationDiv;
    }
    
    // 设置分页控件的事件监听
    function setupEventListeners(paginationElement, callbacks) {
        // 上一页按钮
        const prevButton = paginationElement.querySelector('#prevPage');
        if (prevButton && callbacks.onPrevPage) {
            prevButton.addEventListener('click', callbacks.onPrevPage);
        }
        
        // 下一页按钮
        const nextButton = paginationElement.querySelector('#nextPage');
        if (nextButton && callbacks.onNextPage) {
            nextButton.addEventListener('click', callbacks.onNextPage);
        }
        
        // 页码输入框
        const pageInput = paginationElement.querySelector('#pageInput');
        if (pageInput && callbacks.onPageChange) {
            pageInput.addEventListener('change', (e) => {
                const page = parseInt(e.target.value);
                callbacks.onPageChange(page);
            });
        }
    }
    
    // 更新分页UI
    function updatePaginationUI(currentPage, totalPages, totalItems) {
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
        
        // 更新页码输入框
        pageInput.max = totalPages;
        pageInput.value = Math.min(currentPage, totalPages);
        pageSpan.textContent = `/ ${totalPages} 页`;
        
        // 更新资源数量显示
        const resourceCountElem = document.querySelector('.page-description');
        if (resourceCountElem) {
            resourceCountElem.textContent = `共 ${totalItems} 条数据`;
        } else {
            console.error('找不到.page-description元素');
        }
    }
    
    // 公共接口
    return {
        createPaginationUI: createPaginationUI,
        updatePaginationUI: updatePaginationUI
    };
})();

// 全局访问
window.PaginationComponent = PaginationComponent; 