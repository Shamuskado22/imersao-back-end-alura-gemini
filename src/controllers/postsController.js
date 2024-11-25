import { getTodosPosts, criarPost } from "../models/postsModel.js";
import fs from "fs"

export async function listarPosts(req, res) { // Define uma rota GET para a URL "/posts".
  const posts = await getTodosPosts(); // Chama a função para obter todos os posts.
  res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
}

export async function postarNovoPost(req, res) {
  // Esta função é responsável por criar um novo post. 
  // Ela recebe a requisição (req) e a resposta (res) como parâmetros.

  const novoPost = req.body;
  // Extrai os dados do novo post enviados no corpo da requisição e os armazena na variável `novoPost`. 

  try {
    // Bloco try...catch para tratar possíveis erros durante a criação do post.

    const postCriado = await criarPost(novoPost);
    // Chama a função `criarPost` (assumida como uma função que interage com o banco de dados)
    // para criar o novo post com os dados recebidos. A palavra-chave `await` indica que a execução 
    // da função `postarNovoPost` será pausada até que a função `criarPost` seja concluída.
    // O resultado da criação do post (o novo post com seu ID, por exemplo) é armazenado em `postCriado`.

    res.status(200).json(postCriado);
    // Se a criação do post for bem-sucedida, envia uma resposta com status 200 (OK)
    // e retorna os dados do post criado no formato JSON.
  } catch (erro) {
    // Se ocorrer algum erro durante a criação do post, este bloco será executado.

    console.error(erro.message);
    // Imprime a mensagem de erro no console para ajudar na depuração.

    res.status(500).json({ "Erro": "Falha na requisição" });
    // Envia uma resposta com status 500 (Erro interno do servidor) e uma mensagem de erro genérica.
    // É recomendado personalizar a mensagem de erro com base no tipo de erro ocorrido.
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto para representar o novo post, inicialmente com a descrição, alt e url da imagem (nome original)
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: "",
  };

  try {
    // Chama a função `criarPost` para inserir o novo post no banco de dados
    const postCriado = await criarPost(novoPost);

    // Constrói o novo nome do arquivo, usando o ID gerado pelo banco de dados para garantir unicidade
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;

    // Renomeia o arquivo para o novo nome, movendo-o para o local definitivo
    fs.renameSync(req.file.path, imagemAtualizada);

    // Retorna uma resposta HTTP com status 200 (sucesso) e os dados do post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    // Caso ocorra algum erro, loga a mensagem de erro no console e retorna uma resposta HTTP com status 500 (erro interno do servidor)
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
};