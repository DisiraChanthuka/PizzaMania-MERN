import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Modal } from "react-bootstrap";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"
import AuthenticationService from '../user/AuthenticationService';
import EditSchedule from './schedule-edit.component';


const Schedule = props => (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
     
        {/* <td className='px-6 py-4'>{props.schedule._id}</td> */}
        <td className='px-6 py-4'>{props.schedule.empID}</td>
        <td className='px-6 py-4'>{props.schedule.date.substring(0,10)}</td>
        <td className='px-6 py-4'>{props.schedule.sTime}</td>
        <td className='px-6 py-4'>{props.schedule.eTime}</td>
        <td className='px-6 py-4'>{props.schedule.clockIn}</td>
        <td className='px-6 py-4'>{props.schedule.clockOut}</td>
        <td className='px-6 py-4'><span
                class="text-base inline-block whitespace-nowrap rounded-full bg-green-400 p-1 hover:bg-green-500 hover:drop-shadow-md hover:text-white  px-2 pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">{props.schedule.status}</span></td>
        <td className='px-6 py-4'>
            <div class="flex justify-center">
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { props.gotoUpdateSchedule(props.schedule._id) }}>
                        
                            <div class=" grid grid-cols-2 gap-1 hover:text-black duration-100">
                                <div class="">
                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                    </svg>
                                </div>
                                <div class="">
                                    Edit
                                </div>
                            </div>
                       
                    </button>
                </div>
                <div class="">
                    <button className='inline-flex items-center px-4 py-2 ml-1 text-sm font-medium text-white duration-100 bg-red-500 rounded-md hover:bg-red-200' onClick={() => { props.deleteSchedule(props.schedule._id) }}>
                        <div class="grid grid-cols-2 gap-1 hover:text-black">
                            <div class="">
                                <svg class="h-5 w-5 mr-2 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <div>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </td>
    </tr>
)

export class AllScheduleList extends Component {

    constructor(props) {
        super(props);

        var today = new Date(),

        time = today.getHours() + ':' + today.getMinutes()  ;

        const loggedUserId = AuthenticationService.loggedUserId();


        this.clockIn = this.clockIn.bind(this);
        this.clockOut = this.clockOut.bind(this);
       


        this.deleteSchedule = this.deleteSchedule.bind(this);
        this.gotoUpdateSchedule = this.gotoUpdateSchedule.bind(this);

        this.state = {
            schedule: [],
            searchSchedule: '',
            show:false,
            currentTime:time
        };
    }

    

