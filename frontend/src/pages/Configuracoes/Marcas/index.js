import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const Marcas = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var marcasIdParams = props.match.params.id;


  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
      nomemarca: '',
      nacional: '',
  });

  useEffect(() => {
      if (action === 'edit' && marcasIdParams !== '') {
          api.get(`marcas/${marcasIdParams}`).then(response => {
              document.getElementById('txtNomeMarca').value = response.data.nomemarca;
              document.getElementById('txtNacional').value = response.data.nacional;

              setFormData({
                  ...formData,
                  nomemarca: response.data.nomemarca,
                  nacional: response.data.nacional,

              })
          });
      } else {
          return;
      }
  }, [marcasIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleMarcas(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/marcas/${marcasIdParams}`, data, {
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
                  const response = await api.post('marcas', data, {
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
            <Form onSubmit={handleMarcas}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Marcas</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeMarca">Nome da Marca</Label>
                                        <Input type="text" required id="txtNomeMarca" placeholder="Digite o nome do Pipe"
                                            name="nomemarca"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="nacional">Nacionalidade</Label>
                                        <Input type="text" required id="txtNacional" placeholder="Digite a nacionalidade"
                                            name="nacional"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                {/*<FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
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

export default Marcas;
