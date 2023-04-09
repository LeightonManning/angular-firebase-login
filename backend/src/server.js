import express from 'express';
import axios from 'axios';
import cors from 'cors';
const app = express();


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions),express.json());
const API_KEY = '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';


app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7,
  };

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].text;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});