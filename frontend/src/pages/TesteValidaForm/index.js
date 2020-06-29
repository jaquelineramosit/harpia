import React, { useState, Component } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../global.css';
import api from '../../../src/services/api';
import FormValidator from '../../validator/formValidator';
import Toaster from '../../toaster';

export default function Modulo() {
    const [nomeModulo, setNomeModulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');
    const history = useHistory();

    async function handleModulo(e) {
        e.preventDefault();

        const data = {
          nomeModulo,
          descricao,
          ativo,
        };

        try {

            //chamar o método Valida
            const validador = new FormValidator([
                {
                    campo: 'nomeModulo',
                    metodo: 'isEmpty',
                    validoQuando: false,
                    mensagem: 'Informe um nome para o módulo'
                },
                {
                    campo: 'descricao',
                    metodo: 'isEmpty',
                    validoQuando: false,
                    mensagem: 'Informe um nome para a descrição do módulo'
                }
            ]);

            const validacao = validador.valida(data);
            console.log(validacao);


            if(validacao.isValid) {
                const response = await api.post('/modulos', data, {
                    headers: {
                        Authorization : usuarioId,
                    }

                });
                Toaster.exibeMensagem('success', "Módulo adicionado com sucesso!");
                history.push('/consulta-modulos');
            } else {
                const { nomeModulo, descricao} = validacao;
                const campos = [nomeModulo, descricao];
                const camposInvalidos = campos.filter(elem => {
                    return elem.isInvalid
                 });
                camposInvalidos.forEach(campo => {
                    Toaster.exibeMensagem('error', campo.message);
                });

            }
        } catch (err) {

            Toaster.exibeMensagem('error', "Erro no cadastro, tente novamente.");
        }
    }
    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleModulo}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Módulo</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Nome">Nome Módulo</Label>
                                        <Input type="text" id="txtNomeModulo" placeholder="Digite Nome do Módulo"
                                        value={nomeModulo}
                                        onChange={ e => setNomeModulo(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label htmlFor="Descricao">Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao" multiple placeholder="Digite a Descrição do Módulo"
                                        value={descricao}
                                        onChange={ e => setDescricao(e.target.value)}
                                         />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="Ativo">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'}
                                            defaultChecked
                                            value={`${ativo}`}
                                            onChange={ e => setAtivo(e.target.checked)}
                                            size={'sm'}
                                         />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="submit" size="sm" color="success" className=" mr-3"><i className="fa fa-check"></i> Salvar</Button>
                                <Button type="reset" size="sm" color="danger" className="ml-3"><i className="fa fa-ban "></i> Cancelar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
