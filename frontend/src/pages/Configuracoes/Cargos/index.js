import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button , CardFooter, Form} from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';
import { defaultThemes } from 'react-data-table-component';

const Cargos = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var cargosIdParams = props.match.params.id;

  const usuarioId = localStorage.getItem('userId');
  const [ativo, setAtivo] = useState('');
  const [formData, setFormData] = useState({
      nomecargo: '',
      ativo: '',

  });

  useEffect(() => {
      if (action === 'edit' && cargosIdParams !== '') {
          api.get(`cargos/${cargosIdParams}`).then(response => {
              document.getElementById('txtNomeCargo').value = response.data.nomecargo;

              setFormData({
                  ...formData,
                  nomecargo: response.data.nomecargo,
              })
          });
      } else {
          return;
      }
  }, [cargosIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleCargos(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/cargos/${cargosIdParams}`, data, {
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
                  const response = await api.post('cargos', data, {
                      headers: {
                          Authorization: 6,
                      }
                  });
                  alert(`Cadastro realizado com sucesso.`);
              } catch (erro) {

                  alert('Erro no cadastro, tente novamente.');
              }
          }
      }
  }
    return (
        <div className="animated fadeIn">
            <Form onSubmit={handleCargos}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Cargos</strong>
                                <small>novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeCargo">Nome do Cargo</Label>
                                        <Input type="text" required id="txtNomeCargo" placeholder="Digite o nome do Cargo"
                                            name="nomecargo"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="1">
                                        <Label check className="form-check-label" htmlFor="ativo1">Ativo</Label>
                                        <AppSwitch id="rdAtivo" className={'switch-ativo'}  label color={'success'} defaultChecked size={'sm'}
                                        value={ativo}
                                        onChange={ e => setAtivo(e.target.value)}
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
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

export default Cargos;
