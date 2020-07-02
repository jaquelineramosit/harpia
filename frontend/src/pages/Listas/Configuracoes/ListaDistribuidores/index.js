import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col,  Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaDistribuidores() {
    const [distribuidores, setDistribuidores] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    useEffect(() => {
        api.get('distribuidoresCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('distribuidores', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setDistribuidores(response.data);
        })
    }, [usuarioId]);
    const data = distribuidores;

    const columns = [
        {
            name: 'Distribuidor',
            selector: 'nomedistribuidor',
            sortable: true,


        },
        {
            name: 'CNPJ',
            selector: 'cnpj',
            sortable: true,
            left: true,

        },
        {
            name: 'Razão Social',
            selector: 'razaosocial',
            sortable: true,
            left: true,

        },
        {
            name: 'Contato',
            selector: 'contato',
            sortable: true,
            left: true,

        },
        {
            name: 'Telefone',
            selector: 'telefone',
            sortable: true,
            left: true,

        },
        {
            name: 'Celular',
            selector: 'celular',
            sortable: true,
            left: true,

        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`distribuidores/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Distribuidores

                            <Link to={`distribuidores`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Distribuidores"
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