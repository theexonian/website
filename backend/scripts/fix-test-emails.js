/**
 * Fix email domains in the test file
 * Convert @theexonian.net to @exonian.com for the 10 test articles
 */

const fs = require('fs');

// File paths
const INPUT_FILE = './data/oped-test-10.json';
const OUTPUT_FILE = './data/oped-test-10-fixed.json';

function fixTestEmails() {
  try {
    console.log('🔄 Fixing email domains in test file...');
    
    // Read the test data
    const testData = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
    console.log(`📊 Found ${testData.articles.length} test articles`);

    // Fix email domains
    const fixedArticles = testData.articles.map(article => {
      if (article.authors && Array.isArray(article.authors)) {
        article.authors = article.authors.map(email => 
          email.replace('@theexonian.net', '@exonian.com')
        );
      }
      return article;
    });

    // Create fixed data
    const fixedData = {
      articles: fixedArticles
    };

    // Write fixed data
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(fixedData, null, 2));

    console.log(`✅ Email fix complete!`);
    console.log(`📄 Fixed ${fixedArticles.length} articles`);
    console.log(`💾 Saved to: ${OUTPUT_FILE}`);
    
    // Show sample of fixed emails
    console.log('\n📧 Sample fixed emails:');
    fixedArticles.slice(0, 3).forEach(article => {
      if (article.authors) {
        console.log(`- "${article.title}": ${article.authors.join(', ')}`);
      }
    });

  } catch (error) {
    console.error('❌ Email fix failed:', error);
  }
}

// Run it
fixTestEmails();
