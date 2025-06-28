import { stringify } from 'querystring';
import { fetchCached } from '@/lib/fetchRequests';
import type { IssuesResponse } from '../../types/APIResponse';
import * as Constants from '@/components/Constants';

export async function getIssues() {
  const query = stringify({
    sort: 'slug:desc',
    populate: '*',
  });

  try {
    const res: IssuesResponse = await fetchCached(
      `http://${Constants.STRAPI_IP}/api/past-issues?${query}`,
      { headers: { Authorization: `Bearer ${process.env.STRAPI_API}` } }
    );

    // Strapi returns { data: [...] } on success
    if (Array.isArray(res?.data)) return res.data;
    console.warn('getIssues: unexpected payload', res);
    return [];              //  ← never null
  } catch (err) {
    console.error('getIssues fetch failed', err);
    return [];              //  ← never null
  }
}
