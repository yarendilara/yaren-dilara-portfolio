# Yaren Dilara Çiftçi — Personal Portfolio

This is a simple, editorial-inspired personal portfolio website built with HTML, CSS, and a tiny bit of JavaScript. It’s focused on minimal, typography-led design with soft pink pastel tones and spacious layout.

**Quick Overview**
- **Name**: Yaren Dilara Çiftçi
- **Study**: IT (AI & Database) at VIZJA University
- **Focus**: Projects, learning notes, and contact

**Visual Style**
- Modern, minimal, editorial / Pinterest-inspired
- Calm and feminine with pastel soft pink accents
- Typography-first: large, elegant serif headlines and clean sans-serif body copy
- Lots of whitespace, calm, magazine-like layout

**Folder Structure**
- index.html — main site (hero, projects, contact)
- styles.css — styles and layout
- script.js — simple contact form behavior
- projects/ — project detail pages
- assets/ — illustrations and images

**How to publish on GitHub Pages**
1. Create a GitHub repository and push the files to the `main` branch.
2. In the repo Settings → Pages, set Source to the `main` branch and `/ (root)` directory, then click Save.
3. After a minute, your site will be available at `https://<your-username>.github.io/<your-repo>/`.

**Notes on contact form**
- The contact form opens the visitor’s email client using `mailto:` with a prefilled subject and body (no backend setup required).
**Run this project locally**
1. Make sure to start a local HTTP server from the project root (where `index.html` is). For example, with Python from the repo directory run:
```
python -m http.server 8080
```
Open your browser at http://localhost:8080 to view the site.
2. Alternatively, if you use Node, run:
```
npx http-server -p 8080
```

**Troubleshooting: "ERR_CONNECTION_REFUSED"**
- If you see "ERR_CONNECTION_REFUSED" when visiting `http://localhost:8080`, it means your browser cannot establish a TCP connection to the server. Common causes and fixes:
	- The local server is not running. Start it with the commands above and keep the terminal open while the server runs.
	- Wrong port: confirm the port shown by the server (8080), and open http://localhost:<port> accordingly.
	- Firewall or VPN: temporarily disable or configure them to allow local loopback connections.
	- Port conflict: another application might be using the same port — try a different port (e.g. 9000) via `python -m http.server 9000`.
	- Use `http://` not `https://`.
	- Check browser DevTools Console and Network tab for errors. Use `dumpState()` in the Console to inspect the local data saved in `localStorage` (we've added a `dumpState()` helper in `script.js`).

**Project pages and fields**
- Each project has a detail page under `/projects` with title, description, images, and a right-hand metadata sidebar.
- The metadata fields include: `Tech stack`, `Date`, and a `GitHub repository` link. Update these fields directly in the HTML to link to the real repository and set real dates.

**Customizing images and links**
- Replace SVG placeholders in `/assets` with your screenshots (or keep the placeholders).
- Update the GitHub links in `/projects/*.html` to your real repo URLs.

**How to replace the placeholder repository URLs**
- Open the project file you want to update (for example `projects/recommendation.html`).
- Find the line containing the repository link, it looks like this:
	```html
	<dd><a class="repo-link" href="https://github.com/your-username/recommendation-model">Open repository</a></dd>
	```
- Replace the `href` value with your real GitHub repo URL and save the file. Repeat for the other project files.

**Admin (local client-side login)**
- To log in as admin, open `login.html` and enter the credentials:
	- Username: `ydilara`
	- Password: `Di8551541`
- After login you will see an Admin Panel in the navbar with links to the Projects and Messages pages.
- Projects you add or edit are stored in the browser via `localStorage`, and messages sent through the contact popup are stored in `localStorage` as well.




*** End of README.md
