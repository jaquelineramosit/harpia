import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function Listapaises() {
    const [paises, setPaises] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('paisesCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('paises', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setPaises(response.data);
        })
    }, [usuarioId]);
    const data = paises;

    const columns = [
        {
            name: 'Páis',
            selector: 'nomepais',
            sortable: true,
            width: '20%',
        },
        {
            name: 'Sigla',
            selector: 'sigla',
            sortable: true,
            left: true,
            width: '20%',
        },
        {
            name: 'Moeda',
            selector: 'moeda',
            sortable: true,
            left: true,
            width: '20%',
        },
        {
            name: 'Sigla da Moeda',
            selector: 'siglamoeda',
            sortable: true,
            left: true,
            width: '20%',
        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => row.ativo === 1 ? <Badge color="success">Ativo</Badge> : <Badge color="danger">Inativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`paises/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Países

                            <Link to={`paises?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Países"
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