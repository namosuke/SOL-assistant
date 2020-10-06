class SOLA {
	constructor() {
		// 共通処理
		this.url = location.href;
		this.avatar = document.querySelector('.ic-avatar img').src;

		(async () => {
			this.hideIcon = (await this.getStorage({ hideIcon: true })).hideIcon;
			this.changeKaoView(this.hideIcon, this.avatar);

			// ページ個別処理
			if (this.url === 'https://sol.sfc.keio.ac.jp/profile/settings') {
				this.extSettings();
				document.querySelector('#ff_toggle_kao').checked = this.hideIcon;
				document.querySelector('#ff_toggle_kao').addEventListener('change', this.changeKaoStorage.bind(this));
			}
		})();
	}

	extSettings() {
		let div = document.createElement('div');
		div.innerHTML = `
<h2 aria-hidden="true">拡張機能オプション</h2>
<ul class="feature-flags collectionViewItems">
<li class="feature-flag"><div class="row-fluid feature">
<div class="span7">
	<span class="feature-title">顔写真を隠す</span>
</div>

<div class="span5 text-right span5-responsive">
	
	<!-- start super toggle -->
	<label class="ic-Super-toggle--on-off" for="ff_toggle_kao">
		<input id="ff_toggle_kao" class="ic-Super-toggle__input ff_toggle" type="checkbox">
		<div class="ic-Super-toggle__container" aria-hidden="true" data-checked="オン" data-unchecked="オフ">
		<div class="ic-Super-toggle__switch">
			<div class="ic-Super-toggle__option--LEFT">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" width="548.9" height="548.9" viewBox="0 0 548.9 548.9" xml:space="preserve">
				<polygon points="449.3 48 195.5 301.8 99.5 205.9 0 305.4 95.9 401.4 195.5 500.9 295 401.4 548.9 147.5"></polygon>
			</svg>
			</div>
			<div class="ic-Super-toggle__option--RIGHT">
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0" viewBox="0 0 28 28" xml:space="preserve">
				<polygon points="28 22.4 19.6 14 28 5.6 22.4 0 14 8.4 5.6 0 0 5.6 8.4 14 0 22.4 5.6 28 14 19.6 22.4 28"></polygon>
			</svg>
			</div>
		</div>
		</div>
	</label>
	<!-- end super toggle -->
	
</div>
</div>

<div class="feature-details row-fluid" id="kao-details" style="display: block">
<div class="span10">
	<p class="feature-description">設定画面以外で顔写真が表示されないようにします。</p>
</div>

<div class="span2 text-right feature-detail-links">

</div>
</div>
</li>
</ul>`;
		document.querySelector('#content').appendChild(div);
	}

	changeKaoStorage(e) {
		this.setStorage({ hideIcon: e.target.checked });
		this.changeKaoView(e.target.checked, this.avatar);
	}

	changeKaoView(bool = true, avatar) {
		if (bool) {
			document.querySelector('.ic-avatar img').src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png';
			let style = document.createElement('style');
			style.innerHTML = `.fOyUs_bGBk.fOyUs_UeJS.bbhNB_bGBk.bbhNB_eoMd.bbhNB_cJVF {
				background-image: url("https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png") !important;
			}`;
			style.id = 'changeKaoView';
			document.body.appendChild(style);
		} else {
			document.querySelector('.ic-avatar img').src = avatar;
			if (document.querySelector('#changeKaoView')) {
				document.querySelector('#changeKaoView').parentNode.removeChild(document.querySelector('#changeKaoView'));
			}
		}
	}

	getStorage(key = null) {
		return new Promise((resolve, reject) => {
			chrome.storage.local.get(key, result => {
				result ? resolve(result) : reject();
			});
		});
	}
	setStorage(obj) {
		return new Promise(resolve => {
			chrome.storage.local.set(obj, resolve);
		});
	}
}

const sola = new SOLA();