# To-Do List
##  Sobre
Este é um projeto desenvolvido para um processo seletivo no qual disputei a vaga de desenvolvedor. Ele consiste basicamente de uma aplicação web para o gerenciamento de tarefas, o famigerado "to-do list", cujo front foi desenvolvido em React (nenhum framework foi utilizado) e cujo back foi feito em Node com Express, JWT e PostgreSQL.

##  Como rodar
### 1. Clone o repositório para o seu computador

```
git clone https://github.com/vinifoliv/to-do-list.git
```
### 2. Suba um banco de dados PostgreSQL
Para o desenvolvimento, eu utillizei o Docker por achar mais conveniente. Se preferir utilizar um banco próprio ou remoto, certifique-se de corrigir as variáveis de ambiente no arquivo `.env` da API onde for preciso.

```
docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=9572 -e POSTGRES_DB=todo_list -p 5432:5432 -d postgres:latest
```

Essas são as configurações padrões para rodar a aplicação _out of the box_.
`--name postgres`: define o nome do container;
`-e POSTGRES_USER=postgres`: define o nome do usuário;
`-e POSTGRES_PASSWORD=9572`: define a senha;
`-e POSTGRES_DB=todo_list`: define o nome do banco;
`-p 5432:5432`: define as portas para acessar o container;
`postgres:latest`: define que a imagem do PostgreSQL a ser usada deve ser a mais atual.

### 3. Crie as tabelas utilizando o seu cliente (psql, pgAdmin, DBeaver etc.)

Usuários
```
CREATE TABLE usuarios(
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(100)
);
```

Tarefas
```
CREATE TABLE tarefas(
	id SERIAL PRIMARY KEY,
	titulo VARCHAR(30),
	descricao VARCHAR(50),
	vencimento DATE,
	completa BOOLEAN,
	id_usuario INT,
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);
```
No Docker, você pode executar o seguinte comando:

```
docker exec -it postgres psql -U postgres -d todo_list
```
Onde `postgres` é o nome do container, `postgres` (confuso, eu sei) é o usuário e `todo_list` é o nome do banco.
O psql abrirá o REPL do `todo_list`. Feito isso, digitar o SQL acima no terminal e rodar.

### Rodar o projeto
Via terminal, navegue até o repositório do  projeto e aceda ao diretório API. Execute os comandos abaixo. *Observação:* é necessário ter o Node e o npm instalados.

```
npm i # Instala todas as dependências
npm start # Inicia o servidor
```

O servidor já está rodando. Navegue até o diretório raiz e entre em `client`. Execute os seguintes comandos:

```
npm i # Instala as dependências
npm start # Inicia o front
```

Os scripts do React devem abrir uma página no seu navegador com a aplicação. Voilà, você está rodando o projeto!