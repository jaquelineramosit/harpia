import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {telMask, cepMask,cnpjMask, cpfMask} from '../../../mask'
import api from '../../../../src/services/api';

export default function Clientes() {
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
    const [contatosId, setContatosId] = useState([]);
    const [segmentosmercadoId, setSegmentosMercadoId] = useState([]);
    const [ativo, setAtivo] = useState("true");
    const usuarioId = localStorage.getItem('userId');

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
                                        <Label htmlFor="NomeCliente">Nome Cliente</Label>
                                        <Input type="text" required id="txtNomeCliente" placeholder="Digite o nome do Cliente"
                                        value={nomecliente}
                                        onChange={ e => setNomeCliente(e.target.value)}/>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="RazaoSocial">Razão Social</Label>
                                        <Input type="text" required id="txtRazaoSocial" placeholder="Digite o nome do Cliente"
                                        value={razaosocial}
                                        onChange={ e => setRazaoSocial(e.target.value)}/>
                                    </Col>
                                    <Col md="2">
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
                                    <Col md="4">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <InputGroup>
                                        <Input type="text" required id="txtLogradouro"
                                            placeholder="Digite o Logradouro"
                                            value={logradouro}
                                            onChange={ e => setLogradouro(e.target.value)} />
                                        </InputGroup>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                        value={bairro}
                                        onChange={ e => setBairro(e.target.value)}
                                         />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="Numero">Número</Label>
                                        <Input type="text" required id="txtNumero" placeholder="Digite apenas Números"
                                        value={numero}
                                        onChange={ e => setNumero(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                     <Col md="3">
                                        <Label htmlFor="CEP">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCEP" size="16" required type="text" placeholder="00000-000"
                                            value={cep}
                                            onChange={ e => setCep(cepMask(e.target.value))} />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                        value={complemento}
                                        onChange={ e => setComplemento(e.target.value)}/>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="TipoPessoa">Tipo Pessoa</Label>
                                        <Input required type="select" name="select" id="cboTipopessoa"
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
                                        value={paisId}
                                        onChange={ e => setPaisId(e.target.value)}>
                                            <option  value={undefined}>Selecione...</option>
                                            <option  value="AR">Argentina</option>
                                            <option  value="BO">Bolívia</option>
                                            <option  value="BR">Brasil</option>
                                            <option  value="CH">Chile</option>
                                            <option  value="CO">Colômbia</option>
                                            <option  value="EQ">Equador</option>
                                            <option  value="GU">Guiana</option>
                                            <option  value="GF">Guiana Francesa</option>
                                            <option  value="PA">Paraguai</option>
                                            <option  value="PE">Peru</option>
                                            <option  value="SU">Suriname</option>
                                            <option  value="UR">Uruguai</option>
                                            <option  value="VE">Venezuela</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                        value={cidade}
                                        onChange={ e => setCidade(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="UF">UF</Label>
                                        <Input type="select" required name="select" id="cboUf"
                                        value={uf}
                                        onChange={ e => setUf(e.target.value)}>
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
                                    <Col md="3">
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
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="CPF">CPF</Label>
                                        <Input type="text" required id="txtCPF" placeholder="Digite o número do CPF"
                                        value={cpf}
                                        onChange={ e => setCpf(cpfMask(e.target.value))} />
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
                                    <Col md="3">
                                        <Label htmlFor="segmentomercadoId,">Segmento de Mercado</Label>
                                        <Input type="select" required name="select" id="cboSegmentomercadoId"
                                        value={segmentomercadoId}
                                        onChange={ e => setSegmentoMercadoId(e.target.value)}>
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
                                        value={site}
                                        onChange={ e => setSite(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="select" required name="select" id="cboContatoId"
                                        value={contatoId}
                                        onChange={ e => setContatoId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {contatosId.map(contato=> (
                                                <option value={contato.id}>{contato.nomecontato}</option>
                                                ))}

                                        </Input>
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
