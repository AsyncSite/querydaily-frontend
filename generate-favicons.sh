#!/bin/bash

# Generate favicon PNGs from SVG using ImageMagick or rsvg-convert
# This script requires either ImageMagick or librsvg to be installed

echo "Generating favicons from SVG..."

# Check if we have a tool to convert SVG
if command -v rsvg-convert &> /dev/null; then
    echo "Using rsvg-convert..."
    rsvg-convert -w 16 -h 16 public/favicon.svg > public/favicon-16x16.png
    rsvg-convert -w 32 -h 32 public/favicon.svg > public/favicon-32x32.png
    rsvg-convert -w 192 -h 192 public/favicon.svg > public/icon-192.png
    rsvg-convert -w 512 -h 512 public/favicon.svg > public/icon-512.png
    rsvg-convert -w 180 -h 180 public/favicon.svg > public/apple-touch-icon.png
elif command -v convert &> /dev/null; then
    echo "Using ImageMagick convert..."
    convert -background none -resize 16x16 public/favicon.svg public/favicon-16x16.png
    convert -background none -resize 32x32 public/favicon.svg public/favicon-32x32.png
    convert -background none -resize 192x192 public/favicon.svg public/icon-192.png
    convert -background none -resize 512x512 public/favicon.svg public/icon-512.png
    convert -background none -resize 180x180 public/favicon.svg public/apple-touch-icon.png
else
    echo "Neither rsvg-convert nor ImageMagick found. Please install one of them:"
    echo "  macOS: brew install librsvg or brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install librsvg2-bin or sudo apt-get install imagemagick"
    exit 1
fi

# Generate ICO file (multi-resolution)
if command -v convert &> /dev/null; then
    convert public/favicon-16x16.png public/favicon-32x32.png public/favicon.ico
else
    echo "Skipping ICO generation (requires ImageMagick)"
fi

echo "Favicon generation complete!"