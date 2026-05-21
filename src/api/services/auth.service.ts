import { sql } from "../../db";
import type { RUser, User } from "../../types";
import bcrypt from "bcrypt";

class AuthService {
  async createUser(user: RUser & { password: string }) {
    const { name, email, role, password } = user;
    const hash = await bcrypt.hash(password, 10);
    const res = await sql`
      INSERT INTO users (name, email, password_hash,role)
      VALUES (${name}, ${email}, ${hash}, COALESCE(${role}, 'user'))
      RETURNING id, name, email, role, created_at, updated_at
      `;
    return res[0];
  }

  async validateUser(email: string, password: string) {
    const res = await sql`
    SELECT id, name, email, password_hash, role, created_at, updated_at FROM users WHERE email = ${email}
    `;
    if (!res.length) {
      return null;
    }
    const { password_hash, ...user } = res[0] as User;
    const isvalid = await bcrypt.compare(password, password_hash);
    return isvalid ? user : null;
  }

  async getUserById(id:string){
    const res= await sql`
    SELECT id, name, email, role FROM users WHERE id = ${id}
    `
    return res[0] as RUser & {id: number} 
  }
}

export default new AuthService();
