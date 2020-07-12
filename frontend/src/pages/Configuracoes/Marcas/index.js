import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';
import { Redirect } from "react-router-dom";

const Marcas = (props) => {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var marcaIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomemarca, setNomemarca] = useState('');
    const [nacional, setNacional] = useState('');
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        if (action === 'edit' && marcaIdParam !== '') {
            api.get(`marcas/${marcaIdParam}`).then(response => {
                setNomemarca(response.data.nomemarca);
                setNacional(response.data.nacional);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [marcaIdParam]);

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

    async function handleMarcas(e) {
        e.preventDefault();

        const data = {
            nomemarca,
            nacional,
            ativo
        };

        if (action === 'edit') {
            try {
                const response = await api.put(`/marcas/${marcaIdParam}`, data, {
                    headers: {
                        Authorization: 6,
                    }
                });
                alert('Cadastro atualizado com sucesso.');
                setRedirect(true);  
            } catch (err) {
                alert('Erro na atualização, tente novamente.');
            }
        } else {

            if (action === 'novo') {
                try {
                    const response = await api.post('marcas', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert('Cadastro realizado com sucesso.');
                    setRedirect(true);  
                } catch (err) {
                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }

    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-marcas" /> }
            <Form onSubmit={handleMarcas} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Marcas</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeMarca">Nome da Marca</Label>
                                        <Input type="text" required id="txtNomeMarca" placeholder="Digite o nome do Pipe"
                                            name="nomemarca"
                                            value={nomemarca}
                                            onChange={e => setNomemarca(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nacional">Nacionalidade</Label>
                                        <Input type="text" required id="txtNacional" placeholder="Digite a nacionalidade"
                                            name="nacional"
                                            value={nacional}
                                            onChange={e => setNacional(e.target.value)} />
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

export default Marcas;
