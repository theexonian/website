// pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from 'next';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // CORS handling
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { email, name, lists } = req.body as SubscribeRequest;

  if (!email || !Array.isArray(lists)) {
    return res.status(400).json({ error: 'Email and lists are required.' });
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

    return res.status(200).json({ message: 'Subscribed successfully.', data: response.data });
  } catch (err) {
    const error = err as AxiosError;
    console.error('Error subscribing user:', {
      message: error.message,
      status: error.response?.status || 'Unknown',
      data: error.response?.data || 'No response data',
      config: error.config,
    });
    return res.status(500).json({ error: 'Failed to subscribe user.' });
  }
}
