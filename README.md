# Nazish Khan — Portfolio

Personal portfolio website for Nazish Khan, Full-Stack & AI Developer (BS IT, GCU Hyderabad).
Plain HTML, CSS and JavaScript with no build step, so it can be hosted for free on GitHub Pages, Netlify or Vercel.

## Files

| File | What it is |
| --- | --- |
| `index.html` | The portfolio website |
| `cv.html` | Online CV (also the source for the PDF) |
| `assets/cv/Nazish-Khan-CV.pdf` | Downloadable CV |
| `css/style.css` | All styles |
| `js/main.js` | Animations, menu, filters, contact form, **your links** |
| `assets/img/` | Favicon and your profile photo |

## Content

GitHub (MS-Nazish), LinkedIn (nazish-khan-dev), email, projects and certificates were filled in from your real profiles. Still worth doing:

1. **Profile photo**: save a square photo (about 800x800) as `assets/img/profile.jpg`. It appears automatically on the site and the CV.
2. **Live demos**: add Live Demo links for SiteSync / SchoolHub once deployed.
3. **Contact form (optional)**: create a free form at https://formspree.io and paste its endpoint into `CONFIG.formEndpoint` in `js/main.js`. Without it, the form opens the visitor's email app.
4. **CV**: after editing `cv.html`, regenerate the PDF (below).

## Regenerate the CV PDF

Open `cv.html` in Chrome, press **Ctrl+P**, choose **Save as PDF**, set Margins to **None**, tick **Background graphics**, and save over `assets/cv/Nazish-Khan-CV.pdf`.

Or from a terminal (Windows):

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless=new --no-pdf-header-footer --print-to-pdf="assets\cv\Nazish-Khan-CV.pdf" cv.html
```

## Preview locally

```bash
python -m http.server 5500
```

Then open http://localhost:5500.

## Publish for free on GitHub Pages

1. Create a GitHub repository named `MS-Nazish.github.io`.
2. Upload all the files in this folder (keep the folder structure).
3. In the repository, go to **Settings → Pages**, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. After a minute your site is live at `https://ms-nazish.github.io`.

Netlify alternative: go to https://app.netlify.com/drop and drag this folder onto the page.
