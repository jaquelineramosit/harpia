import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';


export default function Produtos() {
    const [marcaId, setMarcaId] = useState('');
    const [nomeproduto, setNomeProduto] = useState('');
    const [numerofabricante, setNumeroFabricante] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [distribuidorId, setDistribuidorId] = useState('');
    const [tempoentrega, setTempoEntrega] = useState('');
    const [ativo, setAtivo] = useState('');
    const usuarioId = localStorage.getItem('userId');

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
            ativo,
        }

      
        try {
            const response = await api.post('produtos', data, {
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
            <Form onSubmit={handleProdutos}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Produtos</strong>
                                <small> novo</small>
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
                                        >
                                        <option value={undefined}>Selecione...</option>
                                        <option value={1}>Marca1</option>
                                        <option value={2}>Marca2</option>
                                            
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
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Distribuidor1</option>
                                            <option value={2}>Distribuidor2</option>

                                        </Input>
                                    </Col> 
                                    <Col md="2">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="number" required id="txtValor"
                                            value={valor}
                                            onChange={e => setValor(e.target.value)} />
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