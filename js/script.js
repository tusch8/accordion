// コーディング規約などによってdata属性が使えない場合があるため、セレクタは定数として保持しておく
const DETAILS_SEL = "[data-details]";

const details = document.querySelectorAll(`${DETAILS_SEL}`);

details.forEach((detail) => {
	detail.querySelector("summary").addEventListener("click", (e) => {
		// デフォルトの挙動をオフ
		e.preventDefault();

		// コンテンツ部分
		const content = e.target.nextElementSibling;

		// コンテンツ部分の高さを取得(scrollHeightなどではズレてしまった？のでblock-sizeを取得)
		const contentHeight = window.getComputedStyle(content).blockSize;

		// カスタムプロパティのdurationの値を取得
		const durationVal =
			getComputedStyle(content).getPropertyValue("--duration");
		const duration = durationVal
			? parseFloat(durationVal.replace("s", "")) * 1000
			: 150;

		// summaryをクリックしたとき、閉じていたら開く
		if (detail.closest(DETAILS_SEL).getAttribute("open") === null) {
			// デフォルトの挙動はオフにしていたので、手動でopen属性つける
			detail.setAttribute("open", "true");

			// アニメーションさせながら開く
			content.animate(
				{
					height: ["0px", contentHeight],
				},
				{
					duration: duration,
				}
			);
		}

		// 開いていたら閉じる
		else {
			// アニメーションさせながら閉じる
			const closeAnimate = content.animate(
				{
					height: [contentHeight, "0px"],
				},
				{
					duration: duration,
				}
			);

			closeAnimate.onfinish = () => {
				// アニメーション終了後にopen属性外す
				detail.removeAttribute("open");
			};
		}
	});
});
