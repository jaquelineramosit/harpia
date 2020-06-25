import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button,CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Anotacoes() {
    const [anotacao, setAnotacao] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [oportunidadeId, setOportunidadeId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [cancelada, setCancelada] = useState('false');
    const [clientesId, setClientesId] = useState([]);
    const [oportunidadesId, setOportunidadesId] = useState([]);
    const [contatosId, setContatosId] = useState([]);
    const usuarioId = localStorage.getItem('userId');


    useEffect(() => {
        api.get('clientes').then(response => {
        setClientesId(response.data);
        })
        }, [usuarioId]);
     

    useEffect(() => {
        api.get('contatos').then(response => {
        setContatosId(response.data);
        })
        }, [usuarioId]); 
        

    useEffect(() => {
        api.get('oportunidades').then(response => {
        setOportunidadesId(response.data);
        })
        }, [usuarioId]);    

    async function handleAnotacoes(e) {
        e.preventDefault();

        const data = {
            anotacao,
            clienteId,
            oportunidadeId,
            contatoId,
            cancelada
        }
        try {
            const response = await api.post('anotacoes', data, {
                headers: {
                    Authorization: 6,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleAnotacoes}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Anotações</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input required type="select" name="select" id="cboCliente"
                                        value={clienteId}
                                        onChange={ e => setClienteId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {clientesId.map(cliente=> (
                                            <option value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}                                                                                
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input required type="select" name="select" id="cboContatoid"
                                        value={contatoId}
                                        onChange={ e => setContatoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {contatosId.map(contato=> (
                                                <option key={contato.id} value={contato.id}>{contato.nomecontato}</option>
                                                ))}                                                                                 
                                        </Input>
                                    </Col>                                  
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="oportunidadeId">Oportunidade</Label>
                                        <Input required type="select" name="select" id="cboOportunidadeId"
                                        value={oportunidadeId}
                                        onChange={ e => setOportunidadeId(e.target.value)}>
                                             <option value={undefined} defaultValue>Selecione...</option>
                                                {oportunidadesId.map(oportunidade=> (
                                                <option key={oportunidade.id} value={oportunidade.id}>{oportunidade.nomeoportunidade}</option>
                                                ))}                                                                             
                                        </Input> 
                                    </Col>
                                </FormGroup>                   
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Anotação</Label>
                                        <Input type="textarea" rows="5"
                                            value={anotacao}
                                            onChange={e => setAnotacao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Cancelada</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={cancelada}
                                        onChange={ e => setCancelada(e.target.value)}
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