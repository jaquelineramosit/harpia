import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, 
        TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from "react-router-dom";
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import './style.css';
import { reaisMask } from '../../../mask'
import api from '../../../../src/services/api';

export default function Oportunidades() {

    const colorCard = "success";
    const oportunidadeId = 2;
    const [nomeoportunidade, setNomeOportunidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [proprietarioId, setProprietarioId] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [fasepipeId, setFasePipeId] = useState('');
    const [temperaturaFechamentoId, setTemperaturaFechamentoId] = useState('');
    const [valor, setValor] = useState('');
    const [expectativafechamento, setExpectativaFechamento] = useState('');
    const [anexoId, setAnexoId] = useState('');
    const [ativo, setAtivo] = useState('');

    //listas
    const [lstClientes, setlstClientes] = useState([]);
    const [lstProdutos, setlstProdutos] = useState([]);
    const [lstContatos, setlstContatos] = useState([]);
    const [lstProprietarios, setlstProprietarios] = useState([]);
    const [lstFasesPipe, setlstFasesPipe] = useState([]);
    const [lstAnotacoes, setlstAnotacoes] = useState([]);
    const [lstTemperaturasFechamento, setlstTemperaturasFechamento] = useState([]);
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('clientes').then(response => {
            setlstClientes(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('produtos').then(response => {
            setlstProdutos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('contatos').then(response => {
            setlstContatos(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('temperatura-fechamento').then(response => {
            setlstTemperaturasFechamento(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('fases-pipe-nomePipe/Harpia').then(response => {
            setlstFasesPipe(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get('usuario-por-perfilAcesso/Vendedor').then(response => {
            setlstProprietarios(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
        api.get(`anotacoes-oportunidade/${oportunidadeId}`).then(response => {
            setlstAnotacoes(response.data);
        })
    }, [usuarioId]);
    

    async function handleOportunidades(e) {
        e.preventDefault();

        const data = {
            nomeoportunidade,
            proprietarioId,
            descricao,
            clienteId,
            contatoId,
            produtoId,
            fasepipeId,
            valor,
            expectativafechamento,
            temperaturaFechamentoId,
            anexoId,
            ativo
        }
        try {
            const response = await api.post('oportunidades', data, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            alert(`Feito o cadastro com sucesso`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleOportunidades}>
                <Row>
                    <Col xs="9" md="9">
                        <Card>
                            <CardHeader>
                                <strong>Oportunidades</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeOportunidade">Nome Oportunidade</Label>
                                        <Input type="text" required id="txtNomeOportunidade" placeholder="Digite o nome da Oportunidade"
                                            value={nomeoportunidade}
                                            onChange={e => setNomeOportunidade(e.target.value)} />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="proprietarioId">Proprietário</Label>
                                        <Input type="select" required name="select" id="cboProprietario" multiple={false}
                                            value={proprietarioId}
                                            onChange={ e => setProprietarioId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstProprietarios.map(proprietario=> (
                                                <option key={proprietario.id} value={proprietario.usuarioId}>{proprietario.nomeusuario}</option>
                                            ))}                                            
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input type="select" required name="select" id="cboCliente"
                                            value={clienteId}
                                            onChange={e => setClienteId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstClientes.map(cliente => (
                                                <option key={cliente.id} value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="select" required name="select" id="cboContato"
                                            value={contatoId}
                                            onChange={e => setContatoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstContatos.map(contato => (
                                                <option key={contato.id} value={contato.id}>{contato.nomecontato}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="produtoId">Produto</Label>
                                        <Input type="select" required name="select" id="cboProduto"
                                            value={produtoId}
                                            onChange={e => setProdutoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstProdutos.map(produto => (
                                                <option key={produto.id} value={produto.id}>{produto.nomeproduto}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="text" required id="txtValor"
                                            value={valor}
                                            onChange={e => setValor(reaisMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="6">
                                        <Label htmlFor="fasePipeId">Fase do Pipe</Label>
                                        <Input type="select" required name="select" id="cboFasePipe"
                                            value={fasepipeId}
                                            onChange={e => setFasePipeId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstFasesPipe.map(fasespipe => (
                                                <option key={fasespipe.id} value={fasespipe.id}>{fasespipe.nomefase}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="dataExpecFecha">Expectativa de Fechamento</Label>
                                        <Input type="date" required name="select" id="txtExpectativaFechamento"
                                            value={descricao}
                                            onChange={e => setExpectativaFechamento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="temperaturaFechamento">Temperatura Fechamento</Label>
                                        <Input type="select" required name="select" id="cboTemperaturaFechamento"
                                            value={temperaturaFechamentoId}
                                            onChange={e => setTemperaturaFechamentoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstTemperaturasFechamento.map(tempFechamento => (
                                                <option key={tempFechamento.id} value={tempFechamento.id}>{tempFechamento.temperaturafechamento}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                   
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="12">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="3"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="anexo">Anexo</Label>
                                        <Input type="file" required name="select" id="cboAnexo" multiple={true}
                                            value={anexoId}
                                            onChange={e => setAnexoId(e.target.value)}>                                            
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativa</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={ativo}
                                            onChange={e => setAtivo(e.target.value)}
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
                    <Col xs="3" md="3">
                    <Card>
                        <CardHeader>
                            Anotações
                        </CardHeader>
                        <CardBody className="card-body-anotacoes">                            
                            <ListGroup className="list-group-accent" tag={'div'}>                                
                                {lstAnotacoes.map((anotacao, index) => (
                                    (index % 2) === 0 ? (
                                        <ListGroupItem key={`lstGroup${index}`} action tag="a" href={`/#/anotacoes/${anotacao.id}`} className="list-group-item-accent-success list-group-item-divider p-3">
                                            {/* <Link key={`lstGroup${index}`} to={`/anotacoes/${anotacao.id}`} className="bg-gray-100"> */}
                                            
                                                <div>{anotacao.anotacao}</div> {/* anotação */}
                                                <div>
                                                    <small className="text-muted mr-3">
                                                        <i className="fa fa-users"></i>&nbsp; {anotacao.nomecliente} {/* cliente */}
                                                    </small>
                                                </div>
                                                <div>
                                                    <small className="text-muted">
                                                        <i className="fa fa-address-book-o"></i> {anotacao.nomecontato} {/* contato */}
                                                    </small>    
                                                </div>
                                            {/* </Link> */}
                                        </ListGroupItem>                                        
                                    ) :
                                    (
                                        <ListGroupItem key={`lstGroup${index}`} action tag="a" href={`/#/anotacoes/${anotacao.id}`} className="list-group-item-accent-info list-group-item-divider p-3">
                                            <div>{anotacao.anotacao}</div> {/* anotação */}
                                            <div>
                                                <small className="text-muted mr-3">
                                                    <i className="fa fa-users"></i>&nbsp; {anotacao.nomecliente} {/* cliente */}
                                                </small>
                                            </div>
                                            <div>
                                                <small className="text-muted">
                                                    <i className="fa fa-address-book-o"></i> {anotacao.nomecontato} {/* contato */}
                                                </small>    
                                            </div>
                                        </ListGroupItem>
                                    )                                   
                                ))} 
                                
                                {/* <ListGroupItem action tag="a" href="#" className="list-group-item-accent-info list-group-item-divider">
                                    <div className="avatar float-right">
                                    <img className="img-avatar" src="assets/img/avatars/4.jpg" alt="admin@bootstrapmaster.com"></img>
                                    </div>
                                    <div>Skype with <strong>Megan</strong></div>
                                    <small className="text-muted mr-3">
                                    <i className="icon-calendar"></i>&nbsp; 4 - 5pm
                                    </small>
                                    <small className="text-muted">
                                    <i className="icon-social-skype"></i> On-line
                                    </small>
                                </ListGroupItem>
                                <ListGroupItem className="list-group-item-accent-secondary bg-light text-center font-weight-bold text-muted text-uppercase small">Ontem</ListGroupItem>
                                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-danger list-group-item-divider">
                                    <div>New UI Project - <strong>deadline</strong></div>
                                    <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 10 - 11pm</small>
                                    <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                                    <div className="avatars-stack mt-2">
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    </div>
                                </ListGroupItem>
                                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-success list-group-item-divider">
                                    <div><strong>#10 Startups.Garden</strong> Meetup</div>
                                    <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 1 - 3pm</small>
                                    <small className="text-muted"><i className="icon-location-pin"></i>&nbsp; Palo Alto, CA</small>
                                </ListGroupItem>
                                <ListGroupItem action tag="a" href="#" className="list-group-item-accent-primary list-group-item-divider">
                                    <div><strong>Team meeting</strong></div>
                                    <small className="text-muted mr-3"><i className="icon-calendar"></i>&nbsp; 4 - 6pm</small>
                                    <small className="text-muted"><i className="icon-home"></i>&nbsp; creativeLabs HQ</small>
                                    <div className="avatars-stack mt-2">
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/3.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/4.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/5.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    <div className="avatar avatar-xs">
                                        <img src={'assets/img/avatars/8.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                                    </div>
                                    </div>
                                </ListGroupItem> */}
                            </ListGroup>                                
                        </CardBody>
                    </Card>                        
                </Col>
            </Row>
        </Form>
    </div>
    );
}
