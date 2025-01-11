import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import registerUser from "../controllers/auth/registeruser.controller.js";
import loginUser from "../controllers/auth/login.controller.js";
import forgotPasswordEmail from "../controllers/auth/forgotPsaawordEmail.js";
import verifyOtp from "../controllers/auth/verifyOtp.js";
import saveNewPassword from "../controllers/auth/saveNewPassword.js";
const router = Router();

router.route("/signup").post(upload.single("ProfilePicture"), registerUser);
router.route("/login").post(loginUser);
router.route("/forgetpassword/sendemail").post(forgotPasswordEmail)
router.route("/verifyotp").post(verifyOtp)
router.route("/password/restpassword").post(saveNewPassword)
export default router;