    refreshList(){

        axios.get('http://localhost:5000/workingSchedule/')
            .then(response => {
                this.setState({ schedule: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
        
    }




    componentDidMount() {
       this.refreshList();
    }

    gotoUpdateSchedule = (id) => {
        this.setState({
            id: id,
            show: true

        })
        console.log("LIst id is :" +id);
    }

    //Modal box
    closeModalBox = () => {
        this.setState({ show: false })
        this.refreshList();
    }


    deleteSchedule(id) {
        
        axios.delete('http://localhost:5000/workingSchedule/' + id).then(response => {
            console.log(response.status)
            // this.refreshTable();

            if(response.status == 200){
                Swal.fire({
                    icon: 'success',
                    title: 'Successful',
                    text: "Schedule has been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#0a5bf2',
                    iconColor: '#60e004'
                })

                this.refreshList();
            }
            
            else {
                Swal.fire({
                    icon: 'Unsuccess',
                    title: 'Unsuccessfull',
                    text: "Schedule has not been deleted!!",
                    background: '#fff',
                    confirmButtonColor: '#eb220c',
                    iconColor: '#60e004'
                })
            }

            
        })
        

}


clockIn(id){

    

    const schedule = {
        clockIn:this.state.currentTime,
        status: 'Clocked In'
    }

    console.log("Schedul ID is"+this.state.id);

    axios.put('http://localhost:5000/workingSchedule/clockIn/' + id, schedule)
        .then(res => console.log(res.data));
    window.location = '/schedule';
}

clockOut(id){

    const schedule = {
        clockOut:this.state.currentTime,
        status: 'Clocked Out'
    }

    console.log("Schedul ID is"+this.state.id);

    axios.put('http://localhost:5000/workingSchedule/clockOut/' + id, schedule)
        .then(res => console.log(res.data));
    window.location = '/schedule';
}

    scheduleList() {
        return this.state.schedule.map(currentschedule => {
            return <Schedule schedule={currentschedule} clockIn={this.clockIn} deleteSchedule = {this.deleteSchedule} gotoUpdateSchedule={this.gotoUpdateSchedule} key={currentschedule._id} />;
        })
    }

    searchScheduleList() {
        return this.state.schedule.map((currentschedule) => {
            if (
                this.state.searchSchedule ==
                currentschedule.empID
            ) {
                return (
                    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                        {/* <td className='px-6 py-4'>{currentschedule._id}</td> */}
                        <td className='px-6 py-4'>{currentschedule.empID}</td>
                        <td className='px-6 py-4'>{currentschedule.date.substring(0, 10)}</td>
                        <td className='px-6 py-4'>{currentschedule.sTime}</td>
                        <td className='px-6 py-4'>{currentschedule.eTime}</td>
                        <td className='px-6 py-4'>{currentschedule.clockIn}</td>
                        <td className='px-6 py-4'>{currentschedule.clockOut}</td>
                        <td className='px-6 py-4'>{currentschedule.status}</td>
                        <td className='px-6 py-4'>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 mr-1 text-sm font-medium text-white bg-indigo-500 rounded-md hover:bg-blue-200' onClick={() => { this.gotoUpdateSchedule(currentschedule._id) }}>
                                       
                                            <div class=" grid grid-cols-2 gap-1">
                                                <div class="">
                                                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path stroke-linecap="round" stroke-linejoin="round " stroke-width="2" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path>
                                                    </svg>
                                                </div>
                                                <div class="">
                                                    Edit
                                                </div>
                                            </div>
                                      
                                    </button>
                                </div>
                            }
                            </td>
                            <td className='px-6 py-4'>
                            {
                                <div class="">
                                    <button className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-200' onClick={() => { this.deleteSchedule(currentschedule._id) }}
                                        
                                        >
                                        <div class=" grid grid-cols-2 gap-1">
                                            <div class="">
                                                <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div class="">
                                                Delete
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


    exportSchedule = () => {
        console.log( "Export PDF" )


        const unit = "pt";
        const size = "A3"; 
        const orientation = "landscape"; 
        const marginLeft = 40;
        const doc = new jsPDF( orientation, unit, size );

        const title = "Schedule List Report ";
        const headers = [["Schedule ID","Employee ID","Date","Start Time","End Time","Clock In","Clock Out","Status"]];

        const sch = this.state.schedule.map(
            Schedule=>[
                Schedule._id,
                Schedule.empID,
                Schedule.date,
                Schedule.sTime,
                Schedule.eTime,
                Schedule.clockIn,
                Schedule.clockOut,
                Schedule.status
            ]
        );

        let content = {
            startY: 50,
            head: headers,
            body:sch        };
        doc.setFontSize( 20 );
        doc.text( title, marginLeft, 40 );
        require('jspdf-autotable');
        doc.autoTable( content );
        doc.save( "Schedule-list.pdf" )
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
                                            <h3>Schedule Details</h3>
                                        </th>
                                        <td className='flex justify-end gap-2'>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end gap-2">
                                                
                                                <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => this.exportSchedule()}>
                                                  
                                                        Download Report Here
                                                    </button>
                                            </div>
                                            <div class="flex justify-end sm:flex-row sm:text-left sm:justify-end">
                                                <input
                                                    className="form-control rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                                    type="text"
                                                    placeholder="Search by Employee ID"
                                                    aria-label="Search"
                                                    onChange={(e) => {
                                                        this.setState({
                                                            searchSchedule: e.target.value
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
                                        <th className="p-2 border-black tbhead ">Schedule ID</th>
                                            <th className="p-2 border-black tbhead ">Employee ID</th>
                                            <th className="p-2 tbhead">Date</th>
                                            <th className="p-2 tbhead">Start Time</th>
                                            <th className="p-2 tbhead">End Time</th>
                                            <th className="p-2 tbhead">Clock In Time</th>
                                            <th className="p-2 tbhead">Clock Out Time</th>
                                            <th className="p-2 tbhead">Status</th>
                                            <th className="p-2 text-center tbhead">Actions</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody >
                                        {this.state.searchSchedule == "" ? this.scheduleList() : this.searchScheduleList()}
                                    </tbody>
                                </table>
                            </div>
                            <div class="">
                                <Modal show={this.state.show} onHide={this.closeModalBox} centered size={"xl"}>
                                    <Modal.Header className='px-5 pt-4 border-2 shadow-md bg-gray-50' closeButton>
                                        <div class="">
                                            <Modal.Title className='items-center' >
                                                <p className='font-semibold text-black uppercase '>
                                                    Edit Schedule
                                                </p>
                                            </Modal.Title>
                                        </div>
                                    </Modal.Header >
                                    <Modal.Body className='px-12 py-12 border-2 rounded-lg shadow-md bg-gray-50'>
                                        <EditSchedule schId={this.state.id} key={this.state.id} close={this.closeModalBox} />
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

