 import express, { type Application, type Request, type Response } from "express"
import { globalErrorHandler } from "./middleware/globalErrorHandler";
const app: Application = express();
import authRoutes from "./api/routers/auth.route"
import issuesRoutes from "./api/routers/issues.route";


app.use(express.json())

app.get("/", (req: Request, res: Response) => {
   res.send("DevPulse API Running");
});
app.use(("/api/auth"),authRoutes)
app.use(("/api/issues"),issuesRoutes)
app.use(globalErrorHandler)
export default app;