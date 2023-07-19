import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";

export default class CreatePayment extends Component {
    constructor(props) {
        super(props);
        this.onChangeOrderId = this.onChangeOrderId.bind(this);
        this.onChangeamount = this.onChangeamount.bind(this);
        this.onChangegivenAmount = this.onChangegivenAmount.bind(this);
        this.onChangechange = this.onChangechange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            id: props.payId,
            orderId: '',
            amount: '',
            givenAmount: '',
            change: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/order/' + this.state.id)
            .then(response => {
                this.setState({
                    orderId: response.data.orderId,
                    customer: response.data.customer,
                    item1: response.data.item1,
                    size1: response.data.size1,
                    quantity1: response.data.quantity1,
                    item2: response.data.item2,
                    size2: response.data.size2,
                    quantity2: response.data.quantity2,
                    item3: response.data.item3,
                    size3: response.data.size3,
                    quantity3: response.data.quantity3,
                    orderFor: response.data.orderFor,
                    deliveryAddress: response.data.deliveryAddress,
                    amount: response.data.amount,
                    orderStatus: response.data.orderStatus,

                })
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeOrderId(e) {
        this.setState({
            orderId: e.target.value
        });
    }

    onChangeamount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangegivenAmount(e) {
        this.setState({
            givenAmount: e.target.value
        });
    }

    onChangechange(e) {
        this.setState({
            change: e.target.value
        });
    }



    onSubmit(e) {
        e.preventDefault();

        const amount = this.state.amount;
        const givenAmount = this.state.givenAmount;

        let change = givenAmount - amount;

        const payments = {
            orderId: this.state.orderId,
            amount: this.state.amount,
            givenAmount: this.state.givenAmount,
            change: change
        }

        console.log(payments);


        axios.post('http://localhost:5000/payment/', payments)

            .then(res => {

                console.log(res);

                if (res.status === 200) {

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Payment has been added!! Your Change is ' + change,
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })


                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error in adding!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#e00404'
                    })
                }
            })


    }

    clearData = () => {
        this.setState({
            orderId: '',
            amount: '',
            givenAmount: '',
            change: '',
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">

                                <form className='' onSubmit={this.onSubmit}>

                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>
                                            Add Payment Details
                                        </p>

                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Order ID</label>
                                            <input type="text"
                                                required
                                                readOnly
                                                className="form-control "
                                                value={this.state.orderId}
                                                onChange={this.onChangeOrderId}
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Amount</label>
                                                <input type="email"
                                                    required
                                                    readOnly
                                                    className="form-control"
                                                    value={this.state.amount}
                                                    onChange={this.onChangeamount}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Given Amount</label>
                                                <input type="text"
                                                    required

                                                    className="form-control"
                                                    value={this.state.givenAmount}
                                                    onChange={this.onChangegivenAmount}
                                                />
                                            </div>
                                        </div>
                                        <p />
                                        {/* <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Change</label>
                                            <input type="text"
                                                
                                                className="form-control"
                                                value={this.state.change}
                                                onChange={this.onChangechange}
                                            />
                                        </div> */}

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Payment" />
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}