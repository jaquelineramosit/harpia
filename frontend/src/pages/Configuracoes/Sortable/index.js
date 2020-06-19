import React, {Component} from 'react';
import {render} from 'react-dom';
import { Row, Col, Card, CardHeader, CardBody, FormGroup, Label, Input, Button,CardFooter, Form } from 'reactstrap';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import './style.css';

const SortableItem = SortableElement(({value}) => (
  <div id="origem" tabIndex={0}>{value}</div>
));

const SortableList = SortableContainer(({items}) => {
  return (
    <div id="destino">
      {items.map((value, index) => (
        <SortableItem key={`item-${value}`} index={index} value={value} />
      ))}
    </div>
  );
});
class Sortable extends Component {
    state1 = {
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    };
    state2 = {
        items: ['Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12'],
    };   
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState(({items}) => ({
            items: arrayMove(items, oldIndex, newIndex),
        }));
    };
    render() 
    {    
        return (
            <div className="animated fadeIn">
                <Form >
                    <Row>                        
                        
                        {/* 20% */}
                        <Col md="2">
                            <Card>
                                <CardHeader>
                                    <div className="title-fase">Fase 20%</div>
                                    <div className="title-values"><i className="fa fa-line-chart details-pipes"></i> R$ 7850,00</div>
                                    <div className="title-values"><span className="details-pipes">10</span> Oportunidades</div>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                    <SortableList items={this.state1.items} onSortEnd={this.onSortEnd}></SortableList>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    
                                </CardFooter>
                            </Card>
                        </Col>
                        {/* 40% */}
                        <Col md="2">
                            <Card>
                                <CardHeader>
                                <div className="title-fase">Fase 40%</div>
                                    <div className="title-values"><i className="fa fa-line-chart details-pipes"></i> R$ 562,50</div>
                                    <div className="title-values"><span className="details-pipes">5</span> Oportunidades</div>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                    <SortableList items={this.state2.items} onSortEnd={this.onSortEnd}></SortableList>
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    
                                </CardFooter>
                            </Card>
                        </Col>
                        {/* 60% */}
                        <Col md="2">
                            <Card>
                                <CardHeader>
                                <div className="title-fase">Fase 60%</div>
                                    <div className="title-values"><i className="fa fa-line-chart details-pipes"></i> R$ 20000,00</div>
                                    <div className="title-values"><span className="details-pipes">2</span> Oportunidades</div>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                    {/* <SortableList items={this.state3.items} onSortEnd={this.onSortEnd}></SortableList> */}
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    
                                </CardFooter>
                            </Card>
                        </Col>
                        {/* 80% */}
                        <Col md="2">
                            <Card>
                                <CardHeader>
                                <div className="title-fase">Fase 80%</div>
                                    <div className="title-values"><i className="fa fa-line-chart details-pipes"></i> R$ 11218,22</div>
                                    <div className="title-values"><span className="details-pipes">12</span> Oportunidades</div>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                    {/* <SortableList items={this.state4.items} onSortEnd={this.onSortEnd}></SortableList> */}
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    
                                </CardFooter>
                            </Card>
                        </Col>
                        {/* goal */}
                        <Col md="2">
                            <Card>
                                <CardHeader>
                                <div className="title-fase">Fase <span className="text-success">Goal</span></div>
                                    <div className="title-values"><i className="fa fa-line-chart details-pipes"></i> R$ 12350,30</div>
                                    <div className="title-values"><span className="details-pipes">5</span> Oportunidades</div>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                    {/* <SortableList items={this.state5.items} onSortEnd={this.onSortEnd}></SortableList> */}
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    
                                </CardFooter>
                            </Card>
                        </Col>
                        {/* NoGoal */}
                        <Col md="2">
                            <Card>
                                <CardHeader>
                                <div className="title-fase">Fase <span className="text-danger">NoGoal</span></div>
                                    <div className="title-values"><i className="fa fa-line-chart details-pipes"></i> R$ 8507,50</div>
                                    <div className="title-values"><span className="details-pipes">6</span> Oportunidades</div>
                                </CardHeader>
                                <CardBody>
                                    <FormGroup row>
                                    {/* <SortableList items={this.state6.items} onSortEnd={this.onSortEnd}></SortableList> */}
                                    </FormGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    
                                </CardFooter>
                            </Card>
                        </Col>
                        
                    </Row> 
                                       
                </Form>
            </div>
        );
    }
    // return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} />;
}
export default Sortable;