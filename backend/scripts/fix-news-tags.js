/**
 * News Articles Tag Fixer Script
 * 
 * This script finds existing articles by title match and updates their tag to "news".
 * If no match is found, it imports the missing article as a new entry.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const API_CONFIG = {
  BASE_URL: 'https://server.theexonian.net/', // Your Strapi URL
  API_TOKEN: process.env.STRAPI_API_UPLOAD, // Generate in Strapi admin
  DATA_FILE: './data/news-articles.json',
  DRY_RUN: true,
  MAX_RETRIES: 3,
  RETRY_DELAY: 2000
};

class NewsTagFixer {
  constructor(config = API_CONFIG) {
    this.config = config;
    this.stats = { 
      total: 0, 
      updated: 0, 
      imported: 0, 
      errors: 0, 
      skipped: 0, 
      retried: 0,
      duplicatesDeleted: 0
    };
    
    // Setup axios with default headers
    this.api = axios.create({
      baseURL: config.BASE_URL,
      headers: {
        'Authorization': `Bearer ${config.API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async fixNewsTags() {
    console.log('🚀 Starting News Tag Fixer...');
    console.log(`📋 Mode: ${this.config.DRY_RUN ? 'DRY RUN' : 'LIVE UPDATE'}`);
    
    try {
      // Verify API connection
      await this.verifyConnection();
      
      // Load news articles
      const newsData = JSON.parse(fs.readFileSync(this.config.DATA_FILE, 'utf8'));
      
      if (!newsData.articles || !Array.isArray(newsData.articles)) {
        throw new Error('Invalid news articles file format');
      }

      this.stats.total = newsData.articles.length;
      console.log(`📄 Found ${this.stats.total} news articles to process\n`);

      // Process each article
      for (let i = 0; i < newsData.articles.length; i++) {
        const article = newsData.articles[i];
        
        if (!article.title) {
          console.log(`⚠️  Skipping article ${i + 1}: No title`);
          this.stats.skipped++;
          continue;
        }

        try {
          await this.processArticle(article, i + 1);
        } catch (error) {
          console.error(`❌ "${article.title}": ${error.message}`);
          this.stats.errors++;
        }
      }
      
      this.printSummary();
      
    } catch (error) {
      console.error('💥 Fix operation failed:', error.message);
      throw error;
    }
  }

  async withRetry(operation, context = '', retries = this.config.MAX_RETRIES) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        const isLastAttempt = attempt === retries;
        
        if (!this.isRetryableError(error) || isLastAttempt) {
          throw error;
        }
        
        console.log(`⚠️  ${context} failed (attempt ${attempt}/${retries}): ${error.message}`);
        console.log(`🔄 Retrying in ${this.config.RETRY_DELAY}ms...`);
        
        this.stats.retried++;
        await this.sleep(this.config.RETRY_DELAY);
      }
    }
  }

  isRetryableError(error) {
    if (error.code === 'ECONNRESET' || 
        error.code === 'ENOTFOUND' || 
        error.code === 'ECONNREFUSED' ||
        error.code === 'ETIMEDOUT') {
      return true;
    }
    
    if (error.response && error.response.status >= 500) {
      return true;
    }
    
    if (error.message.includes('timeout') || 
        error.message.includes('network') ||
        error.message.includes('socket hang up')) {
      return true;
    }
    
    return false;
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async verifyConnection() {
    try {
      const response = await this.api.get('/api/articles?pagination[limit]=1');
      console.log('✅ API connection verified');
      return response.data;
    } catch (error) {
      throw new Error(`API connection failed: ${error.message}. Check your BASE_URL and API_TOKEN.`);
    }
  }

  async processArticle(newsArticle, index) {
    const title = newsArticle.title.trim();
    
    // Find existing articles by title (returns array now)
    const existingArticles = await this.withRetry(
      () => this.findArticleByTitle(title),
      `Finding articles with title "${title}"`
    );

    if (existingArticles && existingArticles.length > 0) {
      // Articles exist - handle duplicates and update tag
      await this.handleDuplicatesAndUpdate(existingArticles, title, index);
    } else {
      // Article doesn't exist - import it
      await this.importNewArticle(newsArticle, title, index);
    }
  }

  async findArticleByTitle(title) {
    try {
      // Search for articles with exact title match
      const response = await this.api.get(`/api/articles?filters[title][$eq]=${encodeURIComponent(title)}`);
      return response.data.data.length > 0 ? response.data.data : null;
    } catch (error) {
      console.error(`Error finding article by title: ${error.message}`);
      return null;
    }
  }

  async handleDuplicatesAndUpdate(existingArticles, title, index) {
    if (existingArticles.length === 1) {
      // Only one article - just update its tag if needed
      const article = existingArticles[0];
      const currentTag = article.tag;
      
      if (currentTag === 'news') {
        console.log(`⏭️  [${index}/${this.stats.total}] "${title}": Already tagged as "news" (ID: ${article.id})`);
        this.stats.skipped++;
      } else {
        await this.updateArticleTag(article, title, index);
      }
    } else {
      // Multiple articles with same title - handle duplicates
      console.log(`🔍 [${index}/${this.stats.total}] Found ${existingArticles.length} duplicates for "${title}"`);
      
      // Sort by ID to keep the oldest one (lowest ID)
      existingArticles.sort((a, b) => a.id - b.id);
      
      const keepArticle = existingArticles[0];
      const duplicates = existingArticles.slice(1);
      
      // Delete duplicates
      for (const duplicate of duplicates) {
        await this.deleteDuplicateArticle(duplicate, title, index);
      }
      
      // Update the kept article's tag
      const currentTag = keepArticle.tag;
      if (currentTag === 'news') {
        console.log(`⏭️  [${index}/${this.stats.total}] "${title}": Kept article (ID: ${keepArticle.id}) already tagged as "news"`);
        this.stats.skipped++;
      } else {
        console.log(`🧹 [${index}/${this.stats.total}] "${title}": Kept oldest article (ID: ${keepArticle.id}), deleted ${duplicates.length} duplicate(s)`);
        await this.updateArticleTag(keepArticle, title, index);
      }
    }
  }

  async deleteDuplicateArticle(article, title, index) {
    if (this.config.DRY_RUN) {
      console.log(`🔍 [${index}/${this.stats.total}] DRY RUN: Would delete duplicate "${title}" (ID: ${article.id})`);
      this.stats.duplicatesDeleted = (this.stats.duplicatesDeleted || 0) + 1;
      return;
    }

    try {
      await this.withRetry(
        () => this.api.delete(`/api/articles/${article.documentId}`),
        `Deleting duplicate "${title}"`
      );
      
      console.log(`🗑️  [${index}/${this.stats.total}] Deleted duplicate "${title}" (ID: ${article.id})`);
      this.stats.duplicatesDeleted = (this.stats.duplicatesDeleted || 0) + 1;
    } catch (error) {
      console.error(`❌ Failed to delete duplicate "${title}" (ID: ${article.id}): ${error.message}`);
      this.stats.errors++;
    }
  }

  async updateArticleTag(existingArticle, title, index) {
    const currentTag = existingArticle.tag;
    
    if (this.config.DRY_RUN) {
      console.log(`🔍 [${index}/${this.stats.total}] DRY RUN: Would update "${title}" tag from "${currentTag}" to "news" (ID: ${existingArticle.id})`);
      this.stats.updated++;
      return;
    }

    try {
      await this.withRetry(
        () => this.api.put(`/api/articles/${existingArticle.documentId}`, {
          data: { tag: 'news' }
        }),
        `Updating tag for "${title}"`
      );
      
      console.log(`🔄 [${index}/${this.stats.total}] Updated "${title}": "${currentTag}" → "news" (ID: ${existingArticle.id})`);
      this.stats.updated++;
    } catch (error) {
      throw new Error(`Failed to update article tag: ${error.message}`);
    }
  }

  async importNewArticle(newsArticle, title, index) {
    // Validate required fields
    if (!newsArticle.content || !newsArticle.tag) {
      throw new Error(`Missing required fields for import`);
    }

    // Process authors
    const authorIds = await this.processAuthors(newsArticle.authors || []);

    // Generate unique slug
    const slug = this.generateSlug(title, newsArticle.publishedAt);

    // Prepare payload
    const payload = {
      data: {
        title: title,
        content: newsArticle.content,
        description: newsArticle.description || null,
        slug: slug,
        tag: 'news', // Force to news tag
        z: newsArticle.z || 100,
        publishedAt: newsArticle.publishedAt || new Date().toISOString(),
        authors: authorIds
      }
    };

    if (this.config.DRY_RUN) {
      console.log(`🔍 [${index}/${this.stats.total}] DRY RUN: Would import new article "${title}"`);
      this.stats.imported++;
      return;
    }

    try {
      const response = await this.withRetry(
        () => this.api.post('/api/articles', payload),
        `Importing new article "${title}"`
      );
      
      const createdArticle = response.data.data || response.data;
      const id = createdArticle.id || 'unknown';
      console.log(`➕ [${index}/${this.stats.total}] Imported new article "${title}" (ID: ${id})`);
      this.stats.imported++;
    } catch (error) {
      throw new Error(`Failed to import article: ${error.message}`);
    }
  }

  async processAuthors(authorEmails) {
    const authorIds = [];
    
    for (const email of authorEmails) {
      try {
        let author = await this.withRetry(
          () => this.findUserByEmail(email),
          `Finding user ${email}`
        );
        
        if (!author && !this.config.DRY_RUN) {
          author = await this.withRetry(
            () => this.createUser(email),
            `Creating user ${email}`
          );
        }
        
        if (author) {
          authorIds.push(author.id);
        }
      } catch (error) {
        console.error(`Failed to process author ${email}: ${error.message}`);
      }
    }
    
    return authorIds;
  }

  async findUserByEmail(email) {
    try {
      const response = await this.api.get(`/api/users?filters[email][$eq]=${email}`);
      return response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error(`Error finding user ${email}: ${error.message}`);
      return null;
    }
  }

  async createUser(email) {
    const username = email.split('@')[0];
    const displayName = username.charAt(0).toUpperCase() + username.slice(1);

    try {
      const response = await this.api.post('/api/auth/local/register', {
        username,
        email,
        password: 'temporary-password-' + Date.now()
      });
      
      const userId = response.data.user.id;
      
      try {
        await this.withRetry(
          () => this.api.put(`/api/users/${userId}`, { fullname: displayName }),
          `Updating fullname for user ${email}`,
          2
        );
        console.log(`👤 Created user: ${email} (${displayName})`);
      } catch (updateError) {
        console.log(`👤 Created user: ${email} (fullname update failed: ${updateError.message})`);
      }
      
      return response.data.user;
    } catch (error) {
      console.error(`Failed to create user ${email}: ${error.message}`);
      return null;
    }
  }

  generateSlug(title, publishedAt) {
    let baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (publishedAt) {
      try {
        const date = new Date(publishedAt);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        baseSlug = `${baseSlug}-${year}-${month}-${day}-${randomSuffix}`;
      } catch (error) {
        baseSlug = `${baseSlug}-${Date.now()}`;
      }
    } else {
      baseSlug = `${baseSlug}-${Date.now()}`;
    }

    return baseSlug;
  }

  printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log('📊 NEWS TAG FIXER SUMMARY');
    console.log('='.repeat(60));
    console.log(`📄 Total articles processed: ${this.stats.total}`);
    console.log(`🔄 Tags updated to "news": ${this.stats.updated}`);
    console.log(`➕ New articles imported: ${this.stats.imported}`);
    console.log(`🗑️  Duplicate articles deleted: ${this.stats.duplicatesDeleted}`);
    console.log(`⏭️  Already correct (skipped): ${this.stats.skipped}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log(`🔄 Retries performed: ${this.stats.retried}`);
    console.log('='.repeat(60));
    
    if (this.config.DRY_RUN) {
      console.log('💡 This was a DRY RUN. Set DRY_RUN=false to apply changes.');
    }
  }
}

// Usage
async function runFixer() {
  const fixer = new NewsTagFixer({
    ...API_CONFIG,
    DRY_RUN: process.env.DRY_RUN !== 'false' // Set DRY_RUN=false to actually fix
  });
  
  await fixer.fixNewsTags();
}

if (require.main === module) {
  runFixer().catch(console.error);
}

module.exports = NewsTagFixer;
