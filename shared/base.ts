/**
 * 基础
 */

/**
 * 设置桥梁
 * @param {Function} invoke 回调
 */
const setupBridge = (invoke: () => unknown): void => {
	window.readConfig = invoke;
};

// 添加类型声明，确保TypeScript能够识别window.readConfig
declare global {
	interface Window {
		readConfig: () => unknown;
	}
}

export default {
	setupBridge,
};
