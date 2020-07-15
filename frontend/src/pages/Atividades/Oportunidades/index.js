import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form, 
        TabContent, TabPane, ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect } from "react-router-dom";
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import './style.css';
import { reaisMask } from '../../../mask';
import api from '../../../../src/services/api';

const dateFormat = require('dateformat');

export default function Oportunidades(props) {

    const [redirect, setRedirect] = useState(false);

    // parametros
    var search = props.location.search;
    var params = new URLSearchParams(search);  
    var action = params.get('action');
    var oportunidadeIdParam = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const colorCard = "success";
    
    // estados dos inputs
    const [nomeoportunidade, setNomeoportunidade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [proprietarioId, setProprietarioId] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [fasepipeId, setfasepipeId] = useState('');
    const [valor, setValor] = useState('');
    const [temperaturafechamentoId, setTemperaturaFechamentoId] = useState('');
    const [expectativafechamento, setExpectativaFechamento] = useState('');    
    const [anexoId, setAnexoId] = useState(1);
    const [motivoperdaId, setMotivoperdaId] = useState(13);
    const [ativo, setAtivo] = useState(1);

    // combos dinâmicos
    const [lstClientes, setlstClientes] = useState(['']);
    const [lstProdutos, setlstProdutos] = useState(['']);
    const [lstContatos, setlstContatos] = useState(['']);
    const [lstProprietarios, setlstProprietarios] = useState(['']);
    const [lstFasesPipe, setlstFasesPipe] = useState(['']);
    const [lstAnotacoes, setlstAnotacoes] = useState(['']);
    const [lstTemperaturasFechamento, setlstTemperaturasFechamento] = useState(['']);


    // carrega dados dos combos
    useEffect(() => {
        api.get('clientes').then(response => {
            setlstClientes(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('produtos').then(response => {
            setlstProdutos(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('contatos').then(response => {
            setlstContatos(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('temperatura-fechamento').then(response => {
            setlstTemperaturasFechamento(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('fases-pipe-nomePipe/Vendas').then(response => {
            setlstFasesPipe(response.data);
        })
    }, []);

    useEffect(() => {
        api.get('usuario-por-perfilAcesso/Vendedor').then(response => {
            setlstProprietarios(response.data);
        })
    }, []);

    useEffect(() => {
        api.get(`anotacoes-oportunidade/${oportunidadeIdParam}`).then(response => {
            setlstAnotacoes(response.data);
            console.log(lstAnotacoes);
        })
    }, [oportunidadeIdParam]);

    //edit
    useEffect(() => {
        if ( action === 'edit' && oportunidadeIdParam !== '' ) {
            api.get(`oportunidades/${oportunidadeIdParam}`).then(response => {                           
                setNomeoportunidade(response.data.nomeoportunidade);
                setClienteId(response.data.clienteId);
                setContatoId(response.data.contatoId);
                setProprietarioId(response.data.proprietarioId);
                setProdutoId(response.data.produtoId);
                setValor(response.data.valor);
                setfasepipeId(response.data.fasepipeId);
                setMotivoperdaId(response.data.motivoperdaId);
                response.data.expectativafechamento !== null ? setExpectativaFechamento(dateFormat(response.data.expectativafechamento, "yyyy-mm-dd")) : setExpectativaFechamento("9999-99-99");
                setTemperaturaFechamentoId(response.data.temperaturafechamentoId);
                setDescricao(response.data.descricao);
                setAnexoId(response.data.anexoId);                
                { response.data.ativo === 1 ? setAtivo(1) : setAtivo(0) }
            });            
        } else {
            return;
        }
    }, [oportunidadeIdParam]);

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
            case 'valor':
                setValor(reaisMask(value));
                break;            
        };
    };
    

    async function handleOportunidades(e) {
        e.preventDefault();

        const data =  {
            nomeoportunidade,
            proprietarioId,
            clienteId,
            contatoId,
            produtoId,
            valor,
            fasepipeId,
            motivoperdaId,
            expectativafechamento,
            temperaturafechamentoId,
            descricao,
            anexoId,
            ativo
        };

        if ( action === 'edit' ) {
            try {
                const response = await api.put(`oportunidades/${oportunidadeIdParam}`, data, {
                    headers: {
                        Authorization : 6,
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
                    const response = await api.post('oportunidades', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert(`Feito o cadastro com sucesso`);
                    setRedirect(true);          
                } catch (err) {
        
                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }        
    }

    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-oportunidades" /> }
            <Form onSubmit={handleOportunidades} onReset={handleReset}>
                <Row>
                    <Col md="9">
                        <Card>
                            <CardHeader>
                                <i className="fa fa-money"></i>
                                <strong>Oportunidades</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="nomeOportunidade">Nome Oportunidade</Label>
                                        <Input type="text" required id="txtNomeOportunidade" placeholder="Digite o nome da Oportunidade"
                                            name="nomeoportunidade"
                                            value={nomeoportunidade}
                                            onChange={e => setNomeoportunidade(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="proprietarioId">Proprietário</Label>
                                        <Input type="select" required id="cboProprietario" multiple={false}
                                            name="proprietarioId"
                                            value={proprietarioId}
                                            onChange={e => setProprietarioId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstProprietarios.map(proprietario=> (
                                                <option key={`proprietario${proprietario.id}`} value={proprietario.usuarioId}>{proprietario.nomeusuario}</option>
                                            ))}                                            
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input type="select" required id="cboCliente"
                                            name="clienteId"
                                            value={clienteId}
                                            onChange={e => setClienteId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstClientes.map(cliente => (
                                                <option key={`cliente${cliente.id}`} value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="select" required id="cboContato"
                                            name="contatoId"
                                            value={contatoId}
                                            onChange={e => setContatoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstContatos.map(contato => (
                                                <option key={`contato${contato.id}`} value={contato.id}>{contato.nomecontato}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="6">
                                        <Label htmlFor="produtoId">Produto</Label>
                                        <Input type="select" required id="cboProduto"
                                            name="produtoId"
                                            value={produtoId}
                                            onChange={e => setProdutoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstProdutos.map(produto => (
                                                <option key={`produto${produto.id}`} value={produto.id}>{produto.nomeproduto}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="6">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="text" required id="txtValor"
                                            name="valor"
                                            value={valor}
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="6">
                                        <Label htmlFor="fasePipeId">Fase do Pipe</Label>
                                        <Input type="select" required id="cboFasePipe"
                                            name="fasepipeId"
                                            value={fasepipeId}
                                            onChange={e => setfasepipeId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstFasesPipe.map(fasespipe => (
                                                <option key={`fasespipe${fasespipe.id}`} value={fasespipe.id}>{fasespipe.nomefase}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="dataExpecFecha">Expectativa de Fechamento</Label>
                                        <Input type="date" required id="txtExpectativaFechamento"
                                            name="expectativafechamento"
                                            value={expectativafechamento}
                                            onChange={e => setExpectativaFechamento(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="temperaturaFechamento">Temperatura Fechamento</Label>
                                        <Input type="select" required id="cboTemperaturaFechamento"
                                            name="temperaturafechamentoId"
                                            value={temperaturafechamentoId}
                                            onChange={e => setTemperaturaFechamentoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {lstTemperaturasFechamento.map(tempFechamento => (
                                                <option key={`tempFechamento${tempFechamento.id}`} value={tempFechamento.id}>{tempFechamento.temperaturafechamento}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                   
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="12">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="3"
                                            id="txtDescricao"
                                            name="descricao"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                {/* <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="cboAnexo">Anexo</Label>
                                        <Input type="file" id="cboAnexo" multiple={true}
                                            name="anexoId"
                                            value={anexoId}
                                            onChange={e => setAnexoId(e.target.value)}>                                            
                                        </Input>
                                    </Col>
                                </FormGroup> */}
                                <FormGroup row>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo">Ativa</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} size={'sm'}
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
                    <Col md="3">
                    <Card>
                        <CardHeader>
                            <i className="icon-note"></i>
                            <strong>Anotações</strong>
                        </CardHeader>
                        <CardBody className="card-body-anotacoes">                            
                            <ListGroup className="list-group-accent" tag={'div'}>                                
                                { lstAnotacoes.map((anotacao, index) => (
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
                            </ListGroup>                                
                        </CardBody>
                    </Card>                        
                </Col>
            </Row>
        </Form>
    </div>
    );
}
