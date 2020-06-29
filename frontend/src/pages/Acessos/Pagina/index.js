import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button,CardFooter, Form } from 'reactstrap';
import '../../../global.css';
import api from '../../../../src/services/api';

const Pagina = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var paginaIdParams = props.match.params.id;

  const [modulos, setModulos] = useState([]);
  const usuarioId = localStorage.getItem('userId');

  const [formData, setFormData] = useState({
      nmoduloId: '',
      nomePagina: '',
      descricao: '',
  });

  useEffect(() => {
    api.get('modulos').then(response => {
        setModulos(response.data);
    })
}, [usuarioId]);

  useEffect(() => {
      if (action === 'edit' && paginaIdParams !== '') {
          api.get(`paginas/${paginaIdParams}`).then(response => {
              document.getElementById('cboModuloId').value = response.data.moduloId;
              document.getElementById('txtPagina').value = response.data.nomePagina;
              document.getElementById('txtDescricao').value = response.data.descricao;

              setFormData({
                  ...formData,
                  nomemodulo: response.data.moduloId,
                  nomemodulo: response.data.nomePagina,
                  descricao: response.data.descricao,

              })
          });
      } else {
          return;
      }
  }, [paginaIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handlePagina(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/paginas/${paginaIdParams}`, data, {
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
                  const response = await api.post('paginas', data, {
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
            <Form onSubmit={handlePagina}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Página</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                        <Label htmlFor="pagina">Página</Label>
                                        <Input type="text" required id="txtPagina" placeholder="Digite a Pagina"
                                        name="nomepagina"
                                        onChange={handleInputChange} />
                                    </Col>
                                    <Col md="4">
                                        <Label htmlFor="moduloId">Módulo</Label>
                                        <Input required type="select" name="select" id="cboModuloId"
                                        name="moduloId"
                                        onChange={handleInputChange}>
                                             <option value={undefined} defaultValue>Selecione...</option>
                                                {modulos.map(modulo=> (
                                                <option value={modulo.id}>{modulo.nomemodulo}</option>
                                                ))}
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Descrição</Label>
                                        <Input type="textarea" rows="5"id="txtDescricao"
                                            name="descricao"
                                            onChange={handleInputChange}  />
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

export default Pagina;
