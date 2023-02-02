let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server, { cors: { origin: "*" } });

app.use(express.static("client"));

app.get("/hola-mundo", function (req, res) {
  res.status(200).send("Hola mundo desde una ruta");
});

let messages = [
  {
    id: 1,
    text: "Bienvenido al chat con socket y NodeJs",
    nickname: "Bot-Daniel",
  },
];

io.on("connection", function (socket) {
  console.log(
    "El cliente con Ip: " + socket.handshake.address + " Se ha conectado.."
  );

  socket.emit("messages", messages);
  socket.on("add-message", function (data) {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

server.listen(6677, function () {
  console.log("Servidor esta funcionando en http://localhost:6677");
  console.log('Mensaje anadido para testear un segundo commit');
  console.log('3 Mensaje anadido para testear un segundo commit')
});
