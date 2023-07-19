import React, {Component} from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";



export class ViewDeliveryDetails extends Component {

    
    constructor(props){
        super(props);

        this.state = {
            deliveryId:props.deId,
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
  

    componentDidMount() {
       
this.refreshList();
        }

        refreshList(){
            axios.get('http://localhost:5000/delivery/'+this.state.deliveryId)
            .then(response => {
                this.setState({
                deliveryId : response.data._id,
                orderId : response.data.orderId,
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
                assignedEmp: response.data.assignedEmp
                    })
                })
                .catch(function(error) {
                    console.log(error);
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
                                    <form className='px-12 py-6 border-2 rounded-lg shadow-md bg-gray-50' >
                                        <div class="">

                                        <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>
                                                        Delivery ID                                                        </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.deliveryId}
                                                       
                                                    />
                                                </div>
                                           
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
                                                        disabled
                                                        value={this.state.assignedEmp}
                                                        
                                                    />
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