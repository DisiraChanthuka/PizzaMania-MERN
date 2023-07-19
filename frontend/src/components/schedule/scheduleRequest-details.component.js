import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"

export default class ScheduleRequestDetails extends Component {

    constructor(props) {
        super(props);

        this.onChangescheduleID = this.onChangescheduleID.bind(this);
        this.onChangeempID = this.onChangeempID.bind(this);
        this.onChangedate = this.onChangedate.bind(this);
        this.onChangesTime = this.onChangesTime.bind(this);
        this.onChangeeTime = this.onChangeeTime.bind(this);
        this.onChangestatus = this.onChangestatus.bind(this);

        this.onChangechangingEmpID = this.onChangechangingEmpID.bind(this);
        this.onChangechangingDate = this.onChangechangingDate.bind(this);
        this.onChangechangingsTime = this.onChangechangingsTime.bind(this);
        this.onChangechangingeTime = this.onChangechangingeTime.bind(this);


        this.state = {
            id:props.schId,
            scheduleID:'',
            empID: '',
            date: new Date(),
            sTime: '',
            eTime: '',
            status: '',
            changingEmpID: '',
            changingDate:new Date(),
            changingsTime:'',
            changingeTime:''
           

        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/scheduleRequest/' + this.state.id)
            .then(response => {
                this.setState({
                    id:response.data.id,
                    scheduleID : response.data.scheduleID,
                    empID: response.data.empID,
                    date: new Date(response.data.date),
                    sTime: response.data.sTime,
                    eTime: response.data.eTime,
                    changingEmpID: response.data.changingEmpID,
                    changingDate: new Date(response.data.changingDate),
                    changingsTime: response.data.changingsTime,
                    changingeTime: response.data.changingeTime,
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
            status : "Scheduled"
        }
        console.log("Working Schedule Updated")
        axios.put('http://localhost:5000/workingSchedule/status/' +scheduleID, status)
    
    }
    
    scheduledNew(scheduleID){
        const statusA = {
           
            status : "New Scheduled"
        }
        console.log("Working Schedule Updated")
        console.log(statusA)
        axios.put('http://localhost:5000/workingSchedule/updateExisting/' +scheduleID, statusA)
    
    }
    
    
    approve(id,scheduleID) {
        const schedule = {
            status: 'Approved'
        }
    
       this.scheduledNew(scheduleID);
    
        axios.put('http://localhost:5000/scheduleRequest/status/' + id, schedule)
            .then(res => console.log(res.data));
        
      
    }
    
    decline(id,scheduleID) {
        const schedule = {
            status: 'Declined'
        }
    
        this.scheduledExisting(scheduleID);
    
        axios.put('http://localhost:5000/scheduleRequest/status/' + id, schedule)
            .then(res => console.log(res.data));
        
    }



    render() {
        const {id,scheduleID} = this.state;
        return (
           
            <div className="flex flex-col px-5 pt-2 ">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className='items-center overflow-hidden'>
                            <div className=''>
                                <div class="grid grid-cols-1 gap-4 content-start pt-5 px-20">
                                    <div className="formdiv">
                                        <form className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50' >
                                        <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Schedule ID </label>
                                                    <input type="text"
                                                        // required
                                                        disabled
                                                        className="form-control"
                                                        value={scheduleID}
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
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Changing Employee ID </label>
                                                    <input type="text"
                                                        // required
                                                       disabled
                                                        className="form-control"
                                                        value={this.state.changingEmpID}
                                                        onChange={this.onChangechangingEmpID}

                                                    /><p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white' >Changing Date</label>
                                                    <div>
                                                        <DatePicker
                                                            viewBox="0 0 20 40"
                                                            required
                                                            disabled
                                                            dateFormat="MMMM d, yyyy"
                                                            selected={this.state.changingDate}
                                                            onChange={this.onChangechangingDate}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="grid grid-cols-2 gap-4 form-group">
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Changing Staring Time</label>
                                                    <input type="time"
                                                        required
                                                       disabled
                                                        className="form-control"
                                                        value={this.state.changingsTime}
                                                        onChange={this.onChangechangingsTime}
                                                    />
                                                    <p />
                                                </div>
                                                <div className="form-group">
                                                    <label className='block mb-2 text-lg font-medium text-gray-900 dark:text-white'>Changing End Time</label>
                                                    <input type="time"
                                                        required
                                                      disabled
                                                        className="form-control"
                                                        value={this.state.changingeTime}
                                                        onChange={this.onChangechangingeTime}
                                                    /><p />
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