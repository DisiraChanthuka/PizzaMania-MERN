import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import ViewOrder from '../order/order-view.component';

const Order = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>

        <td className='px-2 py-2'>{props.order.orderId}</td>
        <td className='px-2 py-2'>{props.order.item1}</td>
        <td className='px-2 py-2'>{props.order.quantity1}</td>
        <td className='px-2 py-2'>{props.order.item2}</td>
        <td className='px-2 py-2'>{props.order.quantity2}</td>
        <td className='px-2 py-2'>{props.order.item3}</td>
        <td className='px-2 py-2'>{props.order.quantity3}</td>
        <td className='px-2 py-2'>{props.order.orderFor}</td>

        <td className='px-2 py-2'>



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
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
            <div class="justify-center">
                <button className='items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.updateOrderStatus(props.order._id) }}>

                    <div class=" flex gap-1 hover:text-black duration-100">
                        <div class="">
                            <svg class="h-5 w-5 m-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                            </svg>
                        </div>
                        <div class="m-2">
                            Order Accepted

                        </div>

                    </div>

                </button>
            </div>
        </td>
        <td className='px-6 py-4'>
            <div class="justify-center">
                <button className='inline-flex px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-green-500 rounded-md hover:bg-red-200' onClick={() => { props.readyForDelivery(props.order._id) }}>
                    <div class="flex gap-1 hover:text-black">
                        <div class="">
                            <svg class="h-5 w-5 m-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                        </div>
                        <div class="m-2">
                            Ready For Delivery
                        </div>
                    </div>
                </button>
            </div>
        </td>
    </tr>
)

export class KitchenOrderList extends Component {

    constructor(props) {
        super(props);

        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.readyForDelivery = this.readyForDelivery.bind(this);
        this.gotoViewOrder = this.gotoViewOrder.bind(this);


        this.state = {
            order: [],
            searchOrder: "",
            show: false,
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

    updateOrderStatus(id) {
        const order = {
            orderStatus: 'Order Processing'
        }

        axios.put('http://localhost:5000/order/status/' + id, order)
            .then(res => console.log(res.data));
        window.location = '/kitchenOrder';
    }

    readyForDelivery(id) {
        const order = {
            orderStatus: 'Delivery Ready'
        }

        axios.put('http://localhost:5000/order/status/' + id, order)
            .then(res => console.log(res.data));
        window.location = '/kitchenOrder';
    }


    orderList() {
        return this.state.order.map(currentorder => {
            return <Order order={currentorder} gotoViewOrder={this.gotoViewOrder} updateOrderStatus={this.updateOrderStatus} readyForDelivery={this.readyForDelivery} key={currentorder._id} />

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
                        <td className='px-6 py-4'>{currentorder.orderFor}</td>

                        <td className='px-6 py-4'> <span
                            class="text-base inline-block whitespace-nowrap rounded-full bg-green-400 p-1 hover:bg-green-500 hover:drop-shadow-md hover:text-white  px-2 pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
                            {currentorder.orderStatus}
                        </span>
                        </td>

                        <td>{
                            <div class="flex justify-center">
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-yellow-500 rounded-md hover:bg-yellow-200' onClick={() => { this.gotoViewOrder(currentorder._id) }}>

                                        <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                View
                                            </div>
                                        </div>

                                    </button>
                                </div>
                            </div>
                        }
                        </td>


                        <td className='px-6 py-4'>
                            {
                                <div class="justify-center">
                                    <button className='items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200'
                                        onClick={() => {
                                            //Delete the selected record
                                            this.updateOrderStatus(currentorder._id)
                                        }}>


                                        <div class=" flex gap-1 hover:text-black duration-100">
                                            <div class="">
                                                <svg class="h-5 w-5 m-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                                </svg>
                                            </div>
                                            <div class="m-2">
                                                Order Accepted

                                            </div>

                                        </div>
                                    </button>
                                </div>
                            }
                        </td>
                        <td className='px-6 py-4'>

                            {
                                <div class="justify-center">
                                    <button className='inline-flex px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-green-500 rounded-md hover:bg-red-200'
                                        onClick={() => {
                                            //Delete the selected record
                                            this.readyForDelivery(currentorder._id)
                                        }}>
                                        <div class="flex gap-1 hover:text-black">
                                            <div class="">
                                                <svg class="h-5 w-5 m-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                                </svg>
                                            </div>
                                            <div class="m-2">
                                                Ready For Delivery
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
                                        <th className='drop-shadow-md'>
                                            <h3>Kitchen Order Details</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                {/* <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    <Link className='font-semibold text-white no-underline' to={"/creatOrder"}>
                                                        Add Order
                                                    </Link></button> */}
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
                                            <th className="p-2 border-black tbhead ">Order ID</th>
                                            <th className='p-2 tbhead'>Item 1</th>
                                            <th className='p-2 tbhead'>Quantity 1</th>
                                            <th className='p-2 tbhead'>Item 2</th>
                                            <th className='p-2 tbhead'>Quantity 2</th>
                                            <th className='p-2 tbhead'>Item 3</th>
                                            <th className='p-2 tbhead'>Quantity 3</th>
                                            <th className='p-2 tbhead'>Order For</th>

                                            <th className='p-2 tbhead'>Order Status</th>
                                            <th className='p-2 tbhead'>More Details</th>
                                            <th className='p-2 text-center tbhead'>Kitchen Accepted</th>
                                            <th className='p-2 text-center tbhead'>Kitchen Completed</th>
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
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

