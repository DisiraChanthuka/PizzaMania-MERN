import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

export default class EditFeedback extends Component {

    constructor(props) {
        super(props);


        this.onChangefeedback = this.onChangefeedback.bind(this);
        this.onChangeuserContact = this.onChangeuserContact.bind(this);
        this.onChangeempID = this.onChangeempID.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id:props.fedId,
            feedback:'',
            userContact:'',
            empID: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/feedback/' + this.state.id)
            .then(response => {
                this.setState({
                    feedback: response.data.feedback,
                    userContact: response.data.userContact,
                    empID: response.data.empID

                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangeempID(e) {
        this.setState({
            empID: e.target.value
        });
    }

    onChangefeedback(e) {
        this.setState({
            feedback: e.target.value
        });
    }

    onChangeuserContact(e) {
        this.setState({
            userContact: e.target.value
        });
    }



    

    onSubmit(e) {
        e.preventDefault();

        const feedback = {
            feedback: this.state.feedback,
            userContact: this.state.userContact,
            empID: this.state.empID

        }

        console.log(feedback);

        if(this.state.userContact.length < 5){
            this.setState({userContactError : "User is too short"})
        }
        else if(this.state.empID.length < 10){
            this.setState({empIDError : "Employee ID is too short"})
        }else{

        axios.put('http://localhost:5000/feedback/' + this.state.id, feedback)
            .then(res => {
                console.log(res);

                if (res.status === 200) {
                   
                    this.props.close();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Feedback has been updated!!',
                        background: '#fff',
                        confirmButtonColor: '#333533',
                        iconColor: '#60e004'
                    })

                   

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'There was an error updating!',
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
                                        <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                           
                                            
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Feedback</label>
                                                    <input type="text"
                                                        // required
                                                        className="form-control"
                                                        value={this.state.feedback}
                                                        onChange={this.onChangefeedback}

                                                    /><p/>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >User Contact</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.userContact}
                                                        onChange={this.onChangeuserContact}
                                                    /><p className="validateMsg">{this.state.userContactError}</p>
                                                </div>
                                           
                                           
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control"
                                                        value={this.state.empID}
                                                        onChange={this.onChangeempID}
                                                    /><p className="validateMsg">{this.state.empIDError}</p>
                                                </div>
                                              
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Edit Feedback" />
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