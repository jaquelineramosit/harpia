import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Input, FormGroup} from 'reactstrap';
import { BarChart, Area, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart } from 'recharts';
import api from '../../../services/api';
import '../../../global.css';
import DataTable from 'react-data-table-component';

export default function Dashboard() {
    const [oportunidades, setOportunidades] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    const data = [
        {
            name: 'Page', uv: 4000, pv: 2800, amt: 3400,
        },
        {
            name: 'Page', uv: 3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Page', uv: 2000, pv: 9800, amt: 2290,
        },
        {
            name: 'Page ', uv: 2780, pv: 3908, amt: 2000,
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
    useEffect(() => {
        api.get('oportunidades', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setOportunidades(response.data);
        })
    }, [usuarioId]);
    const datatable = oportunidades;

    const columns = [
        {
            name: 'Oportunidades',
            selector: 'nomeoportunidade',
            sortable: true,
            width: '20%',
        },
        {
            name: 'Proprietário',
            selector: 'nomeproprietario',
            sortable: true,
            left: true,
            width: '14%',
        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            left: true,
            width: '12%',
        },
        {
            name: 'Produto',
            selector: 'nomeproduto',
            sortable: true,
            left: true,
            width: '14%',
        },
        {
            name: 'Fase Pipe',
            selector: 'nomefase',
            sortable: true,
            left: true,
            width: '13%',
        },
        {
            name: 'Valor',
            cell: row => <div>{row.valor.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})}</div>,
            sortable: true,
            left: true,
            width: '15%',
        },        
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '8%',
            cell: row => <Link to={`oportunidades/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col md="8">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Oportunidades
                        </CardHeader>
                        <CardBody>
                            <FormGroup row className="border-bottom">                              
                                <Col  lg="5" md="5" className="search">
                                    <Input className="fa fa-search fa-2x" type="text" id="txtSearch"  />
                                </Col>
                                <Col xs="1" lg="1" md="1" className="search pl-0">
                                    <Link to={`oportunidades`} >
                                        <i className="fa fa-search fa-2x" style={{ color: '#20a8d8'}}></i>
                                    </Link>    
                                </Col>
                                <Link to={`oportunidades`} className="btn btn-primary icons-oportunidades">
                                        <i className="fa fa-plus-circle fa-2x"></i>
                                    </Link>      
                            </FormGroup>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Oportunidades"
                                columns={columns}
                                data={datatable}
                                striped={true}
                                highlightOnHover={true}
                                pagination={true}
                            />
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card>
                        <CardHeader className="links ">
                            <i className="fa fa-line-chart"></i>Oportunidades Ganhas x Perdidas
                        </CardHeader>
                        <CardBody>
                            
                            <BarChart
                                width={300}
                                height={170}
                                data={data}
                                margin={{
                                    top: 20, left: -10, bottom: 5,
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
                                width={280}
                                height={170}
                                data={line}
                                responsive={true}
                                margin={{
                                    top: 20, left: -10, bottom: 5,
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
                                width={280}
                                height={170}
                                data={compo}
                                margin={{
                                    top: 20, left: -10, bottom: 5,
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