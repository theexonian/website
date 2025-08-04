# Article Import Guide for The Exonian

This guide will help you bulk import your archived Squarespace articles into Strapi.

## 🚀 Quick Start

### 1. Prepare Your Data

Place your JSON files in the `backend/data/` directory. Each file should follow this structure:

```json
{
  "articles": [
    {
      "title": "Article Title",
      "content": "<p>Article content with HTML formatting</p>",
      "description": "Brief description",
      "tag": "news",
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "authors": ["author1@example.com"],
      "thumbnailUrl": "https://example.com/image.jpg",
      "z": 1
    }
  ]
}
```

### 2. Required Fields
- `title` (string) - Article title
- `content` (string) - Article content (can include HTML)
- `tag` (string) - Must be one of: `news`, `sotw`, `sports`, `life`, `oped`, `humor`

### 3. Optional Fields
- `description` (string) - Article preview text
- `publishedAt` (ISO date string) - Publication date
- `authors` (array of emails) - Will create users if they don't exist
- `thumbnailUrl` (string) - URL to download thumbnail image
- `z` (number) - Article ordering/priority
- `slug` (string) - Custom URL slug (auto-generated from title if not provided)

## 📋 Import Process

### Step 1: Test with Dry Run
```bash
cd backend
npm run import:dry-run
```

This will:
- ✅ Validate your JSON structure
- ✅ Check for required fields
- ✅ Show what would be imported
- ❌ Not actually create any data

### Step 2: Run Basic Import
```bash
npm run import:articles
```

### Step 3: Run Enhanced Import (with thumbnails)
```bash
npm run import:articles:enhanced
```

## ⚙️ Configuration Options

Edit the `CONFIG` object in `scripts/import-articles-enhanced.js`:

```javascript
const CONFIG = {
  DATA_DIRECTORY: './data',     // Where your JSON files are
  BATCH_SIZE: 25,              // Articles per batch
  DRY_RUN: true,               // Set false to actually import
  DOWNLOAD_THUMBNAILS: true,    // Download and upload images
  THUMBNAIL_TIMEOUT: 30000,     // Timeout for image downloads
  SKIP_EXISTING: true          // Skip articles that already exist
};
```

## 🔧 Advanced Features

### Author Management
- Authors are automatically created if they don't exist
- Uses email as unique identifier
- Generates display names from email addresses

### Thumbnail Handling
- Downloads images from URLs
- Supports common image formats (jpg, png, gif, webp)
- Handles timeouts and errors gracefully
- Uploads to Strapi's media library

### Error Handling
- Validates all required fields
- Skips duplicate articles (by slug)
- Continues processing on individual failures
- Detailed error reporting

### Batch Processing
- Processes articles in configurable batches
- Memory efficient for large datasets
- Progress tracking

## 📊 Monitoring Progress

The script provides detailed output:
- ✅ Successfully imported articles
- ⏭️ Skipped duplicates
- ❌ Failed imports with error details
- 📸 Thumbnail download status
- 👤 New author creation
- 📊 Final summary statistics

## 🐛 Troubleshooting

### Common Issues

1. **Invalid Tag Error**
   - Ensure tags are one of: `news`, `sotw`, `sports`, `life`, `oped`, `humor`
   - Check for typos in tag names

2. **Thumbnail Download Fails**
   - Check if URLs are accessible
   - Some sites block automated downloads
   - Images might be too large (>10MB typically)

3. **Author Creation Fails**
   - Ensure email addresses are valid
   - Check for special characters in emails

4. **Slug Conflicts**
   - Articles with same title will have same slug
   - Add unique identifiers to titles if needed

### Debug Mode
Set `DRY_RUN: true` to test without importing:
```javascript
const CONFIG = {
  // ... other settings
  DRY_RUN: true
};
```

## 🔄 Alternative Import Methods

### Option 1: Direct API Calls
Use Strapi's REST API with your own script:
```bash
POST /api/articles
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json
```

### Option 2: CSV Import Plugin
Install a CSV import plugin if you prefer spreadsheet format.

### Option 3: Database Direct Import
For very large datasets, consider direct database insertion.

## 📝 Data Transformation Tips

### Converting from Squarespace
- Export content may need HTML cleaning
- Date formats might need conversion
- Author names vs. email addresses
- Image URLs might be CDN links

### Sample Transformation Script
```javascript
// Convert Squarespace export to our format
function transformSquarespaceData(squarespaceData) {
  return {
    articles: squarespaceData.map(item => ({
      title: item.title,
      content: cleanHtml(item.content),
      tag: mapCategory(item.category),
      publishedAt: new Date(item.publishedOn).toISOString(),
      authors: [item.author + '@theexonian.net'],
      thumbnailUrl: item.assetUrl
    }))
  };
}
```

## 🚨 Important Notes

1. **Backup First**: Always backup your Strapi database before importing
2. **Test Small**: Start with a few articles to test the process
3. **Check Permissions**: Ensure your Strapi user has proper permissions
4. **Monitor Performance**: Large imports can impact server performance
5. **Validate Output**: Check imported articles in Strapi admin panel

## 📞 Support

If you encounter issues:
1. Check the error messages carefully
2. Validate your JSON format
3. Test with a small subset first
4. Review the Strapi logs for additional details

Happy importing! 🎉
