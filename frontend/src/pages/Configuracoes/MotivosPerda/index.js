import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button ,CardFooter, Form,  } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const MotivoPerda = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var motivoPerdaIdParams = props.match.params.id;


  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    motivoperda: '',
    ativo: 1,
  });

  useEffect(() => {
      if (action === 'edit' && motivoPerdaIdParams !== '') {
          api.get(`motivos-perda/${motivoPerdaIdParams}`).then(response => {
              document.getElementById('txtMotivoPerda').value = response.data.motivoperda;
              setFormData({
                  ...formData,
                  motivoperda: response.data.motivoperda,

              })
          });
      } else {
          return;
      }
  }, [motivoPerdaIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleMotivosPerda(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/motivos-perda/${motivoPerdaIdParams}`, data, {
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
                  const response = await api.post('motivos-perda', data, {
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
            <Form onSubmit={handleMotivosPerda}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Motivos de perda</strong>
                                <small>novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="motivoPerda">Motivo da Perda</Label>
                                        <Input type="text" required id="txtMotivoPerda" placeholder="Digite um motivo"
                                            name="motivoperda"
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
export default MotivoPerda;
