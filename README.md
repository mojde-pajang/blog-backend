# 🧠 Blog Backend – AI-Powered Blog Platform

A scalable, modular backend built with Fastify and TypeScript that supports AI-generated blog content using OpenAI. The system includes JWT authentication, file uploads, and a PostgreSQL database. It’s designed for ease of development, quick deployment, and extensibility.

## 🚀 Overview

This backend allows users to create, manage, and edit blog posts enhanced by AI-generated content from OpenAI. It’s structured to be flexible, readable, and production-ready.

### ✨ Key Features

- 🧾 Blog post creation powered by OpenAI GPT
- 🔐 Secure authentication with JWT & cookies
- 📁 File uploads via multipart support
- 🗃 PostgreSQL with Sequelize ORM
- 🧱 Modular Fastify plugins for scalability
- 📦 Docker support for development and deployment

## 🧰 Technologies

| Category       | Stack / Tool                  |
|----------------|-------------------------------|
| Runtime        | Node.js + TypeScript          |
| Framework      | Fastify                       |
| ORM            | Sequelize                     |
| Database       | PostgreSQL                    |
| Auth           | JWT, Cookies                  |
| AI Integration | OpenAI API                    |
| Dev Tools      | Docker, Nodemon, ts-node      |

## 📁 Project Structure

```
src/
├── controllers/     # Core business logic
├── db/              # DB connection and models init
├── models/          # Sequelize models
├── plugins/         # Fastify plugins (JWT, DB, OpenAI, etc.)
├── routes/          # Route definitions per module
├── types/           # Global/custom types
└── index.ts         # App entry point
```

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/mojde-pajang/blog-backend.git
cd blog-backend
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Add `.env` file

Create a `.env` file in the root with the following keys:

```env
OPENAI_API_KEY=your-openai-key
DATABASE_URL=postgres://username:password@localhost:5432/blogdb
JWT_SECRET=your-secret-key
```

### 4. Run the app

Using Docker:
```bash
docker-compose up --build
```

Or manually:
```bash
yarn dev  # for development with hot reload
```


## 🔮 Future Improvements

- Add rate limiting for AI usage
- Admin panel for content management
- Generate static OpenAPI docs for endpoints
- Testing framework


> 💬 Built by Mojdeh Pajang – using Fastify, TypeScript, and OpenAI to supercharge content workflows.
