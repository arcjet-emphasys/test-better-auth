import nodemailer from "nodemailer";

/*
const transporter = nodemailer.createTransport({
    host: "mx03.emphasys.eu",
    port: 587,
    secure: false, // Use true for port 465, false for port 587
    auth: {
        user: "no-reply@hockey-scheidsrechter.nl",
        pass: "jn7jnAPss4f63QBp6D",
    },
});
*/
// Create ONE transporter instance and reuse it throughout your application.
// The transporter manages up to `maxConnections` persistent connections internally.
const transporter = nodemailer.createTransport({
    host: "mx03.emphasys.eu",
    port: 25,
    secure: false,
    pool: true, // Enable connection pooling
    maxConnections: 5, // Maximum number of simultaneous connections (default: 5)
    maxMessages: 100, // Messages per connection before reconnecting (default: 100)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    }
});

export const sendEmail= async ({to, subject, html, text}: {
    to: string,
    subject: string,
    html: string,
    text: string
}) => {
    return transporter.sendMail({
        from: process.env.FROM_EMAIL!,
        to: to,
        subject: subject,
        text: text, // Plain-text version of the message
        html: html, // HTML version of the message
    })
        .then((info) => console.log(info))
        .catch((error) => console.log(error));

};
import sgMail from '@sendgrid/mail';
/*
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail({to, subject, html, text}: {
    to: string,
    subject: string,
    html: string,
    text: string
}) {

    const msg = {
        to: to, // Change to your recipient
        from: process.env.SENDGRID_FROM_EMAIL!, // Change to your verified sender
        subject: subject,
        text: text,
        html: html,
    }
    try {
        await sgMail
            .send(msg);
        console.log('Email sent');
    } catch (error) {
        console.error(JSON.stringify(error));
    }
}
*/
/*
const nodemailer = require("nodemailer");

// Create a transporter using Ethereal test credentials.
// For production, replace with your actual SMTP server details.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

// Send an email using async/await
(async () => {
  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: "bar@example.com, baz@example.com",
    subject: "Hello ✔",
    text: "Hello world?", // Plain-text version of the message
    html: "<b>Hello world?</b>", // HTML version of the message
  });

  console.log("Message sent:", info.messageId);
})();
 */
