import nodemailer from "nodemailer";

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
