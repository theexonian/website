import { fetchCached } from '@/lib/fetchRequests';
import { IssuesResponse } from '../../types/APIResponse';
import * as Constants from "@/components/Constants";

export async function getIssues() {
    const response: IssuesResponse = await fetchCached(
        `http://${Constants.NEW_STRAPI_IP}:1337/api/past-issues?populate=*`,
        {
            headers: {
                Authorization: `Bearer ${process.env.STRAPI_API}`,
            },
        }
    );

    return response.data;
}