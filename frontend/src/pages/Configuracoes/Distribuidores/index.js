import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Distribuidores() {
    const [nomedistribuidor, setNomedistribuidor] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
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
                                        <Label htmlFor="nomedistribuidor">Nome Distribuidor</Label>
                                        <Input type="text" required id="txtNomecliente" placeholder="Digite o nome do Distribuidor"
                                        value={nomedistribuidor}
                                        onChange={ e => setNomedistribuidor(e.target.value)}/>                                        
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Razaosocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaosocial" placeholder="Digite a razão social do Distribuidor"
                                        value={razaosocial}
                                        onChange={ e => setRazaosocial(e.target.value)}/>                                        
                                    </Col>                                 
                                    <Col md="2">
                                        <Label htmlFor="Cnpj">CNPJ</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCnpj" 
                                            placeholder="Digite a CNPJ"
                                            value={cnpj}
                                            onChange={ e => setCnpj(e.target.value)} />                                          
                                        </InputGroup>                                       
                                    </Col>                              
                                </FormGroup>
                                <FormGroup row>
                                <Col md="3">
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
                                    <Col md="2">
                                    <Label htmlFor="Telefone">Telefone</Label>                                        
                                        <InputGroup>
                                            <Input type="text"  id="txtTelefoneFixo" placeholder="(11) 9999-9999"
                                            value={telefone}
                                            onChange={ e => setTelefone(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>                               
                                    <Col md="2">
                                        <Label htmlFor="Celular">Celular</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCelular" placeholder="(11) 99999-9999"
                                            value={celular}
                                            onChange={ e => setCelular(e.target.value)} />  
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-screen-smartphone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                                                        
                                    </Col>                                       
                                </FormGroup>                        
                                <FormGroup row>                     
                                    <Col md="3">
                                        <Label htmlFor="Site">Site</Label>
                                        <Input type="text" required id="txtSite" placeholder="Digite site da Empresa"
                                        value={site}
                                        onChange={ e => setSite(e.target.value)} />                                    
                                    </Col>
                                    <Col md="3">
                                    <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="text" required name="select" id="ddlContatoId" placeholder="Digite o nome do contato"
                                        value={contato}
                                        onChange={ e => setContato(e.target.value)}> 
                                            
                                        </Input>      
                                    </Col>                               
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