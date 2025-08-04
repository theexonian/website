/**
 * Quick transformation script for your current JSON format
 * Run this to convert your dated_NEWS.json file to the import-ready format
 */

const fs = require('fs');
const path = require('path');

// Your current file path
const INPUT_FILE = './data/dated_NEWS.json';
const OUTPUT_FILE = './data/news-articles.json';

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
        // Extract author emails - use authors array if present, otherwise displayName
        let authorEmails = [];
        if (article.authors && Array.isArray(article.authors) && article.authors.length > 0) {
          // Use the authors array
          authorEmails = article.authors.map(authorName => {
            // Generate email from author name (no periods between names)
            return authorName
              .toLowerCase()
              .replace(/\s+/g, '')
              .replace(/[^a-z0-9]/g, '') + '@exonian.com';
          });
        } else if (article.author && article.author.displayName) {
          // Fall back to displayName
          const authorEmail = article.author.displayName
            .toLowerCase()
            .replace(/\s+/g, '')
            .replace(/[^a-z0-9]/g, '') + '@exonian.com';
          authorEmails = [authorEmail];
        }

        // Extract slug from fullUrl
        let slug = null;
        if (article.fullUrl) {
          const urlParts = article.fullUrl.split('/');
          slug = urlParts[urlParts.length - 1];
        }

        // Clean content - remove HTML tags and let Strapi handle paragraphing
        let content = article.body.trim();
        
        // Remove any existing HTML tags (especially <p> tags)
        content = content.replace(/<[^>]*>/g, '');
        
        // Add publication note at the beginning
        const publishedDate = article.publicationDate ? 
          new Date(article.publicationDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : 'Unknown Date';
        
        content = `NOTE: This article was originally published on ${publishedDate}.\n\n${content}`;

        // Create transformed article
        const transformed = {
          title: article.title,
          content: content,
          tag: 'life', // All SOTW articles tagged as life
          publishedAt: article.publicationDate ? `${article.publicationDate}T00:00:00.000Z` : null,
          z: 100 // Set z-index to 100 as requested
        };

        // Add optional fields
        if (slug) {
          transformed.slug = slug;
        }

        if (authorEmails.length > 0) {
          transformed.authors = authorEmails;
        }

        // Create description from content (without the publication note)
        if (content) {
          // Get the original content without the NOTE prefix for description
          const originalContent = article.body.trim().replace(/<[^>]*>/g, '');
          const textContent = originalContent.substring(0, 150).trim();
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
