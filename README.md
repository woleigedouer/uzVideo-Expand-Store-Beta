# uz影视资源添加 - 项目结构

## 项目概述
这是一个用于管理和展示uz影视应用资源的前端页面，提供资源浏览、搜索、分类和添加功能。

## 目录结构

```
├── index.html            # 主入口HTML
├── assets/               # 静态资源文件夹
│   ├── css/              # CSS文件
│   │   ├── main.css      # CSS主入口(导入其他CSS文件)
│   │   ├── variables.css # CSS变量定义(颜色、字体、尺寸等)
│   │   ├── themes.css    # 主题定义(暗色模式等)
│   │   ├── base.css      # 基础样式(全局样式、通用元素)
│   │   ├── navbar.css    # 导航栏和分类标签样式
│   │   ├── resources.css # 资源卡片和列表样式
│   │   ├── pagination.css # 分页控件样式
│   │   └── search.css    # 搜索组件样式
│   └── img/              # 图片资源(如有需要)
├── data/                 # 数据文件
│   └── configs.js        # 资源配置数据
├── js/                   # JavaScript模块文件
│   ├── app.js            # 应用主模块(协调各模块、初始化应用)
│   ├── resources.js      # 资源渲染模块(渲染资源列表)
│   ├── search.js         # 搜索管理模块
│   ├── category.js       # 分类功能模块
│   ├── pagination.js     # 分页功能模块(分页逻辑)
│   ├── utils.js          # 工具函数模块(安装资源、复制链接等)
│   ├── components/       # UI组件模块文件夹
│   │   ├── searchComponent.js     # 搜索组件UI和交互
│   │   ├── themeComponent.js      # 主题切换组件
│   │   ├── resourceCardComponent.js # 资源卡片组件
│   │   └── paginationComponent.js # 分页UI组件
│   └── services/         # 服务层模块文件夹 
│       ├── configManager.js # 配置管理服务(集中管理配置项)
│       └── dataService.js # 数据服务(统一数据处理)
└── help/                 # 帮助文档(如需添加)
    └── help.html         # 帮助页面
```

## 架构设计

项目遵循分层架构设计，清晰地分离了数据、业务逻辑和表现层：

1. **数据层**：负责数据的获取、过滤和管理
   - `services/dataService.js`：封装所有数据操作
   - `services/configManager.js`：集中管理应用配置

2. **逻辑层**：处理业务逻辑和协调交互 
   - `app.js`：应用核心逻辑和初始化
   - `search.js`、`category.js`、`pagination.js`：管理特定功能的逻辑

3. **表现层**：负责UI渲染和用户交互
   - `components/`目录：包含所有UI组件
   - `resources.js`：渲染资源列表

## 模块功能说明

### 数据与服务模块

1. **services/configManager.js**
   - 集中管理所有应用配置项
   - 提供配置获取接口
   - 将硬编码常量转为配置参数
   - 支持通过路径访问嵌套配置

2. **services/dataService.js**
   - 集中管理所有数据操作
   - 提供数据筛选、分页和查询功能
   - 维护应用状态和筛选条件
   - 为其他模块提供统一的数据访问接口

### JavaScript逻辑模块

1. **app.js**
   - 应用主模块，负责协调各个功能模块
   - 提供全局筛选、页面渲染等核心功能
   - 处理应用初始化和DOM加载完成后的操作

2. **resources.js**
   - 负责资源列表的渲染逻辑
   - 通过DataService获取数据
   - 使用ResourceCardComponent显示资源卡片

3. **search.js**
   - 搜索管理模块
   - 处理搜索交互
   - 通过DataService设置搜索条件

4. **category.js**
   - 管理资源分类功能
   - 创建和处理分类标签
   - 通过DataService设置分类筛选

5. **pagination.js**
   - 处理分页逻辑
   - 管理页面切换
   - 通过DataService获取分页数据

6. **utils.js**
   - 提供通用工具函数
   - 实现资源安装和链接复制功能
   - 包含其他辅助功能

### UI组件模块

1. **components/searchComponent.js**
   - 搜索UI组件
   - 创建搜索界面元素
   - 处理搜索交互事件

2. **components/themeComponent.js**
   - 主题切换组件
   - 实现暗色/亮色主题切换功能
   - 保存和恢复用户主题偏好

3. **components/resourceCardComponent.js**
   - 资源卡片UI组件
   - 创建单个资源卡片元素
   - 负责卡片的渲染和样式

4. **components/paginationComponent.js**
   - 分页UI组件
   - 创建分页控件元素
   - 处理分页UI的渲染和更新

### 数据模块

1. **configs.js**
   - 存储所有资源配置数据
   - 提供全局数据访问接口

## 代码设计改进

项目应用了多种现代软件设计模式和原则：

1. **数据层与表现层分离**：
   - 数据处理逻辑集中在DataService中
   - UI渲染和数据处理完全分离
   - 减少模块间的数据依赖

2. **配置集中管理**：
   - 所有配置项集中在ConfigManager中
   - 消除硬编码常量，提高可维护性
   - 支持多级配置和路径访问
   - 便于统一修改和扩展配置

3. **组件化设计**：
   - UI组件放在`components`文件夹中
   - 逻辑模块和数据服务分别独立
   - 每个组件专注于单一职责

4. **单一职责原则**：
   - 每个模块专注于单一功能
   - 降低了各模块之间的耦合

5. **依赖注入模式**：
   - 通过模块间接口调用而非直接操作
   - 提高了代码的可测试性和可维护性

## 使用方法

打开`index.html`文件即可运行应用。页面会显示所有可用资源，可通过分类标签和搜索功能筛选资源。点击资源卡片上的按钮可以复制链接或添加资源到uz影视应用。支持通过界面右上角的主题切换按钮在亮色/暗色主题之间切换。