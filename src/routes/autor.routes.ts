import { Router } from 'express';
import { AppDataSource } from '../database/data-source';
import Author from '../entities/Autor';
import rotaAutenticada from '../middlewares/auth';
import bcrypt from 'bcrypt';

const authorRoutes = Router();

authorRoutes.get('/', rotaAutenticada, async (req, res) => {
  try {
    const authors = await AppDataSource.getRepository(Author).find();
    res.status(200).json(authors);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar autores', error: error.message });
  }
});

authorRoutes.get('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const author = await AppDataSource.getRepository(Author).findOne({
      where: { id },
    });

    if (!author) {
      return res.status(404).json({ message: 'Autor não encontrado' });
    }

    res.status(200).json(author);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao buscar autor', error: error.message });
  }
});

authorRoutes.post('/', rotaAutenticada, async (req, res) => {
  try {
    const { name, nationality, biography, birth_date, login, password } =
      req.body;

    const salt = bcrypt.genSaltSync(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    if (!name || !nationality || !birth_date || !login || !password) {
      return res.status(400).json({ message: 'Campos obrigatórios faltando' });
    }

    const author = new Author();
    author.name = name;
    author.nationality = nationality;
    author.biography = biography || null;
    author.birth_date = new Date(birth_date);
    author.login = login;
    author.password = senhaCriptografada;

    const savedAuthor = await AppDataSource.getRepository(Author).save(author);
    res.status(201).json(savedAuthor);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao criar autor', error: error.message });
  }
});

authorRoutes.put('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { name, nationality, biography, birth_date, active } = req.body;

    const authorRepository = AppDataSource.getRepository(Author);
    const author = await authorRepository.findOne({ where: { id } });

    if (!author) {
      return res.status(404).json({ message: 'Autor não encontrado' });
    }

    author.name = name || author.name;
    author.nationality = nationality || author.nationality;
    author.biography = biography || author.biography;
    author.birth_date = birth_date ? new Date(birth_date) : author.birth_date;
    author.active = active !== undefined ? active : author.active;

    const updatedAuthor = await authorRepository.save(author);
    res.status(200).json(updatedAuthor);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao atualizar autor', error: error.message });
  }
});

authorRoutes.delete('/:id', rotaAutenticada, async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleteResult = await AppDataSource.getRepository(Author).delete(id);

    if (deleteResult.affected === 0) {
      return res.status(404).json({ message: 'Autor não encontrado' });
    }

    res.status(200).json({ message: 'Autor excluído com sucesso' });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao excluir autor', error: error.message });
  }
});

authorRoutes.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await AppDataSource.getRepository(Author).findOne({
      where: { login },
    });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    // Comparar a senha fornecida com a senha criptografada armazenada
    const senhaValida = await bcrypt.compare(password, user.password);

    if (senhaValida) {
      return res.status(200).json({ message: 'Usuário autenticado' });
    } else {
      return res.status(400).json({ message: 'Senha incorreta' });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: 'Erro ao autenticar usuário', error: error.message });
  }
});


export default authorRoutes;
