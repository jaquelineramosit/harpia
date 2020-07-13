import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {cnpjMask, telMask, celMask } from '../../../mask'
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Distribuidores(props) {
    const [redirect, setRedirect] = useState(false);
    
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var distribuidorIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomedistribuidor, setNomeDistribuidor] = useState('');
    const [razaosocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [contato, setContato] = useState('');
    const [site, setSite] = useState('');
    const [email, setEmail] = useState('');
    const [ativo, setAtivo] = useState(1);
    const [celular, setCelular] = useState('');


    useEffect(() => {
        if (action === 'edit' && distribuidorIdParam !== '') {
            api.get(`distribuidores/${distribuidorIdParam}`).then(response => {
                setNomeDistribuidor(response.data.nomedistribuidor);
                setRazaoSocial(response.data.razaosocial);
                setCnpj(response.data.cnpj);
                setTelefone(response.data.telefone);
                setContato(response.data.contato);
                setSite(response.data.site);
                setEmail(response.data.email);
                setCelular(response.data.celular);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [distribuidorIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;

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

    async function handleDistribuidores(e) {
        e.preventDefault();

        const data = {
            nomedistribuidor,
            cnpj,
            razaosocial,
            contato,
            telefone,
            celular,
            site,
            email,
            ativo
        };

        if ( action === 'edit' ) {
            try {
                const response = await api.put(`/distribuidores/${distribuidorIdParam}`, data, {
                    headers: {
                        Authorization: 18,
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
                    const response = await api.post('distribuidores', data, {
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
            { redirect && <Redirect to="/lista-distribuidores" /> }
            <Form onSubmit={handleDistribuidores} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Distribuidores</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeDistribuidor">Nome Distribuidor</Label>
                                        <Input type="text" required id="txtNomeDistribuidor" placeholder="Digite o nome do Distribuidor"
                                            name="nomedistribuidor"
                                            value={nomedistribuidor}
                                            onChange={ e => setNomeDistribuidor(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite a razão social do Distribuidor"
                                            name="razaosocial"
                                            value={razaosocial}
                                            onChange={ e => setRazaoSocial(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="text" required id="txtContato" placeholder="Digite o nome do contato"
                                            name="contato"
                                            value={contato}
                                            onChange={ e => setContato(e.target.value)}
                                        >
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="E-mail">E-mail</Label>
                                        <InputGroup>
                                            <Input type="email" required id="txtEmail" placeholder="Digite o e-mail"
                                                name="email"
                                                value={email}
                                                onChange={ e => setEmail(e.target.value)}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-envelope"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Telefone">Telefone</Label>
                                        <InputGroup>
                                            <Input type="text"  id="txtTelefone" placeholder="(11) 9999-9999"
                                                name="telefone"
                                                value={telefone}
                                                onChange={ e => setTelefone(telMask(e.target.value))}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Celular">Celular</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCelular" placeholder="(11) 99999-9999"
                                                name="celular"
                                                value={celular}
                                                onChange={ e => setCelular(celMask(e.target.value))}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-screen-smartphone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Site">Site</Label>
                                        <Input type="text" required id="txtSite" placeholder="Digite site da Empresa"
                                            name="site"
                                            value={site}
                                            onChange={ e => setSite(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj"
                                                placeholder="Digite a CNPJ"
                                                name="cnpj"
                                                value={cnpj}
                                                onChange={ e => setCnpj(cnpjMask(e.target.value))}
                                            />
                                        </InputGroup>
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
