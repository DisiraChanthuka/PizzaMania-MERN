import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-time-picker';
import { Button, Form, Table, ButtonGroup, Modal, Row, Col, InputGroup } from "react-bootstrap";

export class CreateSchedule extends Component {

    constructor(props) {
        super(props);
        this.onChangeempID = this.onChangeempID.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onChangesTime = this.onChangesTime.bind(this);
        this.onChangeeTime = this.onChangeeTime.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);
       

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            empID: '',
            date: new Date(),
            sTime: '',
            eTime: '',
            status:''
        
        }

        
    }

    onChangeempID(e) {
        this.setState({
            empID: e.target.value
        });
    }

    onChangedate(date) {
        this.setState({
            date: date
        });
    }

    onChangesTime(e) {
        this.setState({
            sTime: e.target.value
        });
    }

    onChangeeTime(e) {
        this.setState({
            eTime: e.target.value
        });
    }

    onChangestatus(e) {
        this.setState({
            status: e.target.value
        });
    }

   

    onSubmit(e) {
        e.preventDefault();

        const schedule = {
            empID: this.state.empID,
            date: this.state.date,
            sTime: this.state.sTime,
            eTime: this.state.eTime,
            status : 'Scheduled'
        }

        console.log(schedule);

        
        if (this.state.empID.length < 10) {
            this.setState({ empIDError: "Employee ID can not be lower than 10 digits" })

        } 
        else if (this.state.sTime == null) {
            this.setState({ sTimeError: "Start Time can not be null" })
        } 
        else if (this.state.eTime == null) {
            this.setState({ eTimeError: "End Time can not be null" })
        }

        else {

            axios.post('http://localhost:5000/workingSchedule/', schedule)
               

                .then(res => {

                    console.log(res);

                    if (res.status === 200) {
                        this.clearData();
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Schedule has been added!!',
                            background: '#fff',
                            confirmButtonColor: '#0a5bf2',
                            iconColor: '#60e004'
                        })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Error in adding!',
                            background: '#fff',
                            confirmButtonColor: '#eb220c',
                            iconColor: '#e00404'
                        })
                    }
                }).catch(err => console.log(err))

       
        }
    }

    clearData = () => {
        this.setState({
            empID: '',
            date: new Date(),
            sTime: '',
            eTime: '',
            status: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-10">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-3 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="mt-3">
                                            <p className='text-4xl font-semibold text-black uppercase drop-shadow-lg'>
                                                Add Schedule
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        Employee ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                      
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.empID}
                                                        onChange={this.onChangeempID}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.empIDError}</p>
                                                </div>

                                                
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 form-group">

                                                <div class="">
                                                    <label className='block text-lg font-medium text-gray-900 dark:text-white' >
                                                        Date
                                                    </label>
                                                    <div>
                                                        <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            dateFormat="MMMM d, yyyy"
                                                            selected={this.state.date}
                                                            onChange={this.onChangedate}
                                                        />
                                                    </div>

                                                </div>
                                                <div className="form-group">
                                                    <label for="large-input" className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                        Start Time
                                                    </label>
                                                    <input type="time"
                                                        required
                                                       
                                                        class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        value={this.state.sTime}
                                                        onChange={this.onChangesTime}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.sTimeError}</p>
                                                </div>

                                            </div>
                                            <div className="form-group">
                                                <label className='block text-lg font-medium text-gray-900 dark:text-white'>
                                                    End Time
                                                </label>
                                                <input type="time"
                                                    required
                                                   
                                                    class="mb-1 form-control bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    value={this.state.eTime}
                                                    onChange={this.onChangeeTime}
                                                />
                                                <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.eTimeError}</p>
                                            </div>


                                            <div className="m-5 text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Schedule" />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}