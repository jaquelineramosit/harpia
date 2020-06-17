import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button,  CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import{reaisMask} from '../../../mask'
import api from '../../../../src/services/api';

export default function Oportunidades() {
    const [nomeoportunidade, setNomeOportunidade] = useState('');
    const [proprietarioId, setProprietarioId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [fasepipeId, setFasePipeId] = useState('');
    const [valor, setValor] = useState('');
    const [expectativafechamentoId, setExpectativaFechamento] = useState('');
    const [anexoId, setAnexoId] = useState('');
    const [ativo, setAtivo] = useState('');
    const [clientesId, setClientesId] = useState([]);
    const [produtosId, setProdutosId] = useState([]);
    const [contatosId, setContatosId] = useState([]);
    const [fasesPipeId, setFasesPipeId] = useState([]);
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('clientes').then(response => {
        setClientesId(response.data);
        })
        }, [usuarioId]);

    useEffect(() => {
        api.get('produtos').then(response => {
        setProdutosId(response.data);
        })
        }, [usuarioId]);

    useEffect(() => {
        api.get('contatos').then(response => {
        setContatosId(response.data);
        })
        }, [usuarioId]);

    useEffect(() => {
        api.get('fases-pipe').then(response => {
        setFasesPipeId(response.data);
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
            expectativafechamentoId,
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
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Oportunidades</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeOportunidade">Nome Oportunidade</Label>
                                        <Input type="text" required id="txtNomeoportunidade" placeholder="Digite o nome da Oportunidade"
                                            value={nomeoportunidade}
                                            onChange={e => setNomeOportunidade(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="proprietarioId">Proprietário</Label>
                                        <Input type="select" required name="select" id="cboProprietario"
                                            value={proprietarioId}
                                            onChange={e => setProprietarioId(e.target.value)}>
                                            <option value={10}>Proprietário1</option>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={11}>Proprietário2</option>
                                        </Input>
                                    </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col md="4">
                                            <Label htmlFor="clienteId">Cliente</Label>
                                            <Input type="select" required name="select" id="cboCliente"
                                                value={clientesId}
                                                onChange={ e => setClienteId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {clientesId.map(cliente=> (
                                                <option value={cliente.id}>{cliente.nomecliente}</option>
                                                ))}
                                            </Input>
                                        </Col>
                                        <Col md="4">
                                            <Label htmlFor="contatoId">Contato</Label>
                                            <Input type="select" required name="select" id="cboContato"
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
                                    <Col md="4">
                                        <Label htmlFor="produtoId">Produto</Label>
                                        <Input type="select" required name="select" id="cboProduto"
                                            value={produtoId}
                                            onChange={ e => setProdutoId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {produtosId.map(produto=> (
                                            <option value={produto.id}>{produto.nomeproduto}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="text" required id="txtValor"
                                            value={valor}
                                            onChange={e => setValor(reaisMask(e.target.value))} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>

                                    <Col md="4">
                                    <Label htmlFor="expectativaFechamento">Expectativa de Fechamento</Label>
                                        <Input type="date" required name="select" id="txtExpectativaFechamento"
                                        value={descricao}
                                            onChange={e => setExpectativaFechamento(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="fasePipeId">Fase do Pipe</Label>
                                        <Input type="select" required name="select" id="cboFasePipe"
                                            value={fasepipeId}
                                            onChange={ e => setFasePipeId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {fasesPipeId.map(fasespipe=> (
                                            <option value={fasespipe.id}>{fasespipe.nomefase}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="anexo">Anexo</Label>
                                        <Input type="file" required name="select" id="cboAnexo"
                                            value={anexoId}
                                            onChange={e => setAnexoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Anexo1</option>
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
                </Row>
            </Form>
        </div>
    );
}
