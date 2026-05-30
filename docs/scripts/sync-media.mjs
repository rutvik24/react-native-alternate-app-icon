import {copyFileSync,mkdirSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../..');
const out = join(dirname(fileURLToPath(import.meta.url)), '../static/media');

const files = [
  ['assets/alternate-app-icon-android.webm', 'alternate-app-icon-android.webm'],
  ['assets/alternate-app-icon-iOS.MP4', 'alternate-app-icon-ios.mp4'],
];

mkdirSync(out, {recursive: true});

for (const [from, to] of files) {
  copyFileSync(join(root, from), join(out, to));
  console.log(`synced ${to}`);
}
