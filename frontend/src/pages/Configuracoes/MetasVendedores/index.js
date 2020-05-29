import React, { useState, useEffect} from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Metasvendedores() {
    const [vendedorId, setVendedorId] = useState('');
    const [metaId, setMetaId] = useState('');
    const [observacao, setObservacao] = useState('');
    const [ativo, setAtivo] = useState('true');
    const [vendedoresId, setVendedoresId] = useState([]);
    const [metasId, setMetasId] = useState([]);
    const usuarioId = localStorage.getItem('userId');


    useEffect(() => {
        api.get('metas').then(response => {
        setMetasId(response.data);
        })
        }, [usuarioId]);
    
    
    useEffect(() => {
        api.get('clientes').then(response => {
        setVendedoresId(response.data);
        })
        }, [usuarioId]);
             
    async function handleMetasVendedores(e) {
        e.preventDefault();

        const data = {
            vendedorId,
            metaId,
            observacao,
            ativo
        }
        try {
            const response = await api.post('metas-vendedores', data, {
                headers: {
                    Authorization: usuarioId,
                }
            });
            alert(`Feito o cadastro com sucesso ${response.id}`);

        } catch (err) {

            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleMetasVendedores}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Metas de Vendedores</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                            <Label htmlFor="vendedorId">Vendedor</Label>
                                            <Input required type="select" name="select" id="txtVendedorId"
                                            value={vendedorId}
                                            onChange={ e => setVendedorId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {vendedoresId.map(vendedor=> (
                                                <option value={vendedor.id}>{vendedor.nomecliente}</option>
                                                ))}                                     
                                            </Input>
                                    </Col>                               
                                    <Col md="4">
                                            <Label htmlFor="metaId">Metas</Label>
                                            <Input required type="select" name="select" id="cboMetaId"
                                            value={metaId}
                                            onChange={ e => setMetaId(e.target.value)}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {metasId.map(meta=> (
                                                <option value={meta.id}>{meta.nomemeta}</option>
                                                ))}                                       
                                            </Input>
                                    </Col>                                      
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Observação</Label>
                                        <Input type="textarea" rows="5"
                                            value={observacao}
                                            onChange={e => setObservacao(e.target.value)} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
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