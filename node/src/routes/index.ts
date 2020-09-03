import { Router } from 'express';
import usuariosRouter from './usuarios.routes';
import agendamentosRouter from './agendamentos.routes';

const routes = Router();

routes.use('/usuarios', usuariosRouter);
routes.use('/agendamentos', agendamentosRouter);

export default routes;
