const express = require("express"); 
const app = express();

app.use(express.static(__dirname + "/"));

app.get("/", (request, response) => {
    response.sendFile(__dirname + "/index.html");
});

app.listen(4002, () => console.log("Servidor rodando na porta 4002"));