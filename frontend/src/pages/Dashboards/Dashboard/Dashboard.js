import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Input, FormGroup, Label} from 'reactstrap';
import api from '../../../services/api';
import './style.css';
const dateformat = require('dateformat');

var currentPage;
var previousPage;
var nextPage;
var idPag = '';

export default function Dashboard() {
    const [oportunidades, setOportunidades] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('oportunidadesCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);
    //Logica para mostrar os numeros de pagina
    const pageNumbers = [];
    for (let i = 1; i <= (total / 20); i++) {
        pageNumbers.push(i);
    }

    if (total % 20 > 0) {
        pageNumbers.push(pageNumbers.length + 1);
    }



    useEffect(() => {
        api.get('oportunidades', {
            headers: {
                Authorization: 1,
            },
            params: {
                page: currentPage
            }
        }).then(response => {
            setOportunidades(response.data);
        })
    }, [usuarioId]);
    //Paginação
    async function handlePage(e) {
        e.preventDefault();

        idPag = e.currentTarget.name;

        if (idPag == 'btnPrevious') {
            currentPage = previousPage;
            previousPage = currentPage - 1;
            nextPage = currentPage + 1;
        } else if (idPag == 'btnNext') {
            // se existe, quer dizer que foi apertado após qualquer numero
            if (currentPage) {
                currentPage = nextPage;
                previousPage = currentPage - 1;
                nextPage = currentPage + 1;
            } else { // next apertado antes de qlqr numero (1º load + next em vez d pag 2)
                currentPage = 2;
                nextPage = 3;
                previousPage = 1;
            };
        } else {
            currentPage = parseInt(e.currentTarget.id);
            previousPage = currentPage - 1;
            nextPage = currentPage + 1;
        };

        api.get('oportunidades', {
            headers: {
                Authorization: 1,
            },
            params: {
                page: currentPage
            }
        }).then(response => {
            setOportunidades(response.data);
        });
    }


    return (
        <div className="animated-fadeIn">
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Oportunidades                            
                        </CardHeader>
                        <CardBody>
                            <FormGroup row>
                                <Col md="7">
                                    <Link to={`oportunidades`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-phone fa-2x"></i>
                                    </Link>
                                    <Link to={`oportunidades`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-users fa-2x"></i>
                                    </Link>
                                    <Link to={`oportunidades`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-envelope-open fa-2x"></i>
                                    </Link>
                                    <Link to={`oportunidades`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-bullseye fa-2x"></i>
                                    </Link>
                                    <Link to={`oportunidades`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-plus-circle fa-2x"></i>
                                    </Link>
                                </Col>
                                <Col xs="5" lg="5" md="5" className="search">
                                    <Input type="text" id="txtSearch" />
                                    <Link to={`oportunidades`} className="">
                                        <i className="fa fa-search fa-2x ml-3 mt-1" style={{ color: '#20a8d8'}}></i>
                                    </Link>
                                </Col>
                            </FormGroup>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th style={{ width : '6%'}}>Nº</th>
                                        <th style={{ width : '20%'}}>Oportunidade</th>
                                        <th style={{ width : '12%'}}>Cliente</th>
                                        <th style={{ width : '12%'}}>Contato</th>
                                        <th style={{ width : '8%'}}>Valor</th>
                                        <th style={{ width : '12%'}}>Fase Pipe</th>
                                        <th style={{ width : '10%'}}>Vendedor</th>
                                        <th style={{ width : '10%'}}>Expectativa</th>                                        
                                        <th style={{ width : '10%'}, {textAlign : 'center'}}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {oportunidades.map(oportunidade => (
                                        <tr key={`linha${oportunidade.id}`}>
                                            <td><span className="font-weight-bold mr-2">{oportunidade.id}</span></td>
                                            <td>{oportunidade.nomeoportunidade.substring(0,30)}</td> 
                                            <td>{oportunidade.nomecliente}</td> 
                                            <td>{oportunidade.nomecontato}</td> 
                                            <td>{oportunidade.valor}</td>
                                            <td>{oportunidade.nomefase}</td>
                                            <td>{`${oportunidade.nomevendedor}`}</td>
                                            <td>{oportunidade.expectativafechamentoId}</td>                                                                                        
                                            <td style={{ textAlign : 'center'}}>
                                                <Link to={`oportunidades/${oportunidade.id}`} className="btn-sm btn-primary">
                                                    <i className="fa fa-pencil fa-lg mr-1"></i>
                                                    Editar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination>
                                <PaginationItem>
                                    <PaginationLink previous id="btnPrevious" name="btnPrevious" onClick={e => handlePage(e)} tag="button">
                                        <i className="fa fa-angle-double-left"></i>
                                    </PaginationLink>
                                </PaginationItem>
                                {pageNumbers.map(number => (
                                    <PaginationItem key={'pgItem' + number} >
                                        <PaginationLink id={number} name={number} onClick={e => handlePage(e)} tag="button">{number}</PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationLink next id="btnNext" name="btnNext" onClick={e => handlePage(e)} next tag="button">
                                        <i className="fa fa-angle-double-right"></i>
                                    </PaginationLink>
                                </PaginationItem>
                            </Pagination>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-line-chart"></i>Painel Oportunidades
                        </CardHeader>
                        <CardBody>
                            <FormGroup row>
                                <Col xs="12" lg="12" md="12">
                                    <Link to={`oportunidades`} className="btn btn-primary icons-oportunidades float-right">
                                        <i className="fa fa-calendar fa-2x"></i>
                                    </Link>                                    
                                </Col>
                            </FormGroup>
                            <FormGroup row className="group-painel-oportunidades">
                                <Col xs="12" lg="12" md="12" className="border-top">
                                    <Row className="border-bottom">
                                        <Col xs="6" lg="6" md="6" className="border-right">
                                            <Label id="lblTitQtdeoportunidade" className="font-weight-bold mt-2">Oportunidades</Label>
                                            <Input type="text" id="txtQtdeoportunidade" value="55" readOnly className="mb-3"></Input>
                                        </Col>
                                        <Col xs="6" lg="6" md="6">
                                            <Label id="lblTitQtdeConcluida" className="font-weight-bold mt-2">Concluídas</Label>
                                            <Input type="text" id="txtQtdeConcluida" value="223" readOnly className="mb-3"></Input>                                            
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