const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const getGoldPrice = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.investing.com/commodities/gold');
    
    await page.waitForSelector('[data-test="instrument-price-last"]');
    
    const goldPrice = await page.$eval('[data-test="instrument-price-last"]', el => el.textContent);
    console.log('Cotação obtida:', goldPrice);

    await browser.close();
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
  } catch (error) {
    console.error('Erro ao obter a cotação do ouro na API:', error);
    res.status(500).json({ error: 'Erro ao obter a cotação do ouro' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});