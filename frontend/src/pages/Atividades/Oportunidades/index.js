import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, InputGroup, InputGroupAddon, CardFooter, Form, FormFeedback } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Oportunidades() {
    const [nomeoportunidade, setNomeoportunidade] = useState('');
    const [proprietarioId, setProprietarioId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [contatoId, setContatoId] = useState('');
    const [produtoId, setProdutoId] = useState('');
    const [fasepipeId, setFasepipeId] = useState('');
    const [motivoperdaId, setMotivoperdaId] = useState('');
    const [valor, setValor] = useState('');
    const [expectativafechamentoId, setExpectativafechamentoId] = useState('');
    const [anexoId, setAnexoId] = useState('');
    const [ativo, setAtivo] = useState('');
    const usuarioId = localStorage.getItem('userId');



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
            motivoperdaId,
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
                                        <Label htmlFor="nomeoportunidade">Nome Oportunidade</Label>
                                        <Input type="text" required id="txtNomeoportunidade" placeholder="Digite o nome da Oportunidade"
                                            value={nomeoportunidade}
                                            onChange={e => setNomeoportunidade(e.target.value)} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="proprietarioId">Proprietário</Label>
                                        <Input type="select" required name="select" id="ddlproprietarioId"
                                            value={proprietarioId}
                                            onChange={e => setProprietarioId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={10}>Proprietário1</option>
                                            <option value={11}>Proprietário2</option>

                                        </Input>
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input type="select" required name="select" id="ddlclienteId"
                                            value={clienteId}
                                            onChange={e => setClienteId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={21}>Clinete1</option>
                                            <option value={22}>Clinete2</option>

                                        </Input>
                                    </Col>
                                   
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="3">
                                        <Label htmlFor="produtoId">Produto</Label>
                                        <Input type="select" required name="select" id="ddltipoatividadeId"
                                            value={produtoId}
                                            onChange={e => setProdutoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Produto1</option>
                                            <option value={2}>Produto2</option>

                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="fasepipeId">Fase do Pipe</Label>
                                        <Input type="select" required name="select" id="ddlfasepipeId"
                                            value={fasepipeId}
                                            onChange={e => setFasepipeId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Fase1</option>
                                            <option value={2}>Fase2</option>
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="motivoperdaId">Motivo da Perda</Label>
                                        <Input type="select" required name="select" id="ddlmotivoperdaId"
                                            value={motivoperdaId}
                                            onChange={e => setMotivoperdaId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Motivo1</option>
                                            <option value={2}>Motivo2</option>
                                        </Input>
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="value" required id="txtvalor"
                                            value={valor}
                                            onChange={e => setValor(e.target.value)} />
                                    </Col>
                                    
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="2">
                                        <Label htmlFor="anexoId">Anexo</Label>
                                        <Input type="select" required name="select" id="ddlanexoId"
                                            value={anexoId}
                                            onChange={e => setAnexoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Anexo1</option>
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
                                    <Col md="2">
                                    <Label htmlFor="expectativafechamentoId">Expectativa de Fechamento</Label>
                                        <Input type="select" required name="select" id="ddlmotivoperdaId"
                                            value={expectativafechamentoId}
                                            onChange={e => setExpectativafechamentoId(e.target.value)}>
                                            <option value={undefined}>Selecione...</option>
                                            <option value={1}>Expectativa1</option>
                                            <option value={2}>Expectativa2</option>
                                        </Input>
                                    </Col>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Cancelada</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            value={ativo}
                                            onChange={e => setAtivo(e.target.value)}
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