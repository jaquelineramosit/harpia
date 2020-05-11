import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Metasvendedores() {
    const [vendedorId, setVendedorId] = useState('');
    const [metaId, setMetaId] = useState('');
    const [observacao, setObservacao] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');

    async function handleMetasvendedores(e) {
        e.preventDefault();

        const data = {
            vendedorId,
            metaId,
            observacao,
            ativo
        }
        try {
            const response = await api.post('metas-vendedores', data, {
                headers: {
                    Authorization: 18,
                }
            });
            alert(`Feito o cadastro com sucesso ${response.id}`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleMetasvendedores}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Metas de Vendedores</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                <Col md="3">
                                        <Label htmlFor="Tipopessoa">Vendedor</Label>
                                        <Input required type="select" name="select" id="txtTipopessoa"
                                        value={vendedorId}
                                        onChange={ e => setVendedorId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option> 
                                            <option value={6}>Vendedor1</option>  
                                            <option value={7}>Vendedor2</option>                                        
                                        </Input>
                                </Col>                               
                                <Col md="2">
                                        <Label htmlFor="Tipopessoa">Metas</Label>
                                        <Input required type="select" name="select" id="txtTipopessoa"
                                        value={metaId}
                                        onChange={ e => setMetaId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>                                    
                                            <option value={1}>Metas1</option>  
                                            <option value={2}>Metas2</option>                                         
                                        </Input>
                                </Col>   
                                <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={ e => setAtivo(e.target.value)}
                                        />                                    
                                    </Col>                                      
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <Label>Observação</Label>
                                        <Input type="textarea" rows="5"
                                            value={observacao}
                                            onChange={e => setObservacao(e.target.value)} />
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