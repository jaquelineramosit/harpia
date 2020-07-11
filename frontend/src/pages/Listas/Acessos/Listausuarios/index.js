import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';

export default function ListaUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');

    //logica para pegar o total
    useEffect(() => {
        api.get('usuariosCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('usuarios', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setUsuarios(response.data);
        })
    }, [usuarioId]);
    const data = usuarios;

    const columns = [
        {
            name: 'Nome',
            selector: 'nome',
            sortable: true,
            width: '13%',


        },
        {
            name: 'Sobrenome',
            selector: 'sobrenome',
            sortable: true,
            left: true,
            width: '18%',

        },
        // {
        //     name: 'Data de Nascimento',
        //     selector: 'datanasc',
        //     sortable: true,
        //     left: true,

        // },
        {
            name: 'Cidade',
            selector: 'cidade',
            sortable: true,
            left: true,
            width: '10%',

        },
        // {
        //     name: 'Estado',
        //     selector: 'estado',
        //     sortable: true,
        //     left: true,

        // },
        {
            name: 'Telefone',
            selector: 'telefone',
            sortable: true,
            left: true,
            width: '12%',

        },
        {
            name: 'Celular',
            selector: 'celular',
            sortable: true,
            left: true,
            width: '15%',
            

        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            left: true,
            width: '17%',

        },
        {
            name: 'Status',
            sortable: true,
            center: true,
            width: '6%',
            cell: row => <Badge color="success">Ativo</Badge>,
        },
        {
            name: 'Ações',
            sortable: true,
            right: true,
            cell: row => <Link to={`usuarios/${row.id}?action=edit`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">
                            <i className="fa fa-align-justify"></i>Usuários
                            <Link to={`usuarios/?action=novo`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                Novo
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Usuários"
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
