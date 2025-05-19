const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories if they don't exist
const profileDir = path.join(__dirname, '../public');
const projectDir = path.join(__dirname, '../public/project-images');

if (!fs.existsSync(profileDir)) {
  fs.mkdirSync(profileDir, { recursive: true });
}

if (!fs.existsSync(projectDir)) {
  fs.mkdirSync(projectDir, { recursive: true });
}

// Helper function to download an image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    // Skip if file already exists
    if (fs.existsSync(filepath)) {
      console.log(`File already exists: ${filepath}`);
      return resolve();
    }

    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
};

// Main function
async function main() {
  try {
    // Create empty profile image
    const profilePath = path.join(profileDir, 'profile-image.jpg');
    if (!fs.existsSync(profilePath)) {
      // Create a simple placeholder image for the profile
      console.log(`Creating placeholder profile image: ${profilePath}`);
      // This just creates an empty file - you'll need to replace it with a real image
      fs.writeFileSync(profilePath, '');
    }

    // Create empty project images
    const projectImages = [
      'qubed.jpg',
      'property.jpg',
      'ml-research.jpg',
      'byow.jpg',
      'scheme.jpg',
      'ants.jpg'
    ];

    for (const image of projectImages) {
      const imagePath = path.join(projectDir, image);
      if (!fs.existsSync(imagePath)) {
        // Create a simple placeholder for each project image
        console.log(`Creating placeholder project image: ${imagePath}`);
        // This just creates an empty file - you'll need to replace it with a real image
        fs.writeFileSync(imagePath, '');
      }
    }

    console.log('All image placeholders created successfully!');
  } catch (error) {
    console.error('Error creating images:', error);
    process.exit(1);
  }
}

main(); 