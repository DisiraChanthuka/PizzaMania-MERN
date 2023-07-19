import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";



export class CreateInventory extends Component {
    constructor(props) {
        super(props);
        this.onChangeproductID = this.onChangeproductID.bind(this);
        this.onChangeproductName = this.onChangeproductName.bind(this);
        this.onChangeproductCategory = this.onChangeproductCategory.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            productID: '',
            productName: '',
            productCategory: '',
            quantity: ''
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

    onChangequantity(e) {
        this.setState({
            quantity: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const inventory = {
            productID: this.state.productID,
            productName: this.state.productName,
            productCategory: this.state.productCategory,
            quantity: this.state.quantity
        }

        console.log(inventory);

        if (this.state.productID.length < 3) {
            this.setState({ proError: "Product Id cannot be shorter than 3 digits." })
        }
        else if (this.state.productName.length < 3) {
            this.setState({ nameError: "Product Name cannot be shorter than 3 digits." })
        }
        else if (this.state.productCategory.length < 4) {
            this.setState({ categoryError: "Product Category cannot be shorter than 4 digits." })
        } else if (parseInt(this.state.quantity, 10) <= 0) {
            this.setState({ quantityError: "Quantity can not be minus" })
        } else if (this.state.quantity == null) {
            this.setState({ quantitynotnullError: "Quantity can not be zero." })
        }
        else {
            axios.post('http://localhost:5000/inventory/', inventory)


                .then(res => {
                    console.log(res);

                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Inventory has been added!!',
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
            productID: '',
            productName: '',
            productCategory: '',
            quantity: ''
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
                                        <form className='px-12 py-6 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                            <div class="">
                                                <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                    Add Inventory                                                </p>
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                    <div class="">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Product ID                                                        </label>
                                                        <input
                                                            type="text"
                                                            required
                                                            className="form-control"
                                                            value={this.state.productID}
                                                            onChange={this.onChangeproductID}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.proError}</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Product Name                                                        </label>
                                                        <input type="text"
                                                            required
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
                                                            className="form-control"
                                                            value={this.state.productCategory}
                                                            onChange={this.onChangeproductCategory}
                                                        /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.categoryError}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                    <div className="form-group">
                                                        <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                            Quantity                                                    </label>
                                                        <input type="text"
                                                            className="form-control"
                                                            value={this.state.quantity}
                                                            onChange={this.onChangequantity}
                                                            required
                                                        />
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.quantityError}</p>
                                                        <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.quantitynotnullError}</p>
                                                    </div>
                                                </div>
                                                <div className="text-center align-middle form-group">
                                                    <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Inventory" />
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