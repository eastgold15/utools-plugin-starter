interface ExtendedUBrowser extends UBrowser {
	delayClick: (selector: string, delay?: number) => ExtendedUBrowser;
}

const useBrowser = (url: string): ExtendedUBrowser => {
	const browser = utools.ubrowser.goto(url) as ExtendedUBrowser;

	browser.delayClick = (selector: string, delay = 800): ExtendedUBrowser => {
		return browser.wait(delay).wait(selector).click(selector);
	};

	return browser;
};

export default {
	useBrowser,
};
