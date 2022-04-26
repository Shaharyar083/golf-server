const nodemailer = require("nodemailer");

async function sendMail({ receiverEmail, subject, text, html }) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",

      auth: {
        user: "ciitlahore383@gmail.com", // generated ethereal user
        pass: "Abubaker@1234", // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "ciitlahore383@gmail.com", // sender address
      to: receiverEmail, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    return true;
  } catch (err) {
    return false;
  }
}

module.exports = { sendMail };
