import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {telMask, celMask, cepMask, numMask} from '../../../mask'
import { Redirect } from 'react-router-dom';

import api from '../../../../src/services/api';

const dateFormat = require('dateformat');

export default function Contatos(props) {
    const [redirect, setRedirect] = useState(false);

    // parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);  
    var action = params.get('action');
    var contatoIdParam = props.match.params.id; 
    const usuarioId = localStorage.getItem('userId');
    
    // estados dos inputs
    const [nomecontato, setNomeContato] = useState('');
    const [proprietarioId, setProprietarioId] = useState('');
    const [tipocontatoId, setTipocontatoId] = useState('');
    const [departamentoId, setDepartamentoId] = useState('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [datanasc, setDatanasc] = useState('');
    const [email, setEmail] = useState('');
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [cargoId, setCargoId] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [uf, setUf] = useState('');
    const [usuarioautorizador, setUsuarioautorizador] = useState(1);
    const [ativo, setAtivo] = useState(1);

    // estados combos dinâmicos
    const [departamentosId, setdepartamentosId] = useState([]);
    const [proprietrariosId, setProprietariosId] = useState([]);
    const [tiposcontatoId, setTiposContatoId] = useState([]);
    const [cargosId, setCargosId] = useState([]);
    const [clientesId, setClientesId] = useState([]);

    // dados dos combos
    useEffect(() => {
        api.get('clientes').then(response => {
            setClientesId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('usuarios').then(response => {
            setProprietariosId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('departamentos').then(response => {
            setdepartamentosId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('tipos-contato').then(response => {
            setTiposContatoId(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('cargos').then(response => {
            setCargosId(response.data);
        })
    }, [usuarioId]);

        useEffect(() => {
            if ( action === 'edit' && contatoIdParam !== '' ) {
                api.get(`contatos/${contatoIdParam}`).then(response => {                                         
                    setNomeContato(response.data.nomecontato);
                    setProprietarioId(response.data.proprietarioId);
                    setDepartamentoId(response.data.departamentoId);
                    setEmail(response.data.email);
                    response.data.usuarioautorizador === 1 ? setUsuarioautorizador(1) : setUsuarioautorizador(0);
                    setCargoId(response.data.cargoId);
                    setTipocontatoId(response.data.tipocontatoId);
                    response.data.dataNasc === 'null' ? setDatanasc("9999-99-99") : setDatanasc(dateFormat(response.data.datanasc, "yyyy-mm-dd"));
                    setTelefone(response.data.telefone);
                    setCelular(response.data.celular);
                    setLogradouro(response.data.logradouro);
                    setNumero(response.data.numero);
                    setComplemento(response.data.complemento);
                    setBairro(response.data.bairro);
                    setCep(response.data.cep);
                    setCidade(response.data.cidade);
                    setUf(response.data.uf);
                    response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);                    
                });            
            } else {
                return;
            }
        }, [contatoIdParam]);
    
        function handleReset() {
            setRedirect(true);
        };
    
        function handleInputChange(event) {
            var { name, value } = event.target;
    
            switch (name) {
                case 'ativo': 
                    if ( ativo === 1 ) {
                        setAtivo(0);
                    } else {
                        setAtivo(1);
                    }
                    break;
                case 'usuarioautorizador': 
                    if ( usuarioautorizador === 1 ) {
                        setUsuarioautorizador(0);
                    } else {
                        setUsuarioautorizador(1);
                    }
                break;
                case 'cep':
                    setCep(cepMask(value));
                    break;
                case 'numero':
                    setNumero(numMask(value));
                    break;
                case 'telefone':
                    setTelefone(telMask(value));
                    break;
                case 'celular':
                    setCelular(celMask(value));
                    break;
            }
        };        

    async function handleContatos(e) {
        e.preventDefault();

        const data =  {
            proprietarioId,
            nomecontato,
            tipocontatoId,
            departamentoId,
            usuarioautorizador,
            telefone,
            celular,
            datanasc,
            email,
            cep,
            logradouro,
            numero,
            cargoId,
            complemento,
            bairro,
            cidade,
            uf,
            ativo
        };

        if( action === 'edit' ) {
            try {
                const response = await api.put(`contatos/${contatoIdParam}`, data, {
                    headers: {
                        Authorization : usuarioId,
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
                    const response = await api.post('contatos', data, {
                        headers: {
                            Authorization : 18,
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
            { redirect && <Redirect to="/lista-contatos" /> }
            <Form onSubmit={handleContatos} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Contatos</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                     <Col md="3">
                                        <Label htmlFor="NomeContato">Nome Contato</Label>
                                        <Input type="text" required id="txtNomecontato" placeholder="Digite o nome do Contato"
                                            name="nomecontato"
                                            value={nomecontato}
                                            onChange={e => setNomeContato(e.target.value)}
                                        />
                                    </Col>
                                    {/* <Col md="3">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input type="select" required id="cboClienteId"
                                            name="clienteId"
                                            value={clienteId}
                                            onChange={e => setC(e.target.value)}
                                        >
                                        <option value={undefined} defaultValue>Selecione...</option>
                                            {clientesId.map(cliente=> (
                                                <option value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col> */}
                                    <Col md="3">
                                    <Label htmlFor="prorpietarioId">Proprietario</Label>
                                        <Input type="select" required id="cboProprietarioId"
                                            name="proprietarioId"
                                            value={proprietarioId}
                                            onChange={e => setProprietarioId(e.target.value)}
                                        >
                                        <option value={undefined} defaultValue>Selecione...</option>
                                            {proprietrariosId.map(proprietario=> (
                                                <option key={`proprietario${proprietario.id}`} value={proprietario.id}>{proprietario.nome}</option>
                                            ))}

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="departamentoId">Departamento</Label>
                                        <Input type="select" required id="cboDepartamentoId"
                                            name="departamentoId"
                                            value={departamentoId}
                                            onChange={e => setDepartamentoId(e.target.value)}
                                        >
                                        <option value={undefined} defaultValue>Selecione...</option>
                                            {departamentosId.map(departamento=> (
                                                <option key={`departamento${departamento.id}`}  value={departamento.id}>{departamento.departamento}</option>
                                            ))}

                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="E-mail">E-mail</Label>
                                        <InputGroup>
                                        <Input type="email" required id="txtEmail" placeholder="Digite o e-mail"
                                            name="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                        />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-envelope"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="rdUsuarioAutorizador">Autorizador</Label>
                                        <AppSwitch id="rdUsuarioAutorizador" className={'switch-ativo'}  label color={'success'} size={'sm'}
                                            checked={usuarioautorizador === 1 ? true : false}
                                            name="usuarioautorizador"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                 </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="cargoId">Cargo</Label>
                                        <Input type="select" required id="cboCargoId"
                                            name="cargoId"
                                            value={cargoId}
                                            onChange={e => setCargoId(e.target.value)}
                                        >
                                        <option value={undefined} defaultValue>Selecione...</option>
                                            {cargosId.map(cargo=> (
                                                <option key={`cargo${cargo.id}`}  value={cargo.id}>{cargo.nomecargo}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="tipoContatoId">Tipo Contato</Label>
                                        <Input type="select" required id="cboTipoContatoId"
                                            name="tipocontatoId"
                                            value={tipocontatoId}
                                            onChange={e => setTipocontatoId(e.target.value)}
                                        >
                                            <option value={undefined}>Selecione...</option>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tiposcontatoId.map(tipoContato=> (
                                                <option key={`tipoContato${tipoContato.id}`}  value={tipoContato.id}>{tipoContato.tipocontato}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="datanasc">Data de nascimento</Label>
                                        <Input type="date" required id="txtdatanasc"
                                            name="datanasc"
                                            value={datanasc}
                                            onChange={e => setDatanasc(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                 <FormGroup row>                                     
                                    <Col md="3">
                                    <Label htmlFor="Telefone">Telefone</Label>
                                        <InputGroup>
                                            <Input type="text"  id="txtTelefone" placeholder="(11) 9999-9999"
                                                name="telefone"
                                                value={telefone}
                                                onChange={e => setTelefone(e.target.value)}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-phone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Celular">Celular</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtCelular" placeholder="(11) 99999-9999"
                                                name="celular"
                                                value={celular}
                                                onChange={e => setCelular(e.target.value)}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary icon-screen-smartphone"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="CEP">CEP</Label>
                                        <InputGroup>
                                            <Input id="txtCEP" size="16" required type="text" placeholder="00000-000"
                                                name="cep"
                                                value={cep}
                                                onChange={e => setCep(e.target.value)}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="button" color="secondary fa fa-truck"></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                 <FormGroup row>
                                   <Col md="3">
                                        <Label htmlFor="Logradouro">Logradouro</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtLogradouro"
                                                placeholder="Digite o Logradouro"
                                                name="logradouro"
                                                value={logradouro}
                                                onChange={e => setLogradouro(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="numero">Número</Label>
                                        <InputGroup>
                                            <Input type="text" required id="txtNumero"
                                                placeholder="Digite o número"
                                                name="numero"
                                                value={numero}
                                                onChange={e => setNumero(e.target.value)}
                                            />
                                        </InputGroup>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="Bairro">Bairro</Label>
                                        <Input type="text" required id="txtBairro" placeholder="Digite o Bairro"
                                            name="bairro"
                                            value={bairro}
                                            onChange={e => setBairro(e.target.value)}
                                        />
                                    </Col>                                    
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="Cidade">Cidade</Label>
                                        <Input type="text" required id="txtCidade" placeholder="Digite a Cidade"
                                            name="cidade"
                                            value={cidade}
                                            onChange={e => setCidade(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="UF">UF</Label>
                                        <Input type="select" required id="cboUF"
                                            name="uf"
                                            value={uf}
                                            onChange={e => setUf(e.target.value)}
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
                                    <Col md="3">
                                        <Label htmlFor="Complemento">Complemento</Label>
                                        <Input type="text" id="txtComplemento" placeholder="Digite o Complemento"
                                            name="complemento"
                                            value={complemento}
                                            onChange={e => setComplemento(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="rdAtivo">Ativo</Label>
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
