const express = require('express');

const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client1 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-one" })
});

const client2 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-two" })
});
/*
const client3 = new Client({
    authStrategy: new LocalAuth({ clientId: "client-three" })
});
 
*/
client1.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client1.on('ready', () => {
    console.log('WhatsApp 1 esta Conectado!');
});

client2.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client2.on('ready', () => {
    console.log('WhatsApp 2 esta Conectado!');
});
/*
client3.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client3.on('ready', () => {
    console.log('WhatsApp 3 esta Conectado!');
});
*/


client1.initialize();
client2.initialize();


const app = express();

app.use(express.json());

app.get('/testApi', (req, res) => {
    res.send('Api Pasión por la Educación. Status: Enable');
}); 

const password = '39d5a072e22cf42412dcaea29218fb2e'

app.post('/send-public', (req, res) => {

    let pass = req.body.pass;
    if(password == pass){
        let chatId = req.body.phone + "@c.us";
        client1.sendMessage(chatId, req.body.msg)
                                    .then(response => {
                                        if(response.id.fromMe) {
                                            res.send('Mensaje enviado');
                                        } else {
                                            res.send('error');
                                        }
                                    });
    } else {
        res.send('Sin autorización');
    }
});

app.post('/send-students', (req, res) => {

    let pass = req.body.pass;
    if(password == pass){
        let chatId = req.body.phone + "@c.us";
        client2.sendMessage(chatId, req.body.msg)
                                    .then(response => {
                                        if(response.id.fromMe) {
                                            res.send('Mensaje enviado');
                                        } else {
                                            res.send('error');
                                        }
                                    });
    } else {
        res.send('Sin autorización');
    }
});
/*
app.post('/send-parents', (req, res) => {

    let pass = req.body.pass;
    if(password == pass){
        let chatId = req.body.phone + "@c.us";
        client3.sendMessage(chatId, req.body.msg)
                                    .then(response => {
                                        if(response.id.fromMe) {
                                            res.send('Mensaje enviado');
                                        } else {
                                            res.send('error');
                                        }
                                    });
    } else {
        res.send('Sin autorización');
    }
});
*/
const port = process.env.port || 3001;

app.listen(port, () => console.log(`Escuchando en puerto ${port}....`));