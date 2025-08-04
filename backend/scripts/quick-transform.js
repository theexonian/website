/**
 * Quick transformation script for your current JSON format
 * Run this to convert your dated_NEWS.json file to the import-ready format
 */

const fs = require('fs');
const path = require('path');

// Your current file path
const INPUT_FILE = './data/dated_OPED.json';
const OUTPUT_FILE = './data/oped-articles.json';

function quickTransform() {
  try {
    console.log('🔄 Transforming your JSON data...');
    
    // Read your current data
    const originalData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
    console.log(`📊 Found ${originalData.length} articles`);

    // Transform each article
    const transformedArticles = originalData
      .filter(article => article.title && article.body) // Only valid articles
      .map(article => {
        // Extract author email
        let authorEmail = null;
        if (article.author && article.author.displayName) {
          const name = article.author.displayName.toLowerCase().replace(/\s+/g, '.');
          authorEmail = `${name}@theexonian.net`;
        }

        // Extract slug from fullUrl
        let slug = null;
        if (article.fullUrl) {
          const urlParts = article.fullUrl.split('/');
          slug = urlParts[urlParts.length - 1];
        }

        // Clean content
        let content = article.body.trim();
        
        // Convert to basic HTML if it's plain text
        if (!content.includes('<p>') && content.includes('\n')) {
          content = content.split('\n')
            .filter(line => line.trim())
            .map(line => `<p>${line.trim()}</p>`)
            .join('\n');
        }

        // Create transformed article
        const transformed = {
          title: article.title,
          content: content,
          tag: 'oped', // All from OPED file
          publishedAt: article.publicationDate ? `${article.publicationDate}T00:00:00.000Z` : null,
          z: 100 // Set z-index to 100 as requested
        };

        // Add optional fields
        if (slug) {
          transformed.slug = slug;
        }

        if (authorEmail) {
          transformed.authors = [authorEmail];
        }

        // Create description from content
        if (content) {
          const textContent = content.replace(/<[^>]*>/g, '').substring(0, 150).trim();
          if (textContent) {
            transformed.description = textContent + '...';
          }
        }

        return transformed;
      });

    // Create final format
    const finalData = {
      articles: transformedArticles
    };

    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write transformed data
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalData, null, 2));

    console.log(`✅ Transformation complete!`);
    console.log(`📄 Input: ${originalData.length} articles`);
    console.log(`📄 Output: ${transformedArticles.length} valid articles`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);
    
    // Show a sample
    if (transformedArticles.length > 0) {
      console.log('\n📋 Sample transformed article:');
      console.log(JSON.stringify(transformedArticles[0], null, 2));
    }

  } catch (error) {
    console.error('❌ Transformation failed:', error);
  }
}

// Run it
quickTransform();
