import express from 'express';
import admin from 'firebase-admin';
import { createRequire } from 'module';
const require = createRequire(import.meta.url)
const credentials = require('../credentials.json');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();

app.listen(8080, () => {
    console.log('Server is listening on port 8080!');
});