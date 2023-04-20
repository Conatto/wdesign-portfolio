const express = require("express"); 
const app = express();

app.use(express.static(__dirname + "/"));

app.get("/*", (request, response) => {
    response.redirect("/");
});

app.listen(4002, () => console.log("Servidor rodando na porta 4002"));