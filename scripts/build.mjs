// Builds the site into _site/: copies the page and songs, and writes songs.json
// from whatever audio files are in songs/. Run: node scripts/build.mjs
import { cpSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const AUDIO = /\.(mp3|m4a|aac|ogg|oga|opus|wav|flac|webm)$/i;
const out = '_site';

const titleFrom = (file) =>
  file
    .replace(AUDIO, '')
    .replace(/^\s*\d+\s*[-._)\s]\s*/, '') // leading track number: "01 - ", "2. ", "03_"
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || file;

const files = readdirSync('songs')
  .filter((f) => AUDIO.test(f))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

const site = JSON.parse(readFileSync('site.json', 'utf8'));
const songs = files.map((file) => ({
  title: titleFrom(file),
  src: 'songs/' + encodeURIComponent(file),
}));

rmSync(out, { recursive: true, force: true });
mkdirSync(out);
cpSync('index.html', `${out}/index.html`);
cpSync('songs', `${out}/songs`, { recursive: true });
writeFileSync(`${out}/songs.json`, JSON.stringify({ ...site, songs }, null, 2));
console.log(`Built ${out}/ with ${songs.length} song(s).`);
