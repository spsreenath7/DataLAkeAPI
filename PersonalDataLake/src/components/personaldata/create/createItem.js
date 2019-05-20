import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, Col, Row, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import activityDetail from '../../../datastore/activityAPI';
import activityAPI from '../../../datastore/activityAPI';
import * as api from '../../../api';
import cuid from 'cuid';

const PrivacyOption = (props) =>
<option>{props.label} ..</option>
 ;

class CreateItem extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.state = {
            collapse: false,
            itemtype: '',
            title: '',
            url: '',
            date: '',
            catogery: '',
            privacy: '',
            transtype: '',
            amount: '',
            privacylist: []
        };
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(e.target.name + ' : ' + e.target.value);
    }

    // async componentDidMount() {
    //     this._isMounted = true
    //     try {
    //         const resp = await api.getPrivacy();
    //         if (this._isMounted) {
    //             this.setState({
    //                 privacylist: resp
    //             });
    //         }
    
    //     } catch (e) {
    //         if (this._isMounted) this.setState({
                
    //         });
    //     }
    // };


    
    handleAdd = (e) => {
        e.preventDefault();
        let newitemtype = this.state.itemtype.trim();
        let newtitle = this.state.title.trim();
        let newurl = this.state.url.trim();
        let newdate = this.state.date.trim();
        let newcatogery = this.state.catogery.trim();
        let newprivacy = this.state.privacy.trim();
        let newtranstype = this.state.transtype.trim();
        let newamount = this.state.amount.trim();

        if (newitemtype === 'Activity') {
            // activityAPI.add(newtitle, newurl, newdate, newcatogery, newprivacy);
            // let newactid = cuid();
            let newact = {
                // id: newactid,
                // userid: this.props.userid,
                title: newtitle,
                url: newurl,
                date: newdate,
                catogery: newcatogery,
                privacy: newprivacy
            }
            this.props.addActivity(newact);
            this.toggle();
        }
    };



    handleCancel = (e) => {
        this.setState({
            collapse: false,
            itemtype: '',
            title: '',
            url: '',
            date: '',
            catogery: '',
            privacy: ''
        })
        e.preventDefault();
    }


    async toggle() {
        this.setState(state => ({ collapse: !state.collapse }));
        try {
            console.log("inside toggle:");
            const resp = await api.getPrivacy();
            console.log("count of responses :");
                
                this.setState({
                    privacylist: resp,
                    collapse: !this.state.collapse
                });
                console.log(this.state.privacylist);
            
    
        } catch (e) {
            this.setState(state => ({ collapse: !state.collapse }));
        }
        
    }

    render() {
        let placehold = 'URL of the content';
        if (this.state.itemtype === 'finance') {
            placehold = 'enter relevent account number';
        }
        let privacylist = this.state.privacylist;
    
        console.log("Inside render 1234");
        console.log(privacylist);
    
        let privacyOptions = privacylist.map(
          (option) => <PrivacyOption option={option} />
        );


        return (
            <div>
                <Button color="success" onClick={this.toggle} style={{ marginBottom: '1rem', padding: 'right' }}>Create custom item</Button>
                <Collapse isOpen={this.state.collapse}>
                    <Card>
                        <CardBody>
                            <div className="thumbnail">
                                <Form>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="itemtype">Item Type</Label>
                                                <Input type="select" onChange={this.handleChange} id="itemtype" name="itemtype">
                                                    <option value={this.state.itemtype} >Select</option>
                                                    <option>Activity</option>
                                                    <option>Travel</option>
                                                    <option>finance</option>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="date">Date</Label>
                                                <Input type="text" value={this.state.date} onChange={this.handleChange} name="date" id="date" placeholder="happended at" />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <FormGroup>
                                        <Label for="title">Title</Label>
                                        <Input value={this.state.title} onChange={this.handleChange} type="title" name="title" id="title" placeholder="title of custom data item" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="url">Reference</Label>
                                        <Input type="text" value={this.state.url} onChange={this.handleChange} name="url" id="url" placeholder={placehold} />
                                        <small id="note" class="form-text text-muted">Optional for Travel and Finance data.</small>
                                    </FormGroup>
                                    <Row form>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="exampleCity">Catogery</Label>
                                                <Input onChange={this.handleChange} type="select" onChange={this.handleChange} id="catogery" name="catogery">
                                                    <option value={this.state.catogery}>Select</option>
                                                    {privacyOptions}
                                                    {/* <option>Academic</option>
                                                    <option>Work</option>
                                                    <option>Social</option>
                                                    <option>Utility</option> */}
                                                </Input>
                                            </FormGroup>

                                        </Col>
                                        <Col md={4}>
                                            {this.state.itemtype === 'finance' ?
                                                <FormGroup>
                                                    <Label for="transtype">Transaction type</Label>
                                                    <Input value={this.state.transtype} onChange={this.handleChange} type="transtype" name="transtype" id="transtype" />
                                                </FormGroup> :
                                                ''
                                            }

                                        </Col>
                                        <Col md={2}>
                                            {this.state.itemtype === 'finance' ?
                                                <FormGroup >
                                                    <Label for="amount">Amount</Label>
                                                    <Input value={this.state.amount} onChange={this.handleChange} type="amount" name="amount" id="amount" />
                                                </FormGroup> :
                                                ''
                                            }
                                        </Col>
                                    </Row>
                                    <Row form>
                                        <FormGroup>
                                            <span>{this.state.privacylist}</span>
                                        </FormGroup>
                                    </Row>

                                    <Row form>
                                        <FormGroup>
                                            <Label for="exampleSelect">Select</Label>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Input>
                                        </FormGroup>
                                    </Row>
                                </Form>
                                <Button color="primary" onClick={this.handleAdd}>Add</Button>{'  '}
                                <Button color="secondary" onClick={this.handleCancel}>Cancel</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    }
}

export default CreateItem;
