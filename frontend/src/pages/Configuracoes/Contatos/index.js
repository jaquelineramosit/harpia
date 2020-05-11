import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Contatos() {
    const [proprietarioId, setProprietarioId] = useState('');
    const [nomecontato, setNomecontato] = useState('');
    const [tipocontatoId, setTipocontatoId] = useState('');
    const [departamentoId, setDepartamentoId] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [cargoId, setCargoId] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [usuarioautorizador, setUsuarioautorizador] = useState('');
    const [celular, setCelular] = useState('');
    const [datanasc, setDatanasc] = useState('');
    const [email, setEmail] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');    
    


    async function handleContatos(e) {
        e.preventDefault();
        
        const data = {
            proprietarioId, 
            nomecontato,
            tipocontatoId, 
            departamentoId, 
            logradouro, 
            cargoId, 
            complemento, 
            bairro,
            cidade, 
            uf,
            telefone,
            usuarioautorizador, 
            celular, 
            datanasc, 
            email, 
            cep,          
            ativo
                    }
        try {
            const response = await api.post('contatos', data, {
                headers: {
                    Authorization : 18,
                }
            });
            alert(`Feito o cadastro com sucesso ${response.id}`);      
           
        } catch (err) {
    
            alert('Erro no cadastro, tente novamente.');    
        }
    }

    return (        
        <div className="animated fadeIn">
            <Form onSubmit={handleContatos}>
                <Row>                              
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Contatos</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="Nomecontato">Nome Contato</Label>
                                        <Input type="text" required id="txtNomecontato" placeholder="Digite o nome do Contato"
                                        value={nomecontato}
                                        onChange={ e => setNomecontato(e.target.value)}/>                                        
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                        value={bairro}
                                        onChange={ e => setBairro(e.target.value)}
                                         />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="CEP">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCEP" size="16" required type="text" placeholder="00000-000"
                                            value={cep}
                                            onChange={ e => setCep(e.target.value)} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>                                    
                                    </Col>
                                    <Col md="2">
                                    <Label htmlFor="departamentoId">Departamento</Label>
                                        <Input type="select" required name="select" id="ddlDepartamentoId"
                                        value={departamentoId}
                                        onChange={ e => setDepartamentoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>departamentoId1</option>
                                            <option value={2}>departamentoId2</option>
                                            
                                        </Input>      
                                    </Col>                                                                                
                                </FormGroup>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtLogradouro"  
                                            placeholder="Digite o Logradouro"
                                            value={logradouro}
                                            onChange={ e => setLogradouro(e.target.value)} />                                          
                                        </InputGroup>       
                                    </Col>                                                     
                                    <Col md="2">
                                        <Label htmlFor="Cidade">Cidade</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite a Cidade"
                                        value={cidade}
                                        onChange={ e => setCidade(e.target.value)} />                                    
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="UF">UF</Label>
                                        <Input type="select" required name="select" id="ddlUF"
                                        value={uf}
                                        onChange={ e => setUf(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value="1">São Paulo</option>
                                            <option value="2">Rio de Janeiro</option>
                                            <option value="3">Minas Gerais</option>
                                            <option value="4">Paraná</option>
                                            <option value="5">Santa Catarina</option>
                                        </Input>
                                    </Col>  
                                    <Col md="2">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento" 
                                        value={complemento}
                                        onChange={ e => setComplemento(e.target.value)}/>
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
                                <Col md="2">
                                        <Label htmlFor="datanasc">Data de nascimento</Label>
                                        <Input type="date" required id="txtdatanasc"
                                        value={datanasc}
                                        onChange={ e => setDatanasc(e.target.value)} />
                                    </Col>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Autorizador</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={usuarioautorizador}
                                        onChange={ e => setUsuarioautorizador(e.target.value)}
                                        />                                    
                                    </Col>                                     
                                </FormGroup>
                                <FormGroup row> 
                                <Col md="2">
                                    <Label htmlFor="proprietarioId">Proprietario</Label>
                                        <Input type="select" required name="select" id="ddlProprietarioId"
                                        value={proprietarioId}
                                        onChange={ e => setProprietarioId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={6}>ProprietarioID1</option>
                                            <option value={7}>ProprietarioID2</option>
                                         
                                        </Input>      
                                    </Col>                                         
                                    <Col md="2">
                                    <Label htmlFor="tipocontatoId">Tipo Contato</Label>
                                        <Input type="select" required name="select" id="ddlTipocontatoId"
                                        value={tipocontatoId}
                                        onChange={ e => setTipocontatoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Contato1</option>
                                            <option value={2}>Contato2</option>
                                            
                                        </Input>      
                                    </Col>
                                   
                                    <Col md="2">
                                    <Label htmlFor="cargoId">Cargo</Label>
                                        <Input type="select" required name="select" id="ddlCargoId"
                                        value={cargoId}
                                        onChange={ e => setCargoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>cargoId1</option>
                                            <option value={2}>cargoId2</option>
                                          
                                        </Input>      
                                    </Col>    
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