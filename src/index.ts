import express, { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'API está funcionando!' });
});

const getGoldPrice = async (): Promise<string> => {
  try {
    const response = await axios.get('https://www.investing.com/commodities/gold');
    const html = response.data;
    const $ = cheerio.load(html);

    const goldPrice = $('.text-5xl\\/9.font-bold.text-\\[\\#232526\\].md\\:text-\\[42px\\].md\\:leading-\\[60px\\]').text();

    return goldPrice || 'Preço não encontrado';
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
    console.error('Erro na rota /gold-price:', error);
    res.status(500).json({ error: 'Erro ao obter a cotação do ouro' });
  }
});

app.use((_: Request, res: Response) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando`);
}); 