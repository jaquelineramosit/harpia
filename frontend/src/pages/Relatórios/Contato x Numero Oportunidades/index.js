import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { BarChart, Cell, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Table } from 'semantic-ui-react';



export default function RelContatoOportunidade() {

    const data = [
        {
            name: 'Contato A', uv: 590, pv: 800, amt: 1400,
        },
        {
            name: 'Contato B', uv: 868, pv: 967, amt: 1506,
        },
        {
            name: 'Contato C', uv: 1397, pv: 1098, amt: 989,
        },
        {
            name: 'Contato D', uv: 1480, pv: 1200, amt: 1228,
        },
        {
            name: 'Contato E', uv: 1520, pv: 1108, amt: 1100,
        },
        {
            name: 'Contato F', uv: 1400, pv: 680, amt: 1700,
        },
    ];

    return (
        <div className="animated-fadeIn">
            <div class="col-sm-6">
                <h2 class="m-0 text-dark">Contato x Número de Oportunidades </h2>
            </div>
            <div class="card-group mt-2">
                <div class="card col-lg-8" >
                    <div className="cardgrafico mt-3">
                        <ComposedChart
                            width={900}
                            height={400}
                            data={data}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <CartesianGrid stroke="#f5f5f5" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="uv" barSize={20} fill="#413ea0" />
                            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
                        </ComposedChart>

                    </div>

                </div>

                <div className="card col-lg-4">
                    <div className="filtros">



                        <form>
                            <Form.Row>
                                <Form.Group className=" mt-3" as={Col} controlId="formGriCliente">
                                    <Form.Label>Contato</Form.Label>
                                    <Form.Control
                                        as="select"

                                    >
                                        <option>Selecione</option>
                                        <option>Top Five</option>
                                        <option value="1">Contato1</option>
                                        <option value="2">Contato2</option>
                                        <option value="3">Contato3</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group className="col-md-6" as={Col} controlId="formGridDataInicio">
                                    <Form.Label>Data Início</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                                <Form.Group className="col-md-6" as={Col} controlId="formGridDataFinal">
                                    <Form.Label>Data Final</Form.Label>
                                    <Form.Control type="date" />
                                </Form.Group>
                            </Form.Row>
                        </form>

                    </div>
                </div>

            </div>
            <div className="cardtable">
                <div class="card col-lg-12">

                    <div className="card-table">

                        <Table celled >
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Contato</Table.HeaderCell>
                                    <Table.HeaderCell>Oportunidades</Table.HeaderCell>
                                    <Table.HeaderCell>Data Inicio</Table.HeaderCell>
                                    <Table.HeaderCell>Data Final</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Oportunidade</Table.Cell>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>Data Final</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Oportunidade</Table.Cell>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>Data Final</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Oportunidade</Table.Cell>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>Data Final</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Oportunidade</Table.Cell>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>Data Final</Table.Cell>
                                </Table.Row>


                            </Table.Body>


                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
}