import livro from '../models/Livro.js';
import { autor } from '../models/Autor.js';

class LivroController {

  static async listarLivros(req, res) { //GET ALL
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async listarLivroPorId(req, res) { //GET BY ID
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      res.status(200).json(livroEncontrado);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async cadastrarLivro(req, res) { //POST
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({
        message: "Criado com sucesso!", livro: livroCriado
      });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - Falha ao cadastrar livro.` });
    };
  };

  static async atualizarLivro(req, res) { //PUT
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Atualizado com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };

  static async excluirLivro(req, res) { //DELETE
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Excluido com sucesso!" });
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na requisição` });
    }
  };
  static async listarLivrosPorEditora(req, res) { //GET BY EDITORA
    const editora = req.query.editora;
    try {
      const livrosPorEditora = await livro.find({ editora: editora });
      res.status(200).json(livrosPorEditora);
    } catch (erro) {
      res.status(500).json({ message: `${erro.message} - falha na busca` });
    }

  };
};

export default LivroController;