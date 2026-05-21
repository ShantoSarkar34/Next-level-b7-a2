# 📌 DevPulse – Backend API

A role-based issue tracking system built with Node.js, Express, TypeScript, PostgreSQL (NeonDB), and JWT authentication.

# 🚀 DevPulse – Issue Tracker API

![Node](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-NeonDB-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

---

## 📌 Overview

**DevPulse** is a secure backend API for an internal issue tracking system.  
It allows teams to report bugs, request features, and manage workflow using role-based access control (RBAC).

Built with **TypeScript, Express, PostgreSQL (NeonDB), and raw SQL queries**.

---

## 🌐 Live API

👉 Base URL: `YOUR_DEPLOYED_URL`

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- TypeScript (Strict Mode)
- PostgreSQL (NeonDB)
- JWT Authentication
- bcrypt Password Hashing
- Raw SQL (pg / neon serverless)

---

## 👥 User Roles

| Role           | Permissions                                        |
| -------------- | -------------------------------------------------- |
| 👤 Contributor | Create issues, view issues, update own open issues |
| 🛡️ Maintainer  | Full access: update/delete any issue               |

---

## 🔐 Authentication Flow

Signup → Login → JWT Token → Authorization Header → Protected Routes

### Header Format

Authorization: YOUR_JWT_TOKEN

---

# 📡 API Documentation

---

## 🔐 AUTH ROUTES

### 🧾 Register User

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | `/api/auth/signup` |

### Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "contributor"
}
```

### Response

```
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "contributor"
  }
}
```

### 🔑 Login User

| Method | Endpoint          |
| ------ | ----------------- |
| POST   | `/api/auth/login` |

### Request Body

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

### Response

```
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {
      "id": 1,
      "name": "John Doe",
      "role": "contributor"
    }
  }
}
```

---

# 🐞 ISSUES ROUTES

### ➕ Create Issue

| Method | Endpoint      | Auth |
| ------ | ------------- | ---- |
| POST   | `/api/issues` | Yes  |

### Body

```
{
  "title": "Database timeout issue",
  "description": "Database slows down under load",
  "type": "bug"
}
```

### 📥 Get All Issues

| Method | Endpoint      | Auth |
| ------ | ------------- | ---- |
| GET    | `/api/issues` | No   |

### Query Params

- sort = newest | oldest
- type = bug | feature_request
- status = open | in_progress | resolved

---

### 🔍 Get Single Issue

| Method | Endpoint          |
| ------ | ----------------- |
| GET    | `/api/issues/:id` |

### ✏️ Update Issue

| Method | Endpoint          | Auth |
| ------ | ----------------- | ---- |
| PATCH  | `/api/issues/:id` | Yes  |

#### Rules:

- Maintainer → full access
- Contributor → only own open issues

---

### 🗑️ Delete Issue

| Method | Endpoint          | Auth            |
| ------ | ----------------- | --------------- |
| DELETE | `/api/issues/:id` | Maintainer only |

---


# 🗄️ DATABASE SCHEMA

## Users Table

```
id SERIAL PRIMARY KEY
name VARCHAR(100)
email VARCHAR(255) UNIQUE
password_hash TEXT
role VARCHAR(30)
created_at TIMESTAMP
updated_at TIMESTAMP
```

## Issues Table

```
id SERIAL PRIMARY KEY
title VARCHAR(150)
description TEXT
type VARCHAR(30)
status VARCHAR(30)
reporter_id INTEGER
created_at TIMESTAMP
updated_at TIMESTAMP
```

---

# 📁 PROJECT STRUCTURE

```
src/
├── api/
│   ├── controllers/
│   ├── routers/
│   └── services/
├── config/
├── db/
├── middleware/
├── types/
├── utility/
├── app.ts
└── index.ts
```

---

# ✨ FEATURES

- JWT Authentication
- Role-based Authorization
- Issue Tracking System
- Filtering & Sorting
- PostgreSQL Integration
- Secure Password Hashing
- Modular Architecture
- Clean TypeScript Structure

# 👨‍💻 AUTHOR

### Md Shanto Sarkar

- GitHub: https://github.com/ShantoSarkar34/
- LinkedIn: https://www.linkedin.com/in/shanto9070/
- Portfolio: https://shanto9070.vercel.app
