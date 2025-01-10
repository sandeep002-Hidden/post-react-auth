import prisma from "../../prisma/prisma.js";
import bcrypt from "bcrypt";
import { generateAccessAndRefreshToken } from "../../utills/generateToken.js";

export default async function loginUser(req, res) {
  try {
    const { cred, password } = req.body;

    if (!cred || !password) {
      return res.status(400).json({
        message: "Email/Username and password are required.",
        success: false,
      });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ Email: cred }, { UserName: cred }],
      },
    });

    if (!existingUser) {
      return res.status(401).json({
        message: "No User Exists with this Email or UserName",
        success: false,
      });
    }
    const isValidUserPassword = await bcrypt.compare(
      password,
      existingUser.Password
    );

    if (!isValidUserPassword) {
      return res.status(401).json({
        message: "Wrong password",
        success: false,
      });
    }

    const tokens = await generateAccessAndRefreshToken(existingUser.id);

    if (!tokens.success) {
      return res.status(500).json({
        message: tokens.message,
        success: false,
        _id: existingUser.id,
      });
    }

    const { accessToken, refreshToken } = tokens;

    return res
      .status(200)
      .cookie("StellerForgeAccessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 1000, // 15 days
      })
      .cookie("StellerForgeRefreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 15 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        message: "Login Successful",
        success: true,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
