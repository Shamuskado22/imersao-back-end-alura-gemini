import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão obtida da variável de ambiente.
export async function getTodosPosts() { // Função assíncrona para obter todos os posts do banco de dados.
  const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes".
  const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
  return colecao.find().toArray(); // Executa uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array.
}

export async function criarPost(novoPost) {
  // Declara uma função assíncrona chamada `criarPost` que recebe um objeto `novoPost` como parâmetro.
  // Essa função é exportada para ser utilizada em outros módulos.

  const db = conexao.db("imersao-instabytes");
  // Conecta-se ao banco de dados MongoDB com o nome "imersao-instabytes".
  // A variável `conexao` (não mostrada no código) deve ser uma instância de um cliente MongoDB.

  const colecao = db.collection("posts");
  // Seleciona a coleção "posts" dentro do banco de dados.
  // Uma coleção em MongoDB é similar a uma tabela em um banco de dados relacional.

  return colecao.insertOne(novoPost)
  // Insere um novo documento (post) na coleção "posts".
  // O método `insertOne` retorna uma promessa (Promise) que será resolvida com um objeto contendo informações sobre o documento inserido.
  // A função `criarPost` retorna essa promessa para que o chamador possa lidar com o resultado da inserção.
}