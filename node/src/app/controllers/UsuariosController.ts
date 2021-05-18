import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Usuarios from '../models/Usuarios';

interface Request {
    nome: string;
    email: string;
    password: string;
}
class UsuariosController {
    public async store({ nome, email, password }: Request): Promise<Usuarios> {
        const usuariosRepository = getRepository(Usuarios);

        const verificaUsuarioExiste = await usuariosRepository.findOne({
            where: { email },
        });
        if (verificaUsuarioExiste) {
            throw new Error('Endereço de email já cadastrado!');
        }
        const hashedPassword = await hash(password, 8);
        const user = usuariosRepository.create({
            nome,
            email,
            password: hashedPassword,
        });
        await usuariosRepository.save(user);
        return user;
    }
    public async findAll(){
        const usuariosRepository = getRepository(Usuarios);
        const usuarios = await usuariosRepository.find();
        return usuarios;
    }
    public async findId(id: string){
        const usuariosRepository = getRepository(Usuarios);
        const usuario = await usuariosRepository.findOne({where: {id}, select: ['id', 'nome', 'email', 'created_at', 'updated_at']});
        return usuario;
    }
    public async delete(id: string){
        const usuariosRepository = getRepository(Usuarios);
        const usuario = await usuariosRepository.delete(id)
        return id;
    }
}

export default UsuariosController;
