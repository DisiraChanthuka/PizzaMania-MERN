import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
const shortid = require('shortid');



export class CreateInventoryOrder extends Component {


    constructor(props) {
        super(props);



        this.onChangeproductID = this.onChangeproductID.bind(this);
        this.onChangeproductName = this.onChangeproductName.bind(this);
        this.onChangeproductCategory = this.onChangeproductCategory.bind(this);
        this.onChangeavailablequantity = this.onChangeavailablequantity.bind(this);
        this.onChangerequestedquantity = this.onChangerequestedquantity.bind(this);



        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            id: props.ioId,
            orderId: '',
            productID: '',
            productName: '',
            productCategory: '',
            availableQuantity: '',
            requestedQuantity: ''

        }
    }

    onChangeproductID(e) {
        this.setState({
            productID: e.target.value
        });
    }

    onChangeproductName(e) {
        this.setState({
            productName: e.target.value
        });
    }

    onChangeproductCategory(e) {
        this.setState({
            productCategory: e.target.value
        });
    }

    onChangeavailablequantity(e) {
        this.setState({
            availableQuantity: e.target.value
        });
    }

    onChangerequestedquantity(e) {
        this.setState({
            requestedQuantity: e.target.value
        });
    }

    componentDidMount() {
        axios.get('http://localhost:5000/inventory/' + this.state.id)
            .then(response => {
                this.setState({
                    productID: response.data.productID,
                    productName: response.data.productName,
                    productCategory: response.data.productCategory,
                    availableQuantity: response.data.quantity,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }


    onSubmit(e) {
        e.preventDefault();

        const inventoryorder = {
            orderId: shortid.generate(),
            productID: this.state.productID,
            productName: this.state.productName,
            productCategory: this.state.productCategory,
            availableQuantity: this.state.availableQuantity,
            requestedQuantity: this.state.requestedQuantity,
            status: 'Pending'
        }

        console.log(inventoryorder);

        if (this.state.productID.length < 3) {
            this.setState({ proError: "Product Id cannot be shorter than 3 digits." })
        }
        else if (this.state.productName.length < 3) {
            this.setState({ nameError: "Product Name cannot be shorter than 3 digits." })
        }
        else if (this.state.productCategory.length < 4) {
            this.setState({ categoryError: "Product Category cannot be shorter than 4 digits." })
        }
        else if (this.state.availableQuantity == null) {
            this.setState({ aquantityError: "Quantity can not be zero." })
        } else if (this.state.requestedQuantity <= 0) {
            this.setState({ rquantityError: "Quantity can not be zero 0 minus." })
        } else {
            axios.post('http://localhost:5000/inventoryOrders/', inventoryorder)


                .then(res => {

                    console.log(res);

                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Inventory Order has been added!!',
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

    }

    clearData = () => {
        this.setState({
            orderId: '',
            productID: '',
            productName: '',
            productCategory: '',
            availableQuantity: '',
            requestedQuantity: ''
        })
    }







    render() {
        return (
            <div >
                <div className="flex flex-col px-5 ">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full sm:px-6 lg:px-8">
                            <div className='items-center overflow-hidden'>
                                <div className=''>
                                    <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                        <form className='' onSubmit={this.onSubmit}>
                                            <div class="">
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Product ID                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            disabled
                                                            className="form-control"
                                                            value={this.state.productID}
                                                            onChange={this.onChangeproductID}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.proError}</p>
                                                    </div>
                                                </div>


                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Product Name                                                        </label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.productName}
                                                        onChange={this.onChangeproductName}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.nameError}</p>
                                                </div>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                        Product Category                                                         </label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.productCategory}
                                                        onChange={this.onChangeproductCategory}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.categoryError}</p>
                                                </div>


                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Available Quantity                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={this.state.availableQuantity}
                                                        onChange={this.onChangeavailablequantity}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.aquantityError}</p>
                                                </div>

                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Requested Quantity                                                    </label>
                                                    <input type="number"
                                                        className="form-control"
                                                        value={this.state.requestedQuantity}
                                                        onChange={this.onChangerequestedquantity}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.rquantityError}</p>
                                                </div>

                                                <div className="text-center align-middle form-group">
                                                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Order Inventory" />
                                                </div>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>





        )
    }
}