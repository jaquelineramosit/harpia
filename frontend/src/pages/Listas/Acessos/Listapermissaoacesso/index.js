import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaPermissaoacesso() {
    const [permissoesacesso, setPermissaoacesso] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('permissao-acessoCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('permissao-acesso', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setPermissaoacesso(response.data);
        })
    }, [usuarioId]);
    const data = permissoesacesso;

    const columns = [
        {
            name: 'Perfil',
            selector: 'perfil',
            sortable: true,
            width: '19%',


        },
        {
            name: 'Módulo',
            selector: 'nomemodulo',
            sortable: true,
            left: true,
            width: '19%',

        },
        {
            name: 'Página',
            selector: 'nomepagina',
            sortable: true,
            left: true,
            width: '19%',

        },
        {
            name: 'Usuário',
            selector: 'nome',
            sortable: true,
            left: true,
            width: '19%',

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
            cell: row => <Link to={`permissao-acesso/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];
    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Permissão de Acesso

                            <Link to={`permissao-acesso/?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Permissão de Acesso"
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
