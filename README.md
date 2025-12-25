# 3D Cards Block

A WordPress Gutenberg block that displays interactive 3D stacked cards with full customization.

## Features

- **3D Stacked Cards** - Beautiful isometric card stack with depth effect
- **1-36 Cards** - Add up to 36 cards with custom SVG, title, and subtitle
- **Full Customization** - Control every aspect via block settings:
  - Card depth and spacing
  - Logo size and position
  - Title/subtitle position and font size
  - Color pickers for card face, border, and depth gradient
  - Global scale (50-350%)
  - Camera rotation and orthographic/perspective toggle
- **Glassmorphism** - Modern frosted-glass effect
  - Toggle switch to enable
  - Custom blur, opacity, saturation, and border opacity
- **Hover Effects** - Cards lift when hovered
  - Stay Hover option - Last hovered card remains lifted
  - Slide Hover option - Cards slide to the side with customizable X/Y/Z offsets
- **Scroll Animation** - Optional entrance animation when block scrolls into viewport
  - All cards start in active (lifted/slide) state
  - Animates from bottom to top back to base positions when fully scrolled into view
  - Configurable stagger delay (50-1000ms)
  - Replays when block exits and re-enters viewport
- **Card Editor Modal** - Easy popup to manage all cards

## Installation

1. Copy the `3d-cards-block` folder to `wp-content/plugins/`
2. Activate the plugin in WordPress admin
3. Add the "3D Cards" block to any page or post

## Development

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Watch for changes
npm run start
```

## Requirements

- WordPress 6.0+
- PHP 7.4+

## License

GPL-2.0-or-later
