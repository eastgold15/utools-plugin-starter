// 该文件支持运行 node，electron 和 utools 的 api
// 导入服务模块 - 使用 CommonJS 的 require 函数
try {
    require('./preload/services.js');
    console.log('Services module loaded successfully');
} catch (error) {
    console.error('Failed to load services module:', error);
}

// 如果需要导出内容，可以使用 module.exports
// module.exports = {
//   someFunction: () => {
//     console.log('Hello from preload');
//   }
// };
