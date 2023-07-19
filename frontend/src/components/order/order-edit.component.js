import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Select from 'react-select'


export default class EditOrder extends Component {

    constructor(props) {
        super(props);


        this.onChangecustomer = this.onChangecustomer.bind(this);
        this.onChangeitem1 = this.onChangeitem1.bind(this);
        this.onChangequantity1 = this.onChangequantity1.bind(this);
        this.onChangeitem2 = this.onChangeitem2.bind(this);
        this.onChangequantity2 = this.onChangequantity2.bind(this);
        this.onChangeitem3 = this.onChangeitem3.bind(this);
        this.onChangequantity3 = this.onChangequantity3.bind(this);
        this.onChangeorderFor = this.onChangeorderFor.bind(this);
        this.onChangedeliveryAddress = this.onChangedeliveryAddress.bind(this);
        this.onChangeamount = this.onChangeamount.bind(this);
        this.onChangesize1 = this.onChangesize1.bind(this);
        this.onChangesize2 = this.onChangesize2.bind(this);
        this.onChangesize3 = this.onChangesize3.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.orId,
            orderId: '',
            customer: '',
            item1: '',
            size1: '',
            quantity1: '',
            item2: '',
            size2: '',
            quantity2: '',
            item3: '',
            size3: '',
            quantity3: '',
            orderFor: '',
            deliveryAddress: '',
            amount: '',
            orderStatus: '',
            FullDataSet: [], //change to id
            NameSet: []

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
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/product/')
            .then(response => {
                this.setState({
                    FullDataSet: response.data,
                })
                const tempOptions = []
                response.data.forEach((product) => {
                    let tempObject = {
                        value: product.productName,
                        label: product.productName
                    }
                    console.log(tempObject.value, tempObject.label)
                    tempOptions.push(tempObject);
                })
                this.setState({
                    NameSet: tempOptions
                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangecustomer(e) {
        this.setState({
            customer: e.target.value
        });
    }

    onChangeitem1(choice) {
        this.setState({
            item1: choice.value
        });
    }

    onChangesize1(e) {
        this.setState({
            size1: e.target.value
        });
    }

    onChangesize2(e) {
        this.setState({
            size2: e.target.value
        });
    }

    onChangesize3(e) {
        this.setState({
            size3: e.target.value
        });
    }

    onChangequantity1(e) {
        this.setState({
            quantity1: e.target.value
        });
    }

    onChangeitem2(choice) {
        this.setState({
            item2: choice.value
        });
    }

    onChangequantity2(e) {
        this.setState({
            quantity2: e.target.value
        });
    }

    onChangeitem3(choice) {
        this.setState({
            item3: choice.value
        });
    }

    onChangequantity3(e) {
        this.setState({
            quantity3: e.target.value
        });
    }

    onChangeorderFor(e) {
        this.setState({
            orderFor: e.target.value
        });
    }

    onChangedeliveryAddress(e) {
        this.setState({
            deliveryAddress: e.target.value
        });
    }

    onChangeamount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeorderStatus(e) {
        this.setState({
            orderStatus: e.target.value
        });
    }

    getPrice3(item3, size3, quantity3) {

        console.log(item3)

        // const item1 = this.state.item1;
        // const quantity1 = this.state.quantity1;
        // const item2 = this.state.item2;
        // const quantity2 = this.state.quantity2;
        // const item3 = this.state.item3;
        // const quantity3 = this.state.quantity3;
        let amount3 = 0;
        let i = 1;



        // for (let i = 1; i <= 3; i++) {
        this.state.products.map((currentProduct) => {

            if (item3 == currentProduct.productName && currentProduct.availability == "No") {
                Swal.fire({
                    icon: 'info',
                    title: 'Error',
                    text: 'Item is not available!!',
                    background: '#fff',
                    confirmButtonColor: '#333533',
                    iconColor: '#60e004'
                })

            } else {

                // let quantity = quantity[i];

                if (item3 == currentProduct.productName && size3 == currentProduct.productSize) {
                    console.log("Product Name inside getproduct is " + currentProduct.productName)


                    if (currentProduct.discount > 0) {
                        amount3 = (currentProduct.price * quantity3) - currentProduct.discount

                    } else {
                        amount3 = currentProduct.price * quantity3
                    }


                }
                // return amount;

                // console.log("Amount is" + amount);

            }

        })
        return amount3;
        // console.log("Amount  154 is" + amount);

        // }


    }

    getPrice2(item2, size2, quantity2) {

        console.log(item2)

        // const item1 = this.state.item1;
        // const quantity1 = this.state.quantity1;
        // const item2 = this.state.item2;
        // const quantity2 = this.state.quantity2;
        // const item3 = this.state.item3;
        // const quantity3 = this.state.quantity3;
        let amount2 = 0;
        let i = 1;



        // for (let i = 1; i <= 3; i++) {
        this.state.products.map((currentProduct) => {

            if (item2 == currentProduct.productName && currentProduct.availability == "No") {
                Swal.fire({
                    icon: 'info',
                    title: 'Error',
                    text: 'Item is not available!!',
                    background: '#fff',
                    confirmButtonColor: '#333533',
                    iconColor: '#60e004'
                })

            } else {

                // let quantity = quantity[i];

                if (item2 == currentProduct.productName && size2 == currentProduct.productSize) {
                    console.log("Product Name inside getproduct is " + currentProduct.productName)

                    if (currentProduct.discount > 0) {
                        amount2 = (currentProduct.price * quantity2) - currentProduct.discount

                    } else {

                        amount2 = currentProduct.price * quantity2

                    }

                }
                // return amount;

                // console.log("Amount is" + amount);

            }

        })
        return amount2;
        // console.log("Amount  154 is" + amount);

        // }


    }

    getPrice1(item1, size1, quantity1) {

        console.log(item1)

        // const item1 = this.state.item1;
        // const quantity1 = this.state.quantity1;
        // const item2 = this.state.item2;
        // const quantity2 = this.state.quantity2;
        // const item3 = this.state.item3;
        // const quantity3 = this.state.quantity3;
        let amount1 = 0;
        let i = 1;


        // for (let i = 1; i <= 3; i++) {
        this.state.products.map((currentProduct) => {

            if (item1 == currentProduct.productName && currentProduct.availability == "No") {
                Swal.fire({
                    icon: 'info',
                    title: 'Error',
                    text: 'Item is not available!!',
                    background: '#fff',
                    confirmButtonColor: '#333533',
                    iconColor: '#60e004'
                })

            } else {
                // let quantity = quantity[i];

                if (item1 == currentProduct.productName && size1 == currentProduct.productSize) {
                    console.log("Product Name inside getproduct is " + currentProduct.productName)


                    if (currentProduct.discount > 0) {
                        amount1 = (currentProduct.price * quantity1) - currentProduct.discount

                    } else {
                        amount1 = currentProduct.price * quantity1
                    }







                }
            }
            // return amount;

            // console.log("Amount is" + amount);



        })
        return amount1;
        // console.log("Amount  154 is" + amount);

        // }


    }


    onSubmit(e) {

        const item1 = this.state.item1;
        const size1 = this.state.size1;
        const quantity1 = this.state.quantity1;
        const item2 = this.state.item2;
        const size2 = this.state.size2;
        const quantity2 = this.state.quantity2;
        const item3 = this.state.item3;
        const size3 = this.state.size3;
        const quantity3 = this.state.quantity3;

        let price1 = this.getPrice1(item1, size1, quantity1);
        console.log("Price 1 is" + price1);

        let price2 = this.getPrice2(item2, size2, quantity2);
        console.log("Price 2 is" + price2);

        let price3 = this.getPrice2(item3, size3, quantity3);
        console.log("Price 3 is" + price3);

        let amount = price1 + price2 + price3;
        console.log("Amount is" + amount);

        e.preventDefault();

        const product = [];
        const price = 0;

        const order = {
            orderId: this.state.orderId,
            customer: this.state.customer,
            item1: this.state.item1,
            size1: this.state.size1,
            quantity1: this.state.quantity1,
            item2: this.state.item2,
            size2: this.state.size2,
            quantity2: this.state.quantity2,
            item3: this.state.item3,
            size3: this.state.size3,
            quantity3: this.state.quantity3,
            orderFor: this.state.orderFor,
            deliveryAddress: this.state.deliveryAddress,
            amount: amount,
            orderStatus: this.state.orderStatus,
        }

        console.log(order);

        if (this.state.customer.length < 6) {
            this.setState({ cusError: "Customer name is too short." })
        }
        else if (this.state.item1.length < 3) {
            this.setState({ item1Error: "Item name is too short." })
        }
        else if (this.state.quantity1 == 0) {
            this.setState({ quantity1Error: "Invalid Quantity." })
        } else if (this.state.orderFor.length < 5) {
            this.setState({ orderForError: "Order For is too short." })
        }
        else if (this.state.deliveryAddress.length < 5) {
            this.setState({ deliveryAddressError: "Delivery Address is too short" })
        } else {


            axios.put('http://localhost:5000/order/' + this.state.id, order)


                .then(res => {

                    console.log(res);

                    if (res.status === 200) {
                        this.props.close();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Order has been Updated!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in updating!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#e00404'
                        })
                    }
                })

        }

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
                                    <form className='' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Update Order
                                            </p>
                                            <div className="grid grid-cols-1 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Customer
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.customer}
                                                        onChange={this.onChangecustomer}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.cusError}</p>
                                                </div>

                                            </div>

                                            <div className="grid grid-cols-3 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Item 1
                                                    </label>
                                                    {/* <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.item1}
                                                        onChange={this.onChangeitem1}
                                                    /> */}
                                                    <Select
                                                        options={this.state.NameSet}
                                                        onChange={(choice) => this.onChangeitem1(choice)}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.item1Error}</p>
                                                </div>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                        Size 1
                                                    </label>
                                                    <select type="text"
                                                        className="form-control"
                                                        value={this.state.size1}
                                                        onChange={this.onChangesize1}
                                                    >
                                                        <option >Select Size</option>
                                                        <option value="Small">Small</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="Large">Large</option>
                                                    </select>
                                                </div>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                        Quantity 1
                                                    </label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.quantity1}
                                                        onChange={this.onChangequantity1}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.quantity1Error}</p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Item 2
                                                    </label>
                                                    <Select
                                                        options={this.state.NameSet}
                                                        onChange={(choice) => this.onChangeitem2(choice)}
                                                    />
                                                </div>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                        Size 2
                                                    </label>

                                                    <select type="text"
                                                        className="form-control"
                                                        value={this.state.size2}
                                                        onChange={this.onChangesize2}
                                                    >
                                                        <option >Select Size</option>
                                                        <option value="Small">Small</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="Large">Large</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Quantity 2
                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        value={this.state.quantity2}
                                                        onChange={this.onChangequantity2}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.quantity2Error}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-3 gap-4 form-group">

                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Item 3
                                                    </label>
                                                    <Select
                                                        options={this.state.NameSet}
                                                        onChange={(choice) => this.onChangeitem3(choice)}
                                                    />
                                                </div>
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                        Size 3
                                                    </label>
                                                    <select type="text"
                                                        className="form-control"
                                                        value={this.state.size3}
                                                        onChange={this.onChangesize3}
                                                    >
                                                        <option >Select Size</option>
                                                        <option value="Small">Small</option>
                                                        <option value="Medium">Medium</option>
                                                        <option value="Large">Large</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Quantity 3
                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        value={this.state.quantity3}
                                                        onChange={this.onChangequantity3}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.quantity3Error}</p>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    Order For
                                                </label>
                                                <select type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.orderFor}
                                                    onChange={this.onChangeorderFor}
                                                >
                                                    <option value="Take Away">Take Away</option>
                                                    <option value="Dine In">Dine In</option>
                                                    <option value="Delivery">Delivery</option>
                                                </select>
                                                <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.orderForError}</p>
                                            </div>
                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                    Delivery Address
                                                </label>
                                                <textarea
                                                    type="text"
                                                    className="form-control"
                                                    value={this.state.deliveryAddress}
                                                    onChange={this.onChangedeliveryAddress}
                                                /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.deliveryAddressError}</p>
                                            </div>
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Update Order" />
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