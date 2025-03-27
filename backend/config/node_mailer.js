import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'retuermahero17@gmail.com',
            pass: 'ajre axzq hvxe foyt'
        }
        

  },
);


export default transporter;