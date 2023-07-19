import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";



export class EditProduct extends Component {


    constructor(props) {
        super(props);



        this.onChangeproductID = this.onChangeproductID.bind(this);
        this.onChangeproductName = this.onChangeproductName.bind(this);
        this.onChangeproductCategory = this.onChangeproductCategory.bind(this);
        this.onChangeproductSize = this.onChangeproductSize.bind(this);
        this.onChangeprice = this.onChangeprice.bind(this);
        this.onChangediscount = this.onChangediscount.bind(this);
        this.onChangeavailability = this.onChangeavailability.bind(this);


        this.onSubmit = this.onSubmit.bind(this);



        this.state = {
            id: props.proId,
            productID: '',
            productName: '',
            productCategory: '',
            productSize: '',
            price: '',
            discount: '',
            availability: ''

        }
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/product/` + this.state.id)
            .then(response => {
                this.setState({
                    productID: response.data.productID,
                    productName: response.data.productName,
                    productCategory: response.data.productCategory,
                    productSize: response.data.productSize,
                    price: response.data.price,
                    discount: response.data.discount,
                    availability: response.data.availability,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

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

    onChangeproductSize(e) {
        this.setState({
            productSize: e.target.value
        });
    }

    onChangeprice(e) {
        this.setState({
            price: e.target.value
        });
    }

    onChangediscount(e) {
        this.setState({
            discount: e.target.value
        });
    }

    onChangeavailability(e) {
        this.setState({
            availability: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const product = {
            productID: this.state.productID,
            productName: this.state.productName,
            productCategory: this.state.productCategory,
            productSize: this.state.productSize,
            price: this.state.price,
            discount: this.state.discount,
            availability: this.state.availability
        }

        console.log(product);

        // if (this.state.productID.length < 3) {
        //     this.setState({ proIDError: "Product ID should be longer than 3 characters." })
        // }
        if (this.state.productName.length < 3) {
            this.setState({ nameError: "Product Name should be longer than 3 characters." })
        }
        else if (this.state.productCategory.length < 3) {
            this.setState({ productCategoryError: "Invalid Product Category" })
        }
        else if (this.state.productSize.length < 3) {
            this.setState({ productSizeError: "Invalid Product Size" })
        }
        else if (this.state.price < 500) {
            this.setState({ priceError: "Price cannot be lesser than 500" })
        } else {
            axios.put('http://localhost:5000/product/' + this.state.id, product)


                .then(res => {

                    console.log(res);

                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Product has been Updated!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in Updating!',
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
            productSize: '',
            price: '',
            discount: '',
            availability: ''

        })
    }







    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className='px-12 py-12 ' onSubmit={this.onSubmit}>

                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Product ID</label>
                                                    <input type="text"
                                                        readOnly
                                                        className="form-control"
                                                        value={this.state.productID}
                                                        onChange={this.onChangeproductID}

                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.proIDError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Product Name</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.productName}
                                                        onChange={this.onChangeproductName}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.nameError}</p>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Product Category</label>
                                                <select type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.productCategory}
                                                    onChange={this.onChangeproductCategory}
                                                >
                                                    <option>Select From Here</option>
                                                    <option>Pizza</option>
                                                    <option>Beverage</option>

                                                </select><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.productCategoryError}</p>
                                            </div>



                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Product Size</label>
                                                <select type="text"

                                                    className="form-control"
                                                    value={this.state.productSize}
                                                    onChange={this.onChangeproductSize}
                                                >

                                                    <option>Select From Here</option>
                                                    <option>Small</option>
                                                    <option>Medium</option>
                                                    <option>Large</option>

                                                </select>

                                                <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.productSizeError}</p>
                                            </div>

                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Price</label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.price}
                                                    onChange={this.onChangeprice}
                                                /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.priceError}</p>
                                            </div>


                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Discount</label>
                                                <input type="text"

                                                    className="form-control"
                                                    value={this.state.discount}
                                                    onChange={this.onChangediscount}
                                                />
                                                <p />
                                            </div>



                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Availability</label>
                                                <select type="text"

                                                    className="form-control"
                                                    value={this.state.availability}
                                                    onChange={this.onChangeavailability}
                                                >
                                                    <option>Yes</option>
                                                    <option>No</option>

                                                </select><p />
                                            </div>




                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Edit Product" />
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