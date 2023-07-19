import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import { CreateDelivery } from './delivery-add.component';
import { ViewReadyDelivery } from './readyDelivery-view.component';

const Order = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      
        <td className='px-6 py-4'>{props.order._id}</td>
        <td className='px-6 py-4'>{props.order.customer}</td>
        <td className='px-6 py-4'>{props.order.deliveryAddress}</td>
        <td className='px-6 py-4'>{props.order.amount}</td>
        <td className='px-6 py-4'><span
                class="text-base inline-block whitespace-nowrap rounded-full bg-green-400 p-1 hover:bg-green-500 hover:drop-shadow-md hover:text-white  px-2 pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">{props.order.orderStatus}</span></td>
        <td className='px-6 py-4'>{props.order.assignedEmp}</td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-yellow-500 rounded-md hover:bg-yellow-200' onClick={() => { props.gotoView(props.order._id) }}>
                        
                            <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                <div class="">
                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
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
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoAssignEmp(props.order._id) }}>
                        
                            <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                <div class="">
                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                    </svg>
                                </div>
                                <div class="">
                                    Assign Emp
                                </div>
                            </div>
                       
                    </button>
                </div>
            </div>
        </td>

    </tr>
)

export class ReadyDeliveryList extends Component {

    constructor(props) {
        super(props);

        this.gotoAssignEmp = this.gotoAssignEmp.bind(this);
        this.gotoView = this.gotoView.bind(this);


        this.state = {
            order:[],
            newOrder:[],
            delivery: [],
            searchDelivery: "Delivery Ready",
            show:false,
            display:false,
            searchOrderById:''
        };
    }

    gotoAssignEmp = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" +id);
    }

    //Modal box
    closeModalBoxForAssign = () => {
        this.setState({ show: false })
        this.refreshList();
       
    }
    gotoView = (id) => {
        this.setState({
            id: id,
            display: true

        })
        console.log("LIst id is :" +id);
    }

    //Modal box
    closeModalBoxForView = () => {
        this.setState({ display: false })
        this.refreshList();
       
    }


    componentDidMount() {
        this.refreshList();
        }

    refreshList(){
            axios.get('http://localhost:5000/order/')
            .then(response => {
                this.setState({ order: response.data })
                
                
            })
            .catch((error) => {
                console.log(error);
            })
        }

    deliveryList() {
        return this.state.order.map(currentorder => {
            return <Order order={currentorder} />;
        })
    }

    searchDeliveryList() {
        return this.state.order.map((currentdorder) => {
            if (
                this.state.searchDelivery ==
                currentdorder.orderStatus
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        <td className='px-6 py-4'>{currentdorder._id}</td>
                       
                        <td className='px-6 py-4'>{currentdorder.customer}</td>
                        <td className='px-6 py-4'>{currentdorder.deliveryAddress}</td>
                        <td className='px-6 py-4'>{currentdorder.amount}</td>
                        <td className='px-6 py-4'>
                            <span
                                class="text-base inline-block whitespace-nowrap rounded-full bg-yellow-400 p-1 hover:bg-yellow-500 hover:drop-shadow-md hover:text-white  px-2 pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
                                {currentdorder.orderStatus}
                            </span>
                        </td>
                        <td className='px-6 py-4'>{currentdorder.assignedEmp}</td>
                        <td className='px-6 py-4 '>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-200' onClick={() => { this.gotoView(currentdorder._id) }}>
                                        
                                            <div class=" grid grid-cols-2 gap-1">
                                                <div class="">
                                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                    </svg>
                                                </div>
                                                <div class="">
                                                    View
                                                </div>
                                            </div>
                                       
                                    </button>
                                </div>
                            }
                        </td>
                        <td className=' px-6 py-4'>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoAssignEmp(currentdorder._id) }}>
                                        
                                            <div class=" grid grid-cols-2 gap-1">
                                                <div class="">
                                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                    </svg>
                                                </div>
                                                <div class="">
                                                    Assign Employee
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


    exportDelivery = () => {
        console.log( "Export PDF" )


        const unit = "pt";
        const size = "A3"; 
        const orientation = "landscape"; 
        const marginLeft = 40;
        const doc = new jsPDF( orientation, unit, size );

        const title = "Completed Delivery List Report ";
        const headers = [["Delivery ID","Order ID","Customer","Item 1","Quantity 1","Item 2","Quantity 2","Item 3","Quantity 3","Delivery Address","Amount","Order Status","Assigned Driver"]];

        const del = this.state.delivery.map(
            Delivery=>[
                Delivery._id,
                Delivery.orderId,
                Delivery.customer,
                Delivery.item1,
                Delivery.quantity1,
                Delivery.item2,
                Delivery.quantity2,
                Delivery.item3,
                Delivery.quantity3,
                Delivery.deleteDelivery,
                Delivery.amount,
                Delivery.orderStatus,
                Delivery.assignedEmp,
            ]
        );

        

        let content = {
            startY: 50,
            head: headers,
            body:del
        };
        doc.setFontSize( 20 );
        doc.text( title, marginLeft, 40 );
        require('jspdf-autotable');
        doc.autoTable( content );
        doc.save( "Completed-Delivery-list.pdf" )
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
                                            <h3>Delivery Details</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => { this.exportDelivery() }}>
                                                    
                                                        Download Report Here
                                                  
                                                </button>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="">
                                <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400' >
                                    <thead className='p-5 text-xs text-gray-700 uppercase border bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                        <tr>
                                        
                                            <th className="p-2 border-black tbhead ">Order Id</th>
                                            <th className="p-2 tbhead">Customer</th>
                                            <th className="p-2 tbhead">Delivery Address</th>
                                            <th className="p-2 tbhead">Amount</th>
                                            <th className="p-2 tbhead">Order Status</th>
                                            
                                            <th className="p-2 text-center tbhead">View</th>
                                            <th className="p-2 text-center tbhead">Assign</th>
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchDelivery == "" ? this.deliveryList() : this.searchDeliveryList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBoxForAssign} centered size={"xl"}>
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
                                        <CreateDelivery deId={this.state.id} key={this.state.id}  />
                                    </Modal.Body>
                                </Modal>
                            </div>

                            <div class="">
                                <Modal show={this.state.display} onHide={this.closeModalBoxForView} centered size={"xl"}>
                                    <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    View Order
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header >
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <ViewReadyDelivery deId={this.state.id} key={this.state.id} close={this.closeModalBoxForView} />
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

