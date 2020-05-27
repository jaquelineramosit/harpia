import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Marcas() {
    const [nomemarca, setNomeMarca] = useState('');
    const [nacional, setNacional] = useState('');
    const [ativo, setAtivo] = useState('');
    const usuarioId = localStorage.getItem('userId');



    async function handleMarcas(e) {
        e.preventDefault();

        const data = {
            nomemarca,
            nacional,
            ativo
        }
        try {
            const response = await api.post('marcas', data, {
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
            <Form onSubmit={handleMarcas}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Marcas</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeMarca">Nome da Marca</Label>
                                        <Input type="text" required id="txtNomeMarca" placeholder="Digite o nome do Pipe"
                                            value={nomemarca}
                                            onChange={e => setNomeMarca(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nacional">Nacionalidade</Label>
                                        <Input type="text" required id="txtNacional" placeholder="Digite a nacionalidade"
                                            value={nacional}
                                            onChange={e => setNacional(e.target.value)} />
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