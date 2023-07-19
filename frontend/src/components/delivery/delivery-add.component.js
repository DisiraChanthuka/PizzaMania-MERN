import React, {Component} from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
const shortid = require('shortid');



export class CreateDelivery extends Component {

    
    constructor(props){
        super(props);

        
        this.deleteOrder = this.deleteOrder.bind(this);
        this.onChangedriver = this.onChangedriver.bind(this);
        
        this.updateOrderStatus = this.updateOrderStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
       

        this.state = {
            order:[],
            id:props.deId,
            deliverId:'',
            orderId : '',
            customer : '',
            item1 : '',
            quantity1 :'',
            item2 : '',
            quantity2 :'',
            item3 : '',
            quantity3 :'',
            deliveryAddress:'',
            amount:'',
            orderStatus:'',
            assignedEmp:''
            
        }
    }

    onChangedriver(e){
        this.setState({
            assignedEmp : e.target.value
        });
    }

    

    componentDidMount() {
        axios.get('http://localhost:5000/order/'+this.state.id)
        .then(response => {
            this.setState({
            orderId : response.data._id,
            customer : response.data.customer,
            item1: response.data.item1,
            quantity1: response.data.quantity1,
            item2: response.data.item2,
            quantity2: response.data.quantity2,
            item3: response.data.item3,
            quantity3: response.data.quantity3,
            deliveryAddress: response.data.deliveryAddress,
            amount: response.data.amount,
            orderStatus: response.data.orderStatus,
                })
            })
            .catch(function(error) {
                console.log(error);
            })

        }

    deleteOrder(id){
        axios.delete('http://localhost:5000/order/' + id).then(response => {
            console.log(response.status)
         

            
        })
        
    }

    updateOrderStatus(id){

        const order = {
            orderStatus: 'Delivery Accepted'
        }

        axios.put('http://localhost:5000/order/status/' + id, order)
            .then(res => console.log(res.data));
       

    }

    onSubmit(e){
        e.preventDefault();

        this.updateOrderStatus(this.state.id);

        const delivery = {
            deliveryId:shortid.generate(),
            orderId : this.state.orderId,
            customer : this.state.customer,
            item1: this.state.item1,
            quantity1: this.state.quantity1,
            item2: this.state.item2,
            quantity2: this.state.quantity2,
            item3: this.state.item3,
            quantity3: this.state.quantity3,
            deliveryAddress: this.state.deliveryAddress,
            amount: this.state.amount,
            orderStatus: 'Delivery Ongoing',
            assignedEmp: this.state.assignedEmp
        }

        console.log(delivery);
        
            axios.post('http://localhost:5000/delivery/', delivery)
       

        .then(res => {
            
            console.log(res);

            const id = res.data;

            

            if (res.status === 200) {
                this.clearData();
                Swal.fire({
                    icon: 'success',
                    title: 'Your Delivery ID is ' +id,
                    text: 'Delivery has been added Successfully!!',
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
            orderId : '',
            customer : '',
            item1 : '',
            quantity1 :'',
            item2 : '',
            quantity2 :'',
            item3 : '',
            quantity3 :'',
            deliveryAddress:'',
            amount:'',
            orderStatus:'',
            assignedEmp:''
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
                                           
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Order ID                                                        </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.orderId}
                                                       
                                                    />
                                                </div>
                                            

                                           
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Customer                                                        </label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.customer}
                                                       
                                                    />
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                <div class="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                       Item1                                                        </label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.item1}
                                                      
                                                    />
                                                </div>
                                            
                                            
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Quantity1                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={this.state.quantity1}
                                                       
                                                    />
                                                </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                <div class="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                       Item2                                                       </label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.item2}
                                                      
                                                    />
                                                </div>
                                            
                                            
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Quantity2                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={this.state.quantity2}
                                                       
                                                    />
                                                </div>
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                <div class="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >
                                                       Item3                                                        </label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.item3}
                                                      
                                                    />
                                                </div>
                                            
                                            
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Quantity3                                                  </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={this.state.quantity3}
                                                       
                                                    />
                                                </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Delivery Address                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={this.state.deliveryAddress}
                                                        
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Amount                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={this.state.amount}
                                                        
                                                    />
                                                </div>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4 form-group">
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Status                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        disabled
                                                        value={this.state.orderStatus}
                                                        
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Assigned Employee                                                    </label>
                                                    <input type="text"
                                                        className="form-control"
                                                        value={this.state.assignedEmp}
                                                        onChange={this.onChangedriver}
                                                        
                                                    />
                                                </div>
                                                </div>
                                           
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Assign Employee" />
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