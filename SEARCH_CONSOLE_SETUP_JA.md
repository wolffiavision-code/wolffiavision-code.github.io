# Google Search Console 登録手順

公開URL: `https://wolffiavision-code.github.io/wolffia-vision-studio/`

## 公開前の確認

1. GitHub PagesへWeb公開フォルダの内容を反映します。
2. ブラウザで `/sitemap.xml` と `/robots.txt` を開き、404にならないことを確認します。
3. `sitemap.xml` に日本語トップと英語トップの2 URLがあることを確認します。

このサイトは静的HTMLを生成しているため、`jekyll-sitemap`プラグインは必須ではありません。ビルド処理が完成済みの`site_config.json`から`dist/sitemap.xml`を直接生成します。

## Search Console

1. [Google Search Console](https://search.google.com/search-console/)を開きます。
2. 「プロパティを追加」から「URLプレフィックス」を選びます。
3. `https://wolffiavision-code.github.io/wolffia-vision-studio/` を入力します。
4. 所有権確認では「HTMLファイル」を選ぶとGitHub Pagesで扱いやすいです。
5. Googleから取得した確認用HTMLを、公開フォルダのルートへ置いてGitHubへ反映します。ファイル名と内容は変更しません。
6. Search Consoleへ戻り「確認」を実行します。確認後もHTMLファイルは削除しません。
7. 左メニューの「サイトマップ」を開き、`sitemap.xml` を入力して送信します。
8. 「URL検査」で日本語トップURLを検査し、「インデックス登録をリクエスト」を実行します。英語トップも同様に確認できます。

サイトマップ送信はクロールの手掛かりであり、検索結果への掲載や順位を保証するものではありません。

