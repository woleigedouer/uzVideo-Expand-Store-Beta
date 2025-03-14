// 配置管理模块
const ConfigManager = (function() {
    // 应用配置集合
    const appConfig = {
        // 应用信息
        app: {
            name: 'uz影视拓展商店',
            version: '1.0.0'
        },
        
        // 主题相关
        theme: {
            storageKey: 'uz-video-theme',
            defaultTheme: 'light',
            themes: ['light', 'dark']
        },
        
        // 分页相关
        pagination: {
            itemsPerPage: 9,
            defaultPage: 1
        },
        
        // 资源相关
        resources: {
            defaultCategory: 'all',
            connectionTypes: ['直连', '需代理']
        },
        
        // 路径相关
        paths: {
            help: 'help/help.html'
        },
        
        // 本地存储相关
        storage: {
            prefix: 'uz-video-'
        }
    };
    
    // 获取指定路径的配置
    function getConfig(path) {
        if (!path) return appConfig;
        
        const keys = path.split('.');
        return keys.reduce((obj, key) => 
            (obj && obj[key] !== undefined) ? obj[key] : undefined, 
            appConfig
        );
    }
    
    // 特定配置的快捷获取方法
    function getItemsPerPage() {
        return appConfig.pagination.itemsPerPage;
    }
    
    function getThemeKey() {
        return appConfig.theme.storageKey;
    }
    
    function getDefaultTheme() {
        return appConfig.theme.defaultTheme;
    }
    
    function getDefaultPage() {
        return appConfig.pagination.defaultPage;
    }
    
    function getDefaultCategory() {
        return appConfig.resources.defaultCategory;
    }
    
    function getHelpPath() {
        return appConfig.paths.help;
    }
    
    // 公共接口
    return {
        getConfig: getConfig,
        // 便捷访问方法
        getItemsPerPage: getItemsPerPage,
        getThemeKey: getThemeKey,
        getDefaultTheme: getDefaultTheme,
        getDefaultPage: getDefaultPage,
        getDefaultCategory: getDefaultCategory,
        getHelpPath: getHelpPath
    };
})();

// 全局访问
window.ConfigManager = ConfigManager; 