/**
 * Transform Squarespace export to Strapi format
 * 
 * This script converts your current JSON format to the format expected by the import scripts
 */

const fs = require('fs');
const path = require('path');

// Configuration
const INPUT_DIR = './data/squarespace'; // Your current JSON files
const OUTPUT_DIR = './data'; // Where to save transformed files
const DEFAULT_TAG = 'news'; // Default tag for articles without category

function transformSquarespaceData() {
  try {
    // Create output directory if it doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Read all JSON files from input directory
    const jsonFiles = fs.readdirSync(INPUT_DIR)
      .filter(file => file.endsWith('.json'));

    console.log(`📁 Found ${jsonFiles.length} files to transform`);

    let totalTransformed = 0;

    for (const file of jsonFiles) {
      console.log(`\n📄 Processing ${file}...`);
      
      const inputPath = path.join(INPUT_DIR, file);
      const outputPath = path.join(OUTPUT_DIR, `transformed_${file}`);
      
      // Read and parse original data
      const originalData = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
      
      // Transform each article
      const transformedArticles = originalData
        .filter(item => item.title && item.body) // Only process articles with title and body
        .map(item => transformArticle(item));

      // Create new format
      const transformedData = {
        articles: transformedArticles
      };

      // Write transformed data
      fs.writeFileSync(outputPath, JSON.stringify(transformedData, null, 2));
      
      console.log(`✅ Transformed ${transformedArticles.length} articles → ${outputPath}`);
      totalTransformed += transformedArticles.length;
    }

    console.log(`\n🎉 Total articles transformed: ${totalTransformed}`);
    
  } catch (error) {
    console.error('❌ Transformation failed:', error);
  }
}

function transformArticle(item) {
  // Extract author information
  let authorEmail = null;
  if (item.author && item.author.displayName) {
    // Convert display name to email format
    const name = item.author.displayName.toLowerCase().replace(/\s+/g, '.');
    authorEmail = `${name}@theexonian.net`;
  }

  // Determine tag from URL or use default
  let tag = DEFAULT_TAG;
  if (item.fullUrl) {
    const urlParts = item.fullUrl.split('/');
    const category = urlParts[1]; // e.g., "/news/2013/..." → "news"
    
    // Map to valid Strapi tags
    const tagMapping = {
      'news': 'news',
      'sports': 'sports',
      'life': 'life',
      'opinion': 'oped',
      'oped': 'oped',
      'humor': 'humor',
      'sotw': 'sotw'
    };
    
    if (tagMapping[category]) {
      tag = tagMapping[category];
    }
  }

  // Generate slug from URL or title
  let slug = null;
  if (item.fullUrl) {
    const urlParts = item.fullUrl.split('/');
    slug = urlParts[urlParts.length - 1]; // Last part of URL
  }

  // Clean up the body content
  let content = item.body;
  if (content) {
    // Remove leading/trailing whitespace and newlines
    content = content.trim();
    
    // Convert plain text to basic HTML paragraphs if needed
    if (!content.includes('<') && content.includes('\n')) {
      content = content.split('\n')
        .filter(line => line.trim())
        .map(line => `<p>${line.trim()}</p>`)
        .join('\n');
    }
  }

  // Create transformed article
  const transformed = {
    title: item.title,
    content: content,
    tag: tag,
    publishedAt: item.publicationDate ? `${item.publicationDate}T00:00:00.000Z` : null
  };

  // Add optional fields
  if (slug) {
    transformed.slug = slug;
  }

  if (authorEmail) {
    transformed.authors = [authorEmail];
  }

  // Add description (first 150 chars of content as fallback)
  if (content && content.length > 150) {
    // Extract text from HTML and create description
    const textContent = content.replace(/<[^>]*>/g, '').substring(0, 150).trim();
    if (textContent) {
      transformed.description = textContent + '...';
    }
  }

  return transformed;
}

// Utility function to preview transformation without writing files
function previewTransformation(filePath) {
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const sample = data.slice(0, 2); // First 2 articles
    
    console.log('📋 PREVIEW - Original format:');
    console.log(JSON.stringify(sample[0], null, 2));
    
    console.log('\n📋 PREVIEW - Transformed format:');
    console.log(JSON.stringify(transformArticle(sample[0]), null, 2));
    
  } catch (error) {
    console.error('Preview failed:', error);
  }
}

// Run transformation
if (require.main === module) {
  // Check if preview mode
  if (process.argv.includes('--preview')) {
    const previewFile = process.argv[3] || './data/squarespace/dated_NEWS.json';
    previewTransformation(previewFile);
  } else {
    transformSquarespaceData();
  }
}

module.exports = {
  transformSquarespaceData,
  transformArticle,
  previewTransformation
};
