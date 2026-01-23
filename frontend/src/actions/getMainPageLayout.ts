import { stringify } from 'querystring';
import { fetchCached } from '@/lib/fetchRequests';
import type { MainPageLayoutResponse } from '../../types/APIResponse';
import * as Constants from '@/components/Constants';

export async function getMainPageLayout() {
  const query = stringify({
    sort: 'issueDate:desc', // Sort by publish date instead of slug
    populate: '*',
  });

  try {
    const res: MainPageLayoutResponse = await fetchCached(
      `https://${Constants.STRAPI_IP}/api/main-page-layouts?${query}`,
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API}` } }
    );

    // Strapi returns { data: [...] } on success
    if (Array.isArray(res?.data)) {
      return res.data;
    }
    console.warn('getMainPageLayout: unexpected payload', res);
    return [];              //  ← never null
  } catch (err) {
    console.error('getMainPageLayout fetch failed', err);
    return [];              //  ← never null
  }
}
