import React, { Component, Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, CardFooter, Form, ListGroupItem } from 'reactstrap';
import './style.css';
import api from '../../../services/api';

const usuarioId = localStorage.getItem('userId');

const CountOportunidades = props => {

    const fasepipeId = props.fasepipeId;
    const [qtdeOportunidade, setQtdeOportunidades] = useState(0);
        
    useEffect(() => {
        api.get(`oportunidades-count-fasePipe/${fasepipeId}`, {
            headers: {
                Authorization: 1,
            }           
        }).then(response => {            
            setQtdeOportunidades(response.data);
            
        })
    }, [usuarioId]);

    //console.log(qtdeOportunidade);

    return (
        <Fragment>
            <div className="title-values">
            {qtdeOportunidade === null ? ( <div><span className="details-pipes">0</span> Oportunidade</div> ) : <div><span className="details-pipes">{`${qtdeOportunidade}`}</span> Oportunidades</div> }
            </div>
        </Fragment>
    )
}

const FaseGoal = (props) => {
    const nomefase = props.nomefase;
    return (
        <div className="title-fase">Fase <span className="details-pipes text-success mr-2">{nomefase}</span></div>
    )
}

const FaseNoGoal = (props) => {
    const nomefase = props.nomefase;
    return (
        <div className="title-fase">Fase <span className="details-pipes text-danger mr-2">{nomefase}</span></div>
    )
}

const FasePercetuais = (props) => {
    const nomefase = props.nomefase;
    return (
        <div className="title-fase">Fase <span className="details-pipes mr-2">{nomefase}</span></div>
    )
}

function NomeFasePipe (props) {
    const nomefase = props.nomefase;
    if(nomefase.toUpperCase() === ('Goal').toUpperCase()) {
        return <FaseGoal nomefase={nomefase} />;
    } else if (nomefase.toUpperCase() === ('NoGoal').toUpperCase()) {
        return <FaseNoGoal nomefase={nomefase} />;
    } else {
        return <FasePercetuais nomefase={nomefase} />;
    }
}

const TotalOportunidades = props => {
    const fasepipeId = props.fasepipeId;
    const [totalOportunidade, setTotalOportunidades] = useState(0);
    
    useEffect(() => {
        api.get(`oportunidades-total-fasePipe/${fasepipeId}`, {
            headers: {
                Authorization: 1,
            }           
        }).then(response => {            
            setTotalOportunidades(response.data);
        })
    }, [usuarioId]);    

    return (
        <Fragment>
            <div key={`totalOportunidades${fasepipeId}`} className="title-values">
                <i className="fa fa-line-chart details-pipes mr-2"></i>
                R$ {totalOportunidade.total === null ? '0,00' : `${totalOportunidade.total}`}
            </div>
        </Fragment>
    )
}

