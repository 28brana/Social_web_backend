import nodemailer from 'nodemailer';

export const sendMailOtp = async (email, otp) => {
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'bharat28rana@gmail.com',
                pass: process.env.GMAIL_PASS
            }
        });

        var mailOptions = {
            from: 'bharat28rana@gmail.com',
            to: email,
            subject: 'OTP VALID FOR 15 Min',
            html: `<!DOCTYPE html>
            <html>
            <head>
            <title>OTP</title>
            </head>
            <body>
            <div style="background:#D3D3D3;text-align:center;padding:20px">
            <h1>OTP</h1>
            <h2>${otp}</h2>
            <p>Valid for 15 min</p>
            </div>
            </body>
            </html>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        // console.log({ result });
        return true;
    } catch (error) {
        // console.log({ error });
        return false;
    }

}