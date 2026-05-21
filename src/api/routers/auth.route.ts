import { Router } from "express";
import signUp, { login } from "../controllers/auth.controller";
import { auth } from "../../utility/auth";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);

export default router;
