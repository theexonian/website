// src/api/newsletter/controllers/newsletter.ts
import { Context } from 'koa';
import axios, { AxiosError } from 'axios';

const listmonkApiUrl = process.env.LISTMONK_API_URL!;
const apiToken = process.env.LISTMONK_APITOKEN!;

const allowedOrigins = [
  'https://new.theexonian.net',
  'https://theexonian.net',
  'http://localhost:3000',
];

interface SubscribeRequest {
  email: string;
  name?: string;
  lists: number[];
}

export default {
  async test(ctx) {
    ctx.body = { message: 'Test route works!' };
  },
  async subscribe(ctx: Context) {
    const origin = ctx.request.headers.origin;

    // CORS handling
    if (origin && allowedOrigins.includes(origin)) {
      ctx.set('Access-Control-Allow-Origin', origin);
    }

    // Handle preflight OPTIONS request
    if (ctx.method === 'OPTIONS') {
      ctx.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      ctx.status = 204;
      return;
    }

    if (ctx.method !== 'POST') {
      ctx.set('Allow', 'POST, OPTIONS');
      ctx.status = 405;
      ctx.body = { error: `Method ${ctx.method} not allowed` };
      return;
    }

    const { email, name, lists } = ctx.request.body as SubscribeRequest;

    if (!email || !Array.isArray(lists)) {
      ctx.status = 400;
      ctx.body = { error: 'Email and lists are required.' };
      return;
    }

    const data = {
      email,
      name: name || '',
      lists,
      status: 'enabled',
    };

    try {
      const response = await axios.post(listmonkApiUrl, data, {
        headers: {
          Authorization: `token ${apiToken}`,
          'Content-Type': 'application/json',
        },
      });

      ctx.status = 200;
      ctx.body = { message: 'Subscribed successfully.', data: response.data };
    } catch (err) {
      const error = err as AxiosError;
      console.error('Error subscribing user:', {
        message: error.message,
        status: error.response?.status || 'Unknown',
        data: error.response?.data || 'No response data',
        config: error.config,
      });
      ctx.status = 500;
      ctx.body = { error: 'Failed to subscribe user.' };
    }
  },
};
