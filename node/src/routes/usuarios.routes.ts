import { Router } from 'express';
import { getRepository } from 'typeorm';
import UsuariosController from '../app/controllers/UsuariosController';

const usuariosRouter = Router();

usuariosRouter.post('/', async (req, res) => {
    try {
        const { nome, email, password } = req.body;
        const usuariosController = new UsuariosController();
        const user = await usuariosController.store({
            nome,
            email,
            password,
        });
        delete user.password;
        return res.json(user);
    } catch (erro) {
        return res.status(400).json({ error: erro.message });
    }
});

usuariosRouter.get('/', async (req, res) => {
    const usuariosController = new UsuariosController();
    const usuarios =  await usuariosController.findAll();
    return res.json(usuarios);
});

usuariosRouter.get('/:id', async (req, res) => {
    const usuariosController = new UsuariosController();
    const { id } = req.params
    const usuarios =  await usuariosController.findId(id);
    return res.json(usuarios);
});

usuariosRouter.delete('/:id', async (req, res) => {
    const usuariosController = new UsuariosController();
    const { id } = req.params
    const usuarios =  await usuariosController.delete(id);
    return res.json(usuarios);
});

export default usuariosRouter;
