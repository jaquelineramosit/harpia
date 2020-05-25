import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table} from 'reactstrap';

import api from '../../../../services/api';

export default function ListaAnotacoes() {
    const [anotacoes, setAnotacoes] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('anotacoes').then(response => {            
            setAnotacoes(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                           
                            <i className="fa fa-align-justify"></i>Anotações
                                                       
                            <Link to={`anotacoes`} className="btn btn-secondary float-right">
                                                    <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>                                                                                             
                                                                                                                     
                        </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Anotações</th>
                                        <th>Cliente</th>
                                        <th>Oportunidade</th>
                                        <th>Contato</th>
                                        <th style={{ textAlign : 'right'}}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {anotacoes.map(anotacao => (
                                        <tr>
                                            <td>{anotacao.anotacao}</td> 
                                            <td>{anotacao.clienteId}</td> 
                                            <td>{anotacao.oportunidadeId}</td> 
                                            <td>{anotacao.contatoId}</td> 
                                                                                   
                                            <td style={{ textAlign : 'right'}}>
                                                <Link to={`anotacoes/${anotacao.id}`} className="btn-sm btn-primary">
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