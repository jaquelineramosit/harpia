import React, { useState, useEffect} from 'react';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button, CardFooter, Form } from 'reactstrap';
import { AppSwitch } from '@coreui/react'
import '../../../global.css';
import api from '../../../../src/services/api';

const MetasVendedores = (props) => {

  var search = props.location.search;
  var params = new URLSearchParams(search);
  var action = params.get('action');
  var metasVendedoresIdParams = props.match.params.id;


  const usuarioId = localStorage.getItem('userId');
  const [vendedoresId, setVendedoresId] = useState([]);
  const [metasId, setMetasId] = useState([]);
  const [formData, setFormData] = useState({
      vendedorId: '',
      metaId: '',
      observacao: '',
  });

  useEffect(() => {
    api.get('vendedores').then(response => {
        setVendedoresId(response.data);
        console.log(response.data);
    })
}, [usuarioId]);

useEffect(() => {
  api.get('metas').then(response => {
      setMetasId(response.data);
  })
}, [usuarioId]);


  useEffect(() => {
      if (action === 'edit' && metasVendedoresIdParams !== '') {
          api.get(`metas-vendedores/${metasVendedoresIdParams}`).then(response => {
              document.getElementById('cboVendedorId').value = response.data.vendedorId;
              document.getElementById('cboMetaId').value = response.data.metaId;
              document.getElementById('txtObservacao').value = response.data.observacao;

              setFormData({
                  ...formData,
                  vendedorId: response.data.vendedorId,
                  metaId: response.data.metaId,
                  observacao: response.data.observacao,

              })
          });
      } else {
          return;
      }
  }, [metasVendedoresIdParams])

  function handleInputChange(event) {
      const { name, value } = event.target;

      setFormData({ ...formData, [name]: value });
  };

  async function handleMetasVendedores(e) {
      e.preventDefault();

      const data = formData;

      if (action === 'edit') {

          try {
              const response = await api.put(`/metas-vendedores/${metasVendedoresIdParams}`, data, {
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
                  const response = await api.post('metas-vendedores', data, {
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
            <Form onSubmit={handleMetasVendedores}>
                <Row>
                    <Col xs="12" md="12">
                        <Card>
                            <CardHeader>
                                <strong>Metas de Vendedores</strong>
                                <small> novo</small>
                            </CardHeader>
                            <CardBody>
                                <FormGroup row>
                                    <Col md="4">
                                            <Label htmlFor="vendedorId">Vendedor</Label>
                                            <Input required type="select" name="select" id="cboVendedorId"
                                            name="vendedorId"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {vendedoresId.map(vendedor=> (
                                                <option key={`vendedor${vendedor.usuarioId}`} value={vendedor.usuarioId}>{vendedor.nomevendedor}</option>
                                                ))}
                                            </Input>
                                    </Col>
                                    <Col md="4">
                                            <Label htmlFor="metaId">Meta</Label>
                                            <Input required type="select" name="select" id="cboMetaId"
                                            name="metaId"
                                            onChange={handleInputChange}>
                                            <option value={undefined} defaultValue>Selecione...</option>
                                                {metasId.map(meta=> (
                                                <option key={`meta${meta.id}`} value={meta.id}>{meta.nomemeta}</option>
                                                ))}
                                            </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md="8">
                                        <Label>Observação</Label>
                                        <Input type="textarea" rows="5"id="txtObservacao"
                                            name="observacao"
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

export default MetasVendedores;
