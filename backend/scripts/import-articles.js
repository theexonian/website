/**
 * Article Import Script for The Exonian
 * 
 * This script imports articles from JSON files into Strapi.
 * Run with: node scripts/import-articles.js
 * 
 * Expected JSON format:
 * {
 *   "articles": [
 *     {
 *       "title": "Article Title",
 *       "content": "Article content...",
 *       "description": "Brief description",
 *       "tag": "news", // or 'sotw', 'sports', 'life', 'oped', 'humor'
 *       "publishedAt": "2024-01-01T00:00:00.000Z",
 *       "authors": ["author1@example.com", "author2@example.com"], // optional
 *       "thumbnailUrl": "https://example.com/image.jpg", // optional
 *       "z": 1 // optional ordering
 *     }
 *   ]
 * }
 */

const fs = require('fs');
const path = require('path');

// Configure your data source
const DATA_DIRECTORY = './data'; // Folder containing your JSON files
const BATCH_SIZE = 50; // Process articles in batches to avoid memory issues
const DRY_RUN = true; // Set to false to actually import data

async function importArticles() {
  try {
    // Initialize Strapi
    const strapi = require('@strapi/strapi')();
    await strapi.load();

    console.log('🚀 Starting article import...');
    
    // Read all JSON files from data directory
    const jsonFiles = fs.readdirSync(DATA_DIRECTORY)
      .filter(file => file.endsWith('.json'));

    console.log(`📁 Found ${jsonFiles.length} JSON files`);

    let totalArticles = 0;
    let successCount = 0;
    let errorCount = 0;

    for (const file of jsonFiles) {
      console.log(`\n📄 Processing ${file}...`);
      
      const filePath = path.join(DATA_DIRECTORY, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (!data.articles || !Array.isArray(data.articles)) {
        console.log(`⚠️  Skipping ${file}: No 'articles' array found`);
        continue;
      }

      totalArticles += data.articles.length;
      
      // Process articles in batches
      for (let i = 0; i < data.articles.length; i += BATCH_SIZE) {
        const batch = data.articles.slice(i, i + BATCH_SIZE);
        console.log(`📦 Processing batch ${Math.floor(i/BATCH_SIZE) + 1} (${batch.length} articles)`);
        
        for (const articleData of batch) {
          try {
            await processArticle(strapi, articleData);
            successCount++;
          } catch (error) {
            console.error(`❌ Failed to import article "${articleData.title}":`, error.message);
            errorCount++;
          }
        }
      }
    }

    console.log('\n✅ Import Summary:');
    console.log(`📊 Total articles processed: ${totalArticles}`);
    console.log(`✅ Successfully imported: ${successCount}`);
    console.log(`❌ Failed imports: ${errorCount}`);

  } catch (error) {
    console.error('💥 Import failed:', error);
  } finally {
    process.exit(0);
  }
}

async function processArticle(strapi, articleData) {
  // Validate required fields
  if (!articleData.title) {
    throw new Error('Title is required');
  }
  if (!articleData.content) {
    throw new Error('Content is required');
  }
  if (!articleData.tag) {
    throw new Error('Tag is required');
  }

  // Validate tag
  const validTags = ['news', 'sotw', 'sports', 'life', 'oped', 'humor'];
  if (!validTags.includes(articleData.tag)) {
    throw new Error(`Invalid tag: ${articleData.tag}. Must be one of: ${validTags.join(', ')}`);
  }

  // Generate slug from title if not provided
  const slug = articleData.slug || generateSlug(articleData.title);

  // Check if article already exists
  const existingArticle = await strapi.db.query('api::article.article').findOne({
    where: { slug }
  });

  if (existingArticle) {
    console.log(`⏭️  Skipping "${articleData.title}": Article with slug "${slug}" already exists`);
    return;
  }

  // Process authors if provided
  let authors = [];
  if (articleData.authors && Array.isArray(articleData.authors)) {
    authors = await findOrCreateAuthors(strapi, articleData.authors);
  }

  // Process thumbnail if provided
  let thumbnail = null;
  if (articleData.thumbnailUrl) {
    // Note: You'll need to implement thumbnail upload logic
    // This is a placeholder - see the full implementation below
    console.log(`📸 TODO: Upload thumbnail from ${articleData.thumbnailUrl}`);
  }

  // Prepare article data
  const articlePayload = {
    title: articleData.title,
    content: articleData.content,
    description: articleData.description || null,
    slug: slug,
    tag: articleData.tag,
    z: articleData.z || null,
    publishedAt: articleData.publishedAt || new Date().toISOString(),
    authors: authors.map(author => author.id),
    thumbnail: thumbnail?.id || null
  };

  if (DRY_RUN) {
    console.log(`🔍 DRY RUN: Would import "${articleData.title}" with data:`, {
      title: articlePayload.title,
      tag: articlePayload.tag,
      slug: articlePayload.slug,
      authorsCount: authors.length
    });
    return;
  }

  // Create the article
  const article = await strapi.db.query('api::article.article').create({
    data: articlePayload
  });

  console.log(`✅ Imported: "${article.title}" (ID: ${article.id})`);
  return article;
}

async function findOrCreateAuthors(strapi, authorEmails) {
  const authors = [];
  
  for (const email of authorEmails) {
    let author = await strapi.db.query('plugin::users-permissions.user').findOne({
      where: { email }
    });

    if (!author) {
      // Create new author if they don't exist
      const username = email.split('@')[0];
      author = await strapi.db.query('plugin::users-permissions.user').create({
        data: {
          username,
          email,
          confirmed: true,
          role: 1 // Assuming role ID 1 is for authenticated users
        }
      });
      console.log(`👤 Created new author: ${email}`);
    }

    authors.push(author);
  }

  return authors;
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Run the import
if (require.main === module) {
  importArticles();
}

module.exports = { importArticles, processArticle };
