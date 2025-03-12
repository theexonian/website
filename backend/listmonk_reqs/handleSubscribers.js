import dotenv from 'dotenv';

import { List } from './List';
import { Subscriber } from './Subscriber';
import { Template } from './Template';
import { Campaign } from './Campaign';
dotenv.config()
app.post('/subscribe', async (req, res) => {
    try {
        const list = await List.find((list) => list.getName() === 'WebBoardSubscription');
        await (await Subscriber.create(req.email, req.name, 'enabled', [list])).save();
    } catch (error) {
        console.error('Error adding subscriber:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(1337, () => console.log('Server running on port 1337'));
