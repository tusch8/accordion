
const accordion = () => {
	const toggleEls = document.querySelectorAll('.js-toggle');

	if (!toggleEls.length) {
		return;
	}

	const toggle = e => {

		// アロー関数だとthisで取得できないため、e.targetで取得
		const _this = e.target;

		// クリックしたもの以外は閉じるとき
		toggleEls.forEach(toggleEl => {
			if (toggleEl === _this) {
				return;
			}
			toggleEl.classList.remove('is-active');
			toggleEl.nextElementSibling.style.height = '0px';
		});

		// 開閉
		_this.classList.toggle('is-active');

		// 自身が開いていたら閉じる
		if (_this.classList.contains('is-active')) {
			_this.nextElementSibling.style.height = _this.nextElementSibling.scrollHeight + 'px';
		} else {
			_this.nextElementSibling.style.height = '0px';
		}
	}

	toggleEls.forEach(toggleEl => {
		toggleEl.addEventListener('click', toggle);
	});
}

accordion();
