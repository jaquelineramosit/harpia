import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {reaisMask} from '../../../mask'
import api from '../../../../src/services/api';
import MetasVendedores from '../MetasVendedores';
import { Redirect } from "react-router-dom";

const Metas = (props) => {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var metasIdParams = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomemeta, setNomemeta] = useState('');
    const [valor, setValor] = useState('');
    const [qtdeoportunidade, setQtdeoportunidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        if (action === 'edit' && metasIdParams !== '') {
            api.get(`metas/${metasIdParams}`).then(response => {
                    setNomemeta(response.data.nomemeta);
                    setValor(response.data.valor);
                    setQtdeoportunidade(response.data.qtdeoportunidade);
                    setDescricao(response.data.descricao);
                    response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [metasIdParams])

    function handleInputChange(event) {
        const { name, value } = event.target;

        if ( name === 'ativo' ) {
            if ( ativo === 1 ) {
                setAtivo(0);
            } else {
                setAtivo(1);
            }
        }
    };

    function handleReset() {
        setRedirect(true);
    };

    async function handleMetas(e) {
        e.preventDefault();

        const data = {
            nomemeta,
            valor,
            qtdeoportunidade,
            descricao,
            ativo
        };

        if (action === 'edit') {

            try {
                const response = await api.put(`/metas/${metasIdParams}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                alert(`Cadastro atualizado com sucesso.`);
                setRedirect(true);  
            } catch (err) {

                alert('Erro na atualização, tente novamente.');
            }

        } else {

            if (action === 'novo') {
                try {
                    const response = await api.post('metas', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert(`Cadastro realizado com sucesso.`);
                    setRedirect(true);  
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }

    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-metas" /> }
            <Form onSubmit={handleMetas} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Metas</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeMeta">Nome da Meta</Label>
                                        <Input type="text" required id="txtNomeMeta" placeholder="Digite o nome da meta"
                                            name="nomemeta"
                                            value={nomemeta}
                                            onChange={e => setNomemeta(e.target.value)} />
                                    </Col>
                                    <Col md="44">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="text" required name="select" id="txtValor"  placeholder="Digite o valor"
                                            name="valor"
                                            value={valor}
                                            onChange={e => setValor(e.target.value)}>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="qtdeOportunidade">Quantidade de Oportunidade</Label>
                                        <Input type="value" required name="select" id="txtQtdeOportunidade" placeholder="Digite a quantidade de oportunidade"
                                            name="qtdeoportunidade"
                                            value={qtdeoportunidade}
                                            onChange={e => setQtdeoportunidade(e.target.value)}>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.valor)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} size={'sm'}
                                            checked={ativo === 1 ? true : false}
                                            name="ativo"
                                            onChange={handleInputChange}
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

export default Metas;
