import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaContatos() {
    const [contatos, setContatos] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('contatosCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('contatos', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setContatos(response.data);
        })
    }, [usuarioId]);
    const data = contatos;

    const columns = [
        {
            name: 'Contatos',
            selector: 'nomecontato',
            sortable: true,
            width: '20%',


        },
        {
            name: 'Tipo de Contato',
            selector: 'tipocontato',
            sortable: true,
            left: true,
            width: '20%',

        },
        {
            name: 'Cargo',
            selector: 'nomecargo',
            sortable: true,
            left: true,
            width: '20%',

        },
        {
            name: 'Departamento',
            selector: 'departamento',
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
            cell: row => <Link to={`contatos/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Contatos
                            <Link to={`contatos?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                             </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Contatos"
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