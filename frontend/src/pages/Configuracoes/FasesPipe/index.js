import React, { useState,useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function FasesPipe(props) {
    const [redirect, setRedirect] = useState(false);

    // parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);  
    var action = params.get('action');
    var fasePipeIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');
    
    const [nomefase, setNomeFase] = useState('');
    const [pipeId, setPipeId] = useState('');    
    const [ativo, setAtivo] = useState(1);

    // combo dinamico
    const [pipesId, setPipesId] = useState([]);

    useEffect(() => {
        api.get('pipes').then(response => {
            setPipesId(response.data);
        })
    }, []);

    //edit
    useEffect(() => {
        if ( action === 'edit' && fasePipeIdParam !== '' ) {
            api.get(`fases-pipe/${fasePipeIdParam}`).then(response => {                           
                setNomeFase(response.data.nomefase);
                setPipeId(response.data.pipeId);                
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });            
        } else {
            return;
        }
    }, [fasePipeIdParam]);

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
     
    async function handleFasesPipe(e) {
        e.preventDefault();

        const data = {
            nomefase,
            pipeId,
            ativo
        }

        if ( action === 'edit' ) {
            try {
                const response = await api.put(`/fases-pipe/${fasePipeIdParam}`, data, {
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
                    const response = await api.post('fases-pipe', data, {
                        headers: {
                            Authorization: usuarioId,
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
            { redirect && <Redirect to="/lista-fases-pipes" /> }
            <Form onSubmit={handleFasesPipe} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Fases Pipe</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                            <Label htmlFor="nomeFase">Nome da Fase</Label>
                                            <Input required type="text" id="txtNomeFase" placeholder="Digite o Nome da Fase"
                                                name="nomefase"
                                                value={nomefase}
                                                onChange={ e => setNomeFase(e.target.value)}
                                            />
                                    </Col>                               
                                    <Col md="4">
                                            <Label htmlFor="pipeId">Pipe</Label>
                                            <Input required type="select" id="cboPipeId"
                                                name="pipeId"
                                                value={pipeId}
                                                onChange={ e => setPipeId(e.target.value)}>
                                                    <option value={undefined} defaultValue>Selecione...</option>
                                                    {pipesId.map(pipe=> (
                                                        <option value={pipe.id}>{pipe.nomepipe}</option>
                                                    ))}
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