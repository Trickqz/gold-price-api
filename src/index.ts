import express, { Request, Response } from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

console.log('Iniciando aplicação...');
console.log(`Porta configurada: ${PORT}`);

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  console.log('Acessando rota raiz /');
  res.json({ 
    status: 'online',
    message: 'API está funcionando!',
    timestamp: new Date().toISOString()
  });
});

app.get('/test', (req: Request, res: Response) => {
  res.json({ message: 'Rota de teste funcionando!' });
});

const getGoldPrice = async (): Promise<string> => {
  try {
    console.log('Iniciando busca do preço do ouro...');
    const response = await axios.get('https://www.investing.com/commodities/gold');
    const html = response.data;
    const $ = cheerio.load(html);

    const goldPrice = $('.text-5xl\\/9.font-bold.text-\\[\\#232526\\].md\\:text-\\[42px\\].md\\:leading-\\[60px\\]').text();
    console.log('Preço encontrado:', goldPrice);

    return goldPrice || 'Preço não encontrado';
  } catch (error) {
    console.error('Erro ao obter a cotação do ouro:', error);
    throw error;
  }
};

app.get('/gold-price', async (req: Request, res: Response) => {
  console.log('Acessando rota /gold-price');
  try {
    const price = await getGoldPrice();
    console.log('Retornando preço:', price);
    res.json({ goldPrice: price });
  } catch (error) {
    console.error('Erro na rota /gold-price:', error);
    res.status(500).json({ 
      error: 'Erro ao obter a cotação do ouro',
      details: (error as Error).message 
    });
  }
});

app.use((req: Request, res: Response) => {
  console.log(`Rota não encontrada: ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Timestamp de início: ${new Date().toISOString()}`);
}); 