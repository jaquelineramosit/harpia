import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';
import {Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table} from 'reactstrap';

import api from '../../../../services/api';

export default function ListaOportunidades() {
    const [oportunidades, setOportunidades] = useState([]);
    const usuarioId = localStorage.getItem('userId'); 

    useEffect(() => {
        api.get('oportunidades').then(response => {            
            setOportunidades(response.data);
        })
    }, [usuarioId]);
    
    return ( 
        <div className="animated-fadeIn">            
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                           
                            <i className="fa fa-align-justify"></i>Oportunidades
                                                       
                            <Link to={`oportunidades`} className="btn btn-secondary float-right">
                                                    <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>                                                                                             
                                                                                                                     
                        </CardHeader>
                        <CardBody>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th>Oportunidades</th>
                                        <th>Proprietário</th>
                                        <th>Cliente</th>
                                        <th>Contato</th>
                                        <th>Produto</th>
                                        <th>Fase do Pipe</th>
                                        <th>Valor</th>
                                        <th style={{ textAlign : 'right'}}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {oportunidades.map(oportunidade => (
                                        <tr>
                                            <td>{oportunidade.nomeoportunidade}</td> 
                                            <td>{oportunidade.proprietarioId}</td> 
                                            <td>{oportunidade.clienteId}</td> 
                                            <td>{oportunidade.contatoId}</td> 
                                            <td>{oportunidade.produtoId}</td>
                                            <td>{oportunidade.fasepipeId}</td>
                                            <td>{oportunidade.valor}</td>
                                                                                   
                                            <td style={{ textAlign : 'right'}}>
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