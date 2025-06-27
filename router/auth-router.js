// auth-router.js
import { Router } from "express";
import authcontroller from "../controllers/auth-controller.js";
import authenticate from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/welcome").get(authcontroller.home);
router.route("/register").post(authcontroller.register);
router.route("/login").post(authcontroller.login);
router.get("/get-user-details", authenticate, authcontroller.getUser);

export default router;
