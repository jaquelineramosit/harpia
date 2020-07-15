import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {telMask, cepMask,cnpjMask, cpfMask} from '../../../mask'
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

export default function Clientes(props) {
    const [redirect, setRedirect] = useState(false);

    //parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var clienteIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');
    
    const [nomecliente, setNomeCliente] = useState('');
    const [razaosocial, setRazaoSocial] = useState('');
    const [tipopessoa, setTipoPessoa] = useState('');
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
    const [segmentomercadoId, setSegmentoMercadoId] = useState('');
    const [ativo, setAtivo] = useState(1);

    const [contatosId, setContatosId] = useState([]);
    const [paisesId, setPaisesId] = useState([]);
    const [segmentosmercadoId, setSegmentosMercadoId] = useState([]);

    useEffect(() => {
        api.get('contatos').then(response => {
            setContatosId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('segmentos-mercado').then(response => {
            setSegmentosMercadoId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('paises').then(response => {
            setPaisesId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        if (action === 'edit' && clienteIdParam !== '') {
            api.get(`clientes/${clienteIdParam}`).then(response => {
                setNomeCliente(response.data.nomecliente);
                setRazaoSocial(response.data.razaosocial);
                setTipoPessoa(response.data.tipopessoa);
                setCnpj(response.data.cnpj);
                setLogradouro(response.data.logradouro);
                setNumero(response.data.numero);
                setComplemento(response.data.complemento);
                setBairro(response.data.bairro);
                setCep(response.data.cep);
                setCidade(response.data.cidade);
                setUf(response.data.uf);
                setTelefone(response.data.telefone);
                setCpf(response.data.cpf);
                setContatoId(response.data.contatoId);
                setSite(response.data.site);
                setEmail(response.data.email);
                setPaisId(response.data.paisId);
                setSegmentoMercadoId(response.data.segmentomercadoId);            
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [clienteIdParam]);

    function handleInputChange(event) {
        var { name } = event.target;

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

        if ( action === 'edit' ) {
            try {
                const response = await api.put(`/clientes/${clienteIdParam}`, data, {
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
                    const response = await api.post('clientes', data, {
                        headers: {
                            Authorization : 6,
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
            { redirect && <Redirect to="/lista-clientes" /> }
            <Form onSubmit={handleClientes}  onReset={handleReset}>
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
                                        <Label htmlFor="NomeCliente">Nome Cliente</Label>
                                        <Input type="text" required id="txtNomeCliente" placeholder="Digite o nome do Cliente"
                                            name="nomecliente"
                                            value={nomecliente}
                                            onChange={ e => setNomeCliente(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite o nome do Cliente"
                                            name="razaosocial"
                                            value={razaosocial}
                                            onChange={ e => setRazaoSocial(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="2">
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
                                    <Col md="4">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <InputGroup>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o Logradouro"
                                            name="logradouro"
                                            value={logradouro}
                                            onChange={ e => setLogradouro(e.target.value)}
                                        />
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            value={bairro}
                                            onChange={ e => setBairro(e.target.value)}
                                         />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                            name="numero"
                                            value={numero}
                                            onChange={ e => setNumero(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                     <Col md="3">
                                        <Label htmlFor="CEP">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCEP" size="16" required type="text" placeholder="00000-000"
                                                name="cep"
                                                value={cep}
                                                onChange={ e => setCep(cepMask(e.target.value))}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            value={complemento}
                                            onChange={ e => setComplemento(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="TipoPessoa">Tipo Pessoa</Label>
                                        <Input required type="select" name="select" id="cboTipopessoa"
                                            name="tipopessoa"
                                            value={tipopessoa}
                                            onChange={ e => setTipoPessoa(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value="F">Física</option>
                                            <option value="M">Jurídica</option>
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="paisId">País</Label>
                                        <Input type="select" required name="select" id="cboPais"
                                            name="paisId"
                                            value={paisId}
                                            onChange={ e => setPaisId(e.target.value)}
                                        >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {paisesId.map(pais => (
                                                <option value={pais.id}>{pais.nomepais}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            value={cidade}
                                            onChange={ e => setCidade(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="UF">UF</Label>
                                        <Input type="select" required name="select" id="cboUf"
                                            name="uf"
                                            value={uf}
                                            onChange={ e => setUf(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value="SP">São Paulo</option>
                                            <option value="RJ">Rio de Janeiro</option>
                                            <option value="MG">Minas Gerais</option>
                                            <option value="PR">Paraná</option>
                                            <option value="AC">Acre</option>
                                            <option value="Al">Alagoas</option>
                                            <option value="AP">Amapá</option>
                                            <option value="AM">Amazonas</option>
                                            <option value="BH">Bahia</option>
                                            <option value="CE">Ceará</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="GO">Goiás</option>
                                            <option value="DF">Distrito Federal</option>
                                            <option value="MA">Maranhão</option>
                                            <option value="MG">Mato Grosso</option>
                                            <option value="MT">Mato Grosso do Sul</option>
                                            <option value="PA">Pará</option>
                                            <option value="PB">Paraíba</option>
                                            <option value="PE">Pernambuco</option>
                                            <option value="PI">Piau</option>
                                            <option value="RN">Rio Grande do Norte</option>
                                            <option value="RS">Rio Grande do Sul</option>
                                            <option value="RR">Rondônia</option>
                                            <option value="SC">Santa Catarina</option>
                                            <option value="SE">Sergipe</option>
                                            <option value="TO">Tocantins</option>
                                        </Input>
                                    </Col>
                                    <Col md="2">
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
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="CPF">CPF</Label>
                                        <Input type="text" required id="txtCPF" placeholder="Digite o número do CPF"
                                            name="cpf"
                                            value={cpf}
                                            onChange={ e => setCpf(cpfMask(e.target.value))}
                                        />
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
                                    <Col md="3">
                                        <Label htmlFor="segmentomercadoId,">Segmento de Mercado</Label>
                                        <Input type="select" required name="select" id="cboSegmentomercadoId"
                                            name="segmentomercadoId"
                                            value={segmentomercadoId}
                                            onChange={ e => setSegmentoMercadoId(e.target.value)}
                                        >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {segmentosmercadoId.map(segmentomercado=> (
                                                <option value={segmentomercado.id}>{segmentomercado.nomesegmento}</option>
                                            ))}
                                        </Input>
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
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="select" required name="select" id="cboContatoId"
                                            name="contatoId"
                                            value={contatoId}
                                            onChange={ e => setContatoId(e.target.value)}
                                        >
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {contatosId.map(contato=> (
                                                    <option value={contato.id}>{contato.nomecontato}</option>
                                                ))}

                                        </Input>
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
