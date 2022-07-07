
##  Store Manager


Store manager é uma API RESTful de um sistema de gerenciamento de vendas no formato dropshipping, capaz de Criar, Visualizar, Deletar e Atualizar produtos e vendas.

Esta api foi construída utilizando a arquitetura MSC (model-service-controller).

A gestão de dados é  feita através do banco Mysql.

Os testes unitários foram realizados utilizando Mocha, Chai, Chai-as-promised e Sinon.

![swagger](https://user-images.githubusercontent.com/91437516/177688055-b12709cf-bc49-43ab-a003-e83bafd3ed45.png)


## Funcionalidades

- Listar todos os produtos
- Cadastrar produtos 
- Buscar produtos pelo id
- Buscar produtos pelo nome
- Editar produtos
- Deletar produtos


- Listar vendas
- Cadastrar vendas
- Buscar vendas pelo id
- Editar vendas pelo id
- Deletar vendas pelo id


## 🛠️ Instalação

Clone o repositório

```bash
  git clone git@github.com:GabrielPesch/Store-Manager.git
```

Entre na pasta do repositório

```bash
  cd Store-Manager
```

Instale as dependências **[Caso existam]**

```bash
  npm install
```
    
## 🐳 Rodando no Docker vs Localmente

### 👉 Com Docker

Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior

```bash
  Rode os serviços node e db com o comando docker-compose up -d
```
- Lembre-se de parar o mysql se estiver usando localmente na porta padrão (3306), ou adapte, caso queria fazer uso da aplicação em containers;
- Esses serviços irão inicializar um container chamado store_manager e outro chamado store_manager_db;
- A partir daqui você pode rodar o container store_manager via CLI ou abri-lo no VS Code.

```bash
   Use o comando docker exec -it store_manager bash
```
Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

```bash
   Instale as dependências [Caso existam] com npm install
```

Atenção: Caso opte por utilizar o Docker, TODOS os comandos disponíveis no package.json (npm start, npm test, npm run dev, ...) devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec citado acima.

### 👉 Sem Docker

 ⚠️ Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

 ⚠️ Não esqueça de renomear/configurar o arquivo .env.example para .env.

 ⚠️ Para rodar o projeto desta forma, obrigatoriamente você deve ter o Node.js instalado em seu computador.

 A versão do Node.js e NPM a ser utilizada é "node": ">=16.0.0" e "npm": ">=7.0.0", como descrito a chave engines no arquivo package.json
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

  `MYSQL_HOST`

  `MYSQL_USER`

  `MYSQL_PASSWORD`

  `MYSQL_DATABASE`

  `PORT=3000`

Caso opte por uma configuração padrão basta **renomear** o arquivo `dot.env.example` para `dot.env`



## 🧪 Rodando os testes

Para rodar os testes, execute o seguinte comando

```bash
  npm run test
```

## 📚 Banco de dados

![erStoreManager](https://user-images.githubusercontent.com/91437516/177698486-ac91f11d-8ff9-4cfc-930b-3399da08b6b5.png)

### O banco de dados possui 3 tabelas:

- A tabela products, com os atributos id e name;
- A tabela sales, com os atributos id e date;
- A tabela sales_products, com os atributos sale_id, product_id e quantity;

#### ⚠️ Para criar o banco de dados:

```bash
  npm run migration
```

#### ⚠️ Para LIMPAR E REPOPULAR o banco de dados:

```bash
  npm run seed
```

## 📖 Documentação da API

A documentação pode ser vista utilizando o Swagger através da rota: 

```bash
  http://localhost:3000/api-docs/
```

### Métodos

As requisições para a API devem seguir os padrões:

| Método | Descrição                                             |
|--------|-------------------------------------------------------|
| GET    | Retorna informações de um ou mais registros.          |
| POST   | Utilizado para criar um novo registro.                |
| PUT    | Atualiza dados de um registro ou altera sua situação. |
| DELETE | Remove um registro do sistema.                        |


### Respostas

| Código | Descrição                                                 |
|--------|-----------------------------------------------------------|
| 200    | OK: Requisição executada com sucesso.                     |
| 201    | Created: Criado um novo registro.                         |
| 204    | No Content: Registro removido.                            |
| 400    | Bad Request: Dados de acesso inválidos.                   |
| 404    | Not Found: Registro não encontrado.                       |
| 422    | Unprocessable Entity: Dados fora do escopo predeterminado |
| 500    | Internal server error.                                    |


## Group Products

### /products
  Os produtos possuem `id` e `none`
  
>**Listar (listAll) [GET]**
>
> - Response 200 (application/json) - ok
>
> ```bash
>  [
>   {
>     "id": 0,
>     "name": "string"
>   }
> ]
> ```
>
> - Response 200 (application/json) - Bad request: "name" is required
>
> ```bash
> Bad request: "name" is required
> ```

> **Novo (add) [POST]**
>
> A requisição espera que seja passado um `Objeto` com a chave `name`(string, required, min[5]) em seu corpo:
>
> ```
> {
>   "name": "ProdutoX"
> } 
> ```
> - Response 201 (application/json) - Created
>
> ```
> {
>   "id": 0,
>   "name": "string"
> }
> ```
>
> - Response 400 (application/json) - Bad request: "name" is required
>
> ```bash
> Bad request: "name" is required
> ```
> 
> - Response 422 (application/json) - Unprocessable Entity: "name" length must be at least 5 characters long
>
> ```bash
> Bad request: "name" is required
>
>```

### /products/search

>**Encontrar (getByName) [GET]**
>
> A requisição espera que seja passado uma `query` como parametro:
>
> ```
> {
> Exemplo de url esperada: `"/products/search?q=Martelo`
> } 
> ```
> > - Response 200 (application/json) - OK
>
> ```
> [
>   {
>     "id": 0,
>     "name": "string"
>   }
> ]
> ```

### /products/:id

>**Encontrar (getById) [GET]**
>
> A requisição espera que seja passado um `id` como parametro:
>
>  - Response 200 (application/json) - OK
>  
> ```
> {
>  "id": 0,
>  "name": "string"
> }
> ```
>  - Response 404 (application/json) - Not found: Product not found

>**Editar (edit) [PUT]**
>
> A requisição espera que seja passado um `id` como parametro:
>
>  - Response 200 (application/json) - OK
>  
> ```
> {
>  "id": 0,
>  "name": "string"
> }
> ```
>  - Response 404 (application/json) - Not found: Product not found

>**Deletar (remove) [delete]**
>
> A requisição espera que seja passado um `id` como parametro:
>
>  - Response 204 (application/json) - No content
>  
>  - Response 404 (application/json) - Not found: Product not found


## Group Products

### /sales

  As vendas possuem  `date`, `sale_id`, `product_id` e `quantity`.
  
>**Listar (listAll) [GET]**
>
> - Response 200 (application/json) - ok
>
> ```bash
> [
>   {
>    "date": "string",
>    "productId": 0,
>    "quantity": 0
>   }
> ]
> ```
>
> - Response 404 (application/json) - Not found: Sale not found
>

> **Novo (add) [POST]**
>
> A requisição espera que seja passado um `Array` de `Objetos` no seguinte formato:
>
> ```
>  [
>    {
>      "productId": 1,
>      "quantity": 1
>    },
>    {
>      "productId": 2,
>      "quantity": 5
>    }
>  ]
> ```
>> - productId: Required, number, integer, positive
>> - quantity: Required, number, integer, greater than 0
> 
> - Response 201 (application/json) - Created
>
> ```
>  {
>    "id": 0,
>    "itemsSold": [
>      {
>        "productId": 0,
>        "quantity": 0
>      }
>    ]
>  }
> ```
> - Response 400 (application/json) - Bad request: "productId" || "quantity" is required
>
> - Response 404 (application/json) - Not Found: Sale not found
> 
> - Response 422 (application/json) - Unprocessable Entity: "quantity" must be greater than or equal to 1


### /sales/:id

>**Encontrar (getById) [GET]**
>
> A requisição espera que seja passado um `id` como parametro:
>
>  - Response 200 (application/json) - OK
>  
> ```
>  [
>    {
>      "date": "string",
>      "productId": 0,
>      "quantity": 0
>    }
>  ]
> ```
>  - Response 404 (application/json) - Not found: Product not found

>**Editar (edit) [PUT]**
>
> A requisição espera que seja passado um `id` como parametro:
> A requisição espera que seja passado um `Array` de `Objetos` no seguinte formato:
>
> ```
>  [
>    {
>      "productId": 1,
>      "quantity": 1
>    },
>    {
>      "productId": 2,
>      "quantity": 5
>    }
>  ]
> ```
> 
>> - productId: Required, number, integer, positive
>> - quantity: Required, number, integer, greater than 0
> 
>  - Response 200 (application/json) - OK
>  
> ```
>  {
>    "saleId": 0,
>    "itemsUpdated": [
>      {
>        "productId": 0,
>        "quantity": 0
>      }
>    ]
>  }
> ```
>  - Response 404 (application/json) - Not found: Product not found

>**Deletar (remove) [delete]**
>
> A requisição espera que seja passado um `id` como parametro:
>
>  - Response 204 (application/json) - No content
>  
>  - Response 404 (application/json) - Not found: Product not found


## 🖋️ Autor

- [@Gabriel Pesch](https://github.com/GabrielPesch)
