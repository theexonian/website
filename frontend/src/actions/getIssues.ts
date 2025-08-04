import { stringify } from 'querystring';
import { fetchCached } from '@/lib/fetchRequests';
import type { IssuesResponse } from '../../types/APIResponse';
import * as Constants from '@/components/Constants';

export async function getIssues() {
  const query = stringify({
    sort: 'publishDate:desc', // Sort by publish date instead of slug for consistent ordering
    populate: '*',
    'pagination[pageSize]': 100, // Request up to 100 issues to avoid pagination limits
  });

  try {
    const res: IssuesResponse = await fetchCached(
      `https://${Constants.STRAPI_IP}/api/past-issues?${query}`,
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API}` } }
    );

    // Strapi returns { data: [...] } on success
    if (Array.isArray(res?.data)) {
      return res.data;
    }
    console.warn('getIssues: unexpected payload', res);
    return [];              //  ← never null
  } catch (err) {
    console.error('getIssues fetch failed', err);
    return [];              //  ← never null
  }
}
