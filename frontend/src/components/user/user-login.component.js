import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import AuthenticationService from './AuthenticationService';
import { withRouter } from 'react-router-dom';

export class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.onChangeNIC = this.onChangeNIC.bind(this);

        this.onChangepassword = this.onChangepassword.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            NIC: '',
            user: [],
            password: '',

        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/user/')
            .then(response => {
                this.setState({ user: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    onChangeNIC(e) {
        this.setState({
            NIC: e.target.value
        });
    }



    onChangepassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    getUserList() {
        axios.get('http://localhost:5000/user/')
            .then(response => {
                this.setState({ user: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }


    UserList() {



        return this.state.user.map((currentuser) => {
            if (this.state.NIC == currentuser.NIC && this.state.password == currentuser.password) {

                const userRole = currentuser.userRole;
                console.log(userRole)

                AuthenticationService.successfulLogin(currentuser.NIC, currentuser.userRole)
                console.log(currentuser.NIC, currentuser.userRole)

                window.location = "/nav"

            }

        });
    }



    onSubmit(e) {
        e.preventDefault();

        // let isUserLoggedIn = false;

        if (this.state.NIC.length < 10 || this.state.NIC.length > 12) {

            this.setState({ nicError: "Please enter a valid NIC" })
        } else if (this.state.NIC.length == 10 || this.state.NIC.length == 12){

            // this.UserList();

            this.state.user.map((currentuser) => {
                if (this.state.NIC == currentuser.NIC && this.state.password == currentuser.password) {

                    const userRole = currentuser.userRole;
                    console.log(userRole)
                    AuthenticationService.successfulLogin(currentuser.NIC, currentuser.userRole)
                    console.log(currentuser.NIC, currentuser.userRole)
                    // browserHistory.push("/nav");

                    Swal.fire({
                        icon: 'successful',
                        title: 'Successful',
                        text: 'Successfully Logged In',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })

                    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
                    // isUserLoggedIn = true;



                    if (isUserLoggedIn === true && currentuser.userRole == "Employee Manager") {

                        window.location = "/nav"
                        window.location = "/"
                    }
                    else if (isUserLoggedIn === true && currentuser.userRole == "Customer Manager") {
                        window.location = "/customer"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Inventory Manager") {
                        window.location = "/inventory"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Head Chef") {
                        window.location = "/kitchenOrder"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Waiter Staff") {
                        window.location = "/order"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Product Manager") {
                        window.location = "/product"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Delivery Manager") {
                        window.location = "/delivery"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Finance Manager") {
                        window.location = "/salary"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Employee Manager") {
                        window.location = "/employee"
                    } else if (isUserLoggedIn === true && currentuser.userRole == "Super Admin") {
                        window.location = "/employee"
                    } else if (isUserLoggedIn === false) {
                        window.location = "/nav"
                        window.location = "/"
                    }


                }
                // else {

                //     Swal.fire({
                //         icon: 'error',
                //         title: 'Error',
                //         text: 'Invalid Credentials',
                //         background: '#fff',
                //         confirmButtonColor: '#333533',
                //         iconColor: '#60e004'
                //     })
                // }


            });



        }

    }

    clearData = () => {
        this.setState({
            NIC: '',

            password: '',

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
                                            Sign In
                                        </p>

                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>NIC </label>
                                            <input type="text"
                                                required
                                                className="form-control "
                                                value={this.state.NIC}
                                                onChange={this.onChangeNIC}
                                            /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.nicError}</p>
                                        </div>



                                        <div className="form-group">
                                            <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Password </label>
                                            <input type="password"
                                                required
                                                className="form-control"
                                                value={this.state.password}
                                                onChange={this.onChangepassword}
                                            /><p />



                                        </div>

                                        <div className="text-center align-middle form-group">
                                            <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Sign In" />
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