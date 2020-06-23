import React, { useState, useEffect } from 'react';
import { Badge } from 'reactstrap';
import DataTable from 'react-data-table-component';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Input, FormGroup, Label} from 'reactstrap';
import api from '../../../../services/api';
import './style.css';
const dateformat = require('dateformat');

export default function ListaAtividades() {
    const [atividades, setAtividades] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('atividadesCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('atividades', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setAtividades(response.data);
        })
    }, [usuarioId]);
    const data = atividades;

    const columns = [
        {
            name: 'Atividades',
            selector: 'atividade',
            sortable: true,


        },
        {
            name: 'Clientes',
            selector: 'clienteId',
            sortable: true,
            left: true,

        },
        {
            name: 'Contato',
            selector: 'contatoId',
            sortable: true,
            left: true,

        },
        {
            name: 'Tipo de Atividade',
            selector: 'tipoatividadeId',
            sortable: true,
            left: true,

        },
        {
            name: 'Data Atividade',
            selector: 'dataatividade',
            sortable: true,
            left: true,

        },
        {
            name: 'Data Início',
            selector: 'datainicio',
            sortable: true,
            left: true,

        },
        {
            name: 'Data Final',
            selector: 'datafim',
            sortable: true,
            left: true,

        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`atividades/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];



    return (
        <div className="animated-fadeIn">
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Atividades                            
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Atividades"
                                columns={columns}
                                data={data}
                                striped={true}
                                highlightOnHover={true}
                                responsive={true}
                                pagination={true}
                            />
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-line-chart"></i>Painel Atividades
                        </CardHeader>
                        <CardBody>
                            <FormGroup row>
                                <Col xs="12" lg="12" md="12">
                                    <Link to={`atividades`} className="btn btn-primary icons-atividades float-right">
                                        <i className="fa fa-calendar fa-2x"></i>
                                    </Link>                                    
                                </Col>
                            </FormGroup>
                            <FormGroup row className="group-painel-atividades">
                                <Col xs="12" lg="12" md="12" className="border-top">
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label id="lblTitQtdeAtividade" className="font-weight-bold mt-2">Atividades</Label>
                                            <Input type="text" id="txtQtdeAtividade" value="55" className="mb-3"></Input>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label id="lblTitQtdeConcluida" className="font-weight-bold mt-2">Concluídas</Label>
                                            <Input type="text" id="txtQtdeConcluida" value="223" className="mb-3"></Input>                                            
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label type="text" id="lblTitReuniao" className="font-weight-bold mt-2">Reunião</Label>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label type="text" id="lblReuniao" className="mt-2">20</Label>
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label type="text" id="lblTitEmail" className="font-weight-bold mt-2">E-mail</Label>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label type="text" id="lblEmail" className="mt-2">50</Label>
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label type="text" id="lblTitCampanha" className="font-weight-bold mt-2">Campanha</Label>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label type="text" id="lblCampanha" className="mt-2">20</Label>
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label type="text" id="lblTitLigacao" className="font-weight-bold mt-2">Ligação</Label>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label type="text" id="lblLigacao" className="mt-2">12</Label>
                                        </Col>
                                    </Row>
                                </Col>
                            </FormGroup>                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}