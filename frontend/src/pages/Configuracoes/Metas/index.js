import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import {reaisMask} from '../../../mask'
import api from '../../../../src/services/api';
import MetasVendedores from '../MetasVendedores';

const Metas = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var metasIdParams = props.match.params.id;


  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
      nomemeta: '',
      valor: '',
      qtdeoportunidade: '',
      descricao: '',
  });

  useEffect(() => {
      if (action === 'edit' && metasIdParams !== '') {
          api.get(`metas/${metasIdParams}`).then(response => {
              document.getElementById('txtNomeMeta').value = response.data.nomemeta;
              document.getElementById('txtValor').value = response.data.valor;
              document.getElementById('txtQtdeOportunidade').value = response.data.qtdeoportunidade;
              document.getElementById('txtDescricao').value = response.data.descricao;

              setFormData({
                  ...formData,
                  nomemeta: response.data.nomemeta,
                  valor: response.data.valor,
                  qtdeoportunidade: response.data.qtdeoportunidade,
                  descricao: response.data.descricao,

              })
          });
      } else {
          return;
      }
  }, [metasIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleMetas(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/metas/${metasIdParams}`, data, {
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
                  const response = await api.post('metas', data, {
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
            <Form onSubmit={handleMetas}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Metas</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="nomeMeta">Nome da Meta</Label>
                                        <Input type="text" required id="txtNomeMeta" placeholder="Digite o nome da meta"
                                            name="nomemeta"
                                            onChange={handleInputChange} />
                                    </Col>
                                    <Col md="44">
                                        <Label htmlFor="valor">Valor</Label>
                                        <Input type="text" required name="select" id="txtValor"  placeholder="Digite o valor"
                                            name="valor"
                                            onChange={handleInputChange}>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                <Col md="4">
                                        <Label htmlFor="qtdeOportunidade">Quantidade de Oportunidade</Label>
                                        <Input type="value" required name="select" id="txtQtdeOportunidade" placeholder="Digite a quantidade de oportunidade"
                                            name="qtdeoportunidade"
                                            onChange={handleInputChange}>
                                        </Input>
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

export default Metas;
