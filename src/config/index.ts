import dotenv from "dotenv"
import { env } from "process"

dotenv.config({quiet: true})
const config={
    port: env.PORT,
    database_url: env.DATABASE_URL as string,
    role_env: env.NODE_ENV as string,
    jwt_secret: env.JWT_SECRET as string,
}

export default config;