import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaOportunidades() {
    const [oportunidades, setOportunidades] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('oportunidadesCount', {
            headers: {
                Authorization: 1,
            },

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
    const data = oportunidades;

    const columns = [
        {
            name: 'Oportunidades',
            selector: 'nomeoportunidade',
            sortable: true,


        },
        {
            name: 'Proprietário',
            selector: 'proprietarioId',
            sortable: true,
            left: true,

        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            left: true,

        },
        {
            name: 'Contato',
            selector: 'nomecontato',
            sortable: true,
            left: true,

        },
        {
            name: 'Produto',
            selector: 'nomeproduto',
            sortable: true,
            left: true,

        },
        {
            name: 'Fase do Pipe',
            selector: 'nomefase',
            sortable: true,
            left: true,

        },
        {
            name: 'Valor',
            selector: 'valor',
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
            cell: row => <Link to={`oportunidades/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];
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
                            <DataTable className="mt-n3"
                                title="Oportunidades"
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