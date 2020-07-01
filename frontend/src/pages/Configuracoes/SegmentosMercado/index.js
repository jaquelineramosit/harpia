import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const SeguimentoMercado = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var segMercadoIdParams = props.match.params.id;


  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
      nomesegmento: '',
  });

  useEffect(() => {
      if (action === 'edit' && segMercadoIdParams !== '') {
          api.get(`segmentos-mercado/${segMercadoIdParams}`).then(response => {
              document.getElementById('txtNomeSegmento').value = response.data.nomesegmento;
              setFormData({
                  ...formData,
                  nomesegmento: response.data.nomesegmento,
              })
          });
      } else {
          return;
      }
  }, [segMercadoIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleSegmentoMercado(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/segmentos-mercado/${segMercadoIdParams}`, data, {
                  headers: {
                      Authorization: 6,
                  }
              });
              alert(`Cadastro atualizado com sucesso.`);
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
                  alert(`Cadastro realizado com sucesso.`);
              } catch (err) {

                  alert('Erro no cadastro, tente novamente.');
              }
          }
      }
  }

    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleSegmentoMercado}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Segmentos de Mercado</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeSegmento">Nome do Segmento de Mercado</Label>
                                        <Input type="text" required id="txtNomeSegmento" placeholder="Digite o nome do Segmento"
                                            name="nomesegmento"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                              {/*<FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        name={ativo}
                                        onChange={ e => setAtivo(e.target.value)}
                                        />
                                    </Col>

                              </FormGroup>*/}
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
