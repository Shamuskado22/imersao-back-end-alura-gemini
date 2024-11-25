import express from "express"; // Importa o módulo Express para criar a aplicação web.
import routes from "./src/routes/postsRoutes.js";

const app = express(); // Cria uma instância do Express, iniciando a aplicação.
routes(app)

app.listen(3000, () => { // Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
  console.log("Servidor escutando...");
});
