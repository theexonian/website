import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import axios, { AxiosError } from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors({
  origin: ['http://34.233.229.132:9000', 'http://localhost:3001'],
  methods: ['POST'],
}));
app.use(bodyParser.json());

// Listmonk API setup
const listmonkApiUrl = process.env.LISTMONK_API_URL;
const apiToken = process.env.LISTMONK_APITOKEN;

// Define expected shape of the request body
interface SubscribeRequest {
  email: string;
  name?: string;
  lists: number[];
}

// Route to handle subscription
app.post('/subscribe', async (req: Request<{}, {}, SubscribeRequest>, res: Response) => {
  console.log('Received subscription request');
  console.log('Request Body:', req.body);

  const { email, name, lists } = req.body;

  if (!email || !Array.isArray(lists)) {
    console.error('Error: Email or lists missing');
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
        'Authorization': `token ${apiToken}`,
        'Content-Type': 'application/json',
      },
    });
    res.status(200).json({ message: 'Subscribed successfully.', data: response.data });
  } catch (err) {
    const error = err as AxiosError;
    console.error('Error subscribing user:', {
      message: error.message,
      status: error.response?.status || 'Unknown',
      data: error.response?.data || 'No response data',
      config: error.config,
    });
    res.status(500).json({ error: 'Failed to subscribe user.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
