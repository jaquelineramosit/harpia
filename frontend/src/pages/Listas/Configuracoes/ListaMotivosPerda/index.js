import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';


export default function Listamotivosperda() {
    const [motivosperda, setMotivosperda] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('motivos-perdaCount',
            {
                headers: {
                    Authorization: 1,
                }
            }).then(response => {
                setTotal(response.data);
            })
    }, [1]);

    useEffect(() => {
        api.get('motivos-perda', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setMotivosperda(response.data);
        })
    }, [usuarioId]);
    const data = motivosperda;

    const columns = [
        {
            name: 'Motivos de Perda',
            selector: 'motivoperda',
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
            cell: row => <Link to={`motivos-perda/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg "></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Motivos de Perda

                            <Link to={`motivos-perda/?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Motivos de Perda"
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
