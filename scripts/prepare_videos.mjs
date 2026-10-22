import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const videosDir = path.resolve('public/videos');
const tempDir = path.resolve('public/videos/tmp');
fs.mkdirSync(tempDir, { recursive: true });

const reels = [
  {
    name: 'reel-1-fluid.mp4',
    imgUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=720&q=80',
    zoomDirection: 'in',
  },
  {
    name: 'reel-2-sound.mp4',
    imgUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=720&q=80',
    zoomDirection: 'out',
  },
  {
    name: 'reel-3-cockpit.mp4',
    imgUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=720&q=80',
    zoomDirection: 'in',
  },
  {
    name: 'reel-4-scent.mp4',
    imgUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=720&q=80',
    zoomDirection: 'out',
  },
  {
    name: 'reel-5-spatial.mp4',
    imgUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=720&q=80',
    zoomDirection: 'in',
  },
  {
    name: 'reel-6-robot.mp4',
    imgUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=720&q=80',
    zoomDirection: 'out',
  },
];

console.log('Generating high-performance 9:16 looping mp4s...');

for (const reel of reels) {
  const tmpImg = path.join(tempDir, `${reel.name}.jpg`);
  const outMp4 = path.join(videosDir, reel.name);
  
  console.log(`Downloading ${reel.name} source image...`);
  execSync(`curl -s -L -o "${tmpImg}" "${reel.imgUrl}"`);

  console.log(`Rendering ${reel.name} with ffmpeg...`);
  const zoomExpr = reel.zoomDirection === 'in' 
    ? "zoompan=z='min(zoom+0.002,1.15)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=540x960"
    : "zoompan=z='max(1.15-0.002*on,1.0)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=540x960";

  execSync(`ffmpeg -y -loop 1 -i "${tmpImg}" -vf "scale=540:960:force_original_aspect_ratio=increase,crop=540:960,${zoomExpr},format=yuv420p" -t 4 -r 30 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart "${outMp4}"`);
}

// Generate hero landscape reel (1280x720)
console.log('Generating hero landscape reel...');
const heroImg = path.join(tempDir, 'hero.jpg');
const heroMp4 = path.join(videosDir, 'hero-reel.mp4');
execSync(`curl -s -L -o "${heroImg}" "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1280&q=80"`);
execSync(`ffmpeg -y -loop 1 -i "${heroImg}" -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,zoompan=z='min(zoom+0.0015,1.12)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720,format=yuv420p" -t 4 -r 30 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart "${heroMp4}"`);

// Cleanup temp
fs.rmSync(tempDir, { recursive: true, force: true });
console.log('All video files generated successfully!');
