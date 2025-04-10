'use server';
import nodemailer from 'nodemailer';
const SMTP_SERVER_HOST = process.env.SMTP_SERVER_HOST;
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECIEVER = process.env.SITE_MAIL_RECIEVER;
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: SMTP_SERVER_HOST,
  // port: 587,
  // port:25,
  port: 465,
  secure: false,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    const isVerified = await transporter.verify();
  } catch (error) {
    console.error('Something Went Wrong', SMTP_SERVER_USERNAME, SMTP_SERVER_PASSWORD, error);
    return;
  }
  const recipients = (sendTo ?? SITE_MAIL_RECIEVER ?? '').split(',').map(email => email.trim());

  const promises = recipients.map(recipient => {
    return transporter.sendMail({
      from: email,
      to: recipient,
      subject: subject,
      text: text,
      html: html ? html : '',
    })
    .then(info => {
      console.log('Message Sent', info.messageId);
      console.log('Mail sent to', recipient);
    })
    .catch(error => {
      console.error('Error sending mail to', recipient, error);
    });
  });
  
  await Promise.all(promises);
  
  return { message: 'Mails sent successfully to all recipients' };
}