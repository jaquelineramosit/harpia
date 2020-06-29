import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const TiposAtividade = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var tiposAtividadeIdParams = props.match.params.id;


  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
    tipoatividade: '',
    descricao:'',
  });

  useEffect(() => {
      if (action === 'edit' && tiposAtividadeIdParams !== '') {
          api.get(`tipos-atividade/${tiposAtividadeIdParams}`).then(response => {
              document.getElementById('txtTipoAtividade').value = response.data.tipoatividade;
              document.getElementById('txtDescricao').value = response.data.descricao;

              setFormData({
                  ...formData,
                  tipoatividade: response.data.tipoatividade,
                  descricao: response.data.descricao,

              })
          });
      } else {
          return;
      }
  }, [tiposAtividadeIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleTiposAtividades(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/tipos-atividade/${tiposAtividadeIdParams}`, data, {
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
                  const response = await api.post('tipos-atividade', data, {
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
            <Form onSubmit={handleTiposAtividades}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Tipos de Atividades</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="tipoAtividade">Tipo de Atividade</Label>
                                        <Input type="text" required id="txtTipoAtividade" placeholder="Digite o Tipo de Atividade"
                                            name="tipoatividade"
                                            onChange={handleInputChange} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5" id="txtDescricao"
                                            name="descricao"
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
export default TiposAtividade;
