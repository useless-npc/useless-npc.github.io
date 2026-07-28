# Security Writeups Site

A Jekyll site (using the built-in `minima` theme) for cybersecurity certification notes and challenge writeups, ready to deploy on GitHub Pages.

## 1. Push it to GitHub

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

- If the repo is named `YOUR-USERNAME.github.io`, your site will be live at `https://YOUR-USERNAME.github.io` with **no extra config**.
- If you use a different repo name (e.g. `security-writeups`), your site will be at `https://YOUR-USERNAME.github.io/security-writeups` — GitHub Pages handles this automatically once enabled (step 2), no config change needed for user/project sites using Jekyll.

## 2. Enable GitHub Pages

1. On GitHub, go to your repo → **Settings → Pages**
2. Under "Build and deployment", set **Source** to `Deploy from a branch`
3. Set branch to `main` and folder to `/ (root)`
4. Save — your site builds automatically in ~1 minute. GitHub will show you the live URL.

## 3. Add a new writeup

Create a new file in `_posts/` named exactly like this:

```
_posts/YYYY-MM-DD-short-title.md
```

Copy the front matter (the `---` block) from one of the example posts and fill in your content. It appears on the homepage automatically, newest first.

## 4. (Optional) Preview locally before pushing

```bash
gem install bundler
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## 5. Customize

- Edit `_config.yml` — site title, description, your GitHub username, social links
- Edit `about.md` — your bio / cert list
- Swap the theme in `_config.yml` (`theme: minima`) for any other Jekyll theme if you want a different look later
- Put screenshots in `assets/images/`

## Notes on writeups

- If a challenge/box is still active (e.g. on HackTheBox, live CTF), check the platform's rules before publishing — some require you to wait until the box is retired.
- Redact real IPs, credentials, and any client-identifying info if a writeup is from a professional engagement.
