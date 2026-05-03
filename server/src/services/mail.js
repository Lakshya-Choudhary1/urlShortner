import nodemailer from "nodemailer";
import {
  NODEMAILER_FROM_EMAIL,
  NODEMAILER_PASS
} from "../config/config.js";
import {
  emailVerificationTemplate,
  sendforgotPasswordLinkEmailTemplate
} from "./mail/templete.js";

// Create transporter once globally
const transporter = nodemailer.createTransport({
  
  service:"gmail",

  auth: {
    user: NODEMAILER_FROM_EMAIL,
    pass: NODEMAILER_PASS
  },

});


export const sendEmailVerification = async (to, otp) => {
  try {
    const res = await transporter.sendMail({
      from: NODEMAILER_FROM_EMAIL,
      to,
      subject: "Email Verification",
      html: emailVerificationTemplate(otp)
    });

    console.log("Verification Email Sent:", res.response);
  } catch (err) {
    console.log("Error sending verification email:", err);
  }
};

export const sendforgotPasswordLinkEmail = async (to, link) => {
  try {
    const res = await transporter.sendMail({
      from: NODEMAILER_FROM_EMAIL,
      to,
      subject: "Password Reset",
      html: sendforgotPasswordLinkEmailTemplate(link)
    });

    console.log("Reset Email Sent:", res.response);
  } catch (err) {
    console.log("Error sending reset email:", err);
  }
};