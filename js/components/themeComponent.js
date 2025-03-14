// 主题切换组件
const ThemeComponent = (function() {
    // 从配置管理器获取主题相关配置
    const THEME_KEY = ConfigManager.getThemeKey();
    const DEFAULT_THEME = ConfigManager.getDefaultTheme();

    // 创建主题切换按钮
    function createThemeToggle() {
        // 创建主题切换按钮
        const themeToggle = document.createElement('a');
        themeToggle.className = 'nav-icon theme-toggle';
        themeToggle.href = '#';
        themeToggle.innerHTML = `
            <i class="fas fa-moon"></i>
            <i class="fas fa-sun"></i>
        `;
        
        // 添加到导航栏
        const navIcons = document.querySelector('.nav-icons');
        if (navIcons) {
            navIcons.appendChild(themeToggle);
            console.log('主题切换按钮已添加');
        }
        
        // 初始化主题
        initializeTheme();
        
        // 添加事件监听
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
        
        return themeToggle;
    }

    // 初始化主题设置
    function initializeTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY) || DEFAULT_THEME;
        setTheme(savedTheme);
    }

    // 切换主题
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || DEFAULT_THEME;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // 设置主题
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        console.log(`主题已切换为：${theme}`);
        
        // 刷新资源卡片显示，以应用新主题样式
        refreshResourcesDisplay();
    }
    
    // 刷新资源显示
    function refreshResourcesDisplay() {
        // 使用DataService获取当前页数据重新渲染
        const pageItems = DataService.getCurrentPageData();
        if (pageItems && pageItems.length > 0) {
            console.log('正在刷新资源卡片以应用新主题...');
            ResourceManager.renderItems(pageItems);
        }
    }

    // 公共接口
    return {
        createThemeToggle: createThemeToggle,
        setTheme: setTheme,
        toggleTheme: toggleTheme
    };
})();

// 全局访问
window.ThemeComponent = ThemeComponent; 