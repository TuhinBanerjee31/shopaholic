import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //HASHED TOKEN CREATION
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    //SETTING HASHEDTOKEN ACCORDING TO NEED
    if (emailType === "VERIFICATION") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 600000,
      });
    } else if (emailType === "PASSWORD_RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 600000,
      });
    }

    //MAILTRAP SERVICE SETUP
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    //EMAIL TEMPLATE
    const mailTemplate = {
      from: "tuhin.devtest@gmail.com",
      to: email,
      subject:
        emailType === "VERIFICATION"
          ? "Verify your account"
          : "Reset your account password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verify?token=${hashedToken}">here</a> to ${
        emailType === "VERIFICATION"
          ? "verify your account"
          : "reset your account password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verify?token=${hashedToken}</p>`,
    };

    //SHOOT MAIL
    const mailResponse = await transport.sendMail(mailTemplate);
    return mailResponse;

  } catch (error: any) {
    console.log("ERROR FROM MAILER :", error.message);
  }
};
