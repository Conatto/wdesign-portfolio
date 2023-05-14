require('dotenv').config({path: __dirname+'/config/.env'});
const express = require("express"); 
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static(__dirname + "/"));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html")
});

app.post("/sendEmail", (request, response) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT, 
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    
    transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: request.body.email,
        subject: request.body.subject,
        text: request.body.message,
        html: `
        <html>
        <body>
            <p>Enviado por: `+request.body.name+`</p></br>
            <p>Contato: `+request.body.phone+`</p>
        <body>
        <html>
        `,
    }).then( ()=> {
        response.sendFile(__dirname + "/msg-success.html");
    }).catch( () => {
        response.sendFile(__dirname + "/msg-fail.html");
    });
});

app.get("/gallery", (request, response) => {
    response.sendFile(__dirname + "/gallery.html")
});

app.get("/*", (request, response) => {
    response.sendFile(__dirname + "/index.html")
});

app.listen(4002, () => console.log("Servidor rodando na porta 4002"));