import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function Listametas() {
    const [metas, setMetas] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('metasCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('metas', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setMetas(response.data);
        })
    }, [usuarioId]);
    const data = metas;

    const columns = [
        {
            name: 'Metas',
            selector: 'nomemeta',
            sortable: true,
            width: '30%',
        },
        {
            name: 'Valor',
            //selector: 'valor',
            sortable: true,
            left: true,
            width: '20%',
            cell: row => <div>{row.valor.toLocaleString("pt-BR", { style: "currency" , currency:"BRL"})}</div>,
        },
        {
            name: 'Qtde Oportunidades',
            selector: 'qtdeoportunidade',
            sortable: true,
            left: true,
            width: '26%',
        },
        {
            name: 'Status',
            sortable: true,
            left: true,
            width: '12%',
            cell: row => row.ativo === 1 ? <Badge color="success">Ativo</Badge> : <Badge color="danger">Inativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            width: '12%',
            cell: row => <Link to={`metas/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Metas
                            <Link to={`metas/?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Metas"
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
