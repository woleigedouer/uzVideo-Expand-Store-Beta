// 工具函数模块
const AppUtils = {
    // 安装资源函数
    installResource: function(isSpecial, configUrl) {
        if (!configUrl) {
            return;
        }

        const encodedUrl = encodeURIComponent(configUrl)
        const baseScheme = 'uzVideo://uzVideo?action=addSub&url='
        const intentScheme = 'intent://uzVideo?action=addSub&url='

        const finalUrl = isSpecial ? `${intentScheme}${encodedUrl}#Intent;scheme=uzVideo;end` : `${baseScheme}${encodedUrl}`

        window.location.href = finalUrl
    },

    // 复制到剪贴板
    copyToClipboard: function(text) {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                alert('使用路径：uz影视 -> 设置 -> 数据管理 -> 订阅 -> +')
                alert('复制成功')
            })
            .catch((err) => {
                const textArea = document.createElement('textarea')
                textArea.value = text
                document.body.appendChild(textArea)
                textArea.select()
                document.execCommand('copy')
                document.body.removeChild(textArea)
                alert('复制失败，请手动复制：\n\n' + text + '\n\n使用路径：uz影视 -> 设置 -> 数据管理 -> 订阅 -> +')
            })
    }
};

// 确保函数在全局可用
window.AppUtils = AppUtils;
