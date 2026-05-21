import { neon } from "@neondatabase/serverless";
import config from "../config";

export const sql = neon(config.database_url);

export const initDB = async () => {
  await sql`
       CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,

       name VARCHAR(100) NOT NULL,

       email VARCHAR(255) UNIQUE NOT NULL,

       password_hash TEXT NOT NULL,

       role VARCHAR(30) NOT NULL DEFAULT 'contributor'
       CHECK (role IN ('contributor', 'maintainer')),
       
       created_at TIMESTAMP NOT NULL DEFAULT NOW(),
       updated_at TIMESTAMP NOT NULL DEFAULT NOW()
       )
    `;

  await sql`
  CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,

    title VARCHAR(150) NOT NULL
    CHECK (char_length(title) <= 150),

    description TEXT NOT NULL
    CHECK (char_length(description) >= 20),

    type VARCHAR(30) NOT NULL
    CHECK (type IN ('bug', 'feature_request')),

    status VARCHAR(30) NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'resolved')),

    reporter_id INTEGER NOT NULL,
    customar_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
  )
`;

  console.log(`Server is connected with database!`);
};
