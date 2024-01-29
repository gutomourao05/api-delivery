# API-Delivery

Para fins de portifólio backend.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#Funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)

## Visão Geral

Uma API RESTful para um serviço de entrega que permite a criação de usuários, cadastro de itens, login com autenticação por token, criação de endereços relacionados aos usuários e criação de pedidos associados a usuários e endereço. (Sistema de pagamento será implementado em breve)

## Funcionalidades
 - Criação de Usuário: Rota para registro de novos usuários na plataforma.
 - Cadastro de Itens: Funcionalidade para adicionar itens disponíveis para pedidos.
 - Login com Autenticação de Token: Sistema de autenticação utilizando tokens para acesso seguro às rotas protegidas.
 - Criação de Endereços com Relacionamento: Capacidade de vincular múltiplos endereços a um usuário.
 - Criação de Pedidos com Relacionamentos: Possibilidade de criar pedidos associados a um usuário e endereço específico.


## Tecnologias Utilizadas

- Node
- Express
- Prisma
- Bcrypt
- Jsonwebtoken
- Yup
- Multer
- Typescript

## Instalação

```bash
# NPM
## Clone o repositório
git clone https://github.com/gutomourao05/api-delivery

## Entre na pasta
cd api-delivery

## instale as dependencias
npm install

## inicie o servidor
npm dev

# YARN
## Clone o repositório
git clone https://github.com/gutomourao05/api-delivery

## Entre na pasta
cd api-delivery

## instale as dependencias
yarn install

## inicie o servidor
yarn dev