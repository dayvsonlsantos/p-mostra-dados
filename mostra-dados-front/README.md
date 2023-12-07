
![Frame 8](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/5932f686-6f03-4b96-a14f-7dcde87ae0f9)

<h4 align="center"> 
	Mostradados
</h4>

<p align="center">
 <a href="#-Sobre">Sobre</a> •
 <a href="#-Sobre">Instação</a> •
 <a href="#-Sobre">Ajustes</a> •
 <a href="#-Sobre">Iniciar o Dashboard</a> •
 <a href="#-Sobre">Iniciar o Dashboard com Docker</a> •
 <a href="#-Funcionalidades">Funcionalidades</a> •
 <a href="#-Funcionalidades">Funcionamento</a> •
 <a href="#-Modelo-de-Desenvolvimento">Modelo de Desenvolvimento</a> • 
 <a href="#-Tecnologias">Tecnologias</a> • 
 <a href="#-Design">Design</a> • 
 <a href="#-Autores">Autores</a> • 
 <a href="#-Licença">Licença</a>
</p>


## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Sobre

O Mostradados é um aplicação web responsiva desenvolvida para ser integrada à plataforma da empresa Di2win. Trata-se de um aplicação Dashboard, para solução de um desafio real proposto pela empresa: Desenvolver um dashboard para o portal de prova de conceito (POC).

Projeto desenvolvido para a conclusão da **residência de software** com a **Di2win**, proporcionada pelo programa **Embarque Digital**, da **prefeitura do Recife**, juntamente com a **Faculdade Senac PE**, em 2023..

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Instalação

No terminal:

```bash
$ npm install
```

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Ajustes

Altere a URL da API em src/environments/environment.ts e também em src/environments/environment.prod.ts para a do backend.

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Iniciar o Dashboard

Após fazer os ajustes acima, acesse o terminal e execute:

```bash
$ ng serve
```
Acesse `http://localhost:4200/` para abrir o dashboard.

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Iniciar o Dashboard com Docker

No terminal...

### Configurar os requisitos do Dockerfile:
```bash
$ make file
```

### Iniciar o docker-compose:
```bash
$ make up
```

### Parar o docker-compose:
```bash
$ make stop
```

### Parar tudo relacionado ao contêiner e apagar sua imagem:
```bash
$ make kill
```

### Executar make stop e make kill:
```bash
$ make down
```

### Executar make stop e make kill, e em seguida, reiniciar o docker-compose:
```bash
$ make remake
```

### Parar e reiniciar o docker-compose:
```bash
$ make edit
```


## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Funcionalidades

- [x] Ao abrir o website (`http://localhost:4200/`) em um navegador, o usuário poderá:
	  
   - [x] Navegar pela tela inicial da plataforma, visualizando os gráficos padrões do dashboard.
   - [x] Acessar a página de favoritos no menu lateral
 
   - [x] Na página de favoritos, o usuário pode: 
   
      - [x] Gerar novos gráficos;
      - [x] Selecionar os itens/colunas que deseja no gráfico (1 ou 2 itens/colunas)
      - [x] Escolher o tipo do gráfico:
          - [x] Se selecionar apenas 1 items:
              - [x] Valor Único
          - [x] Se selecionar 2 itens:
              - [x] Pizza, Barras, Barras Horizontais, Linha, Área ou Dispersão.
      - [x] Aplicar filtros:
          - [x] Período: Data Inicial e Data Final
          - [x] Agregação: Contar, Somar ou Média
          - [x] Agrupamento: Dia, Mês ou Ano
          - [x] Nome de Usuário
          - [x] Tipo de Segmento
          - [x] Tipo de Documento
      - [x] Limpar filtro
      - [x] Apagar o gráfico (**Obs:** Somente altera no banco de dados, se clicar em 'salvar', em seguida).
      
   - [x] Ao clicar no botão salvar, as configurações de favorito, daquele gráfico, será enviado ao banco de dados.

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Funcionamento

- [x] Tanto em Dashboard quanto Favoritos, as consultas são feitas no banco de dados e apresentadas na tela.
- [x] Ao clicar em 'Favoritos', no menu lateral, será carregado a página com os gráficos favoritos;
- [x] Os gráficos favoritos são aqueles que o usuário fez a sua personalização, são carregados sempre ao acessar essa opção no menu;
- [x] Ao clicar no botão 'editar', poderá alterar o gráfico, selecionando;
    - [x] As colunas desejadas, um ou dois itens/colunas;
    - [x] Selecionar uma consulta pronta (usuada para os gráficos de Valor Único);
    - [x] Aplicar os filtros desejados (informado logo acima em **funcionalidades**)
- [x] Ao clicar no botão 'salvar', será enviado a configuração para o banco;
- [x] Ao clicar no botão 'sair', o usuário poderá deslogar (**funcionalidade a ser implementada**);

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Tecnologias

