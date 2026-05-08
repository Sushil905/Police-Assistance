const express = require('express');
const axios = require('axios');

const router = express.Router();

const NEWS_API_KEY = process.env.GNEWS_API_KEY || '8336ee92f3a8a331f5412fafc27ba6db';

const newsQueries = {
  maharashtra: {
    q: 'Maharashtra police crime safety',
    country: 'in',
  },
  india: {
    q: 'India police crime safety emergency',
    country: 'in',
  },
  world: {
    q: 'world police crime cyber security safety',
  },
};

router.get('/news/:region', async (req, res) => {
  const query = newsQueries[req.params.region];

  if (!query) {
    return res.status(404).json({ message: 'News region not found' });
  }

  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: query.q,
        lang: 'en',
        country: query.country,
        max: 10,
        apikey: NEWS_API_KEY,
      },
    });

    return res.json(response.data.articles || []);
  } catch (error) {
    console.error('News fetch failed:', error.response?.data || error.message);
    return res.status(500).json({ message: 'News fetch failed' });
  }
});

module.exports = router;
