import _ from 'lodash';

class FinanceAPI {
    constructor() {
        this.transactions = [
            {
                'transid': 1001,
                'transtype': 'Credit',
                'method': 'credit card',
                'account': '132-3212',
                'with': 'Subway waterford',
                'date': '23/10/2015',
                'amount': 430
            },        
            {
                'transid': 1002,
                'transtype': 'Debit',
                'method': 'net banking',
                'account': '132-3212',
                'with': 'Monthly interest',
                'date': '01/12/2015',
                'amount': 705
            }, 
            {
                'transid': 1003,
                'transtype': 'Credit',
                'method': 'credit card',
                'account': '132-3212',
                'with': 'Aldi cork road',
                'date': '19/02/2016',
                'amount': 340
            },
            {
                'transid': 1004,
                'transtype': 'Debit',
                'method': 'credit card',
                'account': '132-3212',
                'with': 'Penneys waterford',
                'date': '11/10/2016',
                'amount': 250
            },
            {
                'transid': 1005,
                'transtype': 'Credit',
                'method': 'ATM withdraw',
                'account': '132-3212',
                'with': 'Machine ATM2201 AIB WIT campus',
                'date': '14/07/2017',
                'amount': 520
            },
            {
                'transid': 1006,
                'transtype': 'Debit',
                'method': 'net banking',
                'account': '132-3212',
                'with': 'ABC technolgies - salary',
                'date': '23/03/2018',
                'amount': 700
            },
            {
                'transid': 1007,
                'transtype': 'Credit',
                'method': 'credit card',
                'account': '132-3212',
                'with': 'Sky Internet bill',
                'date': '19/03/2019',
                'amount': 100
            }
        ] ; 
    }

    // delete(k) {
    //     let elements = _.remove(this.transactions, 
    //         (act) => act.url === k
    //     );
    //     return elements; 
    // }
    getAll() {
        return this.transactions ;
    }

    // add(t,u,d,a) {
    //     let len = this.transactions.length ;
    //     let newLen = this.activities.push({
    //         title: t,
    //         url: u,
    //         date: d,
    //         catogery: c 
    //     }) ;
    //     return newLen > len ;
    // }

    // update(key,t,u,d,c) {
    //     let index = _.findIndex(this.activities, 
    //         (act) => act.url === key
    //     );      
    //     if (index !== -1) {
    //         this.activities.splice(index, 1, 
    //             {
    //                 title: t,
    //                 url: u,
    //                 date: d,
    //                 catogery: c 
    //             }) ;
    //         return true ;
    //     }
    //     return false ;
    // }
}

export default (new FinanceAPI() );