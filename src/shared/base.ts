export const useBridge = (): unknown => window.readConfig();

// 添加类型声明，确保TypeScript能够识别window.readConfig
declare global {
	interface Window {
		readConfig: () => unknown;
	}
}
