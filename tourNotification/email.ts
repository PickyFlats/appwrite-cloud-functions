import nodemailer from "nodemailer";
// import sgTransport from "nodemailer-sendgrid-transport";
const transporter = nodemailer.createTransport({
  host: "s605.fra8.mysecurecloudhost.com",
  // host: "mail.itsbohara.com",
  port: 587,
  auth: {
    user: "pickyflats@itsbohara.com",
    pass: "SMPT_EMAIL_PASSWORD",
  },
});

export const sendEmailNotification = async (to, subject, template) => {
  const mailOptions = {
    from: "PickyFlats <pickyflats@itsbohara.com>",
    to: to,
    subject: subject,
    html: template,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
