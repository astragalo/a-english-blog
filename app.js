//server
var express= require('express');
var cons = require('consolidate');
var http= require('http');
var app = express();
var servidor= http.createServer(app);
servidor.listen(8000);
var tweets=[];
var usua=[];

app.use(express.static('./public'));
	//jquery Templates
	app.engine('html', cons.jqtpl);
	//html como extension default
	app.set('view engine' , 'html');
    app.set('views', './views');

app.get('/', function (req,res){
	 res.render('index.html',{name:'' }); 
})


var io= require('socket.io').listen(servidor);
io.sockets.on('connection', function(socket){
	console.log('una nueva socket se ha conectado');
	socket.on('emitwit', function(){
		socket.on('formularioenv',function (mensaje){
			tweets.push(mensaje);
		});

		socket.on('userenv',function(user){
			usua.push(user);
		}); });	
	io.sockets.emit('twitting',tweets,usua);
	socket.on('borrar', function(del){
		for (var i = tweets.length ; i >= 0; i--) {
			if(tweets[i]==del){
				tweets[i]=undefined;
			}
		};
	});		
});

console.log('Conectado en el socket 8000!')