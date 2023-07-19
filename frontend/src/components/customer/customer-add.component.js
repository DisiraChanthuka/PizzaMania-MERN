import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";

export class CreateCustomer extends Component {
    constructor(props) {
        super(props);
        this.onChangefullName = this.onChangefullName.bind(this);
        this.onChangeemail = this.onChangeemail.bind(this);
        this.onChangecontactNo = this.onChangecontactNo.bind(this);
        this.onChangeaddress = this.onChangeaddress.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            fullName: '',
            email: '',
            contactNo: '',
            address: ''
        }
    }

    onChangefullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeemail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangecontactNo(e) {
        this.setState({
            contactNo: e.target.value
        });
    }

    onChangeaddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const customers = {
            fullName: this.state.fullName,
            email: this.state.email,
            contactNo: this.state.contactNo,
            address: this.state.address
        }

        console.log(customers);

        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!this.state.email || regex.test(this.state.email) === false) {
            this.setState({ emailError: "Please Enter a valid email." })
        } else if (this.state.contactNo.length != 10) {
            this.setState({ contactError: "Please Enter a valid Phone Number." })
        } else if (this.state.address.length < 10) {
            this.setState({ addressError: "Your address is too short." })
        } else {

            axios.post('http://localhost:5000/customer/', customers)

                .then(res => {

                    console.log(res);

                    if (res.status === 200) {

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Customer has been added!!',
                            background: '#fff',
                            confirmButtonColor: '#333533',
                            iconColor: '#60e004'
                        })
                        this.clearData();

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
            window.location = '/customer';
            // }
        }
    }

    clearData = () => {
        this.setState({
            fullName: '',
            email: '',
            contactNo: '',
            address: '',
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">

                                <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>

                                    <div class="">
                                        <p className='text-4xl font-semibold text-black uppercase'>
                                            Add Customer
                                        </p>

                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Full Name</label>
                                            <input type="text"
                                                required
                                                className="form-control "
                                                value={this.state.fullName}
                                                onChange={this.onChangefullName}
                                            />
                                           <p/>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 form-group">
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Email</label>
                                                <input type="email"
                                                    required
                                                    className="form-control"
                                                    value={this.state.email}
                                                    onChange={this.onChangeemail}
                                                /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.emailError}</p>
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Contact</label>
                                                <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.contactNo}
                                                    onChange={this.onChangecontactNo}
                                                /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.contactError}</p>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Address</label>
                                            <input type="text"
                                                required
                                                className="form-control"
                                                value={this.state.address}
                                                onChange={this.onChangeaddress}
                                            /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.addressError}</p>
                                        </div>

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Customer" />
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