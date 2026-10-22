#!/usr/bin/env bash
set -e

mkdir -p public/videos

echo "Generating reel 1 - Apex Hyperwear Fluid..."
ffmpeg -y -f lavfi -i "mandelbrot=size=540x960:rate=30:maxiter=80:start_scale=1.5,hue=s=0.8:h=PI*t*0.2" -t 4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart public/videos/reel-1-fluid.mp4

echo "Generating reel 2 - Lumina Sound Spatial Audio..."
ffmpeg -y -f lavfi -i "sine=frequency=440:duration=4,showwaves=s=540x960:mode=cline:colors=0xccff00|0x11ffcc:scale=cbrt,format=yuv420p" -t 4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart public/videos/reel-2-sound.mp4

echo "Generating reel 3 - Veloce Motors Cockpit HUD..."
ffmpeg -y -f lavfi -i "color=c=0x070908:s=540x960:d=4,drawgrid=w=30:h=30:t=1:c=0x1f2e24@0.6,drawbox=x=40:y=200:w=460:h=260:c=0xccff00@0.8:t=2,drawbox=x=80:y=500:w=380:h=180:c=0x38bdf8@0.7:t=2,format=yuv420p" -t 4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart public/videos/reel-3-cockpit.mp4

echo "Generating reel 4 - Aether Fragrances Scent Vapor..."
ffmpeg -y -f lavfi -i "gradients=s=540x960:r=30:c0=0x150b06:c1=0xd97706:c2=0x78350f:x0=270:y0=480:x1='270+150*cos(t*1.5)':y1='480+200*sin(t*1.5)',format=yuv420p" -t 4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart public/videos/reel-4-scent.mp4

echo "Generating reel 5 - Kroma Spatial XR Gestures..."
ffmpeg -y -f lavfi -i "cellauto=s=540x960:r=30:rule=30,format=yuv420p" -t 4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart public/videos/reel-5-spatial.mp4

echo "Generating reel 6 - Zephyr Kinetic Bio-Robotics..."
ffmpeg -y -f lavfi -i "life=s=540x960:r=30:mold=10:rate=30:ratio=0.15:death_color=0x090c0a:life_color=0xccff00,format=yuv420p" -t 4 -c:v libx264 -pix_fmt yuv420p -profile:v baseline -level 3.0 -movflags +faststart public/videos/reel-6-robot.mp4

echo "All reel video loops generated successfully in public/videos!"
