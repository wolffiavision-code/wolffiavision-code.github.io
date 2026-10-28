# Google Search Console setup

Public URL: `https://wolffiavision-code.github.io/wolffia-vision-studio/`

## Before registration

1. Publish the contents of the Web public folder with GitHub Pages.
2. Open `/sitemap.xml` and `/robots.txt` and confirm that neither returns 404.
3. Confirm that the sitemap contains the Japanese and English home URLs.

This site is generated as static HTML, so the `jekyll-sitemap` plugin is not required. The build creates `dist/sitemap.xml` directly from the confirmed origin in `site_config.json`.

## Search Console

1. Open [Google Search Console](https://search.google.com/search-console/).
2. Add a property and choose “URL prefix”.
3. Enter `https://wolffiavision-code.github.io/wolffia-vision-studio/`.
4. HTML-file verification is convenient for GitHub Pages.
5. Place Google's verification HTML file at the public-folder root and publish it unchanged.
6. Return to Search Console and complete verification. Keep the verification file published.
7. Open Sitemaps, enter `sitemap.xml`, and submit it.
8. Use URL Inspection to request indexing for the Japanese home URL and inspect the English URL as needed.

Submitting a sitemap is a discovery hint; it does not guarantee indexing or ranking.
