import React, { useCallback } from 'react';

import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/input';
import Button from '../../components/button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
    const handleSubmit = useCallback(async (data: object) => {
        try{
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .min(6, 'No mínimo 6 dígitos'),
            });
            await schema.validate(data, {
                abortEarly: false
            });
        } catch(error){
            console.log(error);
        }
    }, [])
    return (
        <Container>
            <Background />
            <Content>
                <img src={logoImg} alt="GoBarber" />
                <Form onSubmit={handleSubmit}>
                    <h1>Faça o seu cadasro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome"/>
                    <Input name="email" icon={FiMail} placeholder="E-mail"/>
                    <Input name="password" icon={FiLock} placeholder="Senha" type="password"/>
                    <Button type="submit">Cadastrar</Button>
                </Form>
                <a href="login">
                    <FiArrowLeft />
                    Voltar para Logon
                </a>
            </Content>
            <Background />
        </Container>
    )
};


export default SignUp;
