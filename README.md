# Mtshoko Security Services - GitHub Pages site

Static site (HTML, CSS, JS - no build step).

## Before publishing
1. Run `setup-assets.ps1` once to copy the logo, photos, client logos and favicons into this folder, then delete the script.
2. The canonical URL, Open Graph tags, structured data, `sitemap.xml` and `robots.txt` use `https://mtshokosecurity.co.za/`.
   If the site will live at `https://<username>.github.io/<repo>/` instead, search and replace that address with the real one.

## Publish on GitHub Pages
1. Create a repository and upload the contents of this folder to its root.
2. Repository Settings, Pages, Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Custom domain (optional): add a file named `CNAME` containing `mtshokosecurity.co.za`, set the domain under Settings, Pages, and point your DNS at GitHub Pages.

All asset links are relative, so the site works at the domain root or under a repository sub-path.
