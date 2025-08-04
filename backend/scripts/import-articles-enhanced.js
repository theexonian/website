/**
 * Enhanced Article Import Script with Thumbnail Download
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Enhanced configuration
const CONFIG = {
  DATA_DIRECTORY: './data',
  BATCH_SIZE: 25,
  DRY_RUN: true, // Set to false to actually import
  DOWNLOAD_THUMBNAILS: true,
  THUMBNAIL_TIMEOUT: 30000, // 30 seconds
  SKIP_EXISTING: true
};

async function importArticlesEnhanced() {
  try {
    const strapi = require('@strapi/strapi')();
    await strapi.load();

    console.log('🚀 Starting enhanced article import...');
    console.log(`⚙️  Configuration:`, CONFIG);
    
    const jsonFiles = fs.readdirSync(CONFIG.DATA_DIRECTORY)
      .filter(file => file.endsWith('.json'));

    console.log(`📁 Found ${jsonFiles.length} JSON files`);

    let stats = {
      total: 0,
      success: 0,
      errors: 0,
      skipped: 0
    };

    for (const file of jsonFiles) {
      console.log(`\n📄 Processing ${file}...`);
      
      const filePath = path.join(CONFIG.DATA_DIRECTORY, file);
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      
      if (!data.articles || !Array.isArray(data.articles)) {
        console.log(`⚠️  Skipping ${file}: No 'articles' array found`);
        continue;
      }

      stats.total += data.articles.length;
      
      // Process in batches
      for (let i = 0; i < data.articles.length; i += CONFIG.BATCH_SIZE) {
        const batch = data.articles.slice(i, i + CONFIG.BATCH_SIZE);
        console.log(`📦 Batch ${Math.floor(i/CONFIG.BATCH_SIZE) + 1} (${batch.length} articles)`);
        
        for (const articleData of batch) {
          try {
            const result = await processArticleEnhanced(strapi, articleData);
            if (result === 'skipped') {
              stats.skipped++;
            } else {
              stats.success++;
            }
          } catch (error) {
            console.error(`❌ "${articleData.title}": ${error.message}`);
            stats.errors++;
          }
        }
      }
    }

    printSummary(stats);

  } catch (error) {
    console.error('💥 Import failed:', error);
  } finally {
    process.exit(0);
  }
}

async function processArticleEnhanced(strapi, articleData) {
  // Validation
  validateArticleData(articleData);

  const slug = articleData.slug || generateSlug(articleData.title);

  // Check if exists
  if (CONFIG.SKIP_EXISTING) {
    const existing = await strapi.db.query('api::article.article').findOne({
      where: { slug }
    });
    
    if (existing) {
      console.log(`⏭️  Skipping "${articleData.title}": Already exists`);
      return 'skipped';
    }
  }

  // Process authors
  const authors = await processAuthors(strapi, articleData.authors || []);

  // Process thumbnail
  let thumbnail = null;
  if (articleData.thumbnailUrl && CONFIG.DOWNLOAD_THUMBNAILS) {
    try {
      thumbnail = await downloadAndUploadThumbnail(strapi, articleData.thumbnailUrl, slug);
    } catch (error) {
      console.log(`📸 Thumbnail failed for "${articleData.title}": ${error.message}`);
    }
  }

  const articlePayload = {
    title: articleData.title,
    content: articleData.content,
    description: articleData.description || null,
    slug: slug,
    tag: articleData.tag,
    z: articleData.z || null,
    publishedAt: articleData.publishedAt || new Date().toISOString(),
    authors: authors.map(a => a.id),
    thumbnail: thumbnail?.id || null
  };

  if (CONFIG.DRY_RUN) {
    console.log(`🔍 DRY RUN: "${articleData.title}"`, {
      slug: articlePayload.slug,
      tag: articlePayload.tag,
      authorsCount: authors.length,
      hasThumbnail: !!thumbnail
    });
    return articlePayload;
  }

  // Create article
  const article = await strapi.db.query('api::article.article').create({
    data: articlePayload
  });

  console.log(`✅ "${article.title}" (ID: ${article.id})`);
  return article;
}

async function downloadAndUploadThumbnail(strapi, thumbnailUrl, slug) {
  try {
    console.log(`📸 Downloading thumbnail: ${thumbnailUrl}`);
    
    const response = await axios({
      method: 'GET',
      url: thumbnailUrl,
      responseType: 'stream',
      timeout: CONFIG.THUMBNAIL_TIMEOUT,
      headers: {
        'User-Agent': 'The Exonian Article Importer'
      }
    });

    const contentType = response.headers['content-type'];
    if (!contentType || !contentType.startsWith('image/')) {
      throw new Error(`Invalid content type: ${contentType}`);
    }

    // Generate filename
    const extension = contentType.split('/')[1];
    const filename = `${slug}-thumbnail.${extension}`;

    // Create a buffer from the stream
    const chunks = [];
    for await (const chunk of response.data) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Upload to Strapi
    const uploadedFile = await strapi.plugins.upload.services.upload.upload({
      data: {
        refId: null,
        ref: null,
        field: null,
      },
      files: {
        path: buffer,
        name: filename,
        type: contentType,
        size: buffer.length,
      },
    });

    console.log(`✅ Thumbnail uploaded: ${filename}`);
    return uploadedFile[0];

  } catch (error) {
    throw new Error(`Thumbnail download failed: ${error.message}`);
  }
}

async function processAuthors(strapi, authorEmails) {
  const authors = [];
  
  for (const email of authorEmails) {
    try {
      let author = await strapi.db.query('plugin::users-permissions.user').findOne({
        where: { email }
      });

      if (!author && !CONFIG.DRY_RUN) {
        // Extract name from email for better user experience
        const username = email.split('@')[0];
        const displayName = username.split('.').map(part => 
          part.charAt(0).toUpperCase() + part.slice(1)
        ).join(' ');

        author = await strapi.db.query('plugin::users-permissions.user').create({
          data: {
            username,
            email,
            confirmed: true,
            role: 1, // Authenticated user role
            // Add any additional fields your user model might have
            fullname: displayName
          }
        });
        console.log(`👤 Created author: ${email} (${displayName})`);
      } else if (!author && CONFIG.DRY_RUN) {
        // For dry run, create a mock author object
        author = { id: 'mock', email, username: email.split('@')[0] };
        console.log(`👤 Would create author: ${email}`);
      }

      authors.push(author);
    } catch (error) {
      console.error(`Failed to process author ${email}: ${error.message}`);
    }
  }

  return authors;
}

function validateArticleData(articleData) {
  const required = ['title', 'content', 'tag'];
  const validTags = ['news', 'sotw', 'sports', 'life', 'oped', 'humor'];

  for (const field of required) {
    if (!articleData[field]) {
      throw new Error(`Missing required field: ${field}`);
    }
  }

  if (!validTags.includes(articleData.tag)) {
    throw new Error(`Invalid tag: ${articleData.tag}. Valid tags: ${validTags.join(', ')}`);
  }

  if (articleData.authors && !Array.isArray(articleData.authors)) {
    throw new Error('Authors must be an array');
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

function printSummary(stats) {
  console.log('\n' + '='.repeat(50));
  console.log('📊 IMPORT SUMMARY');
  console.log('='.repeat(50));
  console.log(`📄 Total articles processed: ${stats.total}`);
  console.log(`✅ Successfully imported: ${stats.success}`);
  console.log(`⏭️  Skipped (already exist): ${stats.skipped}`);
  console.log(`❌ Failed imports: ${stats.errors}`);
  console.log(`📈 Success rate: ${((stats.success / stats.total) * 100).toFixed(1)}%`);
  console.log('='.repeat(50));
}

// Export for use as module
module.exports = {
  importArticlesEnhanced,
  processArticleEnhanced,
  CONFIG
};

// Run if called directly
if (require.main === module) {
  importArticlesEnhanced();
}
