# Unblocked Games Hub - Deployment Guide

If your page is blank on GitHub Pages, follow these steps:

### 1. Build the Project
GitHub Pages cannot run your source code directly. You must build it first:
```bash
npm run build
```

### 2. Deploy to GitHub Pages
I have already installed the `gh-pages` package. Run this command to deploy:
```bash
npm run deploy
```
This will create a `gh-pages` branch in your repository and upload the contents of the `dist` folder.

### 3. Configure GitHub Settings
1. Go to your GitHub repository.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment**, set the **Branch** to `gh-pages` and the folder to `/(root)`.
4. Click **Save**.

### 4. Wait for Propagation
It can take 1-5 minutes for GitHub to update the site. If it's still blank, check the browser console (F12) for errors.

### Common Fixes:
- **White Screen:** Usually means the browser can't find the JS/CSS files. I have set `base: './'` in `vite.config.js` to fix this.
- **404 on Refresh:** I have added a `public/404.html` to handle this.
