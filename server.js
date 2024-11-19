import express from "express";

const app = express();
app.listen(3000, () => {
  console.log("Servidor escutando...");
});

app.get("/api", (req, res) => {
  req.statusCode(200).send("Boas vindas à imersão");
});

console.log(req)