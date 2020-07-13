import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';
import { Redirect } from 'react-router-dom';

const TiposContato = (props) => {
    const [redirect, setRedirect] = useState(false);

    // parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var tiposContatoIdParams = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [tipocontato, setTipoContato] = useState('');
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
    if (action === 'edit' && tiposContatoIdParams !== '') {
        api.get(`tipos-contato/${tiposContatoIdParams}`).then(response => {
            setTipoContato(response.data.tipocontato);
            response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
        });
    } else {
        return;
    }
    }, [tiposContatoIdParams]);

    function handleReset() {
        setRedirect(true);
    };

    function handleInputChange(event) {
        const { name, value } = event.target;

        switch (name) {            
            case 'ativo': 
                if ( ativo === 1 ) {
                    console.log('entrou ativo change');
                    setAtivo(0);
                } else {
                    console.log('entrou ativo change');
                    setAtivo(1);
                }
                break;           
        };
    };

    async function handleTiposContato(e) {
        e.preventDefault();

        const data = {
            tipocontato,
            ativo
        };

        if (action === 'edit') {

            try {
                const response = await api.put(`/tipos-contato/${tiposContatoIdParams}`, data, {
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
                    const response = await api.post('tipos-contato', data, {
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
            { redirect && <Redirect to="/lista-tipo-contato" /> }
            <Form onSubmit={handleTiposContato} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipos de Contato</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="tipocontato">Nome do Tipo do Contato</Label>
                                        <Input type="text" required id="txtTipoContato" placeholder="Digite o nome do Tipo de Contato"
                                            name="tipocontato"
                                            value={tipocontato}
                                            onChange={e => setTipoContato(e.target.value)}
                                        />
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

export default TiposContato;
