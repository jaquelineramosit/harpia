import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaClientes() {
    const [clientes, setClientes] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('clientesCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('clientes', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setClientes(response.data);
        })
    }, [usuarioId]);
    const data = clientes;

    const columns = [
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            width: '12%',
        },
        {
            name: 'Razão Social',
            selector: 'razaosocial',
            sortable: true,
            left: true,
            width: '12%',
        },
        {
            name: 'Site',
            selector: 'site',
            sortable: true,
            left: true,
            width: '14%',
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            left: true,
            width: '14%',
        },
        {
            name: 'Telefone',
            selector: 'telefone',
            sortable: true,
            left: true,
            width: '12%',
        },
        {
            name: 'Cidade',
            selector: 'cidade',
            sortable: true,
            left: true,
            width: '12%',
        },
        {
            name: 'Estado',
            selector: 'uf',
            sortable: true,
            left: true,
            width: '8%',
        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => row.ativo === 1 ? <Badge color="success">Ativo</Badge> : <Badge color="danger">Inativo</Badge>,
            width: '8%',
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`clientes/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>,
            width: '8%',
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Clientes

                            <Link to={`clientes?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Clientes"
                                columns={columns}
                                data={data}
                                striped={true}
                                highlightOnHover={true}
                                responsive={true}
                                pagination={true}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}