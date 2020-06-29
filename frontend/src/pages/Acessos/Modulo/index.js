import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Modulo = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var moduloIdParams = props.match.params.id;

  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
      nomemodulo: '',
      descricao: '',
  });

  useEffect(() => {
      if (action === 'edit' && moduloIdParams !== '') {
          api.get(`modulos/${moduloIdParams}`).then(response => {
              document.getElementById('txtNomeModulo').value = response.data.nomemodulo;
              document.getElementById('txtDescricao').value = response.data.descricao;

              setFormData({
                  ...formData,
                  nomemodulo: response.data.nomemodulo,
                  descricao: response.data.descricao,

              })
          });
      } else {
          return;
      }
  }, [moduloIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleTicket(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/modulos/${moduloIdParams}`, data, {
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
                  const response = await api.post('modulos', data, {
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
            <Form onSubmit={handleTicket}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Módulo</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="Nome">Nome Módulo</Label>
                                        <Input type="text" required id="txtNomeModulo" placeholder="Digite Nome do Módulo"
                                        name="nomemodulo"
                                        onChange={handleInputChange}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label htmlFor="Descricao">Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao" multiple placeholder="Digite a Descrição do Módulo"
                                        name="descricao"
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
export default Modulo;
