const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Create directories if they don't exist
const projectImagesDir = path.join(__dirname, '../public/project-images');
const optimizedImagesDir = path.join(__dirname, '../public/project-images-optimized');

if (!fs.existsSync(optimizedImagesDir)) {
  fs.mkdirSync(optimizedImagesDir, { recursive: true });
}

async function optimizeImages() {
  try {
    // Get all files in the project images directory
    const files = fs.readdirSync(projectImagesDir);
    
    console.log(`Found ${files.length} images to optimize...`);
    
    // Process each image
    for (const file of files) {
      const inputPath = path.join(projectImagesDir, file);
      const outputPath = path.join(optimizedImagesDir, file.split('.')[0] + '.jpg');
      
      // Skip if not an image
      if (!file.match(/\.(jpg|jpeg|png|gif)$/i)) {
        console.log(`Skipping non-image file: ${file}`);
        continue;
      }
      
      // Get file stats
      const stats = fs.statSync(inputPath);
      const originalSizeInKB = stats.size / 1024;
      
      // Optimize the image
      await sharp(inputPath)
        .resize({ 
          width: 600, 
          height: 400, 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ quality: 80 })
        .toFile(outputPath);
      
      // Get optimized file stats
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSizeInKB = optimizedStats.size / 1024;
      const reductionPercentage = ((originalSizeInKB - optimizedSizeInKB) / originalSizeInKB * 100).toFixed(2);
      
      console.log(`Optimized: ${file} | ${originalSizeInKB.toFixed(2)} KB → ${optimizedSizeInKB.toFixed(2)} KB | ${reductionPercentage}% reduction`);
    }
    
    console.log('Image optimization complete! Optimized images saved to: public/project-images-optimized/');
    console.log('To use these optimized images, update your image paths in Projects.tsx');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

// Warning for missing sharp package
if (typeof sharp !== 'function') {
  console.log('⚠️ The "sharp" package is required but not installed.');
  console.log('Please install it by running: npm install sharp --save-dev');
  process.exit(1);
}

optimizeImages(); 