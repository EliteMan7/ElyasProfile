const fs = require('fs');
const path = require('path');
const { createCanvas, loadImage } = require('canvas');

// Create directories if they don't exist
const projectImagesDir = path.join(__dirname, '../public/project-images');
const optimizedImagesDir = path.join(__dirname, '../public/project-images-optimized');

if (!fs.existsSync(optimizedImagesDir)) {
  fs.mkdirSync(optimizedImagesDir, { recursive: true });
}

async function resizeImages() {
  try {
    // Get all files in the project images directory
    const files = fs.readdirSync(projectImagesDir);
    
    console.log(`Found ${files.length} images to resize...`);
    
    // Process each image
    for (const file of files) {
      const inputPath = path.join(projectImagesDir, file);
      const outputPath = path.join(optimizedImagesDir, file);
      
      // Skip if not an image
      if (!file.match(/\.(jpg|jpeg|png)$/i)) {
        console.log(`Skipping non-compatible file: ${file}`);
        continue;
      }
      
      // Get file stats
      const stats = fs.statSync(inputPath);
      const originalSizeInKB = stats.size / 1024;
      
      try {
        // Load the image
        const image = await loadImage(inputPath);
        
        // Calculate new dimensions (max width/height of 500px)
        const MAX_SIZE = 500;
        let width = image.width;
        let height = image.height;
        
        if (width > height && width > MAX_SIZE) {
          height = Math.round(height * (MAX_SIZE / width));
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = Math.round(width * (MAX_SIZE / height));
          height = MAX_SIZE;
        }
        
        // Create canvas with new dimensions
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        
        // Draw image on canvas
        ctx.drawImage(image, 0, 0, width, height);
        
        // Save the resized image
        const out = fs.createWriteStream(outputPath);
        let stream;
        
        if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
          stream = canvas.createJPEGStream({ quality: 0.8 });
        } else if (file.endsWith('.png')) {
          stream = canvas.createPNGStream();
        }
        
        stream.pipe(out);
        await new Promise((resolve) => out.on('finish', resolve));
        
        // Get optimized file stats
        const optimizedStats = fs.statSync(outputPath);
        const optimizedSizeInKB = optimizedStats.size / 1024;
        const reductionPercentage = ((originalSizeInKB - optimizedSizeInKB) / originalSizeInKB * 100).toFixed(2);
        
        console.log(`Resized: ${file} | ${width}x${height} | ${originalSizeInKB.toFixed(2)} KB → ${optimizedSizeInKB.toFixed(2)} KB | ${reductionPercentage}% reduction`);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
    
    console.log('Image resizing complete! Resized images saved to: public/project-images-optimized/');
    console.log('To use these optimized images, update your image paths in Projects.tsx from "/project-images/" to "/project-images-optimized/"');
  } catch (error) {
    console.error('Error resizing images:', error);
  }
}

// Warning for missing canvas package
try {
  if (typeof loadImage !== 'function') {
    throw new Error('Canvas package not found');
  }
} catch (e) {
  console.log('⚠️ The "canvas" package is required but not installed.');
  console.log('Please install it by running: npm install canvas --save-dev');
  process.exit(1);
}

resizeImages(); 