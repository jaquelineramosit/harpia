import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaTipocontatos() {
    const [tipocontatos, setTipocontatos] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('tipos-contatoCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('tipos-contato', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTipocontatos(response.data);
        })
    }, [usuarioId]);
    const data = tipocontatos;

    const columns = [
        {
            name: 'Tipo de Contatos',
            selector: 'tipocontato',
            sortable: true,
            width: '45%',


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
            cell: row => <Link to={`tipos-contato/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];


    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Tipos de Contatos
                            <Link to={`tipos-contato/?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Tipos de Contatos"
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