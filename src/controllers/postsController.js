import getTodosPosts from "../models/postsModel.js";

export async function listarPosts(req, res) { // Define uma rota GET para a URL "/posts".
  const posts = await getTodosPosts(); // Chama a função para obter todos os posts.
  res.status(200).json(posts); // Envia uma resposta HTTP com status 200 (OK) e os posts no formato JSON.
}