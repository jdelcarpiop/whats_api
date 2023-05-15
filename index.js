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
    console.log('Client is ready!');
});

client.on('message', message => {
	if(message.body === 'hola mund') {
		client.sendMessage(message.from, 'Hola soy un bot');
	}
});

client.initialize();


const app = express();

app.use(express.json());

const students = [
    { id: 1, name: 'Jorge', age: 20, enroll: true },
    { id: 2, name: 'Luisa', age: 22, enroll: false },
    { id: 3, name: 'Maria', age: 24, enroll: false }
];

app.get('/', (req, res) => {
    res.send('Node Js Api');
}); 

const country_code = "51";
const number = "981257900";
const msg = "Hola Mundo";


/* app.get('/send', (req, res) => {
    let chatId = country_code + number + "@c.us";

    client.sendMessage(chatId, msg);
    res.send('Node Js Api');
});  */

const password = '39d5a072e22cf42412dcaea29218fb2e'


app.post('/send', (req, res) => {

    let pass = req.body.pass;
    console.log(pass);
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
    
    
    //res.send('Node Js Api');
});

app.get('/api/students', (req, res) => {
    res.send(students);
}); 


app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if(!student) return res.status(404).send('Estudiante no encontrado'); 
    else res.send(student);
}); 

app.post('/api.students', (req, res) => {
    const student = {
        id: students.length + 1,
        name: req.body.name,
        age: parseInt(req.body.age),
        enroll: (req.body.enroll === 'true')
    };

    students.push(student);
    res.send(student);
});


const port = process.env.port || 3001;

app.listen(port, () => console.log(`Escuchando en puerto ${port}....`));