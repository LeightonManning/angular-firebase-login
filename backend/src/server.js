import express from 'express';
import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const credentials = require('../credentials.json');

let users = {
    'DHy5CEcOh3O3vF4xPbqEU4F4hkf2': {
        fullName: 'Leighton one',
        bio: 'I\'m the original account'
    },
    'Pq7AuNimVBaJcUyjF1GXWAp6CYQ2': {
        fullName: 'Leighton two',
        bio: 'I\'m the copy account'
    }
};

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();

app.get('/api/users/:userId', (req, res) => {
    const {userId} = req.params;    
    const user = users[userId];
    res.json(user);
});


app.listen(8080, () => {
    console.log('Server is listening on port 8080!');
});