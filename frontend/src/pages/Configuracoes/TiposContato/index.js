import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const TiposContato = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var tiposContatoIdParams = props.match.params.id;


  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
      tipocontato: '',
  });

  useEffect(() => {
      if (action === 'edit' && tiposContatoIdParams !== '') {
          api.get(`tipos-contato/${tiposContatoIdParams}`).then(response => {
              document.getElementById('txtTipoContato').value = response.data.tipocontato;
console.log(response.data.tipocontato);
              setFormData({
                  ...formData,
                  tipocontato: response.data.tipocontato,

              })
          });
      } else {
          return;
      }
  }, [tiposContatoIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleTiposContato(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/tipos-contato/${tiposContatoIdParams}`, data, {
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
                  const response = await api.post('tipos-contato', data, {
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
            <Form onSubmit={handleTiposContato}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipos de Contato</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="tipocontato">Nome do Tipo do Contato</Label>
                                        <Input type="text" required id="txtTipoContato" placeholder="Digite o nome do Tipo de Contato"
                                            name="tipocontato"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        oonChange={ e => setAtivo(e.target.checked)}
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

export default TiposContato;
