# PROJETO CRUD DE MEDICAMENTOS | API em Node.js com TypeORM

## 📋 Descrição do Projeto
Esta API permite o gerenciamento de medicamentos com operações CRUD completas. Oferece suporte para listar, filtrar, paginar, criar, atualizar e excluir medicamentos. Foi desenvolvida com Node.js, utilizando o TypeORM para gerenciar o banco de dados relacional, com foco em desempenho, escalabilidade e facilidade de uso.

## 🚀 Funcionalidades
- **CRUD Completo para Medicamentos**:
  - Criação, leitura, atualização e exclusão de medicamentos.
- **Paginação**:
  - Parâmetros de página e limite para controlar os resultados.
- **Filtro por Nome**:
  - Busca de medicamentos com base no nome.
- **Integração com Usuários**:
  - Medicamentos podem ser associados a usuários cadastrados.
- **Arquitetura Simples e Escalável**:
  - Facilidade de manutenção e extensão.

## 💻 Tecnologias Utilizadas
- **Node.js**: Plataforma para desenvolvimento de aplicações backend.
- **Express**: Framework rápido e minimalista para criação de APIs.
- **TypeORM**: ORM para gerenciar entidades e mapeamento relacional.
- **PostgreSQL**: Banco de dados relacional para persistência de dados.
- **TypeScript**: Tipagem estática para maior segurança e previsibilidade.
- **bcrypt**: Hash de senhas para segurança dos usuários.
- **dotenv**: Gerenciamento de variáveis de ambiente.

## 📈 Status do projeto
✅ Concluído

## 📄 Endpoints

### **Usuários**
- **POST /users**: Cria um novo usuário.
- **GET /users**: Lista todos os usuários.
- **GET /users/:id**: Retorna os detalhes de um usuário pelo ID.
- **PUT /users/:id**: Atualiza os dados de um usuário pelo ID.
- **DELETE /users/:id**: Remove um usuário pelo ID.

### **Medicamentos**
- **GET /medicamentos/all**: Lista todos os medicamentos, com suporte a filtros e paginação.
- **GET /medicamentos**: Lista medicamentos associados ao usuário autenticado, com suporte a filtros e paginação.
- **GET /medicamentos/:id**: Retorna detalhes de um medicamento pelo ID.
- **POST /medicamentos**: Cria um novo medicamento.
- **PUT /medicamentos/:id**: Atualiza os dados de um medicamento pelo ID.
- **DELETE /medicamentos/:id**: Remove um medicamento pelo ID.

## 🔍 Exemplos de Requisições

### **GET /medicamentos/all**
Busca todos os medicamentos, com paginação e filtro.

**Query Params**:
- `page`: Número da página (padrão: 1).
- `limit`: Itens por página (padrão: 10).
- `nome`: Filtro pelo nome do medicamento (opcional).