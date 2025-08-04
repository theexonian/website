/**
 * Simple REST API Import Script
 * 
 * This approach uses Strapi's REST API to import articles.
 * Easier to debug and doesn't require Strapi internals knowledge.
 */

const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuration
const API_CONFIG = {
  BASE_URL: 'https://server.theexonian.net/', // Your Strapi URL
  API_TOKEN: process.env.STRAPI_API_UPLOAD, // Generate in Strapi admin
  DATA_DIR: './data',
  DRY_RUN: true
};

class ArticleImporter {
  constructor(config = API_CONFIG) {
    this.config = config;
    this.stats = { total: 0, success: 0, errors: 0, skipped: 0 };
    
    // Setup axios with default headers
    this.api = axios.create({
      baseURL: config.BASE_URL,
      headers: {
        'Authorization': `Bearer ${config.API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async importArticles() {
    console.log('🚀 Starting REST API import...');
    
    try {
      // Verify API connection
      await this.verifyConnection();
      
      // Process all JSON files
      const files = this.getJsonFiles();
      
      for (const file of files) {
        await this.processFile(file);
      }
      
      this.printSummary();
      
    } catch (error) {
      console.error('💥 Import failed:', error.message);
      throw error;
    }
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

  getJsonFiles() {
    const files = fs.readdirSync(this.config.DATA_DIR)
      .filter(file => file.endsWith('.json'))
      .map(file => path.join(this.config.DATA_DIR, file));
    
    console.log(`📁 Found ${files.length} JSON files`);
    return files;
  }

  async processFile(filePath) {
    console.log(`\n📄 Processing ${path.basename(filePath)}...`);
    
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (!data.articles || !Array.isArray(data.articles)) {
      console.log('⚠️  No articles array found, skipping');
      return;
    }

    this.stats.total += data.articles.length;

    for (const articleData of data.articles) {
      try {
        await this.processArticle(articleData);
      } catch (error) {
        console.error(`❌ "${articleData.title}": ${error.message}`);
        this.stats.errors++;
      }
    }
  }

  async processArticle(articleData) {
    // Validate
    this.validateArticle(articleData);
    
    const slug = this.generateSlug(articleData.title);
    
    // Check if exists
    const existing = await this.findArticleBySlug(slug);
    if (existing) {
      console.log(`⏭️  Skipping "${articleData.title}": Already exists`);
      this.stats.skipped++;
      return;
    }

    // Process authors
    const authorIds = await this.processAuthors(articleData.authors || []);

    // Prepare payload for Strapi API
    const payload = {
      data: {
        title: articleData.title,
        content: articleData.content,
        description: articleData.description || null,
        slug: slug,
        tag: articleData.tag,
        z: articleData.z || null,
        publishedAt: articleData.publishedAt || new Date().toISOString(),
        authors: authorIds
      }
    };

    if (this.config.DRY_RUN) {
      console.log(`🔍 DRY RUN: Would create "${articleData.title}"`);
      this.stats.success++;
      return;
    }

    // Create article via API
    const response = await this.api.post('/api/articles', payload);
    console.log(`✅ Created "${response.data.data.attributes.title}" (ID: ${response.data.data.id})`);
    this.stats.success++;
  }

  async findArticleBySlug(slug) {
    try {
      const response = await this.api.get(`/api/articles?filters[slug][$eq]=${slug}`);
      return response.data.data.length > 0 ? response.data.data[0] : null;
    } catch (error) {
      console.error(`Error checking for existing article: ${error.message}`);
      return null;
    }
  }

  async processAuthors(authorEmails) {
    const authorIds = [];
    
    for (const email of authorEmails) {
      try {
        let author = await this.findUserByEmail(email);
        
        if (!author && !this.config.DRY_RUN) {
          author = await this.createUser(email);
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
    const displayName = username.split('.').map(part => 
      part.charAt(0).toUpperCase() + part.slice(1)
    ).join(' ');

    try {
      const response = await this.api.post('/api/auth/local/register', {
        username,
        email,
        password: 'temporary-password-' + Date.now(), // They'll need to reset
        fullname: displayName
      });
      
      console.log(`👤 Created user: ${email}`);
      return response.data.user;
    } catch (error) {
      console.error(`Failed to create user ${email}: ${error.message}`);
      return null;
    }
  }

  validateArticle(articleData) {
    const required = ['title', 'content', 'tag'];
    const validTags = ['news', 'sotw', 'sports', 'life', 'oped', 'humor'];

    for (const field of required) {
      if (!articleData[field]) {
        throw new Error(`Missing required field: ${field}`);
      }
    }

    if (!validTags.includes(articleData.tag)) {
      throw new Error(`Invalid tag: ${articleData.tag}`);
    }
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  printSummary() {
    console.log('\n' + '='.repeat(50));
    console.log('📊 REST API IMPORT SUMMARY');
    console.log('='.repeat(50));
    console.log(`📄 Total: ${this.stats.total}`);
    console.log(`✅ Success: ${this.stats.success}`);
    console.log(`⏭️  Skipped: ${this.stats.skipped}`);
    console.log(`❌ Errors: ${this.stats.errors}`);
    console.log('='.repeat(50));
  }
}

// Usage
async function runImport() {
  const importer = new ArticleImporter({
    ...API_CONFIG,
    DRY_RUN: process.env.DRY_RUN !== 'false' // Set DRY_RUN=false to actually import
  });
  
  await importer.importArticles();
}

if (require.main === module) {
  runImport().catch(console.error);
}

module.exports = ArticleImporter;
