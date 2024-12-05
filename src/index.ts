import express, { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

const getGoldPrice = async (): Promise<string> => {
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

app.get('/gold-price', async (_: Request, res: Response) => {
  try {
    const price = await getGoldPrice();
    res.json({ goldPrice: price });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a cotação do ouro' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 