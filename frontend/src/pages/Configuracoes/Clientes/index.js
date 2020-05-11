import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Clientes() {
    const [nomecliente, setNomecliente] = useState('');
    const [razaosocial, setRazaosocial] = useState('');
    const [tipopessoa, setTipopessoa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [site, setSite] = useState('');
    const [email, setEmail] = useState('');
    const [paisId, setPaisId] = useState('');
    const [segmentomercadoId, setSegmentomercadoId] = useState('');
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');    
    


    async function handleClientes(e) {
        e.preventDefault();
        
        const data = {
            nomecliente,
            razaosocial,
            tipopessoa,
            cnpj,
            logradouro,
            numero,
            complemento,
            bairro,
            cep,
            cidade,
            uf,
            telefone,
            cpf,
            contatoId,
            site,
            email,
            paisId,
            segmentomercadoId,
            ativo
        };
    
        try {
            const response = await api.post('clientes', data, {
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
            <Form onSubmit={handleClientes}>
                <Row>                              
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Clientes</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="Nomecliente">Nome Cliente</Label>
                                        <Input type="text" required id="txtNomecliente" placeholder="Digite o nome do Cliente"
                                        value={nomecliente}
                                        onChange={ e => setNomecliente(e.target.value)}/>                                        
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Razaosocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaosocial" placeholder="Digite o nome do Cliente"
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
                                <Col md="4">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtLogradouro"  
                                            placeholder="Digite o Logradouro"
                                            value={logradouro}
                                            onChange={ e => setLogradouro(e.target.value)} />                                          
                                        </InputGroup>       
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
                                </FormGroup>
                                <FormGroup row>
                                    
                                <Col md="2">
                                        <Label htmlFor="Numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                        value={numero}
                                        onChange={ e => setNumero(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento" 
                                        value={complemento}
                                        onChange={ e => setComplemento(e.target.value)}/>
                                    </Col>                               
                                    <Col md="2">
                                        <Label htmlFor="Tipopessoa">Tipo Pessoa</Label>
                                        <Input required type="select" name="select" id="txtTipopessoa"
                                        value={tipopessoa}
                                        onChange={ e => setTipopessoa(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value="F">Física</option>
                                            <option value="M">Jurídica</option>                                        
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                    <Label htmlFor="paisId">País</Label>
                                        <Input type="select" required name="select" id="ddlPaisId"
                                        value={paisId}
                                        onChange={ e => setPaisId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option  value={1}>Brasil</option>
                                            <option value={2}>USA</option>
                                            <option  value={3}>Holanda</option>

                                        </Input>      
                                    </Col>              



                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
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
                                                                           
                                </FormGroup>                        
                                <FormGroup row>                     
                                    <Col md="3">
                                        <Label htmlFor="CPF">CPF</Label>
                                        <Input type="text" required id="txtCPF" placeholder="Digite o número do CPF"
                                        value={cpf}
                                        onChange={ e => setCpf(e.target.value)} />                                    
                                    </Col>
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
                                    <Label htmlFor="segmentomercadoId,">Segmento de Mercado</Label>
                                        <Input type="select" required name="select" id="ddlSegmentomercadoId"
                                        value={segmentomercadoId}
                                        onChange={ e => setSegmentomercadoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Segmento1</option>
                                            <option value={2}>Segmento2</option>
                                           
                                        </Input>        
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
                                        <Input type="select" required name="select" id="ddlContatoId"
                                        value={contatoId}
                                        onChange={ e => setContatoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>contato1</option>
                                            <option value={2}>contato2</option>
                                           
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