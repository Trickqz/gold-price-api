const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); // Importa o middleware CORS

const app = express();
const PORT = process.env.PORT || 3000;

// Usa o middleware CORS
app.use(cors());

// Função para fazer scraping da cotação do ouro usando Puppeteer
const getGoldPrice = async () => {
  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto('https://www.investing.com/commodities/gold');
    
    // Aguarda o elemento que contém o preço
    await page.waitForSelector('.text-5xl\\/9.font-bold.text-\\[\\#232526\\].md\\:text-\\[42px\\].md\\:leading-\\[60px\\]');
    
    // Captura o preço do ouro
    const goldPrice = await page.$eval('.text-5xl\\/9.font-bold.text-\\[\\#232526\\].md\\:text-\\[42px\\].md\\:leading-\\[60px\\]', el => el.textContent);
    console.log('Cotação obtida:', goldPrice); // Log para verificar o preço capturado

    await browser.close();
    return goldPrice;
  } catch (error) {
    console.error('Erro ao obter a cotação do ouro:', error);
    throw error;
  }
};

// Endpoint para retornar a cotação do ouro
app.get('/gold-price', async (req, res) => {
  try {
    const price = await getGoldPrice();
    res.json({ goldPrice: price });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a cotação do ouro' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
