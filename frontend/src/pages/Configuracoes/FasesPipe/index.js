import React, { useState,useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function FasesPipe() {
    const [nomefase, setNomeFase] = useState('');
    const [pipeId, setPipeId] = useState('');
    const [pipesId, setPipesId] = useState('');
    const [ativo, setAtivo] = useState('true');
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('pipes').then(response => {
        setPipesId(response.data);
        })
        }, [usuarioId]);
     

    async function handleFasesPipe(e) {
        e.preventDefault();

        const data = {
            nomefase,
            pipeId,
            ativo
                    }
        try {
            const response = await api.post('fases-pipe', data, {
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
            <Form onSubmit={handleFasesPipe}>
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
                                            <Input required type="text" name="select" id="txtNomeFase" placeholder="Digite o Nome da Fase"
                                            value={nomefase}
                                            onChange={ e => setNomeFase(e.target.value)} />
                                    </Col>                               
                                    <Col md="4">
                                            <Label htmlFor="pipeId">Pipe</Label>
                                            <Input required type="select" name="select" id="cboPipeId"
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