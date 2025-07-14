import { stringify } from 'querystring';
import { fetchCached } from '@/lib/fetchRequests';
import type { IssuesResponse } from '../../types/APIResponse';
import * as Constants from '@/components/Constants';

export async function getIssues() {
  const query = stringify({
    sort: 'slug:desc',
    populate: '*',
    'pagination[pageSize]': 100, // Request up to 100 issues to avoid pagination limits
  });

  try {
    console.log('getIssues: Making API call with query:', query);
    
    // Temporarily bypass cache for debugging
    const response = await fetch(
      `https://${Constants.STRAPI_IP}/api/past-issues?${query}`,
      { 
        cache: 'no-store',
        headers: { Authorization: `Bearer ${process.env.STRAPI_API}` } 
      }
    );
    
    const res: IssuesResponse = await response.json();
    console.log('getIssues: Raw API response status:', response.status);
    console.log('getIssues: Raw API response headers:', Object.fromEntries(response.headers.entries()));

    // Strapi returns { data: [...] } on success
    if (Array.isArray(res?.data)) {
      console.log('getIssues: Total issues fetched:', res.data.length);
      console.log('getIssues: Board 146 issues:', res.data.filter(issue => issue.board === 146).length);
      console.log('getIssues: Sample of slugs:', res.data.slice(0, 10).map(issue => issue.slug));
      return res.data;
    }
    console.warn('getIssues: unexpected payload', res);
    return [];              //  ← never null
  } catch (err) {
    console.error('getIssues fetch failed', err);
    return [];              //  ← never null
  }
}
