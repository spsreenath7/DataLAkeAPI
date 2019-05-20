import React from 'react';
import { Table, Col, Row } from 'reactstrap';
import Filter from './filter';
import financeAPI from '../../../datastore/financeAPI';
import _ from 'lodash';

const Transaction = (props) =>
  <tr>
    <th scope="row">{props.transaction.transid}</th>
    <td>{props.transaction.transtype}</td>
    <td>{props.transaction.method}</td>
    <td>{props.transaction.account}</td>
    <td>{props.transaction.with}</td>
    <td>{props.transaction.date}</td>
    <td>{props.transaction.amount}</td>
  </tr>;

export default class TransList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      field: 'id',
      order: 'desc', transtype: 'All'
    };
  }
  // state = { search: '', sort: 'name' };

  handleSort = (f, o) =>   
        this.setState({ field: f , order: o });

  handleTranstype = (t) =>   
  this.setState({ transtype: t  });


  render() {
    //Apply filter    
    let transactions = financeAPI.getAll();
    if (this.state.transtype ==='Credit' || this.state.transtype ==='Debit') {
      
      transactions = transactions.filter(
        (item) => item.transtype === this.state.transtype
      );
      
    }
    transactions = _.sortBy(transactions, this.state.field);
    if (this.state.order === 'desc') {
      transactions.reverse();
    }


    let transactionRows = transactions.map(
      (transaction) => <Transaction transaction={transaction} />
    );
    return (
      <div>
        <Filter handleSort={this.handleSort} handleTranstype={this.handleTranstype} currType={this.state.transtype}/>
        <h1>Transaction List: </h1>
        <Row>
          <Col md={1}> </Col>
          <Col md={10}>
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Method</th>
                  <th>Account</th>
                  <th>Payee</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactionRows}
                
              </tbody>
            </Table>
          </Col>
          <Col md={1}></Col>
        </Row>

      </div>
    );
  }
}

