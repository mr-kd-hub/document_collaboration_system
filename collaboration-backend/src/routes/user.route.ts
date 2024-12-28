import { Router } from "express"
import * as userService from "../service/user.service";
const router = Router(); // Create a new Router instance

router.post('/sign-in',  userService.SignIn);
router.post('/sign-up',  userService.SignUp);

export default router