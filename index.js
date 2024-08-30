const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const getGoldPrice = async () => {
  try {
    const response = await axios.get('https://www.investing.com/commodities/gold');
    const html = response.data;
    const $ = cheerio.load(html);

    const goldPrice = $('.text-5xl\\/9.font-bold.text-\\[\\#232526\\].md\\:text-\\[42px\\].md\\:leading-\\[60px\\]').text();

    return goldPrice;
  } catch (error) {
    console.error('Erro ao obter a cotação do ouro:', error);
    throw error;
  }
};

app.get('/gold-price', async (req, res) => {
  try {
    const price = await getGoldPrice();
    res.json({ goldPrice: price });
    console.log("cotação: " + JSON.stringify(price));
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a cotação do ouro' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
