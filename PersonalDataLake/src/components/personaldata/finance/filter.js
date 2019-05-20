import React, { Component } from 'react';
import { Row, Col, Label, Form, FormGroup, Input } from 'reactstrap';
import './filter.css';


export default class Filter extends Component {

    constructor(props) {
        super(props);
        
        this.state = { 
            
            trans: this.props.currType
        };
    }

    
    handleType = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        console.log("radio used : "+e.target.value);
        this.props.handleTranstype( e.target.value);
    };
    handleSortChange = (e) => {
        e.preventDefault();
        switch(e.target.value) {
            case "latest":
            this.props.handleSort('id','desc');
              break;
            case "oldest":
            this.props.handleSort('id','asec');
              break;
              case "highest":
              this.props.handleSort('amount','desc');
              break;
            case "smallest":
            this.props.handleSort('amount','asec');
              break;
            default:
            this.handleSort('id','desc');
          }
          
    }

    render() {
        return (
            <div className="filter">


            <Form>
                <Row form>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="orderby">Sort by</Label>
                            <Input type="select" onChange={this.handleSortChange} name="orderby" id="orderby" >
                                <option value={this.state.itemtype} >latest</option>
                                <option>oldest</option>
                                <option>highest</option>
                                <option>smallest</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                    </Col>
                    <Col md={6}>
                        
                    <FormGroup inline>
                                        
                        <Label >Trans type</Label>
                            
                                <FormGroup check>
                                    <Label check>
                                        <Input value="All" checked={this.state.trans === "All"}
                                        onChange={this.handleType} type="radio" name="trans" id="trans"/>{' '}
                                        All
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input value="Credit" checked={this.state.trans === "Credit"}
                                        onChange={this.handleType} type="radio" name="trans" id="trans"/>{' '}
                                        Credit
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input value="Debit" checked={this.state.trans === "Debit"}
                                        onChange={this.handleType} type="radio" name="trans"  id="trans"/>{' '}
                                        Debit
                                    </Label>
                                </FormGroup>
                            
                        </FormGroup>
                        
                    </Col>
                </Row>
            </Form>
            </div>
        );
    }
}