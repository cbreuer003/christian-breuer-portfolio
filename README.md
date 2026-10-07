# Christian Breuer Portfolio

A static portfolio website for Christian Breuer, built to be hosted on GitHub Pages.

## Overview

This project is a clean, responsive portfolio showcasing case studies, studio information, and contact details. It is designed as a lightweight static site so it can be served directly from GitHub Pages without a framework or build step.

## Project Structure

- `index.html` — landing page with project cards
- `about.html` — about section
- `contact.html` — contact information
- `cloud9-tea.html` — case study
- `medu.html` — case study
- `peak.html` — case study
- `scofield-fruits.html` — case study
- `rev.html` — case study
- `noco-bru.html` — case study
- `many-macarons.html` — case study
- `internship-work.html` — case study
- `styles.css` — global styling and layout
- `script.js` — navigation, card behavior, and gallery interactions
- `assets/` — project and page assets organized by section

## Local Preview

From the project root, run:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## GitHub Pages Deployment

Because this is a static site, GitHub Pages can host it directly from the repository root.

Recommended setup:

1. Push the repository to GitHub.
2. In the GitHub repo, open Settings → Pages.
3. Set the source to the default branch (for example, `main`).
4. Use the root directory (`/`) as the publishing source.
5. Save the settings.

GitHub Pages will publish the site at:

```text
https://<your-username>.github.io/<repository-name>/
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

## Notes

- The site is intentionally static and framework-free for simplicity and easy hosting.
- Asset folders are organized by page and content type for easier maintenance.
- The project includes a `.gitignore` for common editor and system files.
