 import express, { type Application, type Request, type Response } from "express"
const app: Application = express();


app.get("/", (req: Request, res: Response) => {
  console.log("Server running!");
});

export default app;