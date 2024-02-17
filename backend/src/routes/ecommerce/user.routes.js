import {Router} from "express";
import { registerUser, loginUser, getCurrentUser } from "../../controllers/ecommerce/user.controller.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current-user").get(verifyJWT, getCurrentUser)

export default router;

