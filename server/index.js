const  express = require('express')
const app = express();
const {Server}= require("socket.io")
const http = require('http');

const server = http.createServer(app);
const io= new Server(server);
const port = 6000;

io.on('connection',(socket)=>{
 console.log('socket conneted',socket.id );
})

app.get('/', (req, res) => res.send('Hello World!'))
server.listen(port, () => console.log(`Example app listening on port ${port}!`))