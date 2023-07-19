import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class RequestChangeSchedule extends Component {

    constructor(props) {
        super(props);

        this.onChangescheduleID = this.onChangescheduleID.bind(this);
        this.onChangeempID = this.onChangeempID.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onChangesTime = this.onChangesTime.bind(this);
        this.onChangeeTime = this.onChangeeTime.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);

        this.onChangechangingScheduleID = this.onChangechangingScheduleID.bind(this);
        this.onChangechangingEmpID = this.onChangechangingEmpID.bind(this);
        this.onChangechangingDate = this.onChangechangingDate.bind(this);
        this.onChangechangingsTime = this.onChangechangingsTime.bind(this);
        this.onChangechangingeTime = this.onChangechangingeTime.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            scheduleID:props.schId,
            empID: '',
            date: new Date(),
            sTime: '',
            eTime: '',
            status: '',
            changingScheduleID:'',
            changingEmpID: '',
            changingDate:new Date(),
            changingsTime:'',
            changingeTime:''
           

        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/workingSchedule/' + this.state.scheduleID)
            .then(response => {
                this.setState({
                    scheduleID : response.data._id,
                    empID: response.data.empID,
                    date: new Date(response.data.date),
                    sTime: response.data.sTime,
                    eTime: response.data.eTime,
                    status: response.data.status,
                   

                })
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    onChangescheduleID(e) {
        this.setState({
            scheduleID: e.target.value
        });
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

    onChangechangingScheduleID(e) {
        this.setState({
            changingScheduleID: e.target.value
        });
    }

    onChangechangingEmpID(e) {
        this.setState({
            changingEmpID: e.target.value
        });
    }

    onChangechangingDate(date) {
        this.setState({
            changingDate: date
        });
    }

    onChangechangingsTime(e) {
        this.setState({
            changingsTime: e.target.value
        });
    }



    onChangechangingeTime(e) {
        this.setState({
            changingeTime: e.target.value
        });
    }

    onChangestatus(e) {
        this.setState({
            status: e.target.value
        });
    }


    scheduledExisting(scheduleID){
        const status = {
            status : "Pending"
        }
        console.log("Working Schedule Updated")
        axios.put('http://localhost:5000/workingSchedule/status/' +scheduleID, status)
    
    }

    

    onSubmit(e) {
        e.preventDefault();

        const  scheduleID = this.state.scheduleID;
        this.scheduledExisting(scheduleID);

        const schedule = {
            scheduleID: this.state.scheduleID,
            empID: this.state.empID,
            date: this.state.date,
            sTime: this.state.sTime,
            eTime: this.state.eTime,
            status: 'Pending',
            changingScheduleID: this.state.changingScheduleID,
            changingEmpID: this.state.changingEmpID,
            changingDate: this.state.changingDate,
            changingsTime: this.state.changingsTime,
            changingeTime: this.state.changingeTime
           

        }


       

        console.log(schedule);


        axios.post('http://localhost:5000/scheduleRequest/',schedule)
            .then(res => {
                console.log(res);

                if (res.status === 200) {
                   
                    this.props.close();

                    Swal.fire({
                        icon: 'success',
                        title: 'Successful',
                        text: 'Schedule Request has been updated!!',
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
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Schedule ID </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.scheduleID}
                                                        onChange={this.onChangescheduleID}

                                                    /><p />
                                                </div>
                                           
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Employee ID </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.empID}
                                                        onChange={this.onChangeempID}

                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Date</label>
                                                    <div>
                                                        <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            disabled
                                                            dateFormat="MMMM d, yyyy"
                                                            selected={this.state.date}
                                                            onChange={this.onChangedate}
                                                        />
                                                    </div>
                                                    <p/>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Staring Time</label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.sTime}
                                                        onChange={this.onChangesTime}
                                                    />
                                                    <p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>End Time</label>
                                                    <input type="text"
                                                        required
                                                        disabled
                                                        className="form-control"
                                                        value={this.state.eTime}
                                                        onChange={this.onChangeeTime}
                                                    /><p />
                                                </div>
                                            </div>

                                            
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Changing Schedule ID </label>
                                                    <input type="text"
                                                        // required
                                                       
                                                        className="form-control"
                                                        value={this.state.changingScheduleID}
                                                        onChange={this.onChangechangingScheduleID}

                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Changing Employee ID</label>
                                                    <div>
                                                    <input type="text"
                                                        required
                                                       
                                                        className="form-control"
                                                        value={this.state.changingEmpID}
                                                        onChange={this.onChangechangingEmpID}
                                                    />
                                                    <p />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Changing Date</label>
                                                    

                                                    <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            dateFormat="MMMM d, yyyy"
                                                            selected={this.state.changingDate}
                                                            onChange={this.onChangechangingDate}
                                                        />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Changing Start Time</label>
                                                    <input type="time"
                                                        required
                                                      
                                                        className="form-control"
                                                        value={this.state.changingsTime}
                                                        onChange={this.onChangechangingsTime}
                                                    /><p />
                                                </div>
                                            </div>

                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Changing End Time</label>
                                                    <input type="time"
                                                        required
                                                       
                                                        className="form-control"
                                                        value={this.state.changingeTime}
                                                        onChange={this.onChangechangingeTime}
                                                    />
                                                    <p />
                                                </div>
                                                
                                            </div>

                                           
                                            <div className="text-center align-middle form-group">
                                                <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type="submit" value="Request Change" />
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