import nodemailer from "nodemailer";
import ENV from "../config/env";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: ENV.MAIL_USER, // tu correo
    pass: ENV.MAIL_PASS, // contraseña de aplicación (no la normal)
  },
});
