import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';

interface SubscribeRequestBody {
  email: string;
  name?: string;
  lists: number[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Allowed origins for CORS
  const allowedOrigins = [
    'https://new.theexonian.net',
    'http://localhost:3000',
    'https://theexonian.net',
  ];
  
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    // Optional: block other origins by not setting this header or set to null
    res.setHeader('Access-Control-Allow-Origin', 'null');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight requests
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }

  const { email, name, lists } = req.body as SubscribeRequestBody;

  if (!email || !Array.isArray(lists)) {
    return res.status(400).json({ error: 'Email and lists are required.' });
  }

  const listmonkApiUrl = process.env.LISTMONK_API_URL;
  const apiToken = process.env.LISTMONK_APITOKEN;

  if (!listmonkApiUrl || !apiToken) {
    return res.status(500).json({ error: 'Missing API configuration.' });
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
    console.error('Subscription error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    return res.status(500).json({ error: 'Failed to subscribe user.' });
  }
}
