import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {reaisMask} from '../../../mask'
import api from '../../../../src/services/api';
import { Redirect } from "react-router-dom";

export default function Produtos(props) {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var produtoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [marcaId, setMarcaId] = useState('');
    const [nomeproduto, setNomeProduto] = useState('');
    const [numerofabricante, setNumeroFabricante] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [distribuidorId, setDistribuidorId] = useState('');
    const [tempoentrega, setTempoEntrega] = useState('');
    const [ativo, setAtivo] = useState(1);

    const [marcasId, setMArcasId] = useState([]);    
    const [distribuidoresId, setDistribuidoresId] = useState([]);
    
    // listas
    useEffect(() => {
        api.get('marcas').then(response => {
            setMArcasId(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('distribuidores').then(response => {
            setDistribuidoresId(response.data);
        })
    }, []);

    // edit
    useEffect(() => {
        if (action === 'edit' && produtoIdParam !== '') {
            api.get(`produtos/${produtoIdParam}`).then(response => {
                setMarcaId(response.data.marcaId);
                setNomeProduto(response.data.nomeproduto);
                setNumeroFabricante(response.data.numerofabricante);
                setQuantidade(response.data.quantidade);
                setValor(response.data.valor);
                setDistribuidorId(response.data.distribuidorId);
                setTempoEntrega(response.data.tempoentrega);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [produtoIdParam])

    function handleInputChange(event) {
        var { name, value } = event.target;

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

    async function handleProdutos(e) {
        e.preventDefault();

        const data = {
            marcaId,
            nomeproduto,
            numerofabricante,
            quantidade,
            valor,
            distribuidorId,
            tempoentrega,
            ativo
        }

        if ( action === 'edit' ) {
            try {
                const response = await api.put(`/produtos/${produtoIdParam}`, data, {
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
            if ( action === 'novo' ) {
                try {
                    const response = await api.post('produtos', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert(`Feito o cadastro com sucesso`);
                    setRedirect(true);  
                } catch (err) {
                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }

    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-produtos" /> }
            <Form onSubmit={handleProdutos} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Produtos</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="nomeProduto">Nome Oportunidade</Label>
                                        <Input type="text" required id="txtNomeProduto" placeholder="Digite o nome do Produto"
                                            value={nomeproduto}
                                            onChange={e => setNomeProduto(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="numeroFabricante">Número  do Fabricante</Label>
                                        <Input type="text" required name="select" id="txtNumeroFabricante" placeholder="Digite o Número do fabricante"
                                            value={numerofabricante}
                                            onChange={e => setNumeroFabricante(e.target.value)}>
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="marcaId">Marca</Label>
                                        <Input type="select" required name="select" id="cboMarcaId"
                                         value={marcaId}
                                         onChange={e => setMarcaId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {marcasId.map(marca=> (
                                            <option value={marca.id}>{marca.nomemarca}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="quantidade">Quantidade</Label>
                                        <Input type="number" required name="select" id="txtQuantidade" placeholder="Insira a quantidade"
                                            value={quantidade}
                                            onChange={e => setQuantidade(e.target.value)}>
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="distribuidorId">Distribuidor</Label>
                                        <Input type="select" required name="select" id="cboDistribuidorId"
                                            value={distribuidorId}
                                            onChange={e => setDistribuidorId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {distribuidoresId.map(distribuidor=> (
                                                <option value={distribuidor.id}>{distribuidor.nomedistribuidor}</option>
                                                ))}
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="text" required id="txtValor"
                                            value={valor}
                                            onChange={e => setValor(reaisMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                     <Col md="3">
                                        <Label htmlFor="tempoEntrega">Tempo de entrega</Label>
                                        <Input type="time" required name="select" id="txtTempoentrega"
                                            value={tempoentrega}
                                            onChange={e => setTempoEntrega(e.target.value)}>
                                        </Input>
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
