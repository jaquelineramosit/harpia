import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function Listapipes() {
    const [fasespipes, setFasespipes] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('fases-pipeCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);


    useEffect(() => {
        api.get('fases-pipe', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setFasespipes(response.data);
        })
    }, [usuarioId]);
    const data = fasespipes;

    const columns = [
        {
            name: 'Nome da Fase',
            selector: 'nomefase',
            sortable: true,
            width: '32%',


        },
        {
            name: 'Pipe',
            selector: 'nomepipe',
            sortable: true,
            left: true,
            width: '32%',

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
            cell: row => <Link to={`fases-pipe/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg "></i></Link>
        },
    ];


    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Fases do Pipes
                            <Link to={`fases-pipe`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Fases do Pipes"
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