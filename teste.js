let five = require('johnny-five');
var board = new five.Board({
    port:"COM16"
});

board.on("ready", function(){
    var led = new five.Led(13);
    led.blink(500);
});