#### **Website**  
-   **[Angular](https://angular.io/)**
-   **[Angular CLI](https://angular.io/cli)**
-   **[Angular Animations](https://angular.io/guide/animations)**
-   **[Angular Material](https://material.angular.io/)**
-   **[Angular Forms](https://angular.io/guide/forms-overview)**
-   **[Angular Router](https://angular.io/api/router)**
-   **[Bootstrap](https://getbootstrap.com/)**
-   **[Apache Echarts](https://echarts.apache.org/en/index.html)**   
-   **[RxJS](https://rxjs.dev/)**

> Veja o arquivo  [package.json](https://github.com/dayvsonlsantos/p-mostra-dados/blob/main/mostra-dados-front/package.json)


#### **Server**

-   **[Nest.js](https://nestjs.com/)**
-   **[TypeORM](https://docs.nestjs.com/recipes/sql-typeorm)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[Postgres](https://www.postgresql.org/)**
-   **[RxJS](https://rxjs.dev/)**
-   **[ESLint](https://eslint.org/)**
-   **[dotENV](https://github.com/motdotla/dotenv)**

> Veja o arquivo  [package.json](https://github.com/dayvsonlsantos/p-mostra-dados/blob/main/mostra-dados-back/package.json)


#### **Banco de Dados**
- **[Postgres](https://www.postgresql.org/)**

- Estrutura do banco
  - [x] Nome do Banco de dados: db_mostra_dados
  - Tabelas:
      - [x] data
          - Colunas:
            - [x] id (bigint, primary key)
            - [x] cardValueID (character varying, 100)
            - [x] chartType (character varying, 30)
            - [x] selectedOptions (text)
            - [x] startDate (date)
            - [x] endDate (date)
            - [x] aggregate (character varying, 30)
            - [x] timeGrouping (character varying, 30)
            - [x] specificFilter (text)
            - [x] user_id (bigint, foreign key)
      - [x] extracts
          - Colunas:
            - [x] id (int, primary key)
            - [x] created_at (timestamp)
            - [x] pages_process (bigint)
            - [x] doc_type (character varying, 100)
            - [x] user_id (bigint, foreign key)
      - [x] users
          - Colunas:
            - [x] id (bigint, primary key)
            - [x] name (character varying, 200)
            - [x] segment (character varying, 50)

#### **Utilitários**

-   Protótipo:  **[Figma](https://www.figma.com/)**  →  **[Protótipo (Mostradados)](https://www.figma.com/proto/h5g66vqrcrzMdMU34C6AQg/Di2win---Dashboard?page-id=5%3A238&type=design&node-id=23-71&viewport=-37215%2C-19796%2C4.47&t=RAzbWXczbov70fpH-1&scaling=scale-down&starting-point-node-id=23%3A71&mode=design)**
-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   Teste de API:  **[Postman](https://www.postman.com/)**
-   Organização dos Product backlog:  **[Trello](https://trello.com/)**

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Design

### Website

<div align="center">
	<img alt="" src='https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/d01c2051-fc52-4e9c-9e91-44a7c5820d22' style="width: 80%">

  <br/>
  <br/>
  <br/>
 
  <img alt="" src='https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/82cf131a-db5c-4a0a-a6a0-1a970102f3a4' style="width: 80%">
</div>

### Website em dispositivo Mobile

<div align="center"">
	<img alt="" src='https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/41c40c9d-9ab8-4baf-ad1d-e4b1c387f42e' style="width: 20%">
	<img alt="" src='https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/ae969868-994e-486b-be15-deee27c432bd' style="width: 20%">
  <img alt="" src='https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/2c110a9b-4961-4656-bf60-e32efca9aed2' style="width: 20%">
  <img alt="" src='https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/591fb138-4846-4570-8a99-b43cc693964f' style="width: 20%">
</div>

## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Autores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/dayvsonlsantos">
        <img alt="" style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/102249811?s=400&u=2843e9ff654eb5587f9e6ad6b873fed0b1c0df77&v=4" width="100px;" alt=""/>
        <br />
        <sub><b>Dayvson Lima</b></sub>
   </td>
   
   <td align="center">
      <a href="#">
        <img alt="" style="border-radius: 50%;" src="https://github.com/dayvsonlsantos/p-near-hospital/assets/102249811/a01154cd-50fb-4cad-96e9-c74a1276586b" width="100px;" alt=""/>
        <br />
        <sub><b>Daniel Oliveira</b></sub>
   </td>
   
 </tr>
   
</table>


## ![link](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/16d7c222-81dd-46e5-bb01-94eb7057d0f3) Licença

O projeto se encontra sob a licença [GPLv3](https://github.com/dayvsonlsantos/p-mostra-dados/blob/main/LICENSE).

![Frame 8](https://github.com/dayvsonlsantos/p-mostra-dados/assets/102249811/5932f686-6f03-4b96-a14f-7dcde87ae0f9)
