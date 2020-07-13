import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import { Redirect } from "react-router-dom";
import api from '../../../../src/services/api';

const SeguimentoMercado = (props) => {
    const [redirect, setRedirect] = useState(false);

    var search = props.location.search;
    var params = new URLSearchParams(search);
    var action = params.get('action');
    var segMercadoIdParams = props.match.params.id;
    const usuarioId = localStorage.getItem('userId');

    const [nomesegmento, setNomeSegmento] = useState('');
    const [ativo, setAtivo] = useState(1);

    useEffect(() => {
        if (action === 'edit' && segMercadoIdParams !== '') {
            api.get(`segmentos-mercado/${segMercadoIdParams}`).then(response => {
                setNomeSegmento(response.data.nomesegmento);
                response.data.ativo === 1 ? setAtivo(1) : setAtivo(0);                
            });
        } else {
            return;
        }
    }, [segMercadoIdParams])

    function handleInputChange(event) {
        const { name } = event.target;

        if ( name === 'ativo' ) {
            if ( ativo === 1 ) {
                setAtivo(0);
            } else {
                setAtivo(1);
            }
        }
    };

    function handleReset() {
        setRedirect(true);
    };

  async function handleSegmentoMercado(e) {
      e.preventDefault();

      const data = {
          nomesegmento,
          ativo
      };

      if (action === 'edit') {

          try {
              const response = await api.put(`/segmentos-mercado/${segMercadoIdParams}`, data, {
                  headers: {
                      Authorization: 6,
                  }
              });
              alert('Cadastro atualizado com sucesso.');
              setRedirect(true);  
            } catch (err) {
              alert('Erro na atualização, tente novamente.');
          }
      } else {

          if (action === 'novo') {
              try {
                  const response = await api.post('segmentos-mercado', data, {
                      headers: {
                          Authorization: 6,
                      }
                  });
                  alert('Cadastro realizado com sucesso.');
                  setRedirect(true);  
                } catch (err) {
                  alert('Erro no cadastro, tente novamente.');
              }
          }
      }
  }

    return (
        <div className="animated fadeIn">
            { redirect && <Redirect to="/lista-segmentos-mercado" /> }
            <Form onSubmit={handleSegmentoMercado} onReset={handleReset}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Segmentos de Mercado</strong>
                                {action === 'novo' ? <small> Novo</small> : <small> Editar</small>}
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeSegmento">Nome do Segmento de Mercado</Label>
                                        <Input type="text" required id="txtNomeSegmento" placeholder="Digite o nome do Segmento"
                                            name="nomesegmento"
                                            value={nomesegmento}
                                            onChange={e => setNomeSegmento(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} size={'sm'}
                                            checked={ativo === 1 ? true : false}
                                            name="ativo"
                                            onChange={handleInputChange}
                                        />
                                    </Col>
                                </FormGroup>
                            </CardBody>
                            <CardFooter className="text-center">
                                <Button type="submit" size="sm" color="success" className=" mr-3"><i className="fa fa-check"></i> Salvar</Button>
                                <Button type="reset" size="sm" color="danger" className="ml-3"><i className="fa fa-ban "></i> Cancelar</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
export default SeguimentoMercado;
