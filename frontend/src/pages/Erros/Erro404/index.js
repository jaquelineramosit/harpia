import React from 'react';
import { Row, Col, Card,CardBody, CardHeader } from 'reactstrap';
import '../../../global.css';


const Erro404 = () => {

    return (
        <div className="animated fadeIn">

        
                <Col xs="12" md="12">
                <Card>
                    <CardHeader>
                        <h1>Error 404 - Page Not Found</h1>
                    </CardHeader>
                    <CardBody>
                        <i>Contate o Administrador do sistema</i>
                    </CardBody>

                </Card>
                </Col>
        

        </div>
    );
}

export default Erro404;
