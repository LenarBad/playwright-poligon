# Training App (static)

Static training site for the Playwright + Java course.

## Local run

From this folder, serve files with any static server. Example:

```bash
python3 -m http.server 4173
```

Open <http://localhost:4173>.

## Demo credentials

- Email: `student@example.com`
- Password: `learning123`

## Stable storage keys

- `ta_auth`
- `ta_cart`
- `ta_ui`

## Utility for tests

- `window.__TA_VERSION__` contains app version.

## GitHub Pages

Publish the repository root as static content in GitHub Pages.
Use resulting URL in Playwright Java tests as `baseURL`.
