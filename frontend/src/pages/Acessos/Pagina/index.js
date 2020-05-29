import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button,CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

export default function Anotacoes() {
    const [pagina, setPagina] = useState('');
    const [moduloId, setModuloId] = useState('');
    const [descricao, setDescricao] = useState('');
    const [modulosId, setModulosId] = useState([]);
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('modulos').then(response => {
        setModulosId(response.data);
        })
        }, [usuarioId]);    

    async function handleAnotacoes(e) {
        e.preventDefault();

        const data = {
            pagina,
            moduloId,
            descricao
        }
        try {
            const response = await api.post('anotacoes', data, {
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
            <Form onSubmit={handleAnotacoes}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Módulo</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="pagina">Página</Label>
                                        <Input type="text" required id="txtPagina" placeholder="Digite a Pagina"
                                        value={pagina}
                                        onChange={ e => setPagina(e.target.value)} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="moduloId">Módulo</Label>
                                        <Input required type="select" name="select" id="cboOportunidadeId"
                                        value={moduloId}
                                        onChange={ e => setModuloId(e.target.value)}>
                                             <option value={undefined} defaultValue>Selecione...</option>
                                                {modulosId.map(modulo=> (
                                                <option value={modulo.id}>{modulo.nomemodulo}</option>
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