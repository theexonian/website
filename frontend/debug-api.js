/**
 * Debug script to test API endpoints
 * Run this to verify the API is working correctly
 */

const STRAPI_IP = "server.theexonian.net";
const STRAPI_API = "b81866fb5cfd73957bfbaab2a3dbad47f062b7996412a379ffd574d5e14240cdb1fdf2ab949eb94a0c940132259d23c83bf84189f6b0a940f9c65c1cf692dddb578cb780500f7a352a7909f9a540512813d2ee129be17ebe46ea3e9b428a13badb0e61c992b2682202934e4b38424e734fb788ea000fdb07391cfa532cf05ce2";

async function testEndpoints() {
  console.log('🔍 Testing API endpoints...\n');
  
  // Test life articles
  const lifeUrl = `https://${STRAPI_IP}/api/articles?filters[z][$eq]=1&filters[tag][$eq]=life&sort[0]=createdAt:desc&populate=*`;
  console.log('Testing life articles (z=1):');
  console.log('URL:', lifeUrl);
  
  try {
    const response = await fetch(lifeUrl, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API}`
      }
    });
    const data = await response.json();
    console.log('✅ Response status:', response.status);
    console.log('📄 Articles found:', data.data?.length || 0);
    if (data.data?.[0]) {
      console.log('📰 First article:', data.data[0].title);
      console.log('🏷️  Tag:', data.data[0].tag);
      console.log('🔢 Z-index:', data.data[0].z);
    }
  } catch (error) {
    console.error('❌ Error fetching life articles:', error.message);
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
  
  // Test humor articles
  const humorUrl = `https://${STRAPI_IP}/api/articles?filters[z][$eq]=1&filters[tag][$eq]=humor&sort[0]=createdAt:desc&populate=*`;
  console.log('Testing humor articles (z=1):');
  console.log('URL:', humorUrl);
  
  try {
    const response = await fetch(humorUrl, {
      headers: {
        'Authorization': `Bearer ${STRAPI_API}`
      }
    });
    const data = await response.json();
    console.log('✅ Response status:', response.status);
    console.log('📄 Articles found:', data.data?.length || 0);
    if (data.data?.[0]) {
      console.log('📰 First article:', data.data[0].title);
      console.log('🏷️  Tag:', data.data[0].tag);
      console.log('🔢 Z-index:', data.data[0].z);
    }
  } catch (error) {
    console.error('❌ Error fetching humor articles:', error.message);
  }
}

testEndpoints();
