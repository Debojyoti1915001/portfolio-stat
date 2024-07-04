const express = require('express')
const axios = require('axios')
const router = express.Router()

const assetReturns = {
  'AAPL': 0.10,
  'GOOGL': 0.12,
  'MSFT': 0.08,
  'TSLA': 0.15
};

const calculatePortfolioReturn = (allocation) => {
  let portfolioReturn = 0;
  for (let asset in allocation) {
      if (assetReturns[asset]) {
          portfolioReturn += allocation[asset] * assetReturns[asset];
      } else {
          throw new Error(`Return data for asset ${asset} is not available`);
      }
  }
  return portfolioReturn;
};
router.post('/calculate', (req, res) => {
  const { allocation } = req.body;

  if (!allocation || typeof allocation !== 'object') {
      return res.status(400).send('Invalid allocation data');
  }

  try {
      const portfolioReturn = calculatePortfolioReturn(allocation);
      res.json({ portfolioReturn });
  } catch (error) {
      res.status(400).send(error.message);
  }
});

router.get('/', async (req, res) => {
  res.send("Hi")
});


module.exports = router
