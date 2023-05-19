const express = require('express');

const app = express();

app.use(express.json());

app.get('/testApi', (req, res) => {
    res.send('Api Pasión por la Educación. Status: Enable');
});

const password = '39d5a072e22cf42412dcaea29218fb2e'

app.post('/send', (req, res) => {
    let pass = req.body.pass;
    if (password == pass) {
        client.isRegisteredUser(req.body.phone)
            .then((isRegistered) => {
                if (isRegistered) {
                    let chatId = req.body.phone + "@c.us";
                    client.sendMessage(chatId, req.body.msg)
                        .then(response => {
                            if (response.id.fromMe) {
                                res.send('send-success');
                            } else {
                                res.send('send-error');
                            }
                        });
                } else {
                    res.send(`verified-failed: ${req.body.phone}`);
                }
            })
            .catch((error) => {
                console.error(`verified-error: ${req.body.phone} - ${error}`);
            });
    } else {
        res.send('auth-failed');
    }
});

const port = process.env.port || 3001;

app.listen(port, () => console.log(`Escuchando en puerto ${port}....`));

const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.initialize();

client.on('qr', qr => {
    console.log('WhatsApp QR');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp esta Conectado!');
});