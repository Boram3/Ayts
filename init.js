/* @file init.js
 * @brief Here, the script starts when youtube has met
 * @see manifest.js
 *
 * This will dynamically call main.js
 * Great appreciation for this guy:
 * https://medium.com/@otiai10/how-to-use-es6-import-with-chrome-extension-bd5217b9c978
 * */

(async () => {
	const main = chrome.runtime.getURL('main.js');
	const YtdCmt = chrome.runtime.getURL('YtdCmt.js');

	document.head.innerHTML += `<script src="${YtdCmt}"/>`;
	document.head.innerHTML += `<script src="${main}"/>`;
})();
