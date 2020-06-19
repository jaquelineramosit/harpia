import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Input, FormGroup, Label } from 'reactstrap';
import { BarChart, Area, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from 'recharts';
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
    const data = [
        {
            name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
            name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
        },
        {
            name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];
    const line = [
        {
            name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
            name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
        },
        {
            name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
        },
        {
            name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];
    const compo = [
        {
            name: 'Page A', uv: 590, pv: 800, amt: 1400, cnt: 490,
        },
        {
            name: 'Page B', uv: 868, pv: 967, amt: 1506, cnt: 590,
        },
        {
            name: 'Page C', uv: 1397, pv: 1098, amt: 989, cnt: 350,
        },
        {
            name: 'Page D', uv: 1480, pv: 1200, amt: 1228, cnt: 480,
        },
        {
            name: 'Page E', uv: 1520, pv: 1108, amt: 1100, cnt: 460,
        },
        {
            name: 'Page F', uv: 1400, pv: 680, amt: 1700, cnt: 380,
        },
    ];
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
                                        <i className="fa fa-search fa-2x ml-3 mt-1" style={{ color: '#20a8d8' }}></i>
                                    </Link>
                                </Col>
                            </FormGroup>
                            <Table responsive striped>
                                <thead>
                                    <tr>
                                        <th style={{ width: '6%' }}>Nº</th>
                                        <th style={{ width: '20%' }}>Oportunidade</th>
                                        <th style={{ width: '12%' }}>Cliente</th>
                                        <th style={{ width: '12%' }}>Contato</th>
                                        <th style={{ width: '8%' }}>Valor</th>
                                        <th style={{ width: '12%' }}>Fase Pipe</th>
                                        <th style={{ width: '10%' }}>Vendedor</th>
                                        <th style={{ width: '10%' }}>Expectativa</th>
                                        <th style={{ width: '10%' }, { textAlign: 'center' }}>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {oportunidades.map(oportunidade => (
                                        <tr key={`linha${oportunidade.id}`}>
                                            <td><span className="font-weight-bold mr-2">{oportunidade.id}</span></td>
                                            <td>{oportunidade.nomeoportunidade.substring(0, 30)}</td>
                                            <td>{oportunidade.nomecliente}</td>
                                            <td>{oportunidade.nomecontato}</td>
                                            <td>{oportunidade.valor}</td>
                                            <td>{oportunidade.nomefase}</td>
                                            <td>{`${oportunidade.nomevendedor}`}</td>
                                            <td>{oportunidade.expectativafechamentoId}</td>
                                            <td style={{ textAlign: 'center' }}>
                                                <Link to={`oportunidades/${oportunidade.id}`} className="btn-sm btn-primary">
                                                    <i className="fa fa-pencil fa-lg mr-1"></i>
                                                
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
                        <CardHeader className="links ">
                            <i className="fa fa-line-chart"></i>Oportunidades Ganhas x Perdidas
                        </CardHeader>
                        <CardBody >
                            <BarChart
                                width={450}
                                height={170}
                                data={data}
                                margin={{
                                    top: 20, left: -20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                                <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" dataKey="pv" fill="#8884d8" />
                                <Bar yAxisId="right" dataKey="uv" fill="#82ca9d" />
                            </BarChart>
                        </CardBody>
                        </Card>
                        <Card>
                        <CardHeader className="links ">
                            <i className="fa fa-line-chart"></i>Valor Fechado X Valor Aberto
                        </CardHeader>
                        <CardBody >
                            <LineChart
                                width={400}
                                height={170}
                                data={line}
                                margin={{
                                    top: 20, left: -20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                            </LineChart>
                        </CardBody>
                        </Card>
                        <Card>
                        <CardHeader className="links ">
                            <i className="fa fa-line-chart"></i>Meta X OP Ganha x OP Perdida
                        </CardHeader>
                        <CardBody >
                            <ComposedChart
                                width={400}
                                height={170}
                                data={data}
                                margin={{
                                    top: 20, left: -20, bottom: 5,
                                }}
                            >
                                <CartesianGrid stroke="#f5f5f5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                <Bar dataKey="pv" barSize={20} fill="#413ea0" />
                                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                                {/* <Scatter dataKey="cnt" fill="red" /> */}
                            </ComposedChart>
                        </CardBody>
                    </Card>


                </Col>

            </Row>
        </div>
    );
}