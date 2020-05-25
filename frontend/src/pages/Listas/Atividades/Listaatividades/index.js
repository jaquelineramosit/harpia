import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table} from 'reactstrap';

import api from '../../../../services/api';

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
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                           
                            <i className="fa fa-align-justify"></i>Atividades
                                                       
                            <Link to={`atividades`} className="btn btn-secondary float-right">
                                                    <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>                                                                                             
                                                                                                                     
                        </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Atividades</th>
                                        <th>Cliente</th>
                                        <th>Contato</th>
                                        <th>Tipo de Atividade</th>
                                        <th>Data da Atividade</th>
                                        <th>Data Início</th>
                                        <th>Data Final</th>
                                        <th style={{ textAlign : 'right'}}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {atividades.map(atividade => (
                                        <tr>
                                            <td>{atividade.atividade}</td> 
                                            <td>{atividade.clienteId}</td> 
                                            <td>{atividade.contatoId}</td> 
                                            <td>{atividade.tipoatividadeId}</td> 
                                            <td>{atividade.dataatividade}</td>
                                            <td>{atividade.datainicio}</td>
                                            <td>{atividade.datafim}</td>
                                                                                   
                                            <td style={{ textAlign : 'right'}}>
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
            </Row>
        </div>
    );    
}