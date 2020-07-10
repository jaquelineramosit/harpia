import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaPaginas() {
    const [paginas, setPaginas] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('paginasCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('paginas', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setPaginas(response.data);
        })
    }, [usuarioId]);
    const data = paginas;

    const columns = [
        {
            name: 'Módulos',
            selector: 'nomemodulo',
            sortable: true,
            width: '15%',


        },
        {
            name: 'Nome da Página',
            selector: 'nomePagina',
            sortable: true,
            left: true,
            width: '15%',

        },
        {
            name: 'Descrição',
            selector: 'descricao',
            sortable: true,
            left: true,
            width: '55%',

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
            cell: row => <Link to={`paginas/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg "></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Páginas

                            <Link to={`paginas/?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Páginas"
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
