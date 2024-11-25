import express from "express"; // Importa o módulo Express para criar o servidor web.
import multer from "multer"; // Importa o módulo Multer para lidar com o upload de arquivos.
import { listarPosts, postarNovoPost, uploadImagem } from "../controllers/postsController.js"; // Importa as funções para listar posts, postar novos posts e fazer upload de imagens do arquivo postsController.js.

const storage = multer.diskStorage({ // Configura o armazenamento de arquivos usando o Multer.
  destination: function (req, file, cb) { // Define o diretório de destino para os arquivos.
    cb(null, 'uploads/'); // Define o diretório 'uploads/' como destino.
  },
  filename: function (req, file, cb) { // Define o nome do arquivo a ser salvo.
    cb(null, file.originalname); // Mantém o nome original do arquivo.
  }
});

const upload = multer({ dest: "./uploads", storage }); // Cria uma instância do Multer com a configuração de armazenamento definida.

const routes = (app) => {
  app.use(express.json()); // Habilita o middleware para analisar o corpo das requisições JSON.
  app.get("/posts", listarPosts);
  // Esta linha define uma rota GET para o endpoint "/posts". 
  // Quando uma requisição GET for feita para este endpoint, a função `listarPosts` será chamada.
  // A função `listarPosts` provavelmente buscará todos os posts armazenados e os enviará como resposta.

  app.post("/posts", postarNovoPost);
  // Esta linha define uma rota POST para o endpoint "/posts". 
  // Quando uma requisição POST for feita para este endpoint, a função `postarNovoPost` será chamada.
  // A função `postarNovoPost` provavelmente receberá os dados do novo post no corpo da requisição e os salvará no banco de dados.

  app.post("/upload", upload.single("imagem"), uploadImagem);
  // Esta linha define uma rota POST para o endpoint "/upload". 
  // Ao mesmo tempo, ela configura o middleware `upload.single("imagem")` para lidar com o upload de um único arquivo com o nome "imagem".
  // Quando uma requisição POST for feita para este endpoint, o Multer irá extrair o arquivo da requisição e salvá-lo no diretório configurado anteriormente.
  // Em seguida, a função `uploadImagem` será chamada para processar o arquivo recém-uploadado.
  // A função `uploadImagem` pode realizar tarefas como salvar o caminho do arquivo no banco de dados ou redimensionar a imagem.
}

export default routes;