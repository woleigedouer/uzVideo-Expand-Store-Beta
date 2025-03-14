// 资源卡片组件
const ResourceCardComponent = (function() {
    // 从配置获取帮助页面路径
    const helpPath = ConfigManager.getHelpPath();
    
    // 创建单个资源卡片
    function createResourceCard(config) {
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
                <button class="resource-btn copy" onclick="AppUtils.copyToClipboard('${config.resourceUrl}')">复制链接</button>
                <button class="resource-btn help" onclick="window.open('${helpPath}')">教程</button>
                <button class="resource-btn add" onclick="AppUtils.installResource(false, '${config.resourceUrl}')">添加</button>
                <button class="resource-btn special" onclick="AppUtils.installResource(true, '${config.resourceUrl}')">特殊添加</button>
            </div>
        `;
        
        return resourceGroup;
    }
    
    // 创建一个"无结果"的提示元素
    function createNoResultsElement() {
        const noResults = document.createElement('div');
        noResults.className = 'no-results';
        noResults.textContent = '没有符合条件的资源';
        return noResults;
    }

    // 公共接口
    return {
        createResourceCard: createResourceCard,
        createNoResultsElement: createNoResultsElement
    };
})();

// 全局访问
window.ResourceCardComponent = ResourceCardComponent; 