function CardOportunidade (props) {
    const fasePipeId = props.fasePipeId;
    const [oportunidades, setOportunidades] = useState([]);

    useEffect(() => {
        api.get(`oportunidades-fasePipe/${fasePipeId}`, {
            headers: {
                Authorization: 1,
            }
        }).then(response => {
            setOportunidades(response.data);
        });
    }, [usuarioId]); 

    console.log(fasePipeId);
    return (
        <Fragment>                     
            {oportunidades.map((oportunidade, index) => (                
                <ListGroupItem key={`lstGroup${index}`} className="list-group-item-accent-success text-muted list-group-item-divider card-oportunidade">
                    <small>
                        <div keys={`header${oportunidade.id}`}>
                            <div className="float-left">
                                Nº {oportunidade.id}
                            </div>
                            <div className="text-right">
                                <Link to='/'><i className="fa fa-phone link-card"></i></Link>
                                <Link to='/'><i className="fa fa-envelope-open link-card"></i></Link>
                                <Link to='/'><i className="fa fa-pencil link-card"></i></Link>
                                <Link to='/'><i className="fa fa-calendar link-card"></i></Link>
                            </div>
                        </div>
                        <div keys={`body-card${oportunidade.id}`}> 
                            <div className="text-left">{oportunidade.nomeoportunidade}</div>                                        
                            <div className="float-left">{oportunidade.nomecliente}</div>
                            <div className="float-right">R$ {oportunidade.valor}</div>
                        </div>
                        <div> 
                            <br />
                            <div className="text-right">Qui 11 Jun, 2020</div>
                        </div>
                    </small>
                    {/* <div>{anotacao.anotacao}</div> 
                    <div>
                        <small className="text-muted mr-3">
                            <i className="fa fa-users"></i>&nbsp; {oportunidade.nomecliente}
                        </small>
                    </div>
                    <div>
                        <small className="text-muted">
                            <i className="fa fa-address-book-o"></i> {anotacao.nomecontato}
                        </small>    
                    </div> */}
                </ListGroupItem>
                
                // <div key={`card-body${oportunidade.id}`} className="card-oportunidade">
                //     <div keys={`header${oportunidade.id}`}>
                //         <div className="float-left">
                //             Nº {oportunidade.id}
                //         </div>
                //         <div className="text-right">
                //             <Link to='/'><i className="fa fa-phone link-card"></i></Link>
                //             <Link to='/'><i className="fa fa-envelope-open link-card"></i></Link>
                //             <Link to='/'><i className="fa fa-pencil link-card"></i></Link>
                //             <Link to='/'><i className="fa fa-calendar link-card"></i></Link>
                //         </div>
                //     </div>
                //     <div keys={`body-card${oportunidade.id}`}> 
                //         <div className="text-left">{oportunidade.nomeoportunidade}</div>                                        
                //         <div className="float-left">{oportunidade.nomecliente}</div>
                //         <div className="float-right">R$ {oportunidade.valor}</div>
                //     </div>
                //     <div> 
                //         <br />
                //         <div className="text-right">Qui 11 Jun, 2020</div>
                //     </div>
                // </div>
            ))}           
                            
        </Fragment>
    );    
}

// const CardOportunidadeBody = props => {
//     const oportunidadesBody = props.oportunidades.map((oportunidade, index) => {
//         return (  
//         <div keys={`d`+index}> 
//             <div className="text-left">{oportunidade.nomeoportunidade}</div>                                        
//             <div className="float-left">{oportunidade.nomecliente}</div>
//             <div className="float-right">R$ {oportunidade.valor}</div>
//         </div>
//         )
//     });    
//     return (
//         <div>{oportunidadesBody}</div>
//     );
// }

const FasePipe = () => {    
    const [fasesPipe, setFasesPipe] = useState([]);
    
    useEffect(() => {
        api.get('fases-pipe-pipeId/6', {
            headers: {
                Authorization: 1,
            }           
        }).then(response => {            
            setFasesPipe(response.data);
        })
    }, [usuarioId]);

    return (
        <Fragment>
            {fasesPipe.map(fasePipe => (                
            <Col key={`col${fasePipe.id}`} md="2">
            {/* <Col key={'col' + fasePipe.id} md="2"> */}
                <Card>
                    <CardHeader>                        
                        <NomeFasePipe key={`nomeFasePipe${fasePipe.id}`} nomefase={fasePipe.nomefase} />
                        <TotalOportunidades fasepipeId={fasePipe.id} />
                        <CountOportunidades fasepipeId={fasePipe.id} />                        
                    </CardHeader>
                    <CardBody>
                        <CardOportunidade className="card-body" key={`card-oportunidade${fasePipe.id}`} fasePipeId={fasePipe.id} />
                    </CardBody>
                </Card>
            </Col>            
        ))}
        </Fragment>
    )    
}

class Pipes extends Component {
    render() {        
        return (            
            <div className="animated fadeIn">
                {/* <Form onSubmit={handlePipes}> */}
                <Form>
                    <Row>
                        {/* /* 20% */}
                        <FasePipe />                        
                    </Row>
                </Form>
            </div>
        );
    }

}
export default Pipes;