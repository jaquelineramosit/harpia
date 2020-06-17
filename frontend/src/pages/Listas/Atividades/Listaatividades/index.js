import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col,  Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';


export default function ListaAtividades() {
    const [atividades, setAtividades] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('atividadesCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('atividades', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setAtividades(response.data);
        })
    }, [usuarioId]);
    const data = atividades;

    const columns = [
        {
            name: 'Atividades',
            selector: 'atividade',
            sortable: true,


        },
        {
            name: 'Clientes',
            selector: 'clienteId',
            sortable: true,
            left: true,

        },
        {
            name: 'Contato',
            selector: 'contatoId',
            sortable: true,
            left: true,

        },
        {
            name: 'Tipo de Atividade',
            selector: 'tipoatividadeId',
            sortable: true,
            left: true,

        },
        {
            name: 'Data Atividade',
            selector: 'dataatividade',
            sortable: true,
            left: true,

        },
        {
            name: 'Data Início',
            selector: 'datainicio',
            sortable: true,
            left: true,

        },
        {
            name: 'Data Final',
            selector: 'datafim',
            sortable: true,
            left: true,

        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`atividades/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg mr-1"></i>
            Editar</Link>
        },
    ];



    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Atividades

                            <Link to={`atividades`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                title="Atividades"
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