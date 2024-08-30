# API de Cotação do Ouro

Esta API permite obter a cotação atual do ouro utilizando dados extraídos do site Investing.com.

## Link da Api Online pelo Railway
```bash
https://gold-price-api-production.up.railway.app/gold-price
```

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para o JavaScript no lado do servidor.
- **Express**: Framework web rápido e minimalista para Node.js.
- **Axios**: Cliente HTTP baseado em Promises para fazer requisições HTTP.
- **Cheerio**: Biblioteca de raspagem de dados que fornece uma API rápida e flexível para manipulação e análise de HTML.

## Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/tTrickqz/gold-price.git
```
2. **Navegue até o diretório do projeto:**
```bash
cd api-cotacao-ouro
```
3. **Instale as dependências:**
```bash
npm install
```  
## Como Usar

1. **Inicie o servidor:**
```bash
npm start
```
- O servidor estará rodando na porta 3000 ou na porta definida pela variável de ambiente PORT.

2. **Faça uma requisição para obter a cotação do ouro:**
- Rota: /gold-price
- Método: GET

Exemplo de Requisição:
   ```bash
GET http://localhost:3000/gold-price
```
Exemplo de Resposta:
   ```bash
{
    "goldPrice": "Preço atual do ouro"
}
```
## Estrutura do Projeto

index.js: Arquivo principal que configura o servidor e define as rotas.<br>
package.json: Contém as informações do projeto e as dependências necessárias.

## Contribuição

Sinta-se à vontade para abrir issues e enviar pull requests. Toda contribuição é bem-vinda!
