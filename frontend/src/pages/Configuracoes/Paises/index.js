import React, { useState , useEffect} from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Paises (props) {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var paisIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');
    
    const [nomepais, setNomePais] = useState('');
    const [sigla, setSigla] = useState('');
    const [moeda, setMoeda] = useState('');
    const [siglamoeda, setSiglaMoeda] = useState('');
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        if (action === 'edit' && paisIdParam !== '') {
            api.get(`paises/${paisIdParam}`).then(response => {
                setNomePais(response.data.nomepais);
                setSigla(response.data.sigla);
                setMoeda(response.data.moeda);
                setSiglaMoeda(response.data.siglamoeda);                
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [paisIdParam])

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

    async function handlePaises(e) {
        e.preventDefault();

        const data = {
            nomepais,
            sigla, 
            moeda, 
            siglamoeda,
            ativo
        }

        if ( action === 'edit' ) {
            try {
                const response = await api.put(`/paises/${paisIdParam}`, data, {
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
                    const response = await api.post('paises', data, {
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
            { redirect && <Redirect to="/lista-paises" /> }
            <Form onSubmit={handlePaises} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Países</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="nomePais">Nome do País</Label>
                                        <Input type="text" required id="txtNomePais" placeholder="Digite o país"
                                            name="nomepais"
                                            value={nomepais}
                                            onChange={e => setNomePais(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="sigla">Sigla do país</Label>
                                        <Input type="text" required id="txtSigla" placeholder="Digite a sigla"
                                            name="sigla"
                                            value={sigla}
                                            onChange={e => setSigla(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup> 
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="moeda">Moeda</Label>
                                        <Input type="text" required id="txtMoeda" placeholder="Digite moeda"
                                            name="moeda"
                                            value={moeda}
                                            onChange={e => setMoeda(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="siglaMoeda">Sigla da Moeda</Label>
                                        <Input type="text" required id="txtSiglamoeda" placeholder="Digite a sigla"
                                            name="siglamoeda"
                                            value={siglamoeda}
                                            onChange={e => setSiglaMoeda(e.target.value)}
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