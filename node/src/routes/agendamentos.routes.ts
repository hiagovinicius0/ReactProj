/* eslint-disable camelcase */
import { Router } from 'express';
import AgendamentosController from '../app/controllers/AgendamentosController';

const agendamentosRouter = Router();

agendamentosRouter.post('/', async (req, res) => {
    try {
        const { prestador_servico_id, data } = req.body;
        const agendamentosController = new AgendamentosController();
        const agendamento = await agendamentosController.store({
            prestador_servico_id,
            data,
        });
        return res.json(agendamento);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});

export default agendamentosRouter;
