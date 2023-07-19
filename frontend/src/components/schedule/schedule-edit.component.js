import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import TimePicker from 'react-time-picker';

export default class EditSchedule extends Component {

    constructor(props) {
        super(props);


        this.onChangeempID = this.onChangeempID.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onChangesTime = this.onChangesTime.bind(this);
        this.onChangeeTime = this.onChangeeTime.bind(this);
        this.onChangeclockIn = this.onChangeclockIn.bind(this);
        this.onChangeclockOut = this.onChangeclockOut.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            id: props.schId,
            empID: '',
            date: new Date(),
            sTime: '',
            eTime: '',
            clockIn: '',
            clockOut: '',
            status: ''

        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/workingSchedule/' + this.state.id)
            .then(response => {
                this.setState({
                    id: response.data._id,
                    empID: response.data.empID,
                    date: new Date(response.data.date),
                    sTime: response.data.sTime,
                    eTime: response.data.eTime,
                    clockIn: response.data.clockIn,
                    clockOut: response.data.clockOut,
                    status: response.data.status,

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

    onChangeclockIn(e) {
        this.setState({
            clockIn: e.target.value
        });
    }

    onChangeclockOut(e) {
        this.setState({
            clockOut: e.target.value
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
            clockIn: this.state.clockIn,
            clockOut: this.state.clockOut,
            status: this.state.status,

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
        } else {

            axios.put('http://localhost:5000/workingSchedule/' + this.state.id, schedule)
                .then(res => {
                    console.log(res);

                    if (res.status === 200) {

                        this.props.close();

                        Swal.fire({
                            icon: 'success',
                            title: 'Successful',
                            text: 'Schedule has been updated!!',
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
                                        <form className='px-12 py-12' onSubmit={this.onSubmit}>

                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.empID}
                                                        onChange={this.onChangeempID}

                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.empIDError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Date</label>
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
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Starting Time</label>
                                                    <input type="time"
                                                        required
                                                        className="form-control"
                                                        value={this.state.sTime}
                                                        onChange={this.onChangesTime}
                                                    />
                                                    <p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.sTimeError}</p>
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Ending Time</label>
                                                    <input type="time"
                                                        required
                                                        className="form-control"
                                                        value={this.state.eTime}
                                                        onChange={this.onChangeeTime}
                                                    /><p className="block text-lg font-medium text-red-900 dark:text-white">{this.state.eTimeError}</p>
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Clock In</label>
                                                <input type="time"
                                                    required
                                                    disabled
                                                    className="form-control"
                                                    value={this.state.clockIn}
                                                    onChange={this.onChangeclockIn}
                                                /><p />
                                            </div>
                                            <div className="form-group">
                                                <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' for="grid-state">clockOut</label>
                                                <input type="time"
                                                    required
                                                    disabled
                                                    className="form-control"
                                                    value={this.state.clockOut}
                                                    onChange={this.onChangeclockOut}
                                                /><p />

                                                <p />

                                                <div className="form-group">
                                                    <label for="large-input" className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Status</label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.status}
                                                        onChange={this.onChangestatus}
                                                    /><p />
                                                </div>
                                            </div>

                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Edit Schedule" />
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