import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Paises () {
    const [nomepais, setNomePais] = useState('');
    const [sigla, setSigla] = useState('');
    const [moeda, setMoeda] = useState('');
    const [siglamoeda, setSiglaMoeda] = useState('');
    const [ativo, setAtivo] = useState('');
    const usuarioId = localStorage.getItem('userId');



    async function handlePaises(e) {
        e.preventDefault();

        const data = {
            nomepais,
            sigla, 
            moeda, 
            siglamoeda,
            ativo
        }
        try {
            const response = await api.post('paises', data, {
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
            <Form onSubmit={handlePaises}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Países</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="nomePais">Nome do País</Label>
                                        <Input type="text" required id="txtNomePais" placeholder="Digite o país"
                                            value={nomepais}
                                            onChange={e => setNomePais(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="sigla">Sigla do país</Label>
                                        <Input type="text" required id="txtSigla" placeholder="Digite a sigla"
                                            value={sigla}
                                            onChange={e => setSigla(e.target.value)} />
                                    </Col>
                                </FormGroup> 
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="moeda">Moeda</Label>
                                        <Input type="text" required id="txtMoeda" placeholder="Digite moeda"
                                            value={moeda}
                                            onChange={e => setMoeda(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="siglaMoeda">Sigla da Moeda</Label>
                                        <Input type="text" required id="txtSiglamoeda" placeholder="Digite a sigla"
                                            value={siglamoeda}
                                            onChange={e => setSiglaMoeda(e.target.value)} />
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