
import logger from '../config/logger.js';
import { autor } from '../models/Autor.js';

class AutorController {

    static async listarAutores (req, res) {
        try {
          const listaAutores = await autor.find({});
          res.status(200).json(listaAutores);
          logger.log('info', `GET /autores`);
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na requisição` });
          logger.log('error', `GET /autores - ${erro.message}`);
        }
      };

      static async listarAutorPorId (req, res) {
        try {
          const id = req.params.id;
          const autorEncontrado = await autor.findById(id);
          res.status(200).json(autorEncontrado);
          logger.log('info', `GET /autores/${id}`);
        } catch (erro) {
          res.status(500).json({ message: `${erro.message} - falha na requisição` });
          logger.log('error', `GET /autores/${id} - ${erro.message}`);
        }
      };

    static async cadastrarAutor(req, res) {
        try {
            const novoAutor = await autor.create(req.body);
            logger.log('info', `POST /autores - ${JSON.stringify(novoAutor)}`);
            res.status(201).json({
                message: "Criado com sucesso!", autor: novoAutor
            });
        } catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar autor.` });
            logger.log('error', `POST /autores - ${erro.message}`);

        };
    };

    static async atualizarAutor (req, res) {
      try {
        const id = req.params.id;
        await autor.findByIdAndUpdate(id, req.body);
        logger.log('info', `PUT /autores/${id} - ${JSON.stringify(req.body)}`);
        res.status(200).json({ message: "Atualizado com sucesso!" });
      } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha na requisição` });
        logger.log('error', `PUT /autores/${id} - ${erro.message}`);
      }
    };

    static async excluirAutor (req, res) {
      try {
        const id = req.params.id;
        await autor.findByIdAndDelete(id);
        logger.log('info', `DELETE /autores/${id}`);
        res.status(200).json({ message: "Excluido com sucesso!" });
      } catch (erro) {
        res.status(500).json({ message: `${erro.message} - falha na requisição` });
        logger.log('error', `DELETE /autores/${id} - ${erro.message}`);
      }
    };
};

export default AutorController;