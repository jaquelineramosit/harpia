import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button ,CardFooter, Form,  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

const MotivoPerda = (props) => {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var motivoPerdaIdParams = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [motivoperda, setMotivoperda] = useState('');
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        if (action === 'edit' && motivoPerdaIdParams !== '') {
            api.get(`motivos-perda/${motivoPerdaIdParams}`).then(response => {
                setMotivoperda(response.data.motivoperda);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [motivoPerdaIdParams])

    function handleInputChange(event) {
        const { name } = event.target;

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

    async function handleMotivosPerda(e) {
        e.preventDefault();

        const data = {
            motivoperda,
            ativo
        };

        if (action === 'edit') {

            try {
                const response = await api.put(`/motivos-perda/${motivoPerdaIdParams}`, data, {
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

            if (action === 'novo') {
                try {
                    const response = await api.post('motivos-perda', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert(`Cadastro realizado com sucesso.`);
                    setRedirect(true);  
                } catch (err) {

                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }


    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-motivos-perda" /> }
            <Form onSubmit={handleMotivosPerda} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Motivos de perda</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="motivoPerda">Motivo da Perda</Label>
                                        <Input type="text" required id="txtMotivoPerda" placeholder="Digite um motivo"
                                            name="motivoperda"
                                            value={motivoperda}
                                            onChange={e => setMotivoperda(e.target.value)} />
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
export default MotivoPerda;
