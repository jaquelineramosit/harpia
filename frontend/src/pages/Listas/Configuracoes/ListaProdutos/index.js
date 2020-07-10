import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Badge } from 'reactstrap';
import api from '../../../../services/api';
import DataTable from 'react-data-table-component';


export default function ListaProdutos() {
    const [produtos, setProdutos] = useState([]);
    const [total, setTotal] = useState(0);
    const usuarioId = localStorage.getItem('userId');
    //logica para pegar o total
    useEffect(() => {
        api.get('produtosCount', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setTotal(response.data);
        })
    }, [1]);

    useEffect(() => {
        api.get('produtos', {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setProdutos(response.data);
        })
    }, [usuarioId]);
    const data = produtos;

    const columns = [
        {
            name: 'Produto',
            selector: 'nomeproduto',
            sortable: true,
            width: '14%',
            


        },
        {
            name: 'Fabricante',
            selector: 'numerofabricante',
            sortable: true,
            left: true,
            width: '14%',

        },
        {
            name: 'Quantidade',
            selector: 'quantidade',
            sortable: true,
            left: true,
            width: '14%',

        },
        {
            name: 'Valor',
            selector: 'valor',
            sortable: true,
            left: true,
            width: '14%',

        },
        {
            name: 'Distribuidor',
            selector: 'nomedistribuidor',
            sortable: true,
            left: true,
            width: '14%',

        },
        {
            name: 'Tempo de Entrega',
            selector: 'tempoentrega',
            sortable: true,
            left: true,
            width: '14%',

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
            cell: row => <Link to={`produtos/${row.id}`} className="btn-sm btn-primary"><i className="fa fa-pencil fa-lg"></i></Link>
        },
    ];

    return (
        <div className="animated-fadeIn">
            <Row>
                <Col xs="12" lg="12">
                    <Card>
                        <CardHeader className="links">

                            <i className="fa fa-align-justify"></i>Produtos

                            <Link to={`produtos`} className="btn btn-secondary float-right">
                                <i className="cui-file icons mr-1"></i>
                                                    Novo
                                                </Link>

                        </CardHeader>
                        <CardBody>
                            <DataTable className="mt-n3"
                                noHeader={true}
                                title="Produtos"
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