# Math Quiz

A simple times tables quiz you can play in your browser.

**Play it here: https://lcarva.github.io/math-quiz/**

## How it works

Pick a "from" and "to" range, then answer multiplication questions using
numbers in that range. Correct answers increase your score; you can change
the range at any time.

## Running locally

This is a static site (HTML, CSS, and vanilla JavaScript), so no build step
is required. Just open `index.html` in a browser, or serve the directory
with any static file server, e.g.:

```sh
python3 -m http.server
```

## Deployment

Pushes to `main` are automatically deployed to GitHub Pages via the
workflow in `.github/workflows/pages.yml`.
