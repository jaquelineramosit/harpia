import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';
const dateformat = require('dateformat');

const Atividades = (props) => {

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action') === null ? '' : params.get('action');
    var tipoAtividadeParam = params.get('tipo') === null ? '' : params.get('tipo');
    var atividadeIdParam = props.match.params.id;    
    
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
    const [anexo, setAnexos] = useState([]);
    const [clientesId, setClientesId] = useState([]);
    const [contatosId, setContatosId] = useState([]);
    const [tiposatividadesId, setTiposAtividadesId] = useState([]);
    const [tiposatividade, setTiposAtividade] = useState([]);
    const [responsaveisId, setResponsaveisId] = useState([]);
    const [cancelada, setCancelada] = useState('true');
    const usuarioId = localStorage.getItem('userId');
    const [formData, setFormData] = useState({
        nomeAtividade: '',
        responsavelid: 0,
        clienteId: 0,
        contatoId: 0,
        tipoAtividadeId: 0,
        dataatividade: '',
        datainicio: '',
        datafim: '',
        temponotificacao: '',
        exibenotificacao: '',
        descricao: '',
        cancelado: '1'
    });

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
        api.get('tipos-atividade').then(response => {
            setTiposAtividadesId(response.data);
        })
    }, [usuarioId]);
        
    useEffect(() => {
        api.get('responsaveis').then(response => {
            setResponsaveisId(response.data);
        })
    }, [usuarioId]);
   
    useEffect(() => {
        if (action === 'edit' && atividadeIdParam !== '') {
            api.get(`atividades/${atividadeIdParam}`).then(response => {
                
                document.getElementById('cboResponsavelId').value = response.data.responsavelId; 
                document.getElementById('txtAtividade').value = response.data.atividade;
                document.getElementById('txtDescricao').value = response.data.descricao;
                document.getElementById('cboClienteId').value = response.data.clienteId;
                document.getElementById('cboContatoId').value = response.data.contatoId;
                document.getElementById('cboTipoAtividadeId').value = response.data.tipoatividadeId;
                document.getElementById('txtDataAtividade').value = dateformat(response.data.dataatividade, "yyyy-mm-dd");
                document.getElementById('txtDataInicio').value = dateformat(response.data.datainicio, "yyyy-mm-dd"); // dateformat(row.dataatividade, "dd/mm/yyyy")
                document.getElementById('txtDataFim').value = dateformat(response.data.datafim, "yyyy-mm-dd");
                document.getElementById('rdNotificacao').value = response.data.exibenotificacao
                document.getElementById('txtTempoNotificacao').value = response.data.temponotificacao;

                //hoje esta pegando do anexoId, mas como existe uma relação de para cada atividade, podemos ter 0,1, ou N anexos,
                //o relacionamento deve ser feito na tabela Anexos, e não na tabela de atividades
                // document.getElementById('fileAnexos').value = response.data.anexoId;
                document.getElementById('rdCancelada').value = response.data.cancelado;

                setFormData({
                    ...formData,
                    responsavelId: response.data.responsavelId,
                    atividade: response.data.atividade,
                    descricao: response.data.descricao,
                    clienteId: response.data.clienteId,
                    contatoId: response.data.contatoId,
                    tipoatividadeId: response.data.tipoatividadeId,
                    dataatividade: response.data.dataatividade,
                    datainicio: response.data.datainicio,
                    datafim: response.data.datafim,
                    exibenotificacao: response.data.exibenotificacao,
                    temponotificacao: response.data.temponotificacao,
                    //anexoId: response.data.anexoId,
                    cancelado: response.data.cancelado,
                })
            });
        } else if (action === 'novo' && tipoAtividadeParam !== '') {
            
            api.get(`tipos-atividade-porNome/${tipoAtividadeParam}`).then(response => {                
                document.getElementById('cboTipoAtividadeId').value = response.data.id;                    
            });
           
        } else {
            return;
        }
    }, [atividadeIdParam])

    function handleInputChange(event) {
        const { name, value } = event.target;        
        setFormData({ ...formData, [name]: value });       
    }

    async function handleAtividades(e) {
        e.preventDefault();

        
        const data = formData;

        try {
            if (action === 'edit') {
                try {
                    const response = await api.put(`/atividades/${atividadeIdParam}`, data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert(`Cadastro atualizado com sucesso.`);
                } catch (err) {

                    alert('Erro na atualização, tente novamente.');
                }

            } else {

                if (action === 'novo') {
                    try {
                        const response = await api.post('atividades', data, {
                            headers: {
                                Authorization: 6,
                            }
                        });
                        alert(`Cadastro realizado com sucesso.`);
                    } catch (err) {

                        alert('Erro no cadastro, tente novamente.');
                    }
                }

            }   
        
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
                                <small>
                                    {
                                        action.toUpperCase() == ('edit').toUpperCase() ? (
                                            <Fragment> Editar</Fragment>
                                        ) : 
                                        (
                                            <Fragment> Novo</Fragment>
                                        )
                                    }
                                </small>
                            </CardHeader>
                            <CardBody>                                                                             
                                <FormGroup className="d-flex justify-content-center" row>
                                    <Col md="6">
                                        <Label htmlFor="atividade">Nome Atividade</Label>
                                        <Input type="text" required id="txtAtividade" placeholder="Digite o nome da Atividade"
                                            name="atividade"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="responsavelId">Responsável</Label>
                                        <Input type="select" required name="select" id="cboResponsavelId"
                                            name="responsavelId"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {responsaveisId.map(responsavel => (
                                                <option key={`responsavel${responsavel.id}`} value={responsavel.id}>{responsavel.nome}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-center" row>
                                    <Col md="6">
                                        <Label htmlFor="clienteId">Cliente</Label>
                                        <Input type="select" required name="select" id="cboClienteId"
                                            name="clienteId"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {clientesId.map(cliente => (
                                                <option key={`cliente${cliente.id}`} value={cliente.id}>{cliente.nomecliente}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="contatoId">Contato</Label>
                                        <Input type="select" required name="select" id="cboContatoId"
                                            name="contatoId"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {contatosId.map(contato => (
                                                <option key={`contato${contato.id}`} value={contato.id}>{contato.nomecontato}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-center" row>
                                    <Col md="6">
                                        <Label htmlFor="tipoAtividadeId">Tipo Atividade</Label>
                                        <Input type="select" required name="select" id="cboTipoAtividadeId"
                                            name="tipoatividadeId"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                            {tiposatividadesId.map(tipoAtividade => (
                                                <option key={`tipoAtividade${tipoAtividade.id}`} value={tipoAtividade.id}>{tipoAtividade.tipoatividade}</option>
                                            ))}
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="dataAtividade">Data da Atividade</Label>
                                        <Input type="date" required id="txtDataAtividade"
                                            name="dataatividade"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-center" row>
                                    <Col md="3">
                                        <Label htmlFor="dataInicio">Data início</Label>
                                        <Input type="date" required id="txtDataInicio"
                                            name="datainicio"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="3">
                                        <Label htmlFor="dataFim">Data Final</Label>
                                        <Input type="date" required id="txtDataFim"
                                            name="datafim"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label htmlFor="tempoNotificacao">Tempo Notificação</Label>
                                        <Input type="time" id="txtTempoNotificacao"
                                            name="temponotificacao"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="2">
                                        <Label check className="form-check-label" htmlFor="ativo1">Exibir notificação</Label>
                                        <AppSwitch id="rdNotificacao" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            name="exibenotificacao"
                                            onChange={handleInputChange}
                                        />
                                    </Col>                                    
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-center" row>
                                    <Col md="10">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao"
                                            name="descricao"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup className="d-flex justify-content-center" row>
                                    <Col md="6">
                                        <Label htmlFor="anexoId">Anexo</Label>
                                        <Input type="file" readOnly name="select" id="fileAnexos"
                                            
                                            >
                                        </Input>
                                    </Col>
                                    <Col md="4">
                                        <Label check className="form-check-label" htmlFor="cancelada">Cancelada</Label>
                                        <AppSwitch id="rdCancelada" className={'switch-ativo'} label color={'success'} defaultChecked size={'sm'}
                                            name="cancelado"
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
export default Atividades;