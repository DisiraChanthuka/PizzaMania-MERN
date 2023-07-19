import React, { Component } from 'react';
import axios from 'axios';
import * as Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export class CreateOT extends Component {
    constructor(props) {
        super(props);
        this.onChangeempID = this.onChangeempID.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onChangesTime = this.onChangesTime.bind(this);
        this.onChangeeTime = this.onChangeeTime.bind(this);
       
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            empID: '',
            date: new Date(),
            sTime: '',
            eTime: ''
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


    onSubmit(e) {
        e.preventDefault();

        const OT = {
            empID: this.state.empID,
            date: this.state.date,
            sTime: this.state.sTime,
            eTime: this.state.eTime
        }

        console.log(OT);

        if(this.state.empID.length < 10 || this.state.empID.length > 10){
            this.setState({empIDError : "Employee ID should be 10 characters long"})
        }
        else if(this.state.date == 0){
            this.setState({dateError : "Date can not be null"})
        }
        else {

        
        axios.post('http://localhost:5000/ot/', OT)
           

            .then(res => {

                console.log(res);

                if (res.status === 200) {
                    this.clearData();
                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Over Time has been added!!',
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
        // window.location = '/employee';
    }

    clearData = () => {
        this.setState({
            empID: '',
            date: new Date(),
            sTime: '',
            eTime: ''
        })
    }

    render() {
        return (
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' onSubmit={this.onSubmit}>
                                        <div class="">
                                            <p className='text-4xl font-semibold text-black uppercase'>
                                                Add Over Time Details
                                            </p>
                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID</label>
                                                    <input type="text"
                                                        required
                                                        className="form-control "
                                                        value={this.state.empID}
                                                        onChange={this.onChangeempID}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.empIDError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Date</label>
                                                    <div>
                                                        <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            dateFormat="MMMM d, yyyy"
                                                            selected={this.state.date}
                                                            onChange={this.onChangedate}
                                                        />
                                                    </div>
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.dateError}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 form-group">
                                                <div class="">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Start Time</label>
                                                    <input type="time"
                                                        required
                                                        className="form-control"
                                                        value={this.state.sTime}
                                                        onChange={this.onChangesTime}
                                                    />
                                                  <p/>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>End Time</label>
                                                    <input type="time"
                                                       
                                                        className="form-control"
                                                        value={this.state.eTime}
                                                        onChange={this.onChangeeTime}
                                                    />
                                                    <p/>
                                                </div>
                                            </div>

                                           
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Add Over Time" />
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