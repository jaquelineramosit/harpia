import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../services/api';

export default function TemperaturaFechamento() {   
    const [temperaturafechamento, setTemperaturaFechamento] = useState('');
    const [ativo, setAtivo] = useState('True');
    const usuarioId = localStorage.getItem('userId');


    async function handleTemperaturasFechamento(e) {
        e.preventDefault();

        const data = {
            temperaturafechamento,
            ativo
        }
        try {
            const response = await api.post('temperaturas-fechamento', data, {
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
            <Form onSubmit={handleTemperaturasFechamento}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Temperaturas de Fechamento</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="temperaturaFechamento">Temperatura de Fechamento</Label>
                                        <Input type="date" required id="txttemperaturaFechamento" placeholder="Digite o nome do Cargo"
                                            value={temperaturafechamento}
                                            onChange={e => setTemperaturaFechamento(e.target.value)} />
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