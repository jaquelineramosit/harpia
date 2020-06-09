import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Input, FormGroup, Label} from 'reactstrap';
import api from '../../../../services/api';
import './style.css';
const dateformat = require('dateformat');

export default function ListaAtividades() {
    const [atividades, setAtividades] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('atividades').then(response => {            
            setAtividades(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Atividades                            
                        </CardHeader>
                        <CardBody>
                            <FormGroup row>
                                <Col md="7">
                                    <Link to={`atividades`} className="btn btn-primary icons-atividades">
                                        <i className="fa fa-phone fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades`} className="btn btn-primary icons-atividades">
                                        <i className="fa fa-users fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades`} className="btn btn-primary icons-atividades">
                                        <i className="fa fa-envelope-open fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades`} className="btn btn-primary icons-atividades">
                                        <i className="fa fa-bullseye fa-2x"></i>
                                    </Link>
                                    <Link to={`atividades`} className="btn btn-primary icons-atividades">
                                        <i className="fa fa-plus-circle fa-2x"></i>
                                    </Link>
                                </Col>
                                <Col xs="5" lg="5" md="5" className="search">
                                    <Input type="text" id="txtSearch" />
                                    <Link to={`atividades`} className="">
                                        <i className="fa fa-search fa-2x ml-3 mt-1" style={{ color: '#20a8d8'}}></i>
                                    </Link>
                                </Col>
                            </FormGroup>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th style={{ width : '20%'}}>Atividades</th>
                                        <th style={{ width : '15%'}}>Cliente</th>
                                        <th style={{ width : '15%'}}>Contato</th>
                                        <th style={{ width : '10%'}}>Tipo de Atividade</th>
                                        <th style={{ width : '10%'}}>Data da Atividade</th>
                                        <th style={{ width : '10%'}}>Data Início</th>
                                        <th style={{ width : '10%'}}>Data Final</th>
                                        <th style={{ width : '10%'}, {textAlign : 'center'}}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {atividades.map(atividade => (
                                        <tr>                                            
                                            <td>{atividade.atividade.substring(0,30)}</td> 
                                            <td>{atividade.nomecliente}</td> 
                                            <td>{atividade.nomecontato}</td> 
                                            <td>{atividade.tipoatividade}</td>                                             
                                            <td>{dateformat(atividade.dataatividade, "dd/mm/yyyy")}</td>
                                            <td>{dateformat(atividade.datainicio, "dd/mm/yyyy")}</td>
                                            <td>{dateformat(atividade.datafim, "dd/mm/yyyy")}</td>
                                            <td style={{ textAlign : 'center'}}>
                                                <Link to={`atividades/${atividade.id}`} className="btn-sm btn-primary">
                                                    <i className="fa fa-pencil fa-lg mr-1"></i>
                                                    Editar
                                                </Link>
                                                                                             
                                            </td>
                                        </tr>
                                    ))}                                                                      
                                </tbody>
                            </Table>
                            <Pagination>
                                <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                                <PaginationItem active>
                                    <PaginationLink tag="button">1</PaginationLink>                            
                                </PaginationItem>
                                <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                                <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                            </Pagination>
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