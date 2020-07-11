import React, { useState, useEffect} from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

const MetasVendedores = (props) => {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var metasVendedoresIdParams = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [vendedorId, setVendedorId] = useState('');
    const [metaId, setMetaId] = useState('');
    const [observacao, setObservacao] = useState('');
    const [ativo, setAtivo] = useState(1);

    // estados combos dinamicos
    const [vendedoresId, setVendedoresId] = useState([]);
    const [metasId, setMetasId] = useState([]);

    useEffect(() => {
        api.get('vendedores').then(response => {
            setVendedoresId(response.data);
            console.log(response.data);
        })
    }, [usuarioId]);

    useEffect(() => {
    api.get('metas').then(response => {
        setMetasId(response.data);
    })
    }, [usuarioId]);


    useEffect(() => {
        if (action === 'edit' && metasVendedoresIdParams !== '') {
            api.get(`metas-vendedores/${metasVendedoresIdParams}`).then(response => {
                setVendedorId(response.data.vendedorId);
                setMetaId(response.data.metaId);
                setObservacao(response.data.observacao);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);
            });
        } else {
            return;
        }
    }, [metasVendedoresIdParams])

    function handleInputChange(event) {
        const { name, value } = event.target;

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

    async function handleMetasVendedores(e) {
        e.preventDefault();

        const data = {
            vendedorId,
            metaId,
            observacao,
            ativo
        };

        if (action === 'edit') {

            try {
                const response = await api.put(`/metas-vendedores/${metasVendedoresIdParams}`, data, {
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

            if (action === 'novo') {
                try {
                    const response = await api.post('metas-vendedores', data, {
                        headers: {
                            Authorization: 6,
                        }
                    });
                    alert(`Cadastro realizado com sucesso.`);
                    setRedirect(true);  
                } catch (err) {
                    alert('Erro no cadastro, tente novamente.');
                }
            }
        }
    }

    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-metas-vendedores" /> }
            <Form onSubmit={handleMetasVendedores} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Metas de Vendedores</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                            <Label htmlFor="vendedorId">Vendedor</Label>
                                            <Input required type="select" name="select" id="cboVendedorId"
                                                name="vendedorId"
                                                value={vendedorId}
                                                onChange={e => setVendedorId(e.target.value)}
                                            >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {vendedoresId.map(vendedor=> (
                                                    <option key={`vendedor${vendedor.usuarioId}`} value={vendedor.usuarioId}>{vendedor.nomevendedor}</option>
                                                ))}
                                            </Input>
                                    </Col>
                                    <Col md="4">
                                            <Label htmlFor="metaId">Meta</Label>
                                            <Input required type="select" name="select" id="cboMetaId"
                                                name="metaId"
                                                value={metaId}
                                                onChange={e => setMetaId(e.target.value)}
                                            >
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {metasId.map(meta=> (
                                                    <option key={`meta${meta.id}`} value={meta.id}>{meta.nomemeta}</option>
                                                ))}
                                            </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Observação</Label>
                                        <Input type="textarea" rows="5"id="txtObservacao"
                                            name="observacao"
                                            value={observacao}
                                            onChange={e => setObservacao(e.target.value)}
                                        />
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

export default MetasVendedores;
