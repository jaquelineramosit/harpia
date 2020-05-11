import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Atividades() {
    const [responsavelId, setResponsavelId] = useState('');
    const [atividade, setAtividade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [tipoatividadeId, setTipoatividadeId] = useState('');
    const [dataatividade, setDataatividade] = useState('');
    const [datainicio, setDatainicio] = useState('');
    const [datafim, setDatafim] = useState('');
    const [temponotificacao, setTemponotificacao] = useState('');
    const [exibenotificacao, setExibenotificacao] = useState('');
    const [anexoId, setAnexoId] = useState('');
    const [cancelada, setCancelada] = useState('true');
    const usuarioId = localStorage.getItem('userId');



    async function handleAtividades(e) {
        e.preventDefault();

        const data = {
            responsavelId,
            atividade,
            descricao,
            clienteId,
            contatoId,
            tipoatividadeId,
            dataatividade,
            datainicio,
            datafim,
            temponotificacao,
            exibenotificacao,
            anexoId,
            cancelada
        }
        try {
            const response = await api.post('atividades', data, {
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
            <Form onSubmit={handleAtividades}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Atividades</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="atividade">Nome Atividade</Label>
                                        <Input type="text" required id="txtAtividade" placeholder="Digite o nome da Atividade"
                                            value={atividade}
                                            onChange={e => setAtividade(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="responsavelId">Responsável</Label>
                                        <Input type="select" required name="select" id="ddlresponsavelId"
                                            value={responsavelId}
                                            onChange={e => setResponsavelId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={6}>Responsável1</option>
                                            <option value={7}>Responsável2</option>            
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input type="select" required name="select" id="ddlclienteId"
                                            value={clienteId}
                                            onChange={e => setClienteId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={8}>Cliente1</option>
                                            <option value={21}>Cliente2</option>

                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="select" required name="select" id="ddlcontatoId"
                                            value={contatoId}
                                            onChange={e => setContatoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Contato1</option>
                                            <option value={2}>Contato2</option>

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="tipoatividadeId">Tipo de Atividade</Label>
                                        <Input type="select" required name="select" id="ddltipoatividadeId"
                                            value={tipoatividadeId}
                                            onChange={e => setTipoatividadeId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Atividade1</option>
                                            <option value={2}>Atividade2</option>

                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="dataatividade">Data da Atividade</Label>
                                        <Input type="date" required id="txtdataatividade"
                                            value={dataatividade}
                                            onChange={e => setDataatividade(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="datainicio">Data início</Label>
                                        <Input type="date" required id="txtdatanasc"
                                            value={datainicio}
                                            onChange={e => setDatainicio(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="datafim">Data Final</Label>
                                        <Input type="date" required id="txtdatanasc"
                                            value={datafim}
                                            onChange={e => setDatafim(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Exibir notificação</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={exibenotificacao}
                                            onChange={e => setExibenotificacao(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="datafim">Tempo Notificação</Label>
                                        <Input type="time" required id="txtdatanasc"
                                            value={temponotificacao}
                                            onChange={e => setTemponotificacao(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="anexoId">Anexo</Label>
                                        <Input type="select" required name="select" id="ddlanexoId"
                                            value={anexoId}
                                            onChange={e => setAnexoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Anexo1</option>
                                        </Input>
                                    </Col>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Cancelada</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={cancelada}
                                            onChange={e => setCancelada(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="5">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5"
                                            value={descricao}
                                            onChange={e => setDescricao(e.target.value)} />
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