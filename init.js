/* @file init.js
 * @brief Here, the script starts when youtube has met
 * @see manifest.js
 * */



/**
 * @class YtdCmtViewModelName
 * @property {HTMLDivElement}	_dom
 * @property {string}		_name
 * */
class YtdCmtViewModelName {
	/** @param {HTMLDivElement} dom */
	constructor(dom) {
		this._dom = dom;
		this._name = dom.querySelector("a#author-text span").textContent ?? "";
	}

	/** @returns {boolean} */
	verify() {
		return (this._dom.id == YtdCmtViewModelName.id) && (this._name != "");
	}

	static get id() {return "header-author";}
};


/** 
 * @class YtdCmtViewModelCmt
 * @property {HTMLDivElement} 	_dom
 * @property {string}		_cmt 
 * */
class YtdCmtViewModelCmt {
	/** 
	 * @param {HTMLDivElement} dom 
	 * */
	constructor(dom) {
		this._dom = dom;
		this._cmt = dom.querySelector("div#content yt-attributed-string span").textContent ?? "";
	}

	static get id() {return "content";}
	verify() {
		return (this._dom.id == YtdCmtViewModelCmt.id);
	}
};

/** 
 * @class YtdCmtViewModelPic 
 * @property {HTMLDivElement} _dom
 * @property {string} _pic
 * */
class YtdCmtViewModelPic {
	/**
	 * @param {HTMLDivElement} dom
	 * */
	constructor(dom) {
		this._dom = dom;
		this._pic = "";
		const picholder = dom.querySelector("yt-img-shadow img#img");
		if (picholder !== null) {
			this._pic = picholder?.getAttribute("src");
		}
	}
	static get id() {return "author-thumbnail-button";}

	verify() {
		return (this._dom.id == YtdCmtViewModelPic.id) && ((this._pic) != "");
	}
};

/** 
 * @class YtdCmtViewModel 
 * 
 * @description
 * Single comment
 * */
class YtdCmtViewModel {
	/** @param {HTMLElement} dom  */
	constructor(dom) {
		this._dom = dom;
	}

	/** @returns {string} @description the tagname. */
	static get tag() {return "ytd-comment-view-model";}

	/** @returns {boolean} @description verifies if this would work as intended */
	verify() {
		return this._dom.tagName == YtdCmtViewModel.tag;
	}

	/** @returns {YtdCmtViewModelName} */
	name() {
		return new YtdCmtViewModelName(this._dom.querySelector(`div#${YtdCmtViewModelName.id}`));
	}

	/** @returns {YtdCmtViewModelCmt} */
	cmt() {
		return new YtdCmtViewModelCmt(this._dom.querySelector(`div#${YtdCmtViewModelCmt.id}`));
	}

	/** @returns {YtdCmtViewModelPic} */
	pic() {
		return new YtdCmtViewModelPic(this._dom.querySelector(`button#${YtdCmtViewModelPic.id}`));
	}

	dump(pre = "") {
		return (pre + "[YtdCmtViewModel] dump start") + "\n"
			+ (pre + "[YtdCmtViewModel::name()::_name] " + this.name()._name) + "\n"
			+ (pre + "[YtdCmtViewModel::cmt()::_cmt] \n" + this.cmt()._cmt) + "\n"
			+ (pre + "[YtdCmtViewModel::pic()::_pic] \n" + this.pic()._pic) + "\n"
			+ (pre + "[YtdCmtViewModel] dump end") + "\n";
	}
};

/**
 * @class YtdCmtTdRendr
 * @description 
 * Contains oneself and its children.
 * */
class YtdCmtTdRendr {
	/** @param {HTMLElement} dom */
	constructor(dom) {
		this._dom = dom;
	}

	/** @returns {string} */
	static get tag() {return "ytd-comment-thread-renderer";}

	/**
	 * @description Is this made as intended.
	 * @returns {boolean} 
	 * */
	verify() {
		return this._dom.tagName == YtdCmtTdRendr.tag;
	}

	/**
	 * @returns YtdCmtViewModel
	 * @description comment of mine 
	 * */
	mine() {
		return new YtdCmtViewModel(this._dom.querySelector(YtdCmtViewModel.tag));
	}

	/** 
	 * @returns {YtdCmtViewModel[]}
	 * @description children
	 * */
	children() {
		const __DOMS = this._dom.querySelectorAll(
			"div#replies ytd-comment-replies-renderer "
			+ "div#expander div#expander-contents "
			+ "div#contents ytd-comment-view-model"
		);

		let _rtn = [];

		for (const DOM of __DOMS) {
			_rtn.push(new YtdCmtViewModel(DOM));
		}

		return _rtn;
	}

	/** 
	 * @description Prints all out */
	dump(pre = "") {
		let _str = ""

		_str += (pre + "[YtdCmtTdRendr] Dump start") + "\n";
		_str += (pre + "[YtdCmtTdRendr::mine]") + "\n";
		_str += this.mine().dump(pre + "  ") + "\n";


		_str += (pre + "[YtdCmtTdRendr::children start]") + "\n";
		for (const CHILD of this.children()) {
			_str += (pre + "[YtdCmtTdRendr::children section start]") + "\n";
			_str += CHILD.dump(pre + "  ") + "\n";
			_str += (pre + "[YtdCmtTdRendr::children section end]") + "\n";
		}
		_str += (pre + "[YtdCmtTdRendr::children end]") + "\n";

		_str += (pre + "[YtdCmtTdRendr] Dump end") + "\n";

		return _str;
	}
};


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
