const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { Servo } = require('johnny-five');
let five = require('johnny-five');
var board = new five.Board({
    port:"COM18"
});

http.listen(3000, function(){
    console.log('Tá funcionando na porta 3000 :]')
});


board.on("ready", function(){
    var led = new five.Led(13);
    const index = new Servo(2).min(0).max(180);
    const meio = new Servo(3).min(0).max(180);
    const anel = new Servo(4).min(0).max(180);
    const midinho = new Servo(5).min(0).max(180);
    const polegar = new Servo(6).min(0).max(180);
    
    index.to(0);
    meio.to(0);
    anel.to(0);
    midinho.to(0);
    polegar.to(0);


io.on('connection', (socket) =>{
    console.log('New connection', socket.id);
})

app.get('/', (req, res)=> {
    res.sendFile(__dirname+'/index.html')
})

io.on('connection', function(socket){
    socket.on('message', (msg) =>{
        io.emit('message', msg);
        console.log(`mensagem: ${msg}`);
        if(msg === "fechar"){
         index.to(180);
         meio.to(180);
         midinho.to(180);
         anel.to(180);
         polegar.to(180);
        }
        else if(msg === "abrir"){
         index.to(0);
         meio.to(0);
         midinho.to(0);
         anel.to(0);
         polegar.to(0);
        }
        else if(msg === "apontar"){
            index.to(180);
            meio.to(0);
            midinho.to(0);
            anel.to(0);
            polegar.to(0);  
        }
    })
    socket.on('status', (status)=>{
        console.log(`Status: ${status}`)
        io.emit('status', status)
    })


})
});