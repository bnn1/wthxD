import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer'
import { config } from 'dotenv'
import Mail from "nodemailer/lib/mailer";

config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { answer } = req.body;
    const transporter = await nodemailer.createTransport({
        host: 'server276.web-hosting.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.LOGIN,
            pass: process.env.PASS
        }
    });

    const mailOptions: Mail.Options = {
        from: process.env.LOGIN,
        to: 'redpandabmn@gmail.com',
        subject: 'Answer from ALina',
        text: answer
    }

    await transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error(err);
        } else {
            console.log(info);
        }
    })
    console.log(process.env.LOGIN)
    console.log(process.env.PASS)
    res.end();
}