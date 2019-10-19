/**
 * ヨメレバの生成する HTML のクラス名を短いランダムハッシュ値に置き換える
 */
const inlineCss = require('inline-css');

// 埋め込むスタイル
const style = "<style>.vog{width:98%;height:auto;margin:36px auto;font-family:'Lucida Grande','Hiragino Kaku Gothic ProN',Helvetica,Meiryo,sans-serif;line-height:1.5;word-wrap:break-word;box-sizing:border-box;display:block}.vog p{margin:0;padding:0}.vog a{transition:.8s;color:#285eff}.vog a:hover{color:#ffca28}.vog .d7{width:100%;background-color:#fafafa;overflow:hidden;border-radius:0;box-sizing:border-box;padding:12px 8px;box-shadow:0 2px 5px 0 rgba(0,0,0,.26)}.vog .qj{width:150px;float:left;margin:0 14px 0 0;text-align:center;background:#fff}.vog .qj a{width:100%;display:block}.vog .qj a img{margin:0;padding:0;text-align:center;background:#fff}.vog .t5{overflow:hidden;line-height:170%;color:#333}.vog .t5 a{text-decoration:none}.vog .cv>a{border-bottom:1px solid;font-size:16px}.vog .lj{font-size:10px;line-height:150%}.vog .lj a{color:#333;border-bottom:none}.vog .lj a:hover{color:#333;border-bottom:1px solid #333}.vog .t4{font-size:12px}.vog .jo div img{display:none!important}.vog .jo{display:inline-block;width:100%;margin-top:5px}.vog .jo>div{float:left;width:24%;min-width:128px;margin:.5%}.vog .jo a{width:100%;display:inline-block;text-align:center;box-sizing:border-box;margin:1px 0;padding:3% .5%;border-radius:8px;font-size:13px;font-weight:700;line-height:180%;color:#fff;box-shadow:0 2px 4px 0 rgba(0,0,0,.26)}.vog .jo .f7 a{background:#007dcd;border:2px solid #007dcd}.vog .jo .ss a{background:#bf0000;border:2px solid #bf0000}.vog .jo .shoplinkbk1 a{background:#0085cd;border:2px solid #0085cd}.vog .jo .shoplinkehon a{background:#2a2c6d;border:2px solid #2a2c6d}.vog .jo .shoplinkkino a{background:#003e92;border:2px solid #003e92}.vog .jo .shoplinkebj a{background:#f8485e;border:2px solid #f8485e}.vog .jo .shoplinktoshokan a{background:#333;border:2px solid #333}.vog .jo .w3 a{background:#ff9901;border:2px solid #ff9901}.vog .jo .g7 a{background:#bf0000;border:2px solid #bf0000}.vog .jo .shoplinkseven a{background:#225496;border:2px solid #225496}.vog .jo a:hover{background:#fff}.vog .jo .f7 a:hover{color:#007dcd}.vog .jo .ss a:hover{color:#bf0000}.vog .jo .shoplinkbk1 a:hover{color:#0085cd}.vog .jo .shoplinkehon a:hover{color:#2a2c6d}.vog .jo .shoplinkkino a:hover{color:#003e92}.vog .jo .shoplinkebj a:hover{color:#f8485e}.vog .jo .shoplinktoshokan a:hover{color:#333}.vog .jo .w3 a:hover{color:#ff9901}.vog .jo .g7 a:hover{color:#bf0000}.vog .jo .shoplinkseven a:hover{color:#225496}.vog .v3{clear:both}@media screen and (max-width:768px){.vog .qj{width:100%;float:none}.vog .jo>div{width:32.33%;margin:.5%}.vog .t5{text-align:center;padding-bottom:1px}}@media screen and (max-width:480px){.vog .jo>div{width:49%;margin:.5%}}</style>"

// 変換対象のクラス名一覧
const before = [
	'cstmreba',
	'booklink-box',
	'booklink-image',
	'booklink-info',
	'booklink-name',
	'booklink-powered-date',
	'booklink-detail',
	'keyword',
	'booklink-link2',
	'shoplinkrakuten',
	'shoplinkrakukobo',
	'shoplinkamazon',
	'shoplinkkindle',
	'booklink-footer'
]
// 変換後のハッシュ文字列一覧（冪等性を持たせるために、固定値で持つ）
const after = [
	'vog',
	'd7',
	'qj',
	't5',
	'cv',
	'lj',
	't4',
	'an',
	'jo',
	'g7',
	'ss',
	'w3',
	'f7',
	'v3'
]

const replace = (inputHtml) => {
	// クラス名置換
	before.forEach((target, index) => {
		// 置換前の文字列（予期せぬテキスト置換を防ぐため、class= も含める)
		const htmlClassBefore = new RegExp(`class="${target}"`, 'g')

		const htmlClassAfter = `class="${after[index]}"`

		inputHtml = inputHtml.replace(htmlClassBefore, htmlClassAfter)
	})
	return inputHtml
}

window.addEventListener('DOMContentLoaded', () => {
	const $input = document.querySelector('#html_input')
	const $output = document.querySelector('#html_output')
	const $preview = document.querySelector('#preview')

	$input.addEventListener('input', (e) => {
		const output = replace(e.target.value)

		inlineCss(`${style}${output}`, { url: ' ' })
			.then((html) => {
				$output.value = html
				$preview.innerHTML = '<h2>プレビュー</h2>' + html
			})
			.catch(console.error);

	})
})