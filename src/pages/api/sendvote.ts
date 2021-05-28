import { NextApiRequest, NextApiResponse } from "next";
import { config } from 'dotenv'
import Mongoose from "mongoose";
import Answer from "../../answer.schema";

config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { answer } = req.body;
    if (!Mongoose.connections[0].readyState) {
        await Mongoose.connect(process.env.MONGODB_URI as string, {
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    const answ = new Answer({ answer, date: `${(new Date().getHours()).toString()}:${(new Date().getMinutes()).toString()}` });

    await answ.save();
    res.end();
}

// const transporter = await nodemailer.createTransport({
    //     host: 'server276.web-hosting.com',
    //     port: 465,
    //     secure: true,
    //     auth: {
    //         user: process.env.LOGIN,
    //         pass: process.env.PASS
    //     }
    // });

    // const mailOptions: Mail.Options = {
    //     from: process.env.LOGIN,
    //     to: 'contact@borisnovikov.com',
    //     subject: 'Answer from ALina',
    //     text: answer
    // }

    // await transporter.sendMail(mailOptions, (err, info) => {
    //     if (err) {
    //         console.error(err);
    //     } else {
    //         console.log(info);
    //     }
    // })