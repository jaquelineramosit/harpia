import React, { useState } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {cnpjMask, telMask, celMask } from '../../../mask'
import api from '../../../../src/services/api';

export default function Distribuidores() {
    const [nomedistribuidor, setNomeDistribuidor] = useState('');
    const [razaosocial, setRazaoSocial] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [contato, setContato] = useState('');
    const [site, setSite] = useState('');
    const [email, setEmail] = useState('');
    const [ativo, setAtivo] = useState("true");
    const [celular, setCelular] = useState("");
    const usuarioId = localStorage.getItem('userId');



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

        try {
            const response = await api.post('distribuidores', data, {
                headers: {
                    Authorization : usuarioId,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleDistribuidores}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Distribuidores</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeDistribuidor">Nome Distribuidor</Label>
                                        <Input type="text" required id="txtNomeDistribuidor" placeholder="Digite o nome do Distribuidor"
                                        value={nomedistribuidor}
                                        onChange={ e => setNomeDistribuidor(e.target.value)}/>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite a razão social do Distribuidor"
                                        value={razaosocial}
                                        onChange={ e => setRazaoSocial(e.target.value)}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="text" required name="select" id="txtContato" placeholder="Digite o nome do contato"
                                        value={contato}
                                        onChange={ e => setContato(e.target.value)}>
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="E-mail">E-mail</Label>
                                        <InputGroup>
                                            <Input type="email" required id="txtEmail" placeholder="Digite o e-mail"
                                            value={email}
                                            onChange={ e => setEmail(e.target.value)} />
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
                                            value={telefone}
                                            onChange={ e => setTelefone(telMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Celular">Celular</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCelular" placeholder="(11) 99999-9999"
                                                value={celular}
                                                onChange={ e => setCelular(celMask(e.target.value))} />
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
                                            value={site}
                                            onChange={ e => setSite(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj"
                                            placeholder="Digite a CNPJ"
                                            value={cnpj}
                                            onChange={ e => setCnpj(cnpjMask(e.target.value))} />
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
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
