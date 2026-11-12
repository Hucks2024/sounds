# ya boi Sammy

A one-page music site. Songs live in the `songs/` folder; the site rebuilds itself every time you add one.

## Add a song

1. On GitHub, open the `songs` folder → **Add file → Upload files**.
2. Drag in your audio files (mp3, m4a, wav, ogg, flac) and commit.
3. The site updates in about a minute.

The file name becomes the song title, and a leading number sets the order:
`01 - First Light.mp3` shows as track 1, "First Light".

GitHub's web uploader accepts files up to 25 MB each, so mp3/m4a is a better fit than wav.

## One-time setup

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Change the name

Edit `title` and `tagline` in `site.json`.

## Preview locally

```bash
node scripts/build.mjs
```

```bash
npx serve _site
```
