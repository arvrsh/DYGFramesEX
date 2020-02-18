#!/bin/bash
for i in {1..15}; do mkdir $i && ffmpeg -i $i.mp4 -r 2 -q:v 1 -vf scale=1280:720 $i/%04d.jpg; done