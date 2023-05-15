const express = require('express');

const qrcode = require('qrcode-terminal');

const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('WhatsApp esta Conectado!');
});



client.initialize();


const app = express();

app.use(express.json());

app.get('/test', (req, res) => {
    res.send('Api Pasión por la Educación. Status: Enable');
}); 

const password = '39d5a072e22cf42412dcaea29218fb2e'

app.post('/send', (req, res) => {

    let pass = req.body.pass;
    if(password == pass){
        let chatId = req.body.phone + "@c.us";
        client.sendMessage(chatId, req.body.msg)
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

const port = process.env.port || 3002;

app.listen(port, () => console.log(`Escuchando en puerto ${port}....`));