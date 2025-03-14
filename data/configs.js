// 资源配置数据
const configs = [
    {
        title: 'All-in-One',
        description: '整合大佬们开发的资源，感谢所有大佬',
        resourceUrl: 'https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/uzAio_raw.json',
        category: '综合',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo-extensions',
        updateDate: '2025-03-03',
        connectionType: '需代理'
    },
    {
        title: 'All-in-One',
        description: '整合大佬们开发的资源，感谢所有大佬',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/uzAio.json',
        category: '综合',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo-extensions',
        updateDate: '2025-03-03',
        connectionType: '直连'
    },
    {
        title: 'All-in-One',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a> 大佬 all in one，感谢大佬",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/uzAio.json',
        category: '综合',
        provider: 'proversion2024',
        providerUrl: 'https://github.com/proversion2024',
        updateDate: '2025-03-02',
        connectionType: '直连'
    },
    {
        title: '视频源综合',
        description: "视频源扩展大多由 <a href='https://github.com/Yswag'>Yswag</a> 大佬开发，感谢大佬",
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/vod/vod.json',
        category: '视频源',
        provider: 'Yswag',
        providerUrl: 'https://github.com/Yswag',
        updateDate: '2025-03-01',
        connectionType: '直连'
    },
    {
        title: '网盘工具扩展-夸克、UC、阿里',
        description: "阿里解析功能由 <a href='https://github.com/wangdepeng100'>wangdepeng100</a> 大佬开发，感谢大佬。iOS15 以下系统无法使用，夸克需要会员",
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/panTools/panTools.json',
        category: '扩展工具',
        provider: 'wangdepeng100',
        providerUrl: 'https://github.com/wangdepeng100',
        updateDate: '2025-02-28',
        connectionType: '直连'
    },
    {
        title: '网盘工具扩展-夸克、UC、阿里、天翼',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a>   大佬开发，感谢大佬。iOS15 以下系统无法使用，夸克需要会员",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/panTools/panTools.json',
        category: '扩展工具',
        provider: 'proversion2024',
        providerUrl: 'https://github.com/proversion2024',
        updateDate: '2025-02-27',
        connectionType: '直连'
    },
    {
        title: '网盘源综合',
        description: "<a href='https://github.com/proversion2024'>proversion2024</a>   大佬开发，感谢大佬",
        resourceUrl: 'https://ghproxy.cn/https://raw.githubusercontent.com/proversion2024/uz-extensions/refs/heads/master/vod/vod.json',
        category: '视频源',
        provider: 'proversion2024',
        providerUrl: 'https://github.com/proversion2024',
        updateDate: '2025-02-26',
        connectionType: '直连'
    },
    {
        title: '首页推荐扩展',
        description: '展示视频推荐',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo-extensions/refs/heads/main/recommend/douban.json',
        category: '扩展工具',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo-extensions',
        updateDate: '2025-02-25',
        connectionType: '直连'
    },
    {
        title: '采集综合',
        description: '采集站资源，不需要添加太多两个够用',
        resourceUrl: 'https://github.moeyy.xyz/https://raw.githubusercontent.com/YYDS678/uzVideo/main/video_sources_default.json',
        category: '视频源',
        provider: '官方',
        providerUrl: 'https://github.com/YYDS678/uzVideo',
        updateDate: '2025-02-24',
        connectionType: '直连'
    },
];

// 确保configs可以全局访问
window.AppData = {
    configs: configs
};
