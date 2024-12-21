import nodemailer from "nodemailer"
import config from "../config/default.mjs"
export default async (targetEmail, subject, content) => {
  try {
    const transport = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: config.email.user,
        pass: config.email.password,
      },
    })

    await transport.sendMail({
      from: {
        name: config.email.senderName,
        address: config.email.user,
      },
      to: targetEmail,
      subject: subject,
      html: content,
    })
    console.log("Email sent successfully")
  } catch (error) {
    console.log("Error while sending email")
    console.log(error)
  }
}
