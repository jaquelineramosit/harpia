import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, } from 'recharts';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';



export default function RelContatoValorGanho() {

    const data = [
        {
            name: 'Contato A', uv: 4000, pv: 2400, amt: 2400,
        },
        {
            name: 'Contato B', uv: -3000, pv: 1398, amt: 2210,
        },
        {
            name: 'Contato C', uv: -2000, pv: -9800, amt: 2290,
        },
        {
            name: 'Contato D', uv: 2780, pv: 3908, amt: 2000,
        },
        {
            name: 'Contato E', uv: -1890, pv: 4800, amt: 2181,
        },
        {
            name: 'Contato F', uv: 2390, pv: -3800, amt: 2500,
        },
        {
            name: 'Contato G', uv: 3490, pv: 4300, amt: 2100,
        },
    ];

    return (
        <div className="animated-fadeIn">
            <div class="col-sm-6">
                <h2 class="m-0 text-dark">Contato x Valor Ganho </h2>
            </div>
            <div class="card-group mt-2">
                <div class="card col-lg-8" >
                    <div className="cardgrafico mt-3">
                        <BarChart
                            width={900}
                            height={300}
                            data={data}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <ReferenceLine y={0} stroke="#000" />
                            <Bar dataKey="pv" fill="#8884d8" />
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
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
                                        <option value="1">Contato</option>
                                        <option value="2">Contato</option>
                                        <option value="3">Contato</option>
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
                                    <Table.HeaderCell>Valor Ganho</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Perdido</Table.HeaderCell>
                                    <Table.HeaderCell>Data Inicio</Table.HeaderCell>
                                    <Table.HeaderCell>Data Final</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Valor Ganho</Table.Cell>
                                    <Table.Cell>Valor Perdido</Table.Cell>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>Data Final</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Valor Ganho</Table.Cell>
                                    <Table.Cell>Valor Perdido</Table.Cell>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>Data Final</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Valor Ganho</Table.Cell>
                                    <Table.Cell>Valor Perdido</Table.Cell>
                                    <Table.Cell>Data Início</Table.Cell>
                                    <Table.Cell>Data Final</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell>Contato</Table.Cell>
                                    <Table.Cell>Valor Ganho</Table.Cell>
                                    <Table.Cell>Valor Perdido</Table.Cell>
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