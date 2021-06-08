const nodemailer = require("nodemailer");
const config = require('../config/config.json');

class Mail{
  constructor(conf) {
    //configuration for Mail
    this.conf = conf || {
      host: config.MAIL_HOST,
      port: config.MAIL_PORT,
      secure: false,
      auth: {
        user: '',
        pass: ''
      },
      tls: {
        rejectUnauthorized: false
      }
    };
  }
  async sendMail(content, machineName, nurseName){
    const transporter = await nodemailer.createTransport(this.conf);
    const mailOptions = {
      from: 'Node.Error@cchealth.com',
      to: 'henrik.vahanian@cchealth.com',
      subject: 'XML to JSON',
      text: `${content}`
    };

    await transporter.sendMail(mailOptions, async function(error, info){
      if (error) {
        await logger.error(error);
      } else {
        await logger.log('Email sent: ' + info.response);
      }
    });
  }
}
module.exports = { Mail };
