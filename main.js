/* @file init.js
 * @brief Here, the script starts when youtube has met
 * @see manifest.js
 * */
async function initWasm() {
	const response = await fetch(chrome.runtime.getURL("libAyts/Module/Ayts.wasm")).then(response =>
		response.arrayBuffer()
	).then(bytes =>
		WebAssembly.instantiate(bytes, {})
	).then(results => results.instance.exports);
	return response;
}


(async () => {
	const module = await initWasm();
	console.log(module);
	console.log(module.dummy());
})();

setInterval(
	() => {
		const CommentsRaw = document
			.querySelectorAll("div#contents " + YtdCmtTdRendr.tag);

		/** @type {YtdCmtTdRendr[]} */
		let Comments = []

		for (const CommentRaw of CommentsRaw) {
			Comments.push(new YtdCmtTdRendr(CommentRaw));
		}


		for (const Comment of Comments) {
			console.log(Comment.dump());
		} /* Test::printing existing comments all out */
	}
	, 500
);
