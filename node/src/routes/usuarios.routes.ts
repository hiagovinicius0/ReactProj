import { Router } from 'express';
import { getRepository } from 'typeorm';
import UsuariosController from '../app/controllers/UsuariosController';
import Usuarios from '../app/models/Usuarios';

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
    const usuariosRepositorio = getRepository(Usuarios);
    const user = await usuariosRepositorio.find();
    delete user[0].password;
    return res.json(user);
});

usuariosRouter.get('/:id', async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = req.params;
    const user = await usuariosRepositorio.findOne(id);
    return res.json(user);
});

usuariosRouter.delete('/:id', async (req, res) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = req.params;
    await usuariosRepositorio.delete(id);
    return res.send();
});

export default usuariosRouter;
