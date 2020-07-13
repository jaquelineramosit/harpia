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
            width: '17%',
        },
        {
            name: 'Proprietário',
            selector: 'nomeproprietario',
            sortable: true,
            left: true,
            width: '10%',
        },
        {
            name: 'Cliente',
            selector: 'nomecliente',
            sortable: true,
            left: true,
            width: '12%',
        },
        {
            name: 'Contato',
            selector: 'nomecontato',
            sortable: true,
            left: true,
            width: '12%',
        },
        {
            name: 'Produto',
            selector: 'nomeproduto',
            sortable: true,
            left: true,
            width: '12%',
        },
        {
            name: 'Fase Pipe',
            selector: 'nomefase',
            sortable: true,
            left: true,
            width: '9%',
        },
        {
            name: 'Valor',
            cell: row => <div>{row.valor.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})}</div>,
            sortable: true,
            left: true,
            width: '14%',
        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            cell: row => row.ativo === 1 ? <Badge color="success">Ativo</Badge> : <Badge color="danger">Inativo</Badge>,
            width: '6%',
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '8%',
            cell: row => <Link to={`oportunidades/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Oportunidades
                            <Link to={`/oportunidades?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
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