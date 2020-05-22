import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Expectativasfechamento() {   
    const [expectativafechamento, setExpectativafechamento] = useState('');
    const [ativo, setAtivo] = useState('True');
    const usuarioId = localStorage.getItem('userId');



    async function handleExpectativasfechamento(e) {
        e.preventDefault();

        const data = {
            expectativafechamento,
            ativo
        }
        try {
            const response = await api.post('expectativas-fechamento', data, {
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
            <Form onSubmit={handleExpectativasfechamento}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Expectativas de Fechamento</strong>
                                <small>novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="expectativafechamento">Expectativas de Fechamento</Label>
                                        <Input type="date" required id="txtExpectativafechamento" placeholder="Digite o nome do Cargo"
                                            value={expectativafechamento}
                                            onChange={e => setExpectativafechamento(e.target.value)} />
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