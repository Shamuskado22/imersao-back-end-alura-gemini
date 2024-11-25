import conectarAoBanco from "../config/dbConfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO); // Conecta ao banco de dados usando a string de conexão obtida da variável de ambiente.
export default async function getTodosPosts() { // Função assíncrona para obter todos os posts do banco de dados.
  const db = conexao.db("imersao-instabytes"); // Seleciona o banco de dados "imersao-instabytes".
  const colecao = db.collection("posts"); // Seleciona a coleção "posts" dentro do banco de dados.
  return colecao.find().toArray(); // Executa uma consulta para encontrar todos os documentos na coleção e retorna os resultados como um array.
}