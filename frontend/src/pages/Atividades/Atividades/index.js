import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Atividades() {
    const [responsavelId, setResponsavelId] = useState('');
    const [atividade, setAtividade] = useState('');
    const [descricao, setDescricao] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [tipoatividadeId, setTipoAtividadeId] = useState('');
    const [dataatividade, setDataAtividade] = useState('');
    const [datainicio, setDataInicio] = useState('');
    const [datafim, setDataFim] = useState('');
    const [temponotificacao, setTempoNotificacao] = useState('');
    const [exibenotificacao, setExibeNotificacao] = useState('');
    const [anexoId, setAnexoId] = useState('');
    const [clientesId, setClientesId] = useState([]);
    const [oportunidadesId, setOportunidadesId] = useState([]);
    const [contatosId, setContatosId] = useState([]);
    const [tiposatividadesId, setTiposAtividadesId] = useState([]);

    const [cancelada, setCancelada] = useState('true');
    
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('clientes').then(response => {
        setClientesId(response.data);
        })
        }, [usuarioId]);
    
    useEffect(() => {
        api.get('contatos').then(response => {
        setContatosId(response.data);
        })
        }, [usuarioId]);
    
    useEffect(() => {
        api.get('oportunidades').then(response => {
        setOportunidadesId(response.data);
        })
        }, [usuarioId]);    

    useEffect(() => {
        api.get('tipos-atividade').then(response => {
        setTiposAtividadesId(response.data);
        })
        }, [usuarioId]);

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
                                    <Col md="4">
                                        <Label htmlFor="responsavelId">Responsável</Label>
                                        <Input type="select" required name="select" id="cboResponsavelId"
                                            value={responsavelId}
                                            onChange={e => setResponsavelId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {clientesId.map(cliente=> (
                                                <option value={cliente.id}>{cliente.nomecliente}</option>
                                                ))}             
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input type="select" required name="select" id="cboClienteId"
                                            value={clienteId}
                                            onChange={e => setClienteId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {clientesId.map(cliente=> (
                                                <option value={cliente.id}>{cliente.nomecliente}</option>
                                                ))}   
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="select" required name="select" id="cboContatoId"
                                            value={contatoId}
                                            onChange={e => setContatoId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {contatosId.map(contato=> (
                                                <option value={contato.id}>{contato.nomecontato}</option>
                                                ))}   

                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="tipoAtividadeId">Tipo Atividade</Label>
                                        <Input type="select" required name="select" id="cboTipoAtividadeId"
                                            value={tipoatividadeId}
                                            onChange={e => setTipoAtividadeId(e.target.value)}>
                                                <option value={undefined} defaultValue>Selecione...</option>
                                                {tiposatividadesId.map(tipoAtividade=> (
                                                <option value={tipoAtividade.id}>{tipoAtividade.tipoatividade}</option>
                                                ))}   
                                        </Input>
                                    </Col>  
                                    <Col md="2">
                                        <Label htmlFor="dataAtividade">Data da Atividade</Label>
                                        <Input type="date" required id="txtDataAtividade"
                                            value={dataatividade}
                                            onChange={e => setDataAtividade(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="dataInicio">Data início</Label>
                                        <Input type="date" required id="txtDataInicio"
                                            value={datainicio}
                                            onChange={e => setDataInicio(e.target.value)} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="dataFim">Data Final</Label>
                                        <Input type="date" required id="txtDataFim"
                                            value={datafim}
                                            onChange={e => setDataFim(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                   <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Exibir notificação</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={exibenotificacao}
                                            onChange={e => setExibeNotificacao(e.target.value)}
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="tempoNotificacao">Tempo Notificação</Label>
                                        <Input type="time" required id="txtTempoNotificacao"
                                            value={temponotificacao}
                                            onChange={e => setTempoNotificacao(e.target.value)} />
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
                                            <Label htmlFor="anexoId">Anexo</Label>
                                            <Input type="file" required name="select" id="cboanexoId"
                                                value={anexoId}
                                                onChange={e => setAnexoId(e.target.value)}>
                                            </Input>
                                        </Col>
                                        <Col md="1">
                                            <Label check className="form-check-label" htmlFor="ativo1">Ativa</Label>
                                            <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                                value={cancelada}
                                                onChange={e => setCancelada(e.target.value)}
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