// 搜索组件模块
const SearchComponent = (function() {
    // 私有变量
    let searchContainer = null;
    let searchInput = null;
    let searchButton = null;
    let searchCallback = null;

    // 创建搜索组件
    function createSearchComponent(callback) {
        // 保存回调函数
        searchCallback = callback;

        // 创建搜索容器
        searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" id="searchInput" placeholder="搜索资源...">
            <button id="searchButton">搜索</button>
        `;
        document.body.appendChild(searchContainer);

        // 获取DOM元素引用
        searchInput = document.getElementById('searchInput');
        searchButton = document.getElementById('searchButton');
        
        // 设置事件监听
        setupEventListeners();
        
        return searchContainer;
    }

    // 设置事件监听
    function setupEventListeners() {
        // 搜索图标点击事件
        const searchIcon = document.querySelector('.nav-icon .fa-search');
        if (searchIcon) {
            searchIcon.parentElement.addEventListener('click', function(e) {
                e.preventDefault();
                
                // 如果搜索框已经显示
                if (searchContainer.classList.contains('active')) {
                    // 如果有搜索内容，清空搜索并触发空搜索
                    if (searchInput.value.trim() !== '') {
                        searchInput.value = '';
                        // 触发空搜索，相当于重置搜索
                        if (searchCallback) {
                            searchCallback('');
                        }
                        // 滚动到页面顶部
                        window.scrollTo(0, 0);
                    }
                    // 无论是否有内容，都收起搜索框
                    searchContainer.classList.remove('active');
                } else {
                    // 搜索框未显示，则显示并聚焦
                    searchContainer.classList.add('active');
                    searchInput.focus();
                }
            });
        }

        // 点击其他地方关闭搜索框
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target) && 
                !searchIcon?.parentElement.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });

        // 添加搜索事件监听
        searchButton.addEventListener('click', () => {
            triggerSearch();
        });

        searchInput.addEventListener('keyup', (e) => {
            // 回车键或搜索框为空时都触发搜索
            if (e.key === 'Enter' || searchInput.value.trim() === '') {
                triggerSearch();
            }
        });
    }

    // 触发搜索操作
    function triggerSearch() {
        const query = searchInput.value.trim();
        if (searchCallback) {
            searchCallback(query);
            // 滚动到页面顶部，确保用户能看到搜索结果
            window.scrollTo(0, 0);
        }
    }

    // 获取当前搜索值
    function getCurrentValue() {
        return searchInput ? searchInput.value.trim() : '';
    }
    
    // 清空搜索框
    function clearSearch() {
        if (searchInput) {
            searchInput.value = '';
            // 隐藏搜索容器
            if (searchContainer) {
                searchContainer.classList.remove('active');
            }
        }
    }

    // 公共接口
    return {
        createSearchComponent: createSearchComponent,
        getCurrentValue: getCurrentValue,
        clearSearch: clearSearch
    };
})();

// 全局访问
window.SearchComponent = SearchComponent; 