# मराठी संवाद - Marathi Communication Tool

A communication tool designed for elderly Marathi speakers who can see and understand but cannot speak. Users can tap large consonant and vowel tiles to form words and communicate their needs.

## Features

- **Large, accessible tiles** for easy tapping
- **Marathi consonants and vowels** with visual feedback
- **Common word shortcuts** for frequently used phrases
- **Word suggestions** based on input
- **Speech synthesis** to speak the formed words
- **Touch-friendly interface** optimized for mobile devices
- **Responsive design** that works on all screen sizes

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Marathi Communication Tool"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** to link your project

## Local Development

Simply open `index.html` in a web browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

## Browser Support

- Chrome/Edge (recommended for speech synthesis)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Advanced word completion algorithm
- Larger Marathi dictionary
- Customizable tile sizes
- Voice recognition input
- Multiple language support

## License

This project is open source and available under the MIT License.
