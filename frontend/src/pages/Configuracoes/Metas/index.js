import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {reaisMask} from '../../../mask'
import api from '../../../../src/services/api';

export default function Metas() {
    const [nomemeta, setNomeMeta] = useState('');
    const [valor, setValor] = useState('');
    const [descricao, setDescricao] = useState('');
    const [qtdeoportunidade, setQtdeOportunidade] = useState('');
    const [ativo, setAtivo] = useState('');
    const usuarioId = localStorage.getItem('userId');



    async function handleMetas(e) {
        e.preventDefault();

        const data = {
        nomemeta,
        valor,
        qtdeoportunidade,
        descricao,
        ativo
        }
        try {
            const response = await api.post('metas', data, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleMetas}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Metas</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeMeta">Nome da Meta</Label>
                                        <Input type="text" required id="txtNomeMeta" placeholder="Digite o nome da meta"
                                            value={nomemeta}
                                            onChange={e => setNomeMeta(e.target.value)} />
                                    </Col>
                                    <Col md="44">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="text" required name="select" id="txtValor"  placeholder="Digite o valor"
                                            value={valor}
                                            onChange={e => setValor(reaisMask(e.target.value))}>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="qtdeOportunidade">Quantidade de Oportunidade</Label>
                                        <Input type="value" required name="select" id="txtQtdeOportunidade" placeholder="Digite a quantidade de oportunidade"
                                            value={qtdeoportunidade}
                                            onChange={e => setQtdeOportunidade(e.target.value)}>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={ e => setAtivo(e.target.value)}
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
