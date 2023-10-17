# API de Aluguel de Carros

Bem-vindo à API da MetriCar, uma aplicação fictícia que simula um serviço de aluguel de carros. Nossa API foi desenvolvida com o objetivo de proporcionar uma experiência simplificada e conveniente para os usuários que desejam alugar carros, fazer reservas e gerenciar informações de cartão de crédito. Embora seja um projeto fictício, a MetriCar oferece um vislumbre de como esses serviços podem ser integrados e operar de forma harmoniosa. Aproveite a exploração e divirta-se conhecendo a MetriCar.

## Tecnologias Utilizadas

- [Node.js](https://nodejs.org/): Ambiente de execução JavaScript do lado do servidor.
- [Express](https://expressjs.com/): Estrutura de aplicativo web para Node.js.
- [Prisma](https://prisma.io/): ORM para interagir com o banco de dados.
- [Zod](https://github.com/colinhacks/zod): Biblioteca para validação de entrada de dados.
- [Tsup](https://github.com/TehShrike/tsup): Empacotador TypeScript para projetos web.
- [Tsx](https://github.com/esbuild-kit/tsx): Lib de execução de typescript.
- [Typescript](https://www.typescriptlang.org/): Libguagem de programação utilizada.

## Configuração do Projeto

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio

2. **Installar Dependências**
    ```npm install
    npm install

3. **Configurar Variáveis de Ambiente**
   ```enomeie o arquivo 
   - .env.example para
   - .env e configure as variáveis de ambiente necessárias,
   - como a configuração do banco de dados.

4. **Executar Aplicação**
   ```Como rodar a Aplicação
   npm run start ou
   npm run start:dev - Atualiza junto com o código
   Para compilar para JS para produção: npm run build
   Rodar em produção: node dist src/server.ts

5. **Sobre o projeto
   ```Explicando o projeto
   A MetriCar API é uma aplicação de aluguel de carros fictícia que demonstra um ambiente de aluguel de carros e gerenciamento de reservas.
   Como parte do projeto, os usuários podem explorar a frota de carros disponíveis, visualizar detalhes dos 
   veículos, verificar a disponibilidade, fazer reservas e gerenciar informações de pagamento por meio de cartões
   de crédito. Embora todos os dados sejam simulados e não haja transações reais, a API oferece uma visão geral de como os principais
   recursos de um serviço de aluguel de carros funcionam em conjunto.

   Os principais componentes da API incluem:

   1. Usuários: Os usuários podem se cadastrar, fazer login e gerenciar suas informações pessoais.
   Eles também podem adicionar detalhes de cartão de crédito para fazer reservas.

   2. Carros: A API inclui uma lista de carros disponíveis para aluguel,
   cada um com informações detalhadas, como nome, preço, quilometragem,
   ano, condição e opções de cores.

   3. Reservas: Os usuários podem fazer reservas de carros específicos,
    escolhendo datas de retirada e devolução. O preço total da reserva é
    calculado automaticamente.

   Embora o projeto seja fictício, ele serve como um exemplo prático de como desenvolver uma aplicação de aluguel de carros com recursos de autenticação de usuários,
   reserva de veículos e gerenciamento de pagamentos. Tenha em mente que todos os
   dados são simulados e não há funcionalidades de pagamento real.
