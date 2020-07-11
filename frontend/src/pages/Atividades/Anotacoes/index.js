import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button,CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';
import { Redirect } from 'react-router-dom';

export default function Anotacoes(props) {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);  
    var action = params.get('action');
    var anotacaoIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    // estados dos inputs
    const [clienteId, setClienteId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [oportunidadeId, setOportunidadeId] = useState('');
    const [anotacao, setAnotacao] = useState('');

    // combos dinâmicos
    const [cancelada, setCancelada] = useState(1);
    const [clientesId, setClientesId] = useState(['']);
    const [oportunidadesId, setOportunidadesId] = useState(['']);
    const [contatosId, setContatosId] = useState(['']);

    // carrega dados dos combos
    useEffect(() => {
        api.get('clientes').then(response => {
            setClientesId(response.data);            
        })
    }, []);
     

    useEffect(() => {
        api.get('contatos').then(response => {
            setContatosId(response.data);
        })
    }, []); 
        

    useEffect(() => {
        api.get('oportunidades').then(response => {
            setOportunidadesId(response.data);
        })
    }, []);    

    //edit
    useEffect(() => {
        if ( action === 'edit' && anotacaoIdParam !== '' ) {
            api.get(`anotacoes/${anotacaoIdParam}`).then(response => {                           
                setClienteId(response.data.clienteId);
                setContatoId(response.data.contatoId);
                setOportunidadeId(response.data.oportunidadeId);
                setAnotacao(response.data.anotacao);
                { response.data.cancelada === 1 ? setCancelada(1) : setCancelada(0) }
            });            
        } else {
            return;
        }
    }, [anotacaoIdParam]);

    function handleReset() {
        setRedirect(true);
    };

    function handleInputChange(event) {
        var { name } = event.target;

        switch (name) {
            case 'cancelada': 
                if ( cancelada === 1 ) {
                    setCancelada(0);
                } else {
                    setCancelada(1);
                }
                break;                
        };
    };

    async function handleAnotacoes(e) {
        e.preventDefault();

        const data = {
            clienteId,
            contatoId,
            oportunidadeId,
            anotacao,
            cancelada
        };

        if ( action === 'edit' ) {
            try {
                const response = await api.put(`anotacoes/${anotacaoIdParam}`, data, {
                    headers: {
                        Authorization : 6,
                    }
                });
                alert('Cadastro atualizado com sucesso.');    
                setRedirect(true);  
            } catch (err) {    
                alert('Erro na atualização, tente novamente.');        
            }
        } else {
            if ( action === 'novo' ) {
                try {
                    const response = await api.post('anotacoes', data, {
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
            { redirect && <Redirect to="/lista-anotacoes" onReset={handleReset} /> }
            <Form onSubmit={handleAnotacoes} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Anotações</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input required type="select" id="cboCliente"
                                            name="clienteId"
                                            value={clienteId}
                                            onChange={e => setClienteId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {clientesId.map(cliente=> (
                                                <option key={`cliente${cliente.id}`} value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}                                                                                
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input required type="select" id="cboContatoId"
                                            name="contatoId"
                                            value={contatoId}
                                            onChange={e => setContatoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {contatosId.map(contato=> (
                                                    <option key={`contato${contato.id}`} value={contato.id}>{contato.nomecontato}</option>
                                                ))}                                                                                 
                                        </Input>
                                    </Col>                                  
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="oportunidadeId">Oportunidade</Label>
                                        <Input required type="select" id="cboOportunidadeId"
                                            name="oportunidadeId"
                                            value={oportunidadeId}
                                            onChange={e => setOportunidadeId(e.target.value)}>
                                             <option value={undefined} defaultValue>Selecione...</option>
                                                {oportunidadesId.map(oportunidade=> (
                                                    <option key={`oportunidade${oportunidade.id}`} value={oportunidade.id}>{oportunidade.nomeoportunidade}</option>
                                                ))}                                                                             
                                        </Input> 
                                    </Col>
                                </FormGroup>                   
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Anotação</Label>
                                        <Input type="textarea" rows="5"
                                            id="txtAnotacao"
                                            name="anotacao"
                                            value={anotacao}
                                            onChange={e => setAnotacao(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="cancelada">Cancelada</Label>
                                        <AppSwitch id="rdCancelada" className={'switch-ativo'}  label color={'success'} size={'sm'}
                                            name="cancelada"
                                            onChange={handleInputChange}
                                            checked={cancelada === 1 ? true : false}
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