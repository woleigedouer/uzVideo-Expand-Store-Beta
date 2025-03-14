// 资源渲染模块
const ResourceManager = (function() {
    // 渲染资源项
    function renderItems(items) {
        const container = document.getElementById('resourcesContainer');
        if (!container) {
            console.error('找不到resourcesContainer元素');
            return;
        }
        
        console.log(`正在渲染${items.length}个资源项，当前页面: ${DataService.getCurrentPage()}`);
        container.innerHTML = '';
        
        // 渲染每个资源
        items.forEach((config, index) => {
            console.log(`渲染第${index + 1}个资源: ${config.title}`);
            const resourceCard = ResourceCardComponent.createResourceCard(config);
            container.appendChild(resourceCard);
        });
        
        // 如果没有结果
        if (items.length === 0) {
            console.log('没有找到符合条件的资源');
            const noResultsElement = ResourceCardComponent.createNoResultsElement();
            container.appendChild(noResultsElement);
        }
    }

    // 初始渲染
    function initialRender() {
        const resourcesContainer = document.getElementById('resourcesContainer');
        if (!resourcesContainer) {
            console.error('致命错误: 找不到resourcesContainer元素!');
            return;
        }
        
        console.log("进行初始数据渲染...");
        
        // 使用DataService获取初始数据
        const initialItems = DataService.getCurrentPageData();
        initialItems.forEach((config, index) => {
            const resourceCard = ResourceCardComponent.createResourceCard(config);
            resourcesContainer.appendChild(resourceCard);
        });
        
        // 更新显示的数据总数
        const pageDescription = document.querySelector('.page-description');
        if (pageDescription) {
            pageDescription.textContent = `共 ${DataService.getTotalCount()} 条数据`;
            console.log(`初始化资源计数: ${DataService.getTotalCount()}`);
        } else {
            console.error('找不到.page-description元素');
        }
    }

    // 公共接口
    return {
        renderItems: renderItems,
        initialRender: initialRender
    };
})();

// 全局访问
window.ResourceManager = ResourceManager;
