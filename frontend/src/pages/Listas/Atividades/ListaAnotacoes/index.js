import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaAnotacoes() {
    const [anotacoes, setAnotacoes] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('anotacoesCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('anotacoes', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setAnotacoes(response.data);
        })
    }, [usuarioId]);
    const data = anotacoes;

    const columns = [
        {
            name: 'Anotações',
            selector: 'anotacao',
            sortable: true,
            width: '26%',
        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            left: true,
            width: '16%',
        },
        {
            name: 'Oportunidade',
            selector: 'nomeoportunidade',
            sortable: true,
            left: true,
            width: '20%',
        },
        {
            name: 'Contato',
            selector: 'nomecontato',
            sortable: true,
            left: true,
            width: '16%',
        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => row.cancelada === 1 ? <Badge color="success">Ativo</Badge> : <Badge color="danger">Inativo</Badge> ,
            width: '12%',
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '10%',
            cell: row => <Link to={`anotacoes/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Anotações
                            <Link to={`/anotacoes?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Anotações"
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