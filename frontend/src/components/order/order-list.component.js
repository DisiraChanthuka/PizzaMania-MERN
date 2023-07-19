import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import ViewOrder from './order-view.component';
import EditOrder from './order-edit.component';

const Order = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>

        <td className='px-6 py-4'>{props.order.orderId}</td>
        <td className='px-6 py-4'>{props.order.item1}</td>
        <td className='px-6 py-4'>{props.order.quantity1}</td>
        <td className='px-6 py-4'>{props.order.item2}</td>
        <td className='px-6 py-4'>{props.order.quantity2}</td>
        <td className='px-6 py-4'>{props.order.item3}</td>
        <td className='px-6 py-4'>{props.order.quantity3}</td>


        <td className='px-6 py-4'>
            <span
                class="text-base inline-block whitespace-nowrap rounded-full bg-green-400 p-1 hover:bg-green-500 hover:drop-shadow-md hover:text-white  px-2 pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
                {props.order.orderStatus}
            </span>
        </td>

        <td>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-yellow-500 rounded-md hover:bg-yellow-200' onClick={() => { props.gotoViewOrder(props.order._id) }}>

                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                            <div class="">
                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>



                            </div>
                            <div class="">
                                View
                            </div>
                        </div>

                    </button>
                </div>
            </div>

        </td>

        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateOrder(props.order._id) }}>

                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                            <div class="">
                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                </svg>
                            </div>
                            <div class="">
                                Edit
                            </div>
                        </div>

                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteOrder(props.order._id) }}>
                        <div class="grid grid-cols-2 gap-1 hover:text-black">
                            <div class="">
                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class OrderList extends Component {

    constructor(props) {
        super(props);

        this.deleteOrder = this.deleteOrder.bind(this);
        this.gotoViewOrder = this.gotoViewOrder.bind(this);
        this.gotoUpdateOrder = this.gotoUpdateOrder.bind(this);

        this.state = {
            order: [],
            searchOrder: "",
            show: false,
            display: false
        };
    }


    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        axios.get('http://localhost:5000/order/')
            .then(response => {
                this.setState({ order: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    gotoViewOrder = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" + id);
    }

    //Modal box
    closeModalBoxForView = () => {
        this.setState({ show: false })
        this.refreshList();

    }

    gotoUpdateOrder = (id) => {
        this.setState({
            id: id,
            display: true

        })
        console.log("LIst id is :" + id);
    }

    //Modal box
    closeModalBoxForUpdate = () => {
        this.setState({ display: false })
        this.refreshList();

    }

    deleteOrder(id) {

        axios.delete('http://localhost:5000/order/' + id).then(response => {
            console.log(response.status)


            if (response.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Order has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                this.refreshList();
            }

            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessfull',
                    text: "Order has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }


        })


    }

    orderList() {
        return this.state.order.map(currentorder => {
            return <Order order={currentorder} deleteOrder={this.deleteOrder} gotoViewOrder={this.gotoViewOrder} gotoUpdateOrder={this.gotoUpdateOrder} key={currentorder._id} />;
        })
    }

    searchOrderList() {
        return this.state.order.map((currentorder) => {
            if (
                this.state.searchOrder ==
                currentorder.orderId
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentorder.orderId}</td>

                        <td className='px-6 py-4'>{currentorder.item1}</td>
                        <td className='px-6 py-4'>{currentorder.quantity1}</td>
                        <td className='px-6 py-4'>{currentorder.item2}</td>
                        <td className='px-6 py-4'>{currentorder.quantity2}</td>
                        <td className='px-6 py-4'>{currentorder.item3}</td>
                        <td className='px-6 py-4'>{currentorder.quantity3}</td>

                        <td className='px-6 py-4'> <span
                            class="text-base inline-block whitespace-nowrap rounded-full bg-green-400 p-1 hover:bg-green-500 hover:drop-shadow-md hover:text-white  px-2 pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
                            {currentorder.orderStatus}
                        </span></td>
                        <td>
                            <div class="">
                                <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-200' onClick={() => { this.gotoViewOrder(currentorder._id) }}>

                                    <div class=" grid grid-cols-2 gap-1">
                                        <div class="">
                                            <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div class="">
                                            View
                                        </div>
                                    </div>

                                </button>
                            </div>
                        </td>
                        <td className='flex justify-center px-6 py-4'>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateOrder(currentorder._id) }}>

                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                </svg>
                                            </div>
                                            <div class="">
                                                Edit
                                            </div>
                                        </div>

                                    </button>
                                </div>
                            }
                            {"  "}
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-200'
                                        onClick={() => { this.deleteOrder(currentorder._id) }}>
                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Delete
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            }
                        </td>
                    </tr>
                );
            }
        });
    }


    exportOrder = () => {
        console.log("Export PDF")


        const unit = "pt";
        const size = "A3";
        const orientation = "landscape";
        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        const title = "Order List Report ";
        const headers = [["Order ID", "Customer", "Item1", "Quantity1", "Item2", "Quantity2", "Item3", "Quantity3", "Order For", "Delivery Address", "Amount", "Order Status"]];

        const or = this.state.order.map(
            Order => [
                Order._id,
                Order.customer,
                Order.item1,
                Order.quantity1,
                Order.item2,
                Order.quantity2,
                Order.item3,
                Order.quantity3,
                Order.orderFor,
                Order.deliveryAddress,
                Order.amount,
                Order.orderStatus,
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body: or
        };
        doc.setFontSize(20);
        doc.text(title, marginLeft, 40);
        require('jspdf-autotable');
        doc.autoTable(content);
        doc.save("Order-list.pdf")
    }


    render() {
        return (
            <div className="flex flex-col px-5 pt-2">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div class="grid grid-cols-1 gap-4 content-start">
                                <table className=''>
                                    <tr>
                                        <th className=''>
                                            <h3 className='drop-shadow-md'>Order Details</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/creatOrder"}>
                                                        Add Order
                                                    </Link></button>
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { this.exportOrder() }}>

                                                    Download Report Here
                                                </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Order ID"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchOrder: e.target.value
                                                        });
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div className='relative grid content-start grid-cols-1 gap-4 overflow-x-auto shadow-md sm:rounded-lg'>
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                            <th className="p-2 border-black tbhead">Order ID</th>
                                            <th className="p-2 tbhead">Item 1</th>
                                            <th className="p-2 tbhead">Quantity 1</th>
                                            <th className="p-2 tbhead">Item 2</th>
                                            <th className="p-2 tbhead">Quantity 2</th>
                                            <th className="p-2 tbhead">Item 3</th>
                                            <th className="p-2 tbhead">Quantity 3</th>


                                            <th className="p-2 tbhead">Order Status</th>
                                            <th className="p-2 text-center tbhead">More Details</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchOrder == "" ? this.orderList() : this.searchOrderList()}
                                    </tbody>
                                </table>
                            </div>

                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBoxForView} centered size={"xl"}>
                                    <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    Order Details
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header >
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <ViewOrder orId={this.state.id} key={this.state.id} />
                                    </Modal.Body>
                                </Modal>
                            </div>

                            <div class="">
                                <Modal show={this.state.display} onHide={this.closeModalBoxForUpdate} centered size={"xl"}>
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditOrder orId={this.state.id} key={this.state.id} close={this.closeModalBoxForUpdate} />
                                    </Modal.Body>
                                </Modal>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

