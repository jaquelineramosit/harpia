import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Input, FormGroup, Label} from 'reactstrap';
import api from '../../../../services/api';
import '../../../../global.css';
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
    
    const datatable = atividades;

    const columns = [
        {
            name: 'Atividades',
            cell: row => <div> {(row.atividade.substring(0, 30))} </div>,
            sortable: true,
            width: '22%',
        },
        {
            name: 'Contato',
            //selector: 'nomecontato',
            sortable: true,
            left: true,
            width: '16%',
            cell: row => <div> {(row.nomecontato.substring(0, 20))} </div>
        },
        {
            name: 'Tipo Atividade',
            selector: 'tipoatividade',
            sortable: true,
            left: true,
            width: '18%',
        },
        {
            name: 'Data Atividade',
            //selector: 'dataatividade',
            sortable: true,
            left: true,
            width: '18%',
            cell: row => <div> {dateformat(row.dataatividade, "dd/mm/yyyy")} </div>
        },        
        {
            name: 'Data Final',
            //selector: 'datafim',
            sortable: true,
            left: true,
            width: '18%',
            cell: row => <div> {dateformat(row.datafim, "dd/mm/yyyy")} </div>
        },        
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '8%',
            cell: row => <Link to={`atividades/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
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
                            <FormGroup row className="border-bottom">
                                <Col xs="7" lg="7" md="7" className="text-left">
                                    <Link to={`atividades/?action=novo&tipo=Ligação`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-phone fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades/?action=novo&tipo=Reunião`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-users fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades/?action=novo&tipo=E-mail`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-envelope-open fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades/?action=novo&tipo=Campanha`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-crosshairs fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades?action=novo`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-plus-circle fa-2x"></i>
                                    </Link>
                                </Col>
                                <Col xs="4" lg="4" md="4" className="search">
                                    <Input type="text" id="txtSearch"  />
                                </Col>
                                <Col xs="1" lg="1" md="1" className="search pl-0">
                                    <Link to={`atividades`} >
                                        <i className="fa fa-search fa-2x" style={{ color: '#20a8d8'}}></i>
                                    </Link>                                   
                                </Col>
                            </FormGroup>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="atividades"
                                columns={columns}
                                data={datatable}
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
                                            <Input type="text" readOnly id="txtQtdeAtividade" value="55" className="mb-3"></Input>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label id="lblTitQtdeConcluida" className="font-weight-bold mt-2">Concluídas</Label>
                                            <Input type="text" readOnly id="txtQtdeConcluida" value="223" className="mb-3"></Input>                                            
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label type="text" readOnly id="lblTitReuniao" className="font-weight-bold mt-2">Reunião</Label>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label type="text" readOnly id="lblReuniao" className="mt-2">20</Label>
                                        </Col>
                                    </Row>
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label type="text" readOnly id="lblTitEmail" className="font-weight-bold mt-2">E-mail</Label>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label type="text" readOnly id="lblEmail" className="mt-2">50</Label>